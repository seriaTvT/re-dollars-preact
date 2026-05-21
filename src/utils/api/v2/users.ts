import { V2_API_BASE } from './config';
import { adaptUser } from './adapt';
import type { V2UserProfile } from './adapt';
import type { UserProfile } from '@/types';

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
    try {
        const res = await fetch(`${V2_API_BASE}/users/${encodeURIComponent(userId)}`);
        if (!res.ok) return null;
        const body = (await res.json()) as { source: string; stale: boolean; data: V2UserProfile | null };
        return body.data ? adaptUser(body.data) : null;
    } catch {
        return null;
    }
}

export async function lookupUsersByName(
    usernames: string[],
): Promise<Record<string, { id: number; nickname: string }>> {
    try {
        const res = await fetch(`${V2_API_BASE}/users:lookupByName`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernames }),
        });
        if (!res.ok) return {};
        const body = (await res.json()) as Record<string, { id: number; nickname: string } | null>;
        const out: Record<string, { id: number; nickname: string }> = {};
        for (const [name, hit] of Object.entries(body)) {
            if (hit) out[name] = hit;
        }
        return out;
    } catch {
        return {};
    }
}
