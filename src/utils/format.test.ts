import { describe, expect, it } from 'vitest';
import { getThumbnailUrl } from './format';

describe('getThumbnailUrl', () => {
    it('rewrites lsky chat image urls to thumbs path', () => {
        expect(getThumbnailUrl('https://lsky.ry.mk/i/2026/03/27/9cd18d338a57c.webp'))
            .toBe('https://lsky.ry.mk/i/thumbs/2026/03/27/9cd18d338a57c.webp');
    });

    it('leaves non-chat-image urls unchanged', () => {
        expect(getThumbnailUrl('https://example.com/image.webp'))
            .toBe('https://example.com/image.webp');
        expect(getThumbnailUrl('https://lsky.ry.mk/i/thumbs/2026/03/27/9cd18d338a57c.webp'))
            .toBe('https://lsky.ry.mk/i/thumbs/2026/03/27/9cd18d338a57c.webp');
    });
});
