import { signal } from '@preact/signals';
import type { ImageMeta } from '@/types';

// 回复/编辑
export const replyingTo = signal<{
    id: string;
    uid: string;
    user: string;
    text: string;
    raw: string;
    avatar: string;
} | null>(null);

export const editingMessage = signal<{
    id: string;
    raw: string;
    hiddenQuote?: string;
    image_meta?: Record<string, ImageMeta>;
} | null>(null);

export const pendingMention = signal<{ uid: string; nickname: string } | null>(null);

/**
 * 设置回复
 */
export function setReplyTo(data: typeof replyingTo.value) {
    replyingTo.value = data;
    editingMessage.value = null;
}

/**
 * 设置编辑
 */
export function setEditingMessage(data: typeof editingMessage.value) {
    editingMessage.value = data;
    replyingTo.value = null;
}

/**
 * 取消回复/编辑
 */
export function cancelReplyOrEdit() {
    replyingTo.value = null;
    editingMessage.value = null;
}
