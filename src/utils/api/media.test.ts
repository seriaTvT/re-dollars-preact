import { afterEach, describe, expect, it, vi } from 'vitest';
import { uploadFile, uploadImages } from './media';

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
        expect(init!.credentials).toBe('omit');

        const formData = init!.body as FormData;
        expect(formData.get('image')).toBe(file);
        expect(formData.get('file')).toBeNull();
    });

    it('uploads multiple images through the Lsky batch endpoint', async () => {
        const fetchMock = vi.fn<(input: RequestInfo, init?: RequestInit) => Promise<Response>>(
            async () => new Response(JSON.stringify({
                status: true,
                data: [
                    { links: { url: 'https://lsky.ry.mk/i/a.webp' } },
                    { links: { url: '/i/b.webp' } },
                ],
            }), { status: 200 }),
        );
        vi.stubGlobal('fetch', fetchMock);

        const files = [
            new File(['a'], 'a.png', { type: 'image/png' }),
            new File(['b'], 'b.webp', { type: 'image/webp' }),
        ];

        const result = await uploadImages(files);

        expect(result.map(item => item.url)).toEqual([
            'https://lsky.ry.mk/i/a.webp',
            'https://lsky.ry.mk/i/b.webp',
        ]);
        expect(fetchMock).toHaveBeenCalledOnce();
        const [url, init] = fetchMock.mock.calls[0]!;
        expect(url).toBe('https://lsky.ry.mk/api/upload/batch');
        expect(init!.credentials).toBe('omit');

        const formData = init!.body as FormData;
        expect(formData.getAll('images')).toEqual(files);
        expect(formData.get('image')).toBeNull();
    });

    it('uploads non-image files through the backend file endpoint', async () => {
        const fetchMock = vi.fn<(input: RequestInfo, init?: RequestInit) => Promise<Response>>(
            async () => new Response(JSON.stringify({
                status: true,
                url: '/videos/test.mp4',
            }), { status: 200 }),
        );
        vi.stubGlobal('fetch', fetchMock);

        const file = new File(['video'], 'test.mp4', { type: 'video/mp4' });
        const result = await uploadFile(file);

        expect(result.url).toBe('https://rd.ry.mk/videos/test.mp4');
        const [url, init] = fetchMock.mock.calls[0]!;
        expect(url).toBe('https://rd.ry.mk/api/v1/upload/file');
        expect(init!.credentials).toBe('include');

        const formData = init!.body as FormData;
        expect(formData.get('file')).toBe(file);
        expect(formData.get('image')).toBeNull();
    });
});
