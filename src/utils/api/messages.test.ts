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

import { userInfo } from '@/stores/user';
import { confirmSentMessage, sendMessage } from './messages';

beforeEach(() => {
    userInfo.value = {
        id: '1',
        name: 'tester',
        nickname: 'Tester',
        avatar: '',
        formhash: 'formhash-1',
    };
});

afterEach(() => {
    vi.unstubAllGlobals();
});

afterAll(() => {
    delete (globalThis as any).window;
});

describe('message send API', () => {
    it('confirms sent messages through the versioned backend and normalizes the canonical row', async () => {
        const fetchMock = vi.fn<(input: RequestInfo, init?: RequestInit) => Promise<Response>>(
            async () => new Response(JSON.stringify({
                status: true,
                found: true,
                message: {
                    id: '123',
                    uid: '1',
                    reply_to_id: '50',
                    reply_details: { uid: '2' },
                    message: 'hello',
                },
            }), { status: 200 }),
        );
        vi.stubGlobal('fetch', fetchMock);

        const message = await confirmSentMessage('hello', 1);

        expect(message).toMatchObject({
            id: 123,
            uid: 1,
            reply_to_id: 50,
            reply_details: { uid: 2 },
            message: 'hello',
        });
        expect(fetchMock).toHaveBeenCalledWith(
            'https://rd.ry.mk/api/v1/messages/confirm',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uid: '1', message: 'hello' }),
            }),
        );
    });

    it('keeps the Bangumi same-origin post fast and separate from backend confirmation', async () => {
        const fetchMock = vi.fn<(input: RequestInfo, init?: RequestInit) => Promise<Response>>(
            async () => new Response('', { status: 200 }),
        );
        vi.stubGlobal('fetch', fetchMock);

        await expect(sendMessage('hello')).resolves.toEqual({ status: true });

        expect(fetchMock).toHaveBeenCalledOnce();
        const [url, init] = fetchMock.mock.calls[0]!;
        expect(url).toBe('/dollars?ajax=1');
        expect(init?.method).toBe('POST');
        const body = init?.body as URLSearchParams;
        expect(body.get('message')).toBe('hello');
        expect(body.get('formhash')).toBe('formhash-1');
    });
});
