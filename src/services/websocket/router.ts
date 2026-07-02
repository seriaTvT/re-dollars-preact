import {
    handleNewMessages,
    handleNewPM,
    handleNotification,
    handleMessageDelete,
    handleMessageEdit,
    handleReadStateUpdate,
} from '@/hooks/ws/messageHandlers';
import {
    handleOnlineCountUpdate,
    handlePresenceResult,
    handlePresenceUpdate,
    handleTypingStart,
    handleTypingStop,
} from '@/hooks/ws/presenceHandlers';
import { handleReactionAdd, handleReactionRemove } from '@/hooks/ws/reactionHandlers';
import type { WebSocketSend } from './types';

export function routeWebSocketMessage(data: any, send: WebSocketSend) {
    if (data.ackId) {
        send({ type: 'ack', ackId: data.ackId });
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
