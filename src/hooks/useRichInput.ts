import { useCallback, useEffect, useRef } from 'preact/hooks';
import type { RefObject } from 'preact';
import {
    extractRichInputText,
    getRichInputSelection,
    needsRichInputNormalization,
    renderRichInputHTML,
    setRichInputSelection,
    type RichInputController,
    type RichInputSelection,
    type RichInputValueOptions,
} from '@/utils/richInput';

interface UseRichInputParams {
    // 富文本 contentEditable 编辑器节点
    editorRef: RefObject<HTMLDivElement>;
    // 隐藏的代理 textarea，用于 BMO 拼装面板等需要原生 textarea 的集成
    proxyRef?: RefObject<HTMLTextAreaElement>;
    // 调用方持有的控制器引用，本 hook 负责填充其 .current
    controllerRef: { current: RichInputController | null };
    minHeight?: number;
    maxHeight: number;
    // 每次值变化时的副作用（如媒体解析），由调用方提供
    onValueChange?: (value: string, options: RichInputValueOptions) => void;
}

interface UseRichInputResult {
    handleInput: () => void;
    handleCompositionStart: () => void;
    handleCompositionEnd: () => void;
    isComposing: () => boolean;
    didJustEndComposition: () => boolean;
    updateHeight: () => void;
}

/**
 * 把 contentEditable 编辑器接入共享的 richInput 引擎：
 * 实时把 [emoji]/[sticker]/(bgmXX) 等内联 token 渲染成图片，
 * 同时对外暴露以纯文本为准的 RichInputController。
 * ChatInput 与短信输入框共用同一套渲染逻辑。
 */
