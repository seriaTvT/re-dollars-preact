import { render, type RefObject } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import { signal } from '@preact/signals';
import {
    iconBack,
    iconBold,
    iconCheck,
    iconCode,
    iconItalic,
    iconLink,
    iconSpoiler,
    iconStrike,
    iconUnderline
} from '@/utils/icons';
import type { RichInputController } from '@/utils/richInput';

// State: text formatter visibility and mode
export const formatterVisible = signal(false);
export const formatterLinkMode = signal(false);

interface TextFormatterProps {
    // 兼容 Dollars 的 contentEditable div 与短信输入框的 textarea
    editorRef: RefObject<HTMLElement>;
    inputControllerRef: { current: RichInputController | null };
}

const PORTAL_ID = 'dollars-text-formatter-portal';
const BASIC_FORMAT_BUTTONS = [
    ['b', '加粗', iconBold],
    ['i', '斜体', iconItalic],
    ['u', '下划线', iconUnderline],
    ['s', '删除线', iconStrike],
    ['code', '等宽代码', iconCode],
] as const;

export function TextFormatter({ editorRef, inputControllerRef }: TextFormatterProps) {
    useEffect(() => {
        let root = document.getElementById(PORTAL_ID) as HTMLDivElement | null;
        if (!root) {
            root = document.createElement('div');
            root.id = PORTAL_ID;
            document.body.appendChild(root);
        }

        render(<TextFormatterLayer editorRef={editorRef} inputControllerRef={inputControllerRef} />, root);

        return () => {
            render(null, root);
            root.remove();
        };
    }, [editorRef, inputControllerRef]);

    return null;
}

function TextFormatterLayer({ editorRef, inputControllerRef }: TextFormatterProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const linkInputRef = useRef<HTMLInputElement>(null);
    const savedRangeRef = useRef<{ start: number; end: number } | null>(null);

    function hide() {
        formatterVisible.value = false;
        setTimeout(() => {
            if (!formatterVisible.value) {
                formatterLinkMode.value = false;
                if (linkInputRef.current) {
                    linkInputRef.current.value = '';
                }
            }
        }, 200);
    }

    function restoreSelection() {
        const controller = inputControllerRef.current;
        if (controller && savedRangeRef.current) {
            controller.focus();
            controller.setSelection(savedRangeRef.current.start, savedRangeRef.current.end);
        }
    }

    function show() {
        const editor = editorRef.current;
        const controller = inputControllerRef.current;
        const el = containerRef.current;
        if (!editor || !controller || !el) return;

        const rect = editor.getBoundingClientRect();
        el.style.top = `${rect.top - 50}px`;
        el.style.left = `${rect.left + (rect.width / 2) - (el.offsetWidth / 2)}px`;

        formatterVisible.value = true;
        savedRangeRef.current = controller.getSelection();
    }

    function checkSelection() {
        const editor = editorRef.current;
        const controller = inputControllerRef.current;
        if (!editor || !controller) return;

        if (document.activeElement !== editor) {
            // Check if focus is in the formatter itself
            if (containerRef.current?.contains(document.activeElement as Node)) return;
            if (formatterLinkMode.value) return;
            hide();
            return;
        }

        const selection = controller.getSelection();
        if (selection.start !== selection.end) {
            show();
        } else {
            hide();
        }
    }

    function switchMode(isLinkMode: boolean) {
        const controller = inputControllerRef.current;
        if (isLinkMode) {
            formatterLinkMode.value = true;
            savedRangeRef.current = controller?.getSelection() || { start: 0, end: 0 };
            setTimeout(() => linkInputRef.current?.focus(), 50);
        } else {
            formatterLinkMode.value = false;
            restoreSelection();
        }
    }

    function applyBBCode(tag: string) {
        restoreSelection();
        const controller = inputControllerRef.current;
        if (!controller) return;

        const { start, end } = controller.getSelection();
        const text = controller.getValue();
        const selection = text.substring(start, end);

        if (!selection) return;

        const before = text.substring(0, start);
        const after = text.substring(end);
        const newText = `${before}[${tag}]${selection}[/${tag}]${after}`;

        controller.setValue(newText, {
            focus: true,
            selection: {
                start: start + tag.length + 2,
                end: end + tag.length + 2
            }
        });
        hide();
    }

    function applyLink() {
        const url = linkInputRef.current?.value.trim();
        if (!url) {
            switchMode(false);
            return;
        }

        const controller = inputControllerRef.current;
        if (!controller) return;

        const activeSelection = savedRangeRef.current || controller.getSelection();
        const { start, end } = activeSelection;
        const text = controller.getValue();
        const selection = text.substring(start, end);

        const before = text.substring(0, start);
        const after = text.substring(end);
        const newText = `${before}[url=${url}]${selection}[/url]${after}`;

        controller.setValue(newText, {
            focus: true,
            selection: {
                start,
                end: start + newText.length - before.length - after.length
            }
        });

        hide();
        if (linkInputRef.current) {
            linkInputRef.current.value = '';
        }
    }

    // Event listeners
    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const handleMouseDown = () => hide();
        const handleMouseUp = () => setTimeout(checkSelection, 10);
        const handleTouchEnd = () => setTimeout(checkSelection, 50);
        const handleKeyUp = () => setTimeout(checkSelection, 10);
        const handleScroll = () => hide();
        const handleResize = () => hide();

        editor.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        editor.addEventListener('touchend', handleTouchEnd);
        editor.addEventListener('keyup', handleKeyUp);
        editor.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            editor.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            editor.removeEventListener('touchend', handleTouchEnd);
            editor.removeEventListener('keyup', handleKeyUp);
            editor.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [editorRef, inputControllerRef]);

    // Handle link input keydown
    const handleLinkKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyLink();
        } else if (e.key === 'Escape') {
            switchMode(false);
            inputControllerRef.current?.focus();
        }
    };

    const className = `dollars-text-formatter${formatterVisible.value ? ' visible' : ''}${formatterLinkMode.value ? ' link-mode' : ''}`;

    return (
        <div
            ref={containerRef}
            id="dollars-text-formatter"
            class={className}
        >
            <div class="formatter-row main-buttons">
                <button type="button" class="formatter-btn" title="防剧透 (Mask)" onClick={() => applyBBCode('mask')} dangerouslySetInnerHTML={{ __html: iconSpoiler }} />
                <div class="formatter-divider" />
                {BASIC_FORMAT_BUTTONS.map(([tag, title, icon]) => (
                    <button key={tag} type="button" class="formatter-btn" title={title} onClick={() => applyBBCode(tag)} dangerouslySetInnerHTML={{ __html: icon }} />
                ))}
                <div class="formatter-divider" />
                <button type="button" class="formatter-btn" title="添加链接" onClick={() => switchMode(true)} dangerouslySetInnerHTML={{ __html: iconLink }} />
            </div>
            <div class="formatter-row formatter-link-input-wrapper">
                <button type="button" class="formatter-btn" title="返回" onClick={() => switchMode(false)} dangerouslySetInnerHTML={{ __html: iconBack }} />
                <div class="formatter-divider" />
                <input ref={linkInputRef} type="text" class="formatter-link-input" placeholder="输入链接 URL..." autoComplete="off" onKeyDown={handleLinkKeyDown} />
                <div class="formatter-divider" />
                <button type="button" class="formatter-btn" title="确认" onClick={applyLink} dangerouslySetInnerHTML={{ __html: iconCheck }} />
            </div>
        </div>
    );
}
