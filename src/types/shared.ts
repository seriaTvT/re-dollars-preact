/**
 * Shared type definitions used by the standalone frontend repository.
 *
 * Keep these in sync with the backend/shared contract when the API changes.
 */

export interface MessageBase {
    id?: number;
    uid: number;
    nickname: string;
    avatar: string;
    message: string;
    timestamp: number;
    color?: string;
    reply_to_id?: number | string | null;
}

export interface Reaction {
    emoji: string;
    user_id: number;
    nickname: string;
    avatar?: string;
}

export interface NotificationBase {
    id: number;
    type: 'reply' | 'mention';
    message_id: number;
}

export interface ImageMeta {
    width: number;
    height: number;
}

export interface LinkPreview {
    title: string;
    description?: string;
    image?: string;
    url: string;
}

export interface ReplyDetails {
    uid: number;
    nickname: string;
    avatar: string;
    content: string;
    firstImage?: string;
    firstImageMasked?: boolean;
}
