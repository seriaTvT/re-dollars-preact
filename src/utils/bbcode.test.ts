import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

let processBBCode: (typeof import('./bbcode'))['processBBCode'];
let settings: (typeof import('../stores/user'))['settings'];

beforeAll(async () => {
    vi.stubGlobal('window', {
        CHOBITS_UID: '1',
        CHOBITS_USERNAME: 'tester',
    });

    ({ processBBCode } = await import('./bbcode'));
    ({ settings } = await import('../stores/user'));
});

beforeEach(() => {
    settings.value = {
        ...settings.value,
        loadImages: true,
        linkPreview: true,
    };
});

afterAll(() => {
    vi.unstubAllGlobals();
});

describe('processBBCode media layout', () => {
    it('wraps single images in a media block without extra line breaks', () => {
        const html = processBBCode('前文\n[img]https://example.com/a.jpg[/img]\n后文');

        expect(html).toContain('<div class="message-media-block">');
        expect(html).toMatch(/前文<div class="message-media-block">[\s\S]*https:\/\/example\.com\/a\.jpg[\s\S]*<\/div>后文/);
        expect(html).not.toContain('<br><div class="message-media-block">');
    });

    it('renders consecutive images as separate media blocks', () => {
        const html = processBBCode([
            '[img]https://example.com/1.jpg[/img]',
            '[img]https://example.com/2.jpg[/img]',
            '[img]https://example.com/3.jpg[/img]',
        ].join('\n'));

        expect(html).not.toContain('class="message-media-group"');
        expect((html.match(/class="message-media-block"/g) || [])).toHaveLength(3);
        expect((html.match(/class="image-container/g) || [])).toHaveLength(3);
    });

    it('restores code blocks through placeholder resolution', () => {
        const html = processBBCode('[code]<b>x</b>\nconst a = 1;[/code]');

        expect(html).toContain('<div class="codeHighlight"><pre>&lt;b&gt;x&lt;/b&gt;\nconst a = 1;</pre></div>');
    });
});