export function useRichInput({
    editorRef,
    proxyRef,
    controllerRef,
    minHeight = 38,
    maxHeight,
    onValueChange,
}: UseRichInputParams): UseRichInputResult {
    const valueRef = useRef('');
    const selectionRef = useRef<RichInputSelection>({ start: 0, end: 0 });
    const isComposingRef = useRef(false);
    const didJustEndCompositionRef = useRef(false);
    const compositionEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const updateHeight = useCallback(() => {
        const editor = editorRef.current;
        if (!editor) return;

        editor.style.height = 'auto';
        const next = Math.max(minHeight, Math.min(editor.scrollHeight, maxHeight));
        editor.style.height = `${next}px`;
        editor.classList.toggle('is-overflowing', editor.scrollHeight > maxHeight);
    }, [editorRef, minHeight, maxHeight]);

    function syncProxy(value = valueRef.current, selection = selectionRef.current) {
        const proxy = proxyRef?.current;
        if (!proxy) return;
        proxy.value = value;
        proxy.selectionStart = selection.start;
        proxy.selectionEnd = selection.end;
    }

    function syncAssetLayout() {
        const editor = editorRef.current;
        if (!editor) return;

        const images = Array.from(editor.querySelectorAll<HTMLImageElement>('img'));
        if (!images.length) {
            requestAnimationFrame(updateHeight);
            return;
        }

        images.forEach((img) => {
            if (img.complete) return;
            const refresh = () => requestAnimationFrame(updateHeight);
            img.addEventListener('load', refresh, { once: true });
            img.addEventListener('error', refresh, { once: true });
        });

        requestAnimationFrame(updateHeight);
    }

    function renderBmo(value: string) {
        if (!value.includes('(bmo')) return;

        const editor = editorRef.current;
        const bmoji = (window as any).Bmoji;
        if (!editor || typeof bmoji?.renderAll !== 'function') return;

        requestAnimationFrame(() => {
            if (editorRef.current === editor) {
                bmoji.renderAll(editor, { width: 21, height: 21 });
                requestAnimationFrame(updateHeight);
            }
        });
    }

    function renderEditorValue(value: string, selection: RichInputSelection, focus = false) {
        const editor = editorRef.current;
        if (!editor) return;

        editor.innerHTML = renderRichInputHTML(value);

        if (focus) editor.focus();
        if (focus || document.activeElement === editor) {
            setRichInputSelection(editor, selection.start, selection.end);
        }

        syncAssetLayout();
        renderBmo(value);
    }

    function applyValue(value: string, options: RichInputValueOptions = {}) {
        const selection = options.selection || { start: value.length, end: value.length };
        valueRef.current = value;
        selectionRef.current = selection;
        syncProxy(value, selection);
        renderEditorValue(value, selection, !!options.focus);
        onValueChange?.(value, options);
    }

    controllerRef.current = {
        focus: () => editorRef.current?.focus(),
        getSelection: () => {
            const editor = editorRef.current;
            const selection = editor ? getRichInputSelection(editor) : null;
            if (selection) {
                selectionRef.current = selection;
                syncProxy(valueRef.current, selection);
                return selection;
            }
            return selectionRef.current;
        },
        getValue: () => valueRef.current,
        insertText: (text, options = {}) => {
            const selection = controllerRef.current?.getSelection() || selectionRef.current;
            controllerRef.current?.replaceRange(text, selection.start, selection.end, options);
        },
        replaceRange: (text, start, end, options = {}) => {
            const current = valueRef.current;
            const next = current.substring(0, start) + text + current.substring(end);
            const selection = options.selection || {
                start: start + text.length,
                end: start + text.length,
            };
            applyValue(next, { ...options, selection });
        },
        setSelection: (start, end = start) => {
            const selection = { start, end };
            selectionRef.current = selection;
            syncProxy(valueRef.current, selection);
            const editor = editorRef.current;
            if (editor && document.activeElement === editor) {
                setRichInputSelection(editor, start, end);
            }
        },
        setValue: (value, options = {}) => applyValue(value, options),
    };

    function handleInput() {
        const editor = editorRef.current;
        if (!editor) return;

        const selection = getRichInputSelection(editor) || selectionRef.current;
        const value = extractRichInputText(editor);
        valueRef.current = value;
        selectionRef.current = selection;
        syncProxy(value, selection);

        if (!isComposingRef.current && needsRichInputNormalization(editor, value)) {
            renderEditorValue(value, selection);
        }

        updateHeight();
        onValueChange?.(value, {});
    }

    function handleCompositionStart() {
        isComposingRef.current = true;
    }

    function handleCompositionEnd() {
        isComposingRef.current = false;
        didJustEndCompositionRef.current = true;
        if (compositionEndTimerRef.current) {
            clearTimeout(compositionEndTimerRef.current);
        }
        compositionEndTimerRef.current = setTimeout(() => {
            didJustEndCompositionRef.current = false;
            compositionEndTimerRef.current = null;
        }, 50);
        handleInput();
    }

    // 代理 textarea 收到输入（如 BMO 拼装面板写入）时同步回富文本编辑器
    useEffect(() => {
        const proxy = proxyRef?.current;
        if (!proxy) return;

        const handleProxyInput = () => {
            applyValue(proxy.value, {
                selection: {
                    start: proxy.selectionStart,
                    end: proxy.selectionEnd,
                },
            });
        };

        proxy.addEventListener('input', handleProxyInput);
        return () => proxy.removeEventListener('input', handleProxyInput);
    }, [proxyRef]);

    // 光标移动时把选区同步到代理 textarea，保证外部集成插入位置正确
    useEffect(() => {
        const syncSelection = () => {
            const editor = editorRef.current;
            if (!editor || document.activeElement !== editor) return;

            const selection = getRichInputSelection(editor);
            if (!selection) return;

            selectionRef.current = selection;
            syncProxy(valueRef.current, selection);
        };

        document.addEventListener('selectionchange', syncSelection);
        return () => document.removeEventListener('selectionchange', syncSelection);
    }, [editorRef, proxyRef]);

    useEffect(() => () => {
        if (compositionEndTimerRef.current) {
            clearTimeout(compositionEndTimerRef.current);
        }
    }, []);

    return {
        handleInput,
        handleCompositionStart,
        handleCompositionEnd,
        isComposing: () => isComposingRef.current,
        didJustEndComposition: () => didJustEndCompositionRef.current,
        updateHeight,
    };
}
