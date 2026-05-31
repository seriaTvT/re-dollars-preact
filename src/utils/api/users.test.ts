import { afterEach, describe, expect, it, vi } from 'vitest';
import { mentionSearchUrl, searchMentionUsers } from './users';

describe('mention user search API', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('uses the versioned next backend for mention autocomplete', () => {
        expect(mentionSearchUrl('alice bob', 10)).toBe(
            'https://rd.ry.mk/api/v1/users/search?q=alice+bob&exact=true&limit=10',
        );
    });

    it('returns user data from successful search responses', async () => {
        const fetchMock = vi.fn<(input: RequestInfo) => Promise<Response>>(
            async () => new Response(JSON.stringify({
                status: true,
                data: [{ id: 10, uid: 10, username: 'alice', nickname: 'Alice' }],
            }), { status: 200 }),
        );
        vi.stubGlobal('fetch', fetchMock);

        await expect(searchMentionUsers('alice', 10)).resolves.toEqual([
            { id: 10, uid: 10, username: 'alice', nickname: 'Alice' },
        ]);
        expect(fetchMock).toHaveBeenCalledWith(
            'https://rd.ry.mk/api/v1/users/search?q=alice&exact=true&limit=10',
        );
    });

    it('returns an empty list when the search request fails', async () => {
        vi.stubGlobal('fetch', vi.fn(async () => new Response('bad gateway', { status: 502 })));

        await expect(searchMentionUsers('alice', 10)).resolves.toEqual([]);
    });
});
