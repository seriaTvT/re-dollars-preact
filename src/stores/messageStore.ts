import { batch, computed, signal } from '@preact/signals';
import type { Message } from '@/types';
import { blockedUsers } from '@/stores/user';
import { fetchMessageContext } from '@/utils/api/messages';
import { MESSAGE_GROUP_TIME_GAP } from '@/utils/constants';
import { updateSignalMap, updateSignalSet } from '@/utils/signalMap';
import {
    historyFullyLoaded,
    historyNewestId,
    historyOldestId,
    isLoadingHistory,
    manualScrollToBottom,
    newMessageIds,
    pendingScrollToBottom,
    timelineIsLive,
} from './chatState';

function getCurrentUserId(): string {
    return String((window as any).CHOBITS_UID || '');
}

// 消息存储
export const messageMap = signal<Map<number, Message>>(new Map());

/**
 * 获取消息原始内容 (替代已移除的 messageStore)
 */
export function getRawMessage(id: number | string): string | undefined {
    return messageMap.value.get(Number(id))?.message;
}

export const messageIds = computed<number[]>(() => {
    const map = messageMap.value;
    return Array.from(map.keys()).sort((a, b) => {
        const msgA = map.get(a)!;
        const msgB = map.get(b)!;
        if (msgA.timestamp !== msgB.timestamp) return msgA.timestamp - msgB.timestamp;
        // Bot messages (uid=0) should come after user messages when timestamps are equal
        if (msgA.uid === 0 && msgB.uid !== 0) return 1;
        if (msgA.uid !== 0 && msgB.uid === 0) return -1;

        // Optimistic messages (negative ID) should come after confirmed messages (positive ID)
        if (a < 0 && b > 0) return 1;
        if (a > 0 && b < 0) return -1;

        // If both are optimistic (negative), more negative means newer (nextOptimisticId--)
        if (a < 0 && b < 0) return b - a;

        return a - b;
    });
});

// 待确认消息的超时定时器 (tempId -> timeoutId)
const pendingTimeouts = new Map<number, ReturnType<typeof setTimeout>>();
const PENDING_TIMEOUT_MS = 10000; // 10秒超时
let nextOptimisticId = -1;

// ============================================================================
// Message Grouping
// ============================================================================

export function getMessageGrouping(msgId: number): { isSelf: boolean; isGrouped: boolean; isGroupedWithNext: boolean } {
    const map = messageMap.peek();
    const ids = messageIds.peek();
    const userId = getCurrentUserId();

    const msg = map.get(msgId);
    if (!msg) {
        return { isSelf: false, isGrouped: false, isGroupedWithNext: false };
    }

    const index = ids.indexOf(msgId);
    const prevId = index > 0 ? ids[index - 1] : null;
    const nextId = index < ids.length - 1 ? ids[index + 1] : null;

    const prevMsg = prevId ? map.get(prevId) : null;
    const nextMsg = nextId ? map.get(nextId) : null;

    const isSameUserAsPrev =
        prevMsg &&
        String(prevMsg.uid) === String(msg.uid) &&
        msg.timestamp - prevMsg.timestamp < MESSAGE_GROUP_TIME_GAP;

    const isSameUserAsNext =
        nextMsg &&
        String(nextMsg.uid) === String(msg.uid) &&
        nextMsg.timestamp - msg.timestamp < MESSAGE_GROUP_TIME_GAP;

    return {
        isSelf: String(msg.uid) === String(userId),
        isGrouped: !!isSameUserAsPrev,
        isGroupedWithNext: !!isSameUserAsNext,
    };
}

// ============================================================================
// 消息操作函数
// ============================================================================

function normalizePendingContent(content: string) {
    return content.replace(/\s+/g, ' ').trim();
}

/**
 * 添加单条消息 (通常由 WebSocket 新消息触发)
 * @param msg - 消息对象
 * @param tempId - 可选的临时 ID (stableKey)，由后端提供用于直接匹配乐观消息
 */
