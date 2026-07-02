import { useEffect } from 'preact/hooks';
import type { RefObject } from 'preact';
import { isChatOpen } from '@/stores/chatState';
import { checkNarrowLayout, ensureNarrowLayoutChatView, resetLayoutCheck } from '@/stores/ui';

export function useChatWindowLayout(windowRef: RefObject<HTMLDivElement>) {
    useEffect(() => {
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

    useEffect(() => {
        if (isChatOpen.value && windowRef.current) {
            ensureNarrowLayoutChatView(windowRef.current.offsetWidth);
        }
    }, [isChatOpen.value]);
}
