import { signal } from '@preact/signals';
import { BACKEND_URL } from '@/utils/constants';
import { userInfo } from './user';
import { getChiiApp } from '@/utils/globals';

const FAVORITES_KEY = 'dollars_saved_favorites';

export const favorites = signal<string[]>([]);

export function initFavorites() {
    // Load from cloud
    try {
        const cloud = getChiiApp().cloud_settings.getAll();
        if (cloud[FAVORITES_KEY]) {
            const parsed = JSON.parse(cloud[FAVORITES_KEY]);
            if (Array.isArray(parsed)) {
                favorites.value = parsed;
            }
        }
    } catch (e) {
        favorites.value = [];
    }

    // Sync from backend
    if (userInfo.value.id) {
        syncFavorites();
    }
}

async function syncFavorites() {
    if (!userInfo.value.id) return;
    try {
        const res = await fetch(`${BACKEND_URL}/api/favorites?uid=${userInfo.value.id}`);
        if (!res.ok) return;
        const { data } = await res.json();
        if (Array.isArray(data) && data.length > 0) {
            const current = favorites.peek();
            const merged = [...new Set([...data, ...current])];
            // If we have more items after merge, update
            if (merged.length !== current.length || merged.some(u => !current.includes(u))) {
                favorites.value = merged;
                saveToCloud(merged);
            }
        }
    } catch (e) {
        // ignore
    }
}

export function addFavorite(url: string) {
    const list = favorites.peek();
    if (!list.includes(url)) {
        const newList = [url, ...list];
        favorites.value = newList;
        saveToCloud(newList);

        // Granular backend sync
        if (userInfo.value.id) {
            fetch(`${BACKEND_URL}/api/favorites/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userInfo.value.id, image_url: url })
            }).catch(() => {});
        }
    }
}

export function removeFavorite(url: string) {
    const list = favorites.peek();
    const newList = list.filter(u => u !== url);
    favorites.value = newList;
    saveToCloud(newList);

    // Granular backend sync
    if (userInfo.value.id) {
        fetch(`${BACKEND_URL}/api/favorites/remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userInfo.value.id, image_url: url })
        }).catch(() => {});
    }
}

function saveToCloud(list: string[]) {
    const cloud = getChiiApp().cloud_settings;
    cloud.update({ [FAVORITES_KEY]: JSON.stringify(list) });
    cloud.save();
}
