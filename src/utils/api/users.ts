import { BACKEND_URL } from '../constants';

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
        const res = await fetch(`${BACKEND_URL}/api/users/${userId}`);
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

/**
 * 批量查询用户 UID
 */
export async function lookupUsersByName(usernames: string[]): Promise<Record<string, { id: number; nickname: string }>> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/users/lookup-by-name`, {
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
