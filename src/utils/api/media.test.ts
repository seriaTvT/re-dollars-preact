import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchGalleryTimelineImages, uploadFile, uploadImages } from './media';

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
        vi.stubGlobal('chiiApp', {
            cloud_settings: {
                getAll: () => ({ dollarsAuthToken: 'header.payload.signature' }),
            },
        });

        const file = new File(['heif-data'], 'photo.heif', { type: 'application/octet-stream' });

        await uploadFile(file);

        expect(fetchMock).toHaveBeenCalledOnce();
        const [url, init] = fetchMock.mock.calls[0]!;
        expect(url).toBe('https://up.ry.mk/api/upload');
        expect(init!.headers).toEqual({ Authorization: 'Bearer header.payload.signature' });
        expect(init!.credentials).toBe('omit');

        const formData = init!.body as FormData;
        expect(formData.get('image')).toBe(file);
        expect(formData.get('file')).toBeNull();
    });

    it('uploads multiple images through the image batch endpoint', async () => {
        const fetchMock = vi.fn<(input: RequestInfo, init?: RequestInit) => Promise<Response>>(
            async () => new Response(JSON.stringify({
                status: true,
                data: [
                    { links: { url: 'https://up.ry.mk/i/a.webp' } },
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
            'https://up.ry.mk/i/a.webp',
            'https://up.ry.mk/i/b.webp',
        ]);
        expect(fetchMock).toHaveBeenCalledOnce();
        const [url, init] = fetchMock.mock.calls[0]!;
        expect(url).toBe('https://up.ry.mk/api/upload/batch');
        expect(init!.credentials).toBe('omit');

        const formData = init!.body as FormData;
        expect(formData.getAll('images')).toEqual(files);
        expect(formData.get('image')).toBeNull();
    });

    it('uploads non-image files through the upload file endpoint', async () => {
        const fetchMock = vi.fn<(input: RequestInfo, init?: RequestInit) => Promise<Response>>(
            async () => new Response(JSON.stringify({
                status: true,
                url: '/f/test.mp4',
            }), { status: 200 }),
        );
        vi.stubGlobal('fetch', fetchMock);

        const file = new File(['video'], 'test.mp4', { type: 'video/mp4' });
        const result = await uploadFile(file);

        expect(result.url).toBe('https://up.ry.mk/f/test.mp4');
        const [url, init] = fetchMock.mock.calls[0]!;
        expect(url).toBe('https://up.ry.mk/api/upload/file');
        expect(init!.credentials).toBe('omit');

        const formData = init!.body as FormData;
        expect(formData.get('file')).toBe(file);
        expect(formData.get('image')).toBeNull();
    });
});

describe('fetchGalleryTimelineImages', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('requests an image page before the message cursor and maps viewer metadata', async () => {
        const fetchMock = vi.fn(async () => new Response(JSON.stringify({
            status: true,
            items: [{
                url: 'https://example.com/image.jpg',
                message_id: 42,
                media_index: 3,
                nickname: 'Alice',
                avatar: 'alice.jpg',
                timestamp: 123,
            }],
            hasMore: true,
        }), { status: 200 }));
        vi.stubGlobal('fetch', fetchMock);

        const result = await fetchGalleryTimelineImages('before', 50, 4, 20);

        expect(fetchMock).toHaveBeenCalledWith(
            'https://rd.ry.mk/api/v1/gallery/timeline?before_id=50&before_index=4&limit=20'
        );
        expect(result).toEqual({
            items: [{
                src: 'https://example.com/image.jpg',
                messageId: 42,
                mediaIndex: 3,
                nickname: 'Alice',
                avatar: 'alice.jpg',
                timestamp: 123,
            }],
            hasMore: true,
        });
    });
});
