import { useEffect, useCallback } from 'preact/hooks';
import { WEBSOCKET_URL, HEARTBEAT_INTERVAL, RECONNECT_DELAY, CONNECTION_CHECK_INTERVAL } from '@/utils/constants';
import { wsConnected, isChatOpen } from '@/stores/chat';
import { userInfo, settings } from '@/stores/user';
import {
    handleNewMessages,
    handleNewPM,
    handleNotification,
    handleMessageDelete,
    handleMessageEdit,
    handleReadStateUpdate,
    checkMissedMessages,
} from './ws/messageHandlers';
import {
    syncPresenceSubscriptions as _syncPresence,
    resetPresence,
    handleOnlineCountUpdate,
    handlePresenceResult,
    handlePresenceUpdate,
    handleTypingStart,
    handleTypingStop,
    sendTypingStart as _sendTypingStart,
    sendTypingStop as _sendTypingStop,
} from './ws/presenceHandlers';
import { handleReactionAdd, handleReactionRemove } from './ws/reactionHandlers';

let ws: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
let connectionCheckTimer: ReturnType<typeof setInterval> | null = null;
let wsInitialized = false;

/**
 * 发送 WebSocket 消息的类型 (outgoing)
 */
type OutgoingWSMessage =
    | { type: 'identify'; uid: string }
    | { type: 'join'; user: { id: string; name: string; avatar: string } }
    | { type: 'presence'; open: boolean }
    | { type: 'presence_subscribe'; uids: string[] }
    | { type: 'presence_unsubscribe'; uids?: string[] }
    | { type: 'presence_query'; uids: string[] }
    | { type: 'ping' }
    | { type: 'ack'; ackId: string }
    | { type: 'typing_start' }
    | { type: 'typing_stop' }
    | { type: 'pending_message'; tempId: string; content: string };

function sendMessage(data: OutgoingWSMessage) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
    }
}

function isConnected(): boolean {
    return !!ws && ws.readyState === WebSocket.OPEN;
}

// --- Connection management ---

export function initWebSocket() {
    if (wsInitialized) return;
    wsInitialized = true;
    connectWebSocket();
    startConnectionMonitoring();
}

function connectWebSocket() {
    if (ws && ws.readyState === WebSocket.OPEN) return;
    if (ws && ws.readyState === WebSocket.CONNECTING) return;

    if (ws) {
        ws.close();
        ws = null;
    }
    ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
        wsConnected.value = true;

        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }

        startHeartbeat();
        sendMessage({ type: 'identify', uid: userInfo.value.id });

        if (settings.value.sharePresence) {
            sendMessage({
                type: 'join',
                user: {
                    id: userInfo.value.id,
                    name: userInfo.value.nickname,
                    avatar: userInfo.value.avatar,
                },
            });
        }

        if (isChatOpen.value) {
            sendMessage({ type: 'presence', open: true });
            setTimeout(() => syncPresenceSubscriptions(), 0);
        }
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            handleWebSocketMessage(data);
        } catch {
            // ignore
        }
    };

    ws.onclose = () => {
        wsConnected.value = false;
        stopHeartbeat();
        resetPresence();

        if (settings.value.notificationType === 'detail' || isChatOpen.value) {
            scheduleReconnect();
        }
    };

    ws.onerror = () => {
        // ignore
    };
}

function disconnectWebSocket() {
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }
    stopHeartbeat();
    stopConnectionMonitoring();
    if (ws) {
        ws.close();
        ws = null;
    }
    wsConnected.value = false;
}

function startConnectionMonitoring() {
    if (connectionCheckTimer) return;
    connectionCheckTimer = setInterval(() => {
        const shouldBeConnected = settings.value.notificationType === 'detail' || isChatOpen.value;
        if (shouldBeConnected && !isConnected()) {
            connectWebSocket();
        }
    }, CONNECTION_CHECK_INTERVAL);
}

function stopConnectionMonitoring() {
    if (connectionCheckTimer) {
        clearInterval(connectionCheckTimer);
        connectionCheckTimer = null;
    }
}

function scheduleReconnect() {
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
    }
    reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        ws = null;
        connectWebSocket();
    }, RECONNECT_DELAY);
}

function startHeartbeat() {
    stopHeartbeat();
    if (document.hidden) return;
    heartbeatTimer = setInterval(() => {
        sendMessage({ type: 'ping' });
    }, HEARTBEAT_INTERVAL);
}

function stopHeartbeat() {
    if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
    }
}

// --- Message routing ---

function handleWebSocketMessage(data: any) {
    if (data.ackId) {
        sendMessage({ type: 'ack', ackId: data.ackId });
    }

    switch (data.type) {
        case 'online_count_update': handleOnlineCountUpdate(data); break;
        case 'presence_result': handlePresenceResult(data); break;
        case 'presence_update': handlePresenceUpdate(data); break;
        case 'typing_start': handleTypingStart(data); break;
        case 'typing_stop': handleTypingStop(data); break;
        case 'reaction_add': handleReactionAdd(data); break;
        case 'reaction_remove': handleReactionRemove(data); break;
        case 'new_messages': handleNewMessages(data); break;
        case 'new_pm': handleNewPM(data); break;
        case 'notification': handleNotification(data); break;
        case 'message_delete': handleMessageDelete(data); break;
        case 'message_edit': handleMessageEdit(data); break;
        case 'read_state_update': handleReadStateUpdate(data); break;
        case 'pong': break;
    }
}

// --- Public API (re-exported for consumers) ---

export function syncPresenceSubscriptions() {
    _syncPresence(sendMessage, isConnected);
}

export function sendTypingStart() {
    _sendTypingStart(sendMessage, isConnected);
}

export function sendTypingStop() {
    _sendTypingStop(sendMessage, isConnected);
}

export function sendPendingMessage(tempId: string, content: string) {
    if (isConnected()) {
        sendMessage({ type: 'pending_message', tempId, content });
    }
}

/**
 * WebSocket hook
 */
export function useWebSocket() {
    const connect = useCallback(() => {
        connectWebSocket();
    }, []);

    const disconnect = useCallback(() => {
        disconnectWebSocket();
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (settings.value.notificationType !== 'detail') {
                    stopHeartbeat();
                }
            } else {
                startHeartbeat();
                setTimeout(() => {
                    const shouldConnect = isChatOpen.value || settings.value.notificationType === 'detail';
                    if (shouldConnect && !isConnected()) {
                        connectWebSocket();
                    }
                    checkMissedMessages();
                }, 100);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (isChatOpen.value && !isConnected()) {
            connectWebSocket();
            if (!connectionCheckTimer) {
                startConnectionMonitoring();
            }
        }
    }, [isChatOpen.value]);

    return { connect, disconnect, send: sendMessage, isConnected: wsConnected };
}
