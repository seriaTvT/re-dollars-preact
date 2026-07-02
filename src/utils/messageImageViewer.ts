import type { ImageViewerItem, Message } from '@/types';

export interface MessageImageEntry {
    src: string;
    message?: Pick<Message, 'id' | 'nickname' | 'avatar' | 'timestamp'>;
}

export function buildMessageImageViewerItems(entries: MessageImageEntry[]): ImageViewerItem[] {
    return entries.map(({ src, message }) => ({
        src,
        messageId: message?.id,
        nickname: message?.nickname,
        avatar: message?.avatar,
        timestamp: message?.timestamp,
    }));
}

export function mergeTimelineImagePage(
    currentItems: ImageViewerItem[],
    pageItems: ImageViewerItem[],
    direction: 'before' | 'after',
): { items: ImageViewerItem[]; index: number } {
    return direction === 'before'
        ? { items: [...pageItems, ...currentItems], index: pageItems.length - 1 }
        : { items: [...currentItems, ...pageItems], index: currentItems.length };
}