export function addMessage(msg: Message, tempId?: string) {
    batch(() => {
        const map = new Map(messageMap.value);
        let replacedOptimistic = false;
        let inheritedStableKey: string | undefined;
        let matchedTempId: number | undefined;

        // 使用后端提供的 tempId 进行直接匹配
        if (tempId) {
            for (const [id, m] of map) {
                if (m.state === 'sending' && m.stableKey === tempId) {
                    inheritedStableKey = m.stableKey;
                    matchedTempId = id;
                    map.delete(id);
                    replacedOptimistic = true;
                    break;
                }
            }
        }

        // Backend scraper broadcasts do not know the client-side tempId. Match
        // the pending self-message by normalized content to avoid duplicate
        // optimistic bubbles when websocket delivery wins the confirm poll.
        if (matchedTempId === undefined) {
            const incomingContent = normalizePendingContent(msg.message ?? '');
            for (const [id, m] of map) {
                if (
                    m.state === 'sending' &&
                    String(m.uid) === String(msg.uid) &&
                    normalizePendingContent(m.message ?? '') === incomingContent &&
                    Math.abs(Number(m.timestamp ?? 0) - Number(msg.timestamp ?? 0)) <= 30
                ) {
                    inheritedStableKey = m.stableKey;
                    matchedTempId = id;
                    map.delete(id);
                    replacedOptimistic = true;
                    break;
                }
            }
        }

        // 清理超时定时器
        if (matchedTempId !== undefined) {
            const timeout = pendingTimeouts.get(matchedTempId);
            if (timeout) {
                clearTimeout(timeout);
                pendingTimeouts.delete(matchedTempId);
            }
        }

        // 将确认消息添加到 map，如果有 stableKey 则继承，标记为 sent
        const confirmedMsg = inheritedStableKey
            ? { ...msg, stableKey: inheritedStableKey, state: 'sent' as const }
            : { ...msg, state: 'sent' as const };

        const alreadyExists = map.has(confirmedMsg.id);

        map.set(confirmedMsg.id, confirmedMsg);
        messageMap.value = map;

        // 添加到新消息集合以触发入场动画 (只对非替换消息触发，且非已存在消息)
        if (!replacedOptimistic && !alreadyExists) {
            updateSignalSet(newMessageIds, s => s.add(confirmedMsg.id));
            setTimeout(() => updateSignalSet(newMessageIds, s => s.delete(confirmedMsg.id)), 350);
        }

        pendingScrollToBottom.value = true;
    });
}

/**
 * 添加乐观消息 (发送前立即显示的临时消息)
 * @returns 包含临时消息 ID 和 stableKey 的对象
 */
export function addOptimisticMessage(
    content: string,
    user: { id: string; nickname: string; avatar: string },
    replyToId?: number,
    replyDetails?: any,
    imageMeta?: Record<string, { width: number; height: number }>
): { tempId: number; stableKey: string } {
    const tempId = nextOptimisticId--;
    const stableKey = `temp-${Math.random().toString(36).slice(2)}`;

    let currentTs = Math.floor(Date.now() / 1000);
    const ids = messageIds.peek();
    if (ids.length > 0) {
        const lastMsgId = ids[ids.length - 1];
        const lastMsgTs = messageMap.peek().get(lastMsgId)?.timestamp || 0;
        if (currentTs < lastMsgTs) {
            currentTs = lastMsgTs;
        }
    }

    const optimisticMsg: Message = {
        id: tempId,
        uid: Number(user.id),
        nickname: user.nickname,
        avatar: user.avatar,
        message: content,
        timestamp: currentTs,
        reply_to_id: replyToId,
        reply_details: replyDetails,
        image_meta: imageMeta,
        stableKey,
        state: 'sending',
    };

    batch(() => {
        const map = new Map(messageMap.value);
        map.set(tempId, optimisticMsg);
        messageMap.value = map;

        updateSignalSet(newMessageIds, s => s.add(tempId));
        setTimeout(() => updateSignalSet(newMessageIds, s => s.delete(tempId)), 350);

        manualScrollToBottom.value++;
    });

    const timeoutId = setTimeout(() => {
        markMessageFailed(tempId);
        pendingTimeouts.delete(tempId);
    }, PENDING_TIMEOUT_MS);
    pendingTimeouts.set(tempId, timeoutId);

    return { tempId, stableKey };
}

