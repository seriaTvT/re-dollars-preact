import { useEffect } from 'preact/hooks';
import { wsConnected, isChatOpen } from '@/stores/chatState';
import {
    connectWebSocket,
    disconnectWebSocket,
    hasConnectionMonitoring,
    initWebSocketClient,
    isWebSocketConnected,
    pauseWebSocketForHiddenDocument,
    resumeWebSocketAfterVisibilityChange,
    sendPendingMessage,
    sendTypingStart,
    sendTypingStop,
    sendWebSocketMessage,
    startConnectionMonitoring,
    syncPresenceSubscriptions,
} from '@/services/websocket/client';

export {
    sendPendingMessage,
    sendTypingStart,
    sendTypingStop,
    syncPresenceSubscriptions,
};

export function initWebSocket() {
    initWebSocketClient();
}

/**
 * WebSocket hook
 */
export function useWebSocket() {
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                pauseWebSocketForHiddenDocument();
            } else {
                resumeWebSocketAfterVisibilityChange();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (isChatOpen.value && !isWebSocketConnected()) {
            connectWebSocket();
            if (!hasConnectionMonitoring()) {
                startConnectionMonitoring();
            }
        }
    }, [isChatOpen.value]);

    return { connect: connectWebSocket, disconnect: disconnectWebSocket, send: sendWebSocketMessage, isConnected: wsConnected };
}
