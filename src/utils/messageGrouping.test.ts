import { describe, expect, it } from 'vitest';
import { MESSAGE_GROUP_TIME_GAP } from './constants';
import { canGroupAdjacentMessages } from './messageGrouping';

describe('canGroupAdjacentMessages', () => {
    it('groups the same sender inside the time window and boundary', () => {
        expect(canGroupAdjacentMessages(
            { senderId: 1, timestamp: 100, boundaryId: 'topic' },
            { senderId: '1', timestamp: 100 + MESSAGE_GROUP_TIME_GAP - 1, boundaryId: 'topic' }
        )).toBe(true);
    });

    it.each([
        [
            { senderId: 1, timestamp: 100, boundaryId: 'topic' },
            { senderId: 2, timestamp: 101, boundaryId: 'topic' },
        ],
        [
            { senderId: 1, timestamp: 100, boundaryId: 'topic' },
            { senderId: 1, timestamp: 100 + MESSAGE_GROUP_TIME_GAP, boundaryId: 'topic' },
        ],
        [
            { senderId: 1, timestamp: 100, boundaryId: 'first' },
            { senderId: 1, timestamp: 101, boundaryId: 'second' },
        ],
    ])('does not group across sender, time, or boundary changes', (current, adjacent) => {
        expect(canGroupAdjacentMessages(current, adjacent)).toBe(false);
    });
});
