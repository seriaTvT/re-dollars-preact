import { BACKEND_URL } from '../constants';
import { getAuthHeaders, userInfo } from '@/stores/user';
import type { Message } from '@/types';

// 统一的消息响应解析器
const parseMessages = (data: any): Message[] =>
    Array.isArray(data) ? data : data?.messages || data?.results || [];

/**
 * 获取最近消息
 */
export async function fetchRecentMessages(limit = 50): Promise<Message[]> {
    const res = await fetch(`${BACKEND_URL}/api/messages?limit=${limit}`);
    if (!res.ok) return [];
    return parseMessages(await res.json());
}

/**
 * 获取历史消息 (向上滚动)
 */
export async function fetchHistoryMessages(beforeId: number, limit = 30): Promise<Message[]> {
    const res = await fetch(`${BACKEND_URL}/api/messages?before_id=${beforeId}&limit=${limit}`);
    if (!res.ok) return [];
    return parseMessages(await res.json());
}

/**
 * 获取更新消息 (向下滚动)
 */
export async function fetchNewerMessages(afterId: number, limit = 30): Promise<Message[]> {
    const res = await fetch(`${BACKEND_URL}/api/messages?since_db_id=${afterId}&limit=${limit}`);
    if (!res.ok) return [];
    return parseMessages(await res.json());
}

/**
 * 获取消息上下文响应结构
 */
export interface MessageContextResponse {
    messages: Message[];
    target_id: number;
    target_index: number;
    has_more_before: boolean;
    has_more_after: boolean;
}

/**
 * 获取未读数量
 */
export async function getUnreadCount(sinceId: number, uid: number): Promise<{
    count: number;
    latest_id: number;
} | null> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/messages/unread-count?since_db_id=${sinceId}&uid=${uid}`);
        if (!res.ok) return null;
        const data = await res.json();
        return {
            count: data.count || 0,
            latest_id: data.latest_id || 0
        };
    } catch (e) {
        return null;
    }
}

/**
 * 获取消息上下文
 */
export async function fetchMessageContext(messageId: number, before = 30, after = 30): Promise<MessageContextResponse | null> {
    const res = await fetch(`${BACKEND_URL}/api/messages/context/${messageId}?before=${before}&after=${after}&extended=1`);
    if (!res.ok) return null;

    const data = await res.json();

    return {
        messages: parseMessages(data.messages || data),
        target_id: data.target_id ?? messageId,
        target_index: data.target_index ?? 0,
        has_more_before: data.has_more_before ?? true,
        has_more_after: data.has_more_after ?? true
    };
}

/**
 * 发送消息
 */
export async function sendMessage(content: string): Promise<{ status: boolean; message?: Message; error?: string }> {
    try {
        const formhash = userInfo.value.formhash;

        const params = new URLSearchParams();
        params.append('message', content);
        params.append('formhash', formhash);

        // 使用 Bangumi 原生接口发送消息
        const res = await fetch('/dollars?ajax=1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: params,
        });

        if (res.ok) {
            return { status: true };
        } else {
            return { status: false, error: 'Network response was not ok' };
        }
    } catch (e) {
        return { status: false, error: String(e) };
    }
}

/**
 * 获取指定日期的第一条消息 ID
 */
export async function getFirstMessageIdByDate(date: string): Promise<number | null> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/messages/by-date?date=${date}&first_id_only=true`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.status ? data.id : null;
    } catch (e) {
        return null;
    }
}

/**
 * 编辑消息
 */
export async function editMessage(messageId: number, content: string): Promise<{ status: boolean; error?: string }> {
    const res = await fetch(`${BACKEND_URL}/api/messages/${messageId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        credentials: 'include',
        body: JSON.stringify({ content }),
    });

    if (!res.ok) return { status: false, error: `HTTP ${res.status}` };
    return res.json();
}

/**
 * 删除消息
 */
export async function deleteMessage(messageId: number): Promise<{ status: boolean; error?: string }> {
    const res = await fetch(`${BACKEND_URL}/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
    });

    if (!res.ok) return { status: false, error: `HTTP ${res.status}` };
    return res.json();
}

/**
 * 切换表情反应
 */
export async function toggleReaction(messageId: number, emoji: string): Promise<{ status: boolean; action?: 'add' | 'remove' }> {
    const res = await fetch(`${BACKEND_URL}/api/messages/${messageId}/reactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        credentials: 'include',
        body: JSON.stringify({
            emoji,
            user_id: userInfo.value.id,
            nickname: userInfo.value.nickname,
        }),
    });

    if (!res.ok) return { status: false };
    return res.json();
}


/**
 * 搜索消息
 */
export async function searchMessages(query: string, offset = 0, limit = 20): Promise<{
    messages: Message[];
    hasMore: boolean;
}> {
    const res = await fetch(
        `${BACKEND_URL}/api/search?q=${encodeURIComponent(query)}&offset=${offset}&limit=${limit}`
    );
    const data = await res.json();

    if (data.status) {
        return {
            messages: data.results || [],
            hasMore: data.hasMore || false,
        };
    }

    return { messages: [], hasMore: false };
}

/**
 * 获取通知
 */
export async function fetchNotifications(uid: string): Promise<any[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/notifications?uid=${uid}`);
        const data = await res.json();

        if (data.status && data.notifications) {
            return data.notifications;
        }
    } catch (e) {
        // ignore
    }

    return [];
}

/**
 * 标记通知已读
 */
export async function markNotificationRead(notifId: number, uid: string): Promise<void> {
    await fetch(`${BACKEND_URL}/api/notifications/${notifId}/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid }),
    });
}

/**
 * 标记所有通知已读
 */
export async function markAllNotificationsRead(uid: string): Promise<void> {
    await fetch(`${BACKEND_URL}/api/notifications/read-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid }),
    });
}
