import { afterEach, describe, expect, it, vi } from 'vitest';

function stubBangumiHost(token?: string, uid = '42') {
    vi.stubGlobal('window', { CHOBITS_UID: uid });
    vi.stubGlobal('chiiApp', {
        cloud_settings: {
            getAll: () => token ? { dollarsAuthToken: token } : {},
        },
    });
}

async function loadAuthModule() {
    vi.resetModules();
    return import('./auth');
}

afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
});

describe('auth session check', () => {
    it('does not request /auth/me when no local auth token exists', async () => {
        const fetchMock = vi.fn<(input: RequestInfo, init?: RequestInit) => Promise<Response>>();
        vi.stubGlobal('fetch', fetchMock);
        stubBangumiHost();

        const { checkAuth } = await loadAuthModule();

        await expect(checkAuth()).resolves.toEqual({ isLoggedIn: false });
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('checks /auth/me with the saved token when one exists', async () => {
        const fetchMock = vi.fn<(input: RequestInfo, init?: RequestInit) => Promise<Response>>(
            async () => new Response(JSON.stringify({
                status: true,
                user: { id: 42, nickname: 'Alice', avatar: 'https://avatar/alice.jpg' },
            }), { status: 200 }),
        );
        vi.stubGlobal('fetch', fetchMock);
        stubBangumiHost('saved-token');

        const { checkAuth } = await loadAuthModule();

        await expect(checkAuth()).resolves.toEqual({
            isLoggedIn: true,
            user: { id: '42', nickname: 'Alice', avatar: 'https://avatar/alice.jpg' },
        });
        expect(fetchMock).toHaveBeenCalledWith(
            'https://rd.ry.mk/api/v1/auth/me',
            expect.objectContaining({
                headers: { Authorization: 'Bearer saved-token' },
                credentials: 'include',
            }),
        );
    });

    it('falls back to token-login when the cookie session is not valid', async () => {
        const fetchMock = vi.fn<(input: RequestInfo, init?: RequestInit) => Promise<Response>>()
            .mockResolvedValueOnce(new Response(JSON.stringify({ status: false }), { status: 200 }))
            .mockResolvedValueOnce(new Response(JSON.stringify({
                status: true,
                user: { id: 42, nickname: 'Alice', avatar: '' },
            }), { status: 200 }));
        vi.stubGlobal('fetch', fetchMock);
        stubBangumiHost('saved-token');

        const { checkAuth } = await loadAuthModule();

        await expect(checkAuth()).resolves.toEqual({
            isLoggedIn: true,
            user: { id: '42', nickname: 'Alice', avatar: '' },
        });
        expect(fetchMock).toHaveBeenNthCalledWith(
            2,
            'https://rd.ry.mk/api/v1/auth/token-login',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ token: 'saved-token' }),
                credentials: 'include',
            }),
        );
    });
});
