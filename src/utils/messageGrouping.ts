import { MESSAGE_GROUP_TIME_GAP } from '@/utils/constants';

export interface GroupableMessage {
    senderId: string | number;
    timestamp: number | null;
    boundaryId?: string | number;
}

export function canGroupAdjacentMessages(
    current: GroupableMessage | null | undefined,
    adjacent: GroupableMessage | null | undefined
) {
    if (!current || !adjacent || current.timestamp === null || adjacent.timestamp === null) return false;
    return String(current.senderId) === String(adjacent.senderId)
        && current.boundaryId === adjacent.boundaryId
        && adjacent.timestamp - current.timestamp < MESSAGE_GROUP_TIME_GAP;
}
