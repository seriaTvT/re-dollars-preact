import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

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

import { processBBCode, renderReplyQuote } from './bbcode';
import { settings } from '../stores/user';

beforeEach(() => {
    settings.value = {
        ...settings.value,
        loadImages: true,
        linkPreview: true,
    };
});

afterAll(() => {
    vi.unstubAllGlobals();
    delete (globalThis as any).window;
});

describe('processBBCode media layout', () => {
    it('wraps single images in a media block without extra line breaks', () => {
        const html = processBBCode('前文\n[img]https://example.com/a.jpg[/img]\n后文');

        expect(html).toContain('<div class="message-media-block">');
        expect(html).toMatch(/前文<div class="message-media-block">[\s\S]*https:\/\/example\.com\/a\.jpg[\s\S]*<\/div>后文/);
        expect(html).not.toContain('<br><div class="message-media-block">');
    });

    it('renders consecutive images in a single media grid', () => {
        const html = processBBCode([
            '[img]https://example.com/1.jpg[/img]',
            '[img]https://example.com/2.jpg[/img]',
            '[img]https://example.com/3.jpg[/img]',
        ].join('\n'));

        expect(html).not.toContain('class="message-media-group"');
        expect((html.match(/class="message-media-block"/g) || [])).toHaveLength(1);
        expect(html).toContain('class="message-media-grid"');
        expect(html).toContain('style="--media-count: 3"');
        expect((html.match(/class="image-container/g) || [])).toHaveLength(3);
    });

    it('restores code blocks through placeholder resolution', () => {
        const html = processBBCode('[code]<b>x</b>\nconst a = 1;[/code]');

        expect(html).toContain('<div class="codeHighlight"><pre>&lt;b&gt;x&lt;/b&gt;\nconst a = 1;</pre></div>');
    });
});

describe('renderReplyQuote', () => {
    it('renders text masks correctly inside quotes', () => {
        const html = renderReplyQuote({
            uid: 1,
            nickname: 'tester',
            avatar: 'avatar.png',
            content: 'Hello [mask]secret content[/mask] world',
        }, 123);

        expect(html).toContain('<span class="text_mask"><span class="inner">secret content</span></span>');
    });

    it('removes empty mask tags', () => {
        const html = renderReplyQuote({
            uid: 1,
            nickname: 'tester',
            avatar: 'avatar.png',
            content: '[mask][/mask]Normal text',
        }, 123);

        expect(html).toContain('Normal text');
        expect(html).not.toContain('[mask]');
    });

    it('blurs masked image thumbnails', () => {
        const html = renderReplyQuote({
            uid: 1,
            nickname: 'tester',
            avatar: 'avatar.png',
            content: '[mask][img]https://example.com/img.jpg[/img][/mask]',
            firstImage: 'https://example.com/img_thumb.jpg',
            firstImageMasked: true,
        }, 123);

        expect(html).toContain('class="quote-thumbnail image-masked"');
    });

    it('handles truncated mask tags gracefully', () => {
        const html = renderReplyQuote({
            uid: 1,
            nickname: 'tester',
            avatar: 'avatar.png',
            content: '[mask]' + 'a'.repeat(100) + '[/mask]',
        }, 123);

        expect(html).toContain('<span class="text_mask"><span class="inner">');
        expect(html).toContain('</span></span>...');
    });
});
