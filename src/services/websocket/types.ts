export type OutgoingWSMessage =
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

export type WebSocketSend = (data: OutgoingWSMessage) => void;
export type WebSocketConnectionCheck = () => boolean;