/**
 * 标记消息为发送失败
 */
export function markMessageFailed(tempId: number) {
    const msg = messageMap.value.get(tempId);
    if (msg && msg.state === 'sending') {
        updateSignalMap(messageMap, map => map.set(tempId, { ...msg, state: 'failed' }));
    }
}

/**
 * 移除乐观消息 (发送失败时调用)
 */
export function removeOptimisticMessage(tempId: number) {
    const timeout = pendingTimeouts.get(tempId);
    if (timeout) {
        clearTimeout(timeout);
        pendingTimeouts.delete(tempId);
    }

    updateSignalMap(messageMap, map => map.delete(tempId));
}

/**
 * 重试发送失败的消息
 */
export function retryMessage(tempId: number): { content: string; stableKey: string } | null {
    const msg = messageMap.value.get(tempId);
    if (!msg || msg.state !== 'failed') return null;

    const content = msg.message;
    const stableKey = msg.stableKey || `temp-${Math.random().toString(36).slice(2)}`;

    updateSignalMap(messageMap, map => map.set(tempId, { ...msg, state: 'sending' }));

    const timeoutId = setTimeout(() => {
        markMessageFailed(tempId);
        pendingTimeouts.delete(tempId);
    }, PENDING_TIMEOUT_MS);
    pendingTimeouts.set(tempId, timeoutId);

    return { content, stableKey };
}

/**
 * 批量添加消息 (支持去重，用于加载历史/更新消息)
 */
export function addMessagesBatch(newMessages: Message[]) {
    if (newMessages.length === 0) return;

    const map = new Map(messageMap.value);

    for (const msg of newMessages) {
        const existing = map.get(msg.id);
        if (!existing || (msg.edited_at && msg.edited_at > (existing.edited_at || 0))) {
            map.set(msg.id, msg);
        }
    }

    messageMap.value = map;
}

/**
 * 更新消息 (优化版：直接更新 Map 中的消息)
 */
export function updateMessage(id: number, updates: Partial<Message>) {
    const existing = messageMap.value.get(id);
    if (existing) {
        updateSignalMap(messageMap, map => map.set(id, { ...existing, ...updates }));
    }
}

/**
 * 按 ID 获取消息 (O(1) 查找)
 */
export function getMessageById(id: number): Message | undefined {
    return messageMap.value.get(id);
}

/**
 * 删除消息 (标记为已删除)
 */
export function deleteMessage(id: number) {
    updateMessage(id, { is_deleted: true });
}

/**
 * 清空消息
 */
export function clearMessages() {
    messageMap.value = new Map();
}

/**
 * 设置消息列表 (API 初始加载时使用)
 */
export function setMessages(newMessages: Message[]) {
    const map = new Map<number, Message>();
    for (const msg of newMessages) {
        map.set(msg.id, msg);
    }
    messageMap.value = map;
}

/**
 * 加载消息上下文 (用于跳转)
 * @returns 包含目标消息索引的结果，或 null 如果加载失败
 */
export async function loadMessageContext(messageId: number): Promise<{ targetIndex: number } | null> {
    isLoadingHistory.value = true;
    try {
        const result = await fetchMessageContext(messageId);

        if (result && result.messages.length > 0) {
            const targetMsg = result.messages.find(m => m.id === messageId);
            if (!targetMsg || blockedUsers.value.has(String(targetMsg.uid))) {
                return null;
            }

            const filtered = result.messages.filter(
                m => !blockedUsers.value.has(String(m.uid))
            );

            batch(() => {
                clearMessages();
                addMessagesBatch(filtered);

                historyOldestId.value = filtered[0].id;
                historyNewestId.value = filtered[filtered.length - 1].id;
                historyFullyLoaded.value = !result.has_more_before;
                timelineIsLive.value = false;
            });
            return { targetIndex: result.target_index };
        }
    } catch {
        // ignore
    } finally {
        isLoadingHistory.value = false;
    }
    return null;
}
