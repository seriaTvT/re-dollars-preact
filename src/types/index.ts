// Re-export shared types
export type {
    MessageBase,
    Reaction,
    NotificationBase,
    ImageMeta,
    LinkPreview,
    ReplyDetails,
} from '../../../shared/types';

import type {
    MessageBase,
    NotificationBase,
    Reaction,
    ImageMeta,
    LinkPreview,
    ReplyDetails,
} from '../../../shared/types';

// 会话类型
export interface Conversation {
    id: string;
    type: 'channel' | 'pm';
    title: string;
    avatar: string;
    user?: { nickname: string; avatar: string };
    lastMessage: { text: string; timestamp: number };
    unreadCount: number;
}

// 消息类型 (extends shared MessageBase with frontend-specific fields)
export interface Message extends MessageBase {
    id: number;
    bangumi_id?: number;
    reply_to_id?: number;
    reply_details?: ReplyDetails;
    reactions?: Reaction[];
    image_meta?: Record<string, ImageMeta>;
    link_previews?: Record<string, LinkPreview>;
    is_deleted?: boolean;
    edited_at?: number;
    /** Used for stable DOM key during optimistic message replacement */
    stableKey?: string;
    /** Message sending state for optimistic updates */
    state?: 'sending' | 'sent' | 'failed';
}

// 用户资料（ProfileCard / UserProfilePanel 共用）
export interface UserProfile {
    id: number;
    nickname: string;
    username: string;
    avatar: string;
    sign?: string;
    url: string;
    lastActive?: number;
    stats?: {
        message_count: number;
        average_messages_per_day: number;
        first_message_time: string;
        last_message_time: string;
    };
}

// 用户类型
export interface UserInfo {
    id: string;
    name: string;
    nickname: string;
    avatar: string;
    formhash: string;
}

export interface ImageViewerItem {
    src: string;
    messageId?: number;
    nickname?: string;
    avatar?: string;
    timestamp?: number;
}

// 设置类型
export interface Settings {
    showCard: boolean;
    linkPreview: boolean;
    sendShortcut: 'Enter' | 'CtrlEnter';
    sharePresence: boolean;
    notificationType: 'off' | 'detail' | 'simple';
    loadImages: boolean;
    rememberOpenState: boolean;

    backgroundMode: 'tint' | 'transparent' | 'lines';
    glassBlur: boolean;
}

// 通知类型 (extends shared NotificationBase with frontend-specific fields)
export interface Notification extends NotificationBase {
    message?: Message;
    content?: string;
    nickname?: string;
    avatar?: string;
}

// WebSocket 消息类型
export type WSMessage =
    | { type: 'message'; data: Message }
    | { type: 'reaction'; data: { message_id: number; emoji: string; user_id: number; nickname: string; action: 'add' | 'remove' } }
    | { type: 'typing_start'; user_id: number; nickname: string }
    | { type: 'typing_stop'; user_id: number }
    | { type: 'presence'; users: Array<{ id: string; name: string; avatar: string }> }
    | { type: 'delete'; message_id: number }
    | { type: 'edit'; data: Message }
    | { type: 'online_count'; count: number }
    | { type: 'notification'; data: Notification };
