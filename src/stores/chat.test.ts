import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.hoisted(() => {
    Object.defineProperty(globalThis, 'window', {
        value: {
            CHOBITS_UID: '1',
            CHOBITS_USERNAME: 'tester',
        },
        configurable: true,
        writable: true,
    });
});

import { addMessage, addOptimisticMessage, messageMap } from './messageStore';

beforeEach(() => {
    vi.useFakeTimers();
    messageMap.value = new Map();
});

afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
});

afterAll(() => {
    delete (globalThis as any).window;
});

describe('chat optimistic message replacement', () => {
    it('replaces a pending self-message when backend confirmation arrives without temp id', () => {
        const { tempId, stableKey } = addOptimisticMessage('hello   world', {
            id: '1',
            nickname: 'Tester',
            avatar: '',
        });

        addMessage({
            id: 123,
            uid: 1,
            nickname: 'Tester',
            avatar: '',
            message: 'hello world',
            timestamp: Math.floor(Date.now() / 1000),
        });

        expect(messageMap.value.has(tempId)).toBe(false);
        expect(messageMap.value.get(123)).toMatchObject({
            id: 123,
            stableKey,
            state: 'sent',
        });
    });
});
