import { V2_API_BASE } from './config';

export interface GalleryItem {
    url: string;
    thumbnailUrl: string;
    type: 'image' | 'video';
    message_id: number;
    timestamp: number;
    uid: number;
    nickname: string;
    avatar: string;
}

interface V2GalleryItem {
    url: string;
    thumbnailUrl: string;
    type: 'image' | 'video';
    messageId: number;
    timestamp: number;
    uid: number;
    nickname: string;
    avatar: string | null;
}

export async function fetchGalleryMedia(
    offset = 0,
    limit = 50,
    uid?: number,
): Promise<{ items: GalleryItem[]; hasMore: boolean; total: number }> {
    let url = `${V2_API_BASE}/gallery?offset=${offset}&limit=${limit}`;
    if (uid) url += `&uid=${uid}`;
    try {
        const res = await fetch(url);
        if (!res.ok) return { items: [], hasMore: false, total: 0 };
        const body = (await res.json()) as { items: V2GalleryItem[]; hasMore: boolean; total: number };
        return {
            items: body.items.map((it) => ({
                url: it.url,
                thumbnailUrl: it.thumbnailUrl,
                type: it.type,
                message_id: it.messageId,
                timestamp: it.timestamp,
                uid: it.uid,
                nickname: it.nickname,
                avatar: it.avatar ?? '',
            })),
            hasMore: body.hasMore,
            total: body.total,
        };
    } catch {
        return { items: [], hasMore: false, total: 0 };
    }
}
