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

export function useMessageImageViewer(messageRef: RefObject<HTMLDivElement>, content: string) {
    useEffect(() => {
        const messageElement = messageRef.current;
        if (!messageElement) return;

        const containers = Array.from(
            messageElement.querySelectorAll<HTMLElement>('.image-container')
        );
        const handlers: Array<{ container: HTMLElement; handler: (event: Event) => void }> = [];

        for (const container of containers) {
            const handler = (event: Event) => {
                event.preventDefault();
                event.stopPropagation();

                const list = messageElement.closest('.chat-list');
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

            container.addEventListener('click', handler);
            container.style.cursor = 'zoom-in';
            handlers.push({ container, handler });
        }

        return () => {
            for (const { container, handler } of handlers) {
                container.removeEventListener('click', handler);
                container.style.removeProperty('cursor');
            }
        };
    }, [content]);
}
