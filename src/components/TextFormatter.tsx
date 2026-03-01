import { useRef, useCallback, useEffect, useLayoutEffect } from 'preact/hooks';
import { render } from 'preact';
import { signal } from '@preact/signals';
import { SVGIcons } from '@/utils/constants';

// State: text formatter visibility and mode
export const formatterVisible = signal(false);
export const formatterLinkMode = signal(false);

interface TextFormatterProps {
    textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const PORTAL_ID = 'dollars-text-formatter-portal';

export function TextFormatter({ textareaRef }: TextFormatterProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const portalRootRef = useRef<HTMLDivElement | null>(null);
    const linkInputRef = useRef<HTMLInputElement>(null);
    const savedRangeRef = useRef<{ start: number; end: number } | null>(null);

    // Check for text selection
    const checkSelection = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        if (document.activeElement !== textarea) {
            // Check if focus is in the formatter itself
            if (containerRef.current?.contains(document.activeElement as Node)) return;
            if (formatterLinkMode.value) return;
            hide();
            return;
        }

        if (textarea.selectionStart !== textarea.selectionEnd) {
            show();
        } else {
            hide();
        }
    }, [textareaRef]);

    // Show formatter
    const show = useCallback(() => {
        const textarea = textareaRef.current;
        const el = containerRef.current;
        if (!textarea || !el) return;

        const rect = textarea.getBoundingClientRect();
        el.style.top = `${rect.top - 50}px`;
        el.style.left = `${rect.left + (rect.width / 2) - (el.offsetWidth / 2)}px`;

        formatterVisible.value = true;
        savedRangeRef.current = {
            start: textarea.selectionStart,
            end: textarea.selectionEnd
        };
    }, [textareaRef]);

    // Hide formatter
    const hide = useCallback(() => {
        formatterVisible.value = false;
        setTimeout(() => {
            if (!formatterVisible.value) {
                formatterLinkMode.value = false;
                if (linkInputRef.current) {
                    linkInputRef.current.value = '';
                }
            }
        }, 200);
    }, []);

    // Switch to link mode
    const switchMode = useCallback((isLinkMode: boolean) => {
        if (isLinkMode) {
            formatterLinkMode.value = true;
            savedRangeRef.current = {
                start: textareaRef.current?.selectionStart || 0,
                end: textareaRef.current?.selectionEnd || 0
            };
            setTimeout(() => linkInputRef.current?.focus(), 50);
        } else {
            formatterLinkMode.value = false;
            restoreSelection();
        }
    }, [textareaRef]);

    // Restore selection
    const restoreSelection = useCallback(() => {
        const textarea = textareaRef.current;
        if (textarea && savedRangeRef.current) {
            textarea.focus();
            textarea.setSelectionRange(savedRangeRef.current.start, savedRangeRef.current.end);
        }
    }, [textareaRef]);

    // Apply BBCode
    const applyBBCode = useCallback((tag: string) => {
        restoreSelection();
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selection = text.substring(start, end);

        if (!selection) return;

        const before = text.substring(0, start);
        const after = text.substring(end);
        const newText = `${before}[${tag}]${selection}[/${tag}]${after}`;

        textarea.value = newText;
        textarea.setSelectionRange(
            start + tag.length + 2,
            end + tag.length + 2
        );
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        hide();
    }, [textareaRef, restoreSelection, hide]);

    // Apply link
    const applyLink = useCallback(() => {
        const url = linkInputRef.current?.value.trim();
        if (!url) {
            switchMode(false);
            return;
        }

        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.focus();
        if (savedRangeRef.current) {
            textarea.setSelectionRange(savedRangeRef.current.start, savedRangeRef.current.end);
        }

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selection = text.substring(start, end);

        const before = text.substring(0, start);
        const after = text.substring(end);
        const newText = `${before}[url=${url}]${selection}[/url]${after}`;

        textarea.value = newText;
        textarea.setSelectionRange(start, start + newText.length - before.length - after.length);
        textarea.dispatchEvent(new Event('input', { bubbles: true }));

        hide();
        if (linkInputRef.current) {
            linkInputRef.current.value = '';
        }
    }, [textareaRef, switchMode, hide]);

    // Event listeners
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const handleMouseDown = () => hide();
        const handleMouseUp = () => setTimeout(checkSelection, 10);
        const handleTouchEnd = () => setTimeout(checkSelection, 50);
        const handleKeyUp = () => setTimeout(checkSelection, 10);
        const handleScroll = () => hide();
        const handleResize = () => hide();

        textarea.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        textarea.addEventListener('touchend', handleTouchEnd);
        textarea.addEventListener('keyup', handleKeyUp);
        textarea.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            textarea.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            textarea.removeEventListener('touchend', handleTouchEnd);
            textarea.removeEventListener('keyup', handleKeyUp);
            textarea.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [textareaRef, checkSelection, hide]);

    // Handle button clicks
    const handleAction = useCallback((action: string) => {
        switch (action) {
            case 'b':
            case 'i':
            case 'u':
            case 's':
            case 'mask':
            case 'code':
                applyBBCode(action);
                break;
            case 'link-mode':
                switchMode(true);
                break;
            case 'cancel-link':
                switchMode(false);
                break;
            case 'apply-link':
                applyLink();
                break;
        }
    }, [applyBBCode, switchMode, applyLink]);

    // Handle link input keydown
    const handleLinkKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyLink();
        } else if (e.key === 'Escape') {
            switchMode(false);
            textareaRef.current?.focus();
        }
    };

    const className = [
        'dollars-text-formatter',
        formatterVisible.value && 'visible',
        formatterLinkMode.value && 'link-mode'
    ].filter(Boolean).join(' ');

    const formatterContent = (
        <div
            ref={containerRef}
            id="dollars-text-formatter"
            class={className}
        >
            <div class="formatter-row main-buttons">
                <button type="button" class="formatter-btn" title="防剧透 (Mask)" onClick={() => handleAction('mask')} dangerouslySetInnerHTML={{ __html: SVGIcons.spoiler }} />
                <div class="formatter-divider" />
                <button type="button" class="formatter-btn" title="加粗" onClick={() => handleAction('b')} dangerouslySetInnerHTML={{ __html: SVGIcons.bold }} />
                <button type="button" class="formatter-btn" title="斜体" onClick={() => handleAction('i')} dangerouslySetInnerHTML={{ __html: SVGIcons.italic }} />
                <button type="button" class="formatter-btn" title="下划线" onClick={() => handleAction('u')} dangerouslySetInnerHTML={{ __html: SVGIcons.underline }} />
                <button type="button" class="formatter-btn" title="删除线" onClick={() => handleAction('s')} dangerouslySetInnerHTML={{ __html: SVGIcons.strike }} />
                <button type="button" class="formatter-btn" title="等宽代码" onClick={() => handleAction('code')} dangerouslySetInnerHTML={{ __html: SVGIcons.code }} />
                <div class="formatter-divider" />
                <button type="button" class="formatter-btn" title="添加链接" onClick={() => handleAction('link-mode')} dangerouslySetInnerHTML={{ __html: SVGIcons.link }} />
            </div>
            <div class="formatter-row formatter-link-input-wrapper">
                <button type="button" class="formatter-btn" title="返回" onClick={() => handleAction('cancel-link')} dangerouslySetInnerHTML={{ __html: SVGIcons.back }} />
                <div class="formatter-divider" />
                <input ref={linkInputRef} type="text" class="formatter-link-input" placeholder="输入链接 URL..." autoComplete="off" onKeyDown={handleLinkKeyDown} />
                <div class="formatter-divider" />
                <button type="button" class="formatter-btn" title="确认" onClick={() => handleAction('apply-link')} dangerouslySetInnerHTML={{ __html: SVGIcons.check }} />
            </div>
        </div>
    );

    useLayoutEffect(() => {
        let root = portalRootRef.current;
        if (!root) {
            root = document.createElement('div');
            root.id = PORTAL_ID;
            document.body.appendChild(root);
            portalRootRef.current = root;
        }
        render(formatterContent, root);
        // 不在 cleanup 裡 unmount，否則每次 re-render 會銷毀 DOM、清掉 show() 設定的 top/left 與 ref
        return () => {};
    });

    useEffect(() => () => {
        const root = portalRootRef.current;
        if (root) {
            render(null, root);
            if (root.parentNode) root.parentNode.removeChild(root);
            portalRootRef.current = null;
        }
    }, []);

    return null;
}
