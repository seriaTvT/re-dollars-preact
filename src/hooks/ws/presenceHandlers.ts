import { updateSignalMap } from '@/utils/signalMap';
import { PRESENCE_SYNC_DELAY, TYPING_AUTO_CLEAR } from '@/utils/constants';
import {
    onlineUsers,
    onlineCount,
    typingUsers,
    isChatOpen,
    messageIds,
    messageMap,
} from '@/stores/chat';
import { userInfo, blockedUsers } from '@/stores/user';
import { settings } from '@/stores/user';

let presenceSubscribed = new Set<string>();
let syncPresenceTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * 收集可见消息中的用户 ID（用于订阅在线状态）
 */
function collectUidsForPresence(): string[] {
    const ids = messageIds.peek();
    const recentIds = ids.slice(-150);
    const uids = new Set<string>();
    const map = messageMap.peek();

    for (const id of recentIds) {
        const msg = map.get(id);
        if (msg && msg.uid) {
            uids.add(String(msg.uid));
        }
    }

    return Array.from(uids);
}

/**
 * 同步在线状态订阅（带防抖）
 */
export function syncPresenceSubscriptions(send: (data: any) => void, isConnected: () => boolean) {
    if (syncPresenceTimer) {
        clearTimeout(syncPresenceTimer);
    }

    syncPresenceTimer = setTimeout(() => {
        syncPresenceTimer = null;

        if (!isConnected() || !isChatOpen.value) {
            if (presenceSubscribed.size > 0) {
                send({ type: 'presence_unsubscribe' });
                presenceSubscribed.clear();
            }
            return;
        }

        const want = new Set(collectUidsForPresence());
        const toAdd = [...want].filter(u => !presenceSubscribed.has(u));
        const toDel = [...presenceSubscribed].filter(u => !want.has(u));

        if (toDel.length) {
            send({ type: 'presence_unsubscribe', uids: toDel });
        }
        if (toAdd.length) {
            send({ type: 'presence_subscribe', uids: toAdd });
            send({ type: 'presence_query', uids: toAdd });
        }

        presenceSubscribed = want;
    }, PRESENCE_SYNC_DELAY);
}

/**
 * 重置在线状态（断开连接时调用）
 */
export function resetPresence() {
    onlineUsers.value = new Map();
    typingUsers.value = new Map();
    presenceSubscribed.clear();
}

/**
 * 处理在线人数更新
 */
export function handleOnlineCountUpdate(data: any) {
    onlineCount.value = data.count;
}

/**
 * 处理在线状态查询结果
 */
export function handlePresenceResult(data: any) {
    if (!Array.isArray(data.users)) return;
    const newOnlineUsers = new Map(onlineUsers.value);
    let changed = false;
    data.users.forEach(({ id, active }: { id: string; active: boolean }) => {
        const uid = String(id);
        if (active) {
            if (!newOnlineUsers.has(uid)) { newOnlineUsers.set(uid, true as any); changed = true; }
        } else {
            if (newOnlineUsers.has(uid)) { newOnlineUsers.delete(uid); changed = true; }
        }
    });
    if (changed) onlineUsers.value = newOnlineUsers;
}

/**
 * 处理在线状态更新
 */
export function handlePresenceUpdate(data: any) {
    const u = data.user;
    if (u && u.id != null) {
        const uid = String(u.id);
        updateSignalMap(onlineUsers, map => {
            u.active ? map.set(uid, true as any) : map.delete(uid);
        });
    }
}

/**
 * 处理输入状态开始
 */
export function handleTypingStart(data: any) {
    const typingUserId = String(data.user?.id);
    if (typingUserId === String(userInfo.value.id)) return;
    if (blockedUsers.value.has(typingUserId)) return;
    updateSignalMap(typingUsers, map => map.set(typingUserId, data.user.name || data.user.nickname));
    setTimeout(() => {
        if (typingUsers.value.has(typingUserId)) {
            updateSignalMap(typingUsers, map => map.delete(typingUserId));
        }
    }, TYPING_AUTO_CLEAR);
}

/**
 * 处理输入状态停止
 */
export function handleTypingStop(data: any) {
    updateSignalMap(typingUsers, map => map.delete(String(data.user?.id)));
}

/**
 * 发送输入状态
 */
export function sendTypingStart(send: (data: any) => void, isConnected: () => boolean) {
    if (isConnected() && settings.value.sharePresence) {
        send({ type: 'typing_start' });
    }
}

export function sendTypingStop(send: (data: any) => void, isConnected: () => boolean) {
    if (isConnected() && settings.value.sharePresence) {
        send({ type: 'typing_stop' });
    }
}
