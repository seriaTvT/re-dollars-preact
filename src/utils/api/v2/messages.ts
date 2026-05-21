import { V2_API_BASE } from './config';
import { getAuthHeaders, userInfo } from '@/stores/user';
import { adaptMessage } from './adapt';
import type { V2Message } from './adapt';
import type { Message } from '@/types';
import type { MessageContextResponse } from '../messages';

/** Re-exported unchanged — sending posts to Bangumi's native endpoint, not the backend. */
export { sendMessage } from '../messages';

export async function fetchRecentMessages(limit = 50): Promise<Message[]> {
    const res = await fetch(`${V2_API_BASE}/messages?limit=${limit}`);
    if (!res.ok) return [];
    return ((await res.json()) as V2Message[]).map(adaptMessage);
}

export async function fetchHistoryMessages(beforeId: number, limit = 30): Promise<Message[]> {
    const res = await fetch(`${V2_API_BASE}/messages?before=${beforeId}&limit=${limit}`);
    if (!res.ok) return [];
    return ((await res.json()) as V2Message[]).map(adaptMessage);
}

export async function fetchNewerMessages(afterId: number, limit = 30): Promise<Message[]> {
    const res = await fetch(`${V2_API_BASE}/messages?after=${afterId}&limit=${limit}`);
    if (!res.ok) return [];
    return ((await res.json()) as V2Message[]).map(adaptMessage);
}

export async function getUnreadCount(
    sinceId: number,
    uid: number,
): Promise<{ count: number; latest_id: number } | null> {
    try {
        const res = await fetch(`${V2_API_BASE}/messages/unread-count?sinceId=${sinceId}&uid=${uid}`);
        if (!res.ok) return null;
        const data = (await res.json()) as { count: number; latestId: number };
        return { count: data.count ?? 0, latest_id: data.latestId ?? 0 };
    } catch {
        return null;
    }
}

export async function fetchMessageContext(
    messageId: number,
    before = 30,
    after = 30,
): Promise<MessageContextResponse | null> {
    const res = await fetch(
        `${V2_API_BASE}/messages/${messageId}?context=true&before=${before}&after=${after}`,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
        messages: V2Message[];
        targetIndex: number;
        hasMoreBefore: boolean;
        hasMoreAfter: boolean;
    };
    return {
        messages: data.messages.map(adaptMessage),
        target_id: messageId,
        target_index: data.targetIndex,
        has_more_before: data.hasMoreBefore,
        has_more_after: data.hasMoreAfter,
    };
}

export async function getFirstMessageIdByDate(date: string): Promise<number | null> {
    try {
        const res = await fetch(`${V2_API_BASE}/messages/by-date?date=${date}`);
        if (!res.ok) return null;
        const data = (await res.json()) as { firstId: number | null };
        return data.firstId ?? null;
    } catch {
        return null;
    }
}

export async function editMessage(
    messageId: number,
    content: string,
): Promise<{ status: boolean; error?: string }> {
    const res = await fetch(`${V2_API_BASE}/messages/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        credentials: 'include',
        body: JSON.stringify({ content, uid: Number(userInfo.value.id) }),
    });
    if (!res.ok) return { status: false, error: `HTTP ${res.status}` };
    return { status: true };
}

export async function deleteMessage(messageId: number): Promise<{ status: boolean; error?: string }> {
    const res = await fetch(`${V2_API_BASE}/messages/${messageId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        credentials: 'include',
        body: JSON.stringify({ uid: Number(userInfo.value.id) }),
    });
    if (!res.ok) return { status: false, error: `HTTP ${res.status}` };
    return { status: true };
}

export async function toggleReaction(
    messageId: number,
    emoji: string,
): Promise<{ status: boolean; action?: 'add' | 'remove' }> {
    const res = await fetch(`${V2_API_BASE}/messages/${messageId}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        credentials: 'include',
        body: JSON.stringify({
            userId: Number(userInfo.value.id),
            nickname: userInfo.value.nickname,
            emoji,
        }),
    });
    if (!res.ok) return { status: false };
    const data = (await res.json()) as { status?: boolean; action?: 'add' | 'remove' };
    return { status: data.status ?? true, action: data.action };
}

export async function searchMessages(
    query: string,
    offset = 0,
    limit = 20,
): Promise<{ messages: Message[]; hasMore: boolean }> {
    const res = await fetch(
        `${V2_API_BASE}/search?q=${encodeURIComponent(query)}&offset=${offset}&limit=${limit}`,
    );
    if (!res.ok) return { messages: [], hasMore: false };
    const data = (await res.json()) as { results: V2Message[]; hasMore: boolean };
    return { messages: (data.results ?? []).map(adaptMessage), hasMore: data.hasMore ?? false };
}
