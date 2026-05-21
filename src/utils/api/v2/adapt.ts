/**
 * Adapter layer: converts the new backend's clean `/v2` shapes (camelCase,
 * no `{status}` envelope) into the frontend's existing internal types
 * (snake_case). Keeping this in one place means components and stores stay
 * unchanged — only the API client below the adapter switches to `/v2`.
 */
import type { Message, Notification, UserProfile } from '@/types';
import type { Reaction, ReplyDetails, ImageMeta, LinkPreview } from '@/types';

// ── /v2 wire shapes ─────────────────────────────────────────────────────────

export interface V2Reaction {
    id: number;
    messageId: number;
    userId: number;
    nickname: string;
    avatar: string | null;
    emoji: string;
    createdAt: string | null;
}

export interface V2ReplyDetails {
    uid: number;
    nickname: string;
    content: string;
    avatar: string | null;
    firstImage?: string;
}

export interface V2Message {
    id: number;
    bangumiId: string;
    timestamp: number;
    uid: number;
    nickname: string;
    avatar: string | null;
    message: string | null;
    color: string | null;
    isHtml: boolean | null;
    type: string;
    replyToId: number | null;
    isDeleted: boolean | null;
    editedAt: string | null;
    reactions: V2Reaction[];
    imageMeta?: Record<string, { width: number; height: number; placeholder: string | null }>;
    linkPreviews?: Record<string, { title: string; description: string | null; image: string | null; url: string }>;
    replyDetails?: V2ReplyDetails | null;
}

export interface V2UserProfile {
    id: number;
    username: string | null;
    nickname: string | null;
    avatar: string | null;
    sign: string | null;
}

export interface V2Notification {
    id: number;
    type: 'reply' | 'mention';
    timestamp: number | null;
    message: {
        id: number;
        uid: number;
        nickname: string;
        avatar: string | null;
        content: string | null;
    };
}

// ── Adapters ────────────────────────────────────────────────────────────────

export function adaptReaction(r: V2Reaction): Reaction {
    return {
        emoji: r.emoji,
        user_id: r.userId,
        nickname: r.nickname,
        avatar: r.avatar ?? undefined,
    };
}

export function adaptReplyDetails(r: V2ReplyDetails): ReplyDetails {
    return {
        uid: r.uid,
        nickname: r.nickname,
        avatar: r.avatar ?? '',
        content: r.content,
    };
}

function adaptImageMeta(meta: NonNullable<V2Message['imageMeta']>): Record<string, ImageMeta> {
    const out: Record<string, ImageMeta> = {};
    for (const [url, m] of Object.entries(meta)) {
        out[url] = { width: m.width, height: m.height };
    }
    return out;
}

function adaptLinkPreviews(previews: NonNullable<V2Message['linkPreviews']>): Record<string, LinkPreview> {
    const out: Record<string, LinkPreview> = {};
    for (const [url, p] of Object.entries(previews)) {
        out[url] = {
            title: p.title,
            description: p.description ?? undefined,
            image: p.image ?? undefined,
            url: p.url,
        };
    }
    return out;
}

export function adaptMessage(m: V2Message): Message {
    return {
        id: m.id,
        uid: m.uid,
        nickname: m.nickname,
        avatar: m.avatar ?? '',
        message: m.message ?? '',
        timestamp: m.timestamp,
        color: m.color ?? undefined,
        bangumi_id: Number(m.bangumiId),
        reply_to_id: m.replyToId ?? undefined,
        reply_details: m.replyDetails ? adaptReplyDetails(m.replyDetails) : undefined,
        reactions: m.reactions.map(adaptReaction),
        image_meta: m.imageMeta ? adaptImageMeta(m.imageMeta) : undefined,
        link_previews: m.linkPreviews ? adaptLinkPreviews(m.linkPreviews) : undefined,
        is_deleted: m.isDeleted ?? undefined,
        edited_at: m.editedAt ? Math.floor(Date.parse(m.editedAt) / 1000) : undefined,
    };
}

/**
 * Note: the `/v2` user endpoint does not carry `stats` or `lastActive` — the
 * profile card's activity stats degrade until a backend endpoint provides them.
 */
export function adaptUser(data: V2UserProfile): UserProfile {
    return {
        id: data.id,
        nickname: data.nickname ?? '',
        username: data.username ?? '',
        avatar: data.avatar ?? '',
        sign: data.sign ?? undefined,
        url: `https://bgm.tv/user/${data.username ?? data.id}`,
    };
}

export function adaptNotification(n: V2Notification): Notification {
    return {
        id: n.id,
        type: n.type,
        message_id: n.message.id,
        nickname: n.message.nickname,
        avatar: n.message.avatar ?? undefined,
        content: n.message.content ?? undefined,
    };
}
