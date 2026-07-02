import { afterEach, describe, expect, it, vi } from 'vitest';

describe('initializeBlockedUsers', () => {
    afterEach(() => {
        vi.resetModules();
        vi.unstubAllGlobals();
        vi.clearAllMocks();
    });

    it('resolves username blocklist entries through the backend user lookup API', async () => {
        const lookupUsersByName = vi.fn(async () => ({
            alice: { id: 42, nickname: 'Alice' },
            bob: { id: 84, nickname: 'Bob' },
        }));
        const update = vi.fn();
        const save = vi.fn();

        vi.doMock('@/utils/api/users', () => ({ lookupUsersByName }));
        vi.stubGlobal('window', {
            CHOBITS_UID: '1',
            CHOBITS_USERNAME: 'tester',
            data_ignore_users: ['100', 'alice', 'cached', 'bob'],
        });
        vi.stubGlobal('chiiApp', {
            cloud_settings: {
                getAll: () => ({ dollars_blocked_cache: JSON.stringify({ cached: '300' }) }),
                update,
                save,
            },
        });

        const { blockedUsers, initializeBlockedUsers } = await import('./user');

        await initializeBlockedUsers();

        expect(lookupUsersByName).toHaveBeenCalledWith(['alice', 'bob']);
        expect(blockedUsers.value).toEqual(new Set(['100', '300', '42', '84']));
        expect(update).toHaveBeenCalledWith({
            dollars_blocked_cache: JSON.stringify({ cached: '300', alice: '42', bob: '84' }),
        });
        expect(save).toHaveBeenCalledOnce();
    });
});
