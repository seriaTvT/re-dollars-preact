import { useEffect } from 'preact/hooks';
import type { RefObject } from 'preact';
import { getMessageById } from '@/stores/messageStore';
import { showImageViewer } from '@/stores/ui';
import { buildMessageImageViewerItems } from '@/utils/messageImageViewer';

function getImageSource(container: HTMLElement): string | null {
    const image = container.querySelector('.full-image') as HTMLImageElement | null;
    return image?.dataset.fullSrc || image?.src || container.dataset.src || null;
}

function getMessage(container: HTMLElement) {
    const messageElement = container.closest('.chat-message') as HTMLElement | null;
    const messageId = Number(messageElement?.dataset.dbId);
    return Number.isFinite(messageId) ? getMessageById(messageId) : undefined;
}

interface MessageImageViewerOptions {
    mode?: 'timeline' | 'generic';
    scopeSelector?: string;
}

export function useMessageImageViewer(
    messageRef: RefObject<HTMLDivElement>,
    contentKey: unknown,
    options: MessageImageViewerOptions = {}
) {
    const mode = options.mode || 'timeline';
    const scopeSelector = options.scopeSelector || '.chat-list';
    useEffect(() => {
        const messageElement = messageRef.current;
        if (!messageElement) return;

        const handler = (event: Event) => {
            const target = event.target as Element | null;
            const container = target?.closest<HTMLElement>('.image-container');
            if (!container || !messageElement.contains(container)) return;
            event.preventDefault();
            event.stopPropagation();

            const list = messageElement.closest(scopeSelector);
            const scope = list || messageElement;
            const timelineContainers = Array.from(
                scope.querySelectorAll<HTMLElement>('.image-container')
            );
            const timelineImages = timelineContainers.flatMap((timelineContainer) => {
                const src = getImageSource(timelineContainer);
                return src
                    ? [{ container: timelineContainer, entry: { src, message: getMessage(timelineContainer) } }]
                    : [];
            });
            const index = timelineImages.findIndex((item) => item.container === container);
            if (mode === 'generic' && timelineImages.length > 0 && index >= 0) {
                showImageViewer(timelineImages.map(item => item.entry.src), index);
                return;
            }
            const messageIds = Array.from(
                scope.querySelectorAll<HTMLElement>('.chat-message[data-db-id]')
            )
                .map((item) => Number(item.dataset.dbId))
                .filter((id) => Number.isInteger(id) && id > 0);

            if (timelineImages.length > 0 && index >= 0 && messageIds.length > 0) {
                showImageViewer(
                    buildMessageImageViewerItems(timelineImages.map((item) => item.entry)),
                    index,
                    'timeline',
                    {
                        beforeId: Math.min(...messageIds),
                        afterId: Math.max(...messageIds),
                    },
                );
            }
        };

        messageElement.addEventListener('click', handler);

        return () => {
            messageElement.removeEventListener('click', handler);
        };
    }, [contentKey, mode, scopeSelector]);
}
