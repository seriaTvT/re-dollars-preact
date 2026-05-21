import { afterEach, describe, expect, it, vi } from 'vitest';
import { uploadFile } from './media';

describe('uploadFile', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('uploads HEIF files reported as octet-stream through the image endpoint', async () => {
        const fetchMock = vi.fn<(input: RequestInfo, init?: RequestInit) => Promise<Response>>(
            async () => new Response(JSON.stringify({
                status: true,
                imageUrl: '/i/test.webp',
            }), { status: 200 }),
        );
        vi.stubGlobal('fetch', fetchMock);

        const file = new File(['heif-data'], 'photo.heif', { type: 'application/octet-stream' });

        await uploadFile(file);

        expect(fetchMock).toHaveBeenCalledOnce();
        const [url, init] = fetchMock.mock.calls[0]!;
        expect(url).toBe('https://lsky.ry.mk/api/upload');

        const formData = init!.body as FormData;
        expect(formData.get('image')).toBe(file);
        expect(formData.get('file')).toBeNull();
    });
});
