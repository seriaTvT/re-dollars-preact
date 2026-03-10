import { signal, computed } from '@preact/signals';
import { BACKEND_URL } from '@/utils/constants';
import { getAuthHeaders } from './user';
import { messageIds, historyNewestId } from './chat';

export const lastReadId = signal<number | null>(null);
export const pendingReadId = signal<number | null>(null);
export const isReadStateSyncing = signal<boolean>(false);

export const hasUnreadMessages = computed(() => {
    const readId = lastReadId.value;
    if (!readId) return false;
    const newestId = historyNewestId.value;
    return newestId !== null && newestId > readId;
});

export const unreadCount = computed(() => {
    const readId = lastReadId.value;
    if (!readId) return 0;
    const ids = messageIds.value;
    return ids.filter(id => id > readId).length;
});

function getReadStateUserId(): number | null {
    const uid = (window as any).CHOBITS_UID;
    return uid ? Number(uid) : null;
}

/**
 * 从后端加载已读状态
 */
export async function loadReadState(): Promise<number | null> {
    try {
        const userId = getReadStateUserId();
        if (!userId) {
            console.warn('Cannot load read state: user not logged in');
            return null;
        }

        isReadStateSyncing.value = true;
        const response = await fetch(`${BACKEND_URL}/api/messages/read?user_id=${userId}`, {
            headers: getAuthHeaders(),
            credentials: 'include',
        });

        if (!response.ok) return null;

        const data = await response.json();
        if (data.status && typeof data.last_read_id === 'number') {
            const remoteId = data.last_read_id;
            const localId = lastReadId.value || 0;
            const effectiveId = Math.max(remoteId, localId);
            lastReadId.value = effectiveId;

            if (localId > remoteId) {
                syncReadStateToBackend(localId);
            }

            return effectiveId;
        }
        return null;
    } catch (e) {
        console.error('Failed to load read state:', e);
        return null;
    } finally {
        isReadStateSyncing.value = false;
    }
}

/**
 * 更新已读状态 (只增不减)
 */
export function updateReadState(messageId: number): void {
    const current = lastReadId.value;
    if (current !== null && messageId <= current) return;

    lastReadId.value = messageId;
    pendingReadId.value = messageId;
    debouncedSyncToBackend();
}

/**
 * 防抖同步到后端 (500ms)
 */
let syncTimer: number | null = null;
function debouncedSyncToBackend(): void {
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = window.setTimeout(() => {
        const pending = pendingReadId.value;
        if (pending !== null) {
            syncReadStateToBackend(pending);
            pendingReadId.value = null;
        }
    }, 500);
}

/**
 * 同步已读状态到后端
 */
async function syncReadStateToBackend(messageId: number): Promise<void> {
    try {
        const userId = getReadStateUserId();
        if (!userId) {
            console.warn('Cannot sync read state: user not logged in');
            return;
        }

        const response = await fetch(`${BACKEND_URL}/api/messages/read`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
            credentials: 'include',
            body: JSON.stringify({ user_id: userId, last_read_id: messageId }),
        });

        if (!response.ok) {
            pendingReadId.value = messageId;
            return;
        }

        const data = await response.json();
        if (data.status && typeof data.effective_last_read_id === 'number') {
            const effective = data.effective_last_read_id;
            if (effective > (lastReadId.value || 0)) {
                lastReadId.value = effective;
            }
        }
    } catch (e) {
        console.error('Failed to sync read state:', e);
        pendingReadId.value = messageId;
    }
}

/**
 * 处理自己发送的消息
 */
export function markSentMessageAsRead(messageId: number): void {
    updateReadState(messageId);
}

/**
 * 获取第一条未读消息 ID
 */
export function getFirstUnreadId(): number | null {
    const readId = lastReadId.value;
    if (!readId) return null;

    const ids = messageIds.peek();
    for (const id of ids) {
        if (id > readId) return id;
    }
    return null;
}
