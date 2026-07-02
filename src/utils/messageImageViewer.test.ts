import { describe, expect, it } from 'vitest';
import { buildMessageImageViewerItems, mergeTimelineImagePage } from './messageImageViewer';

describe('buildMessageImageViewerItems', () => {
    it('preserves timeline order and message metadata across messages', () => {
        expect(buildMessageImageViewerItems([
            {
                src: 'https://example.com/first.jpg',
                message: { id: 1, nickname: 'Alice', avatar: 'alice.jpg', timestamp: 100 },
            },
            {
                src: 'https://example.com/second.jpg',
                message: { id: 2, nickname: 'Bob', avatar: 'bob.jpg', timestamp: 200 },
            },
        ])).toEqual([
            {
                src: 'https://example.com/first.jpg',
                messageId: 1,
                nickname: 'Alice',
                avatar: 'alice.jpg',
                timestamp: 100,
            },
            {
                src: 'https://example.com/second.jpg',
                messageId: 2,
                nickname: 'Bob',
                avatar: 'bob.jpg',
                timestamp: 200,
            },
        ]);
    });

    it('keeps duplicate URLs as separate timeline entries', () => {
        const items = buildMessageImageViewerItems([
            { src: 'https://example.com/shared.jpg', message: { id: 1, nickname: 'A', avatar: '', timestamp: 100 } },
            { src: 'https://example.com/shared.jpg', message: { id: 2, nickname: 'B', avatar: '', timestamp: 200 } },
        ]);

        expect(items).toHaveLength(2);
        expect(items.map((item) => item.messageId)).toEqual([1, 2]);
    });
});

describe('mergeTimelineImagePage', () => {
    const currentItems = [{ src: 'current-1' }, { src: 'current-2' }];
    const pageItems = [{ src: 'page-1' }, { src: 'page-2' }];

    it('prepends older images and selects the nearest older image', () => {
        expect(mergeTimelineImagePage(currentItems, pageItems, 'before')).toEqual({
            items: [...pageItems, ...currentItems],
            index: 1,
        });
    });

    it('appends newer images and selects the first newer image', () => {
        expect(mergeTimelineImagePage(currentItems, pageItems, 'after')).toEqual({
            items: [...currentItems, ...pageItems],
            index: 2,
        });
    });
});
