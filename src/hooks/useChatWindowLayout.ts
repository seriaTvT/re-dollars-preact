import { useLayoutEffect } from 'preact/hooks';
import type { RefObject } from 'preact';
import { isChatOpen } from '@/stores/chatState';
import { chatLayoutReady, checkNarrowLayout, ensureNarrowLayoutChatView, resetLayoutCheck } from '@/stores/ui';

export function useChatWindowLayout(windowRef: RefObject<HTMLDivElement>) {
    useLayoutEffect(() => {
        if (!windowRef.current) return;

        resetLayoutCheck();

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                checkNarrowLayout(entry.contentRect.width);
            }
        });

        observer.observe(windowRef.current);
        checkNarrowLayout(windowRef.current.offsetWidth);

        return () => observer.disconnect();
    }, []);

    useLayoutEffect(() => {
        if (!isChatOpen.value) {
            chatLayoutReady.value = false;
            return;
        }
        if (isChatOpen.value && windowRef.current) {
            ensureNarrowLayoutChatView(windowRef.current.offsetWidth);
        }
    }, [isChatOpen.value]);
}
