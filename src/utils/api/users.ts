import { apiUrl } from './url';

export interface MentionSearchUser {
    id: number;
    uid?: number;
    username: string;
    nickname: string;
    avatar_url?: string;
    sign?: string;
}

export function mentionSearchUrl(query: string, limit: number): string {
    return apiUrl('/users/search', { q: query, exact: true, limit });
}

export async function searchMentionUsers(query: string, limit: number): Promise<MentionSearchUser[]> {
    try {
        const res = await fetch(mentionSearchUrl(query, limit));
        if (!res.ok) return [];

        const json = await res.json();
        return Array.isArray(json.data) ? json.data : [];
    } catch (e) {
        return [];
    }
}

/**
 * 获取用户资料
 */
export async function fetchUserProfile(userId: string): Promise<{
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
} | null> {
    try {
        const res = await fetch(apiUrl(`/users/${userId}`));
        const data = await res.json();

        if (data.status && data.data) {
            const d = data.data;
            return {
                id: d.id,
                nickname: d.nickname,
                username: d.username,
                avatar: d.avatar?.large || d.avatar?.medium || d.avatar?.small || '',
                sign: d.sign,
                url: d.url,
                lastActive: d.stats?.last_message_time ? Math.floor(Date.parse(d.stats.last_message_time) / 1000) : undefined,
                stats: d.stats
            };
        }
    } catch (e) {
        // ignore
    }
    return null;
}

export async function fetchBangumiUserProfile(username: string): Promise<{
    id: number;
    nickname: string;
    username: string;
    avatar: string;
    sign?: string;
    url: string;
    source: 'bangumi';
} | null> {
    try {
        const res = await fetch(`https://api.bgm.tv/v0/users/${encodeURIComponent(username)}`);
        if (!res.ok) return null;
        const data = await res.json();

        if (data?.id && data?.username) {
            return {
                id: data.id,
                nickname: data.nickname || data.username,
                username: data.username,
                avatar: data.avatar?.large || data.avatar?.medium || data.avatar?.small || '',
                sign: data.sign || undefined,
                url: data.url || `https://bgm.tv/user/${data.username}`,
                source: 'bangumi',
            };
        }
    } catch (e) {
        // ignore
    }
    return null;
}

/**
 * 批量查询用户 UID
 */
export async function lookupUsersByName(usernames: string[]): Promise<Record<string, { id: number; nickname: string }>> {
    try {
        const res = await fetch(apiUrl('/users/lookup-by-name'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernames }),
        });
        if (!res.ok) return {};
        const data = await res.json();
        return data.data || {};
    } catch (e) {
        return {};
    }
}
