/**
 * Client for the `/v2/me/*` endpoints (notifications, favorites, read-state).
 * These are auth-gated — the user id comes from the Bearer token, not a param,
 * so the v2 signatures drop the `uid`/`user_id` arguments the legacy ones took.
 */
import { V2_API_BASE } from './config';
import { getAuthHeaders } from '@/stores/user';
import { adaptNotification } from './adapt';
import type { V2Notification } from './adapt';
import type { Notification } from '@/types';

const jsonAuthHeaders = (): Record<string, string> => ({
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
});

// ── Notifications ───────────────────────────────────────────────────────────

export async function fetchNotifications(): Promise<Notification[]> {
    try {
        const res = await fetch(`${V2_API_BASE}/me/notifications`, {
            headers: getAuthHeaders(),
            credentials: 'include',
        });
        if (!res.ok) return [];
        return ((await res.json()) as V2Notification[]).map(adaptNotification);
    } catch {
        return [];
    }
}

export async function markNotificationRead(notifId: number): Promise<void> {
    await fetch(`${V2_API_BASE}/me/notifications/${notifId}`, {
        method: 'PATCH',
        headers: jsonAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ read: true }),
    });
}

export async function markAllNotificationsRead(): Promise<void> {
    await fetch(`${V2_API_BASE}/me/notifications:markAllRead`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
    });
}

// ── Favorites ───────────────────────────────────────────────────────────────

export async function fetchFavorites(): Promise<string[]> {
    try {
        const res = await fetch(`${V2_API_BASE}/me/favorites`, {
            headers: getAuthHeaders(),
            credentials: 'include',
        });
        if (!res.ok) return [];
        return (await res.json()) as string[];
    } catch {
        return [];
    }
}

export async function addFavorite(imageUrl: string): Promise<void> {
    await fetch(`${V2_API_BASE}/me/favorites`, {
        method: 'POST',
        headers: jsonAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ imageUrl }),
    });
}

export async function removeFavorite(imageUrl: string): Promise<void> {
    await fetch(`${V2_API_BASE}/me/favorites/${encodeURIComponent(imageUrl)}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
    });
}

export async function syncFavorites(imageUrls: string[]): Promise<void> {
    await fetch(`${V2_API_BASE}/me/favorites:sync`, {
        method: 'POST',
        headers: jsonAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ imageUrls }),
    });
}

// ── Read state ──────────────────────────────────────────────────────────────

export async function fetchReadState(): Promise<number> {
    try {
        const res = await fetch(`${V2_API_BASE}/me/read-state?channelId=global`, {
            headers: getAuthHeaders(),
            credentials: 'include',
        });
        if (!res.ok) return 0;
        const body = (await res.json()) as { lastReadId: number };
        return body.lastReadId ?? 0;
    } catch {
        return 0;
    }
}

export async function updateReadState(lastReadId: number): Promise<number> {
    const res = await fetch(`${V2_API_BASE}/me/read-state`, {
        method: 'PUT',
        headers: jsonAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ channelId: 'global', lastReadId }),
    });
    if (!res.ok) return lastReadId;
    const body = (await res.json()) as { effectiveLastReadId: number };
    return body.effectiveLastReadId ?? lastReadId;
}
