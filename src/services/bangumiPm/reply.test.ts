import { describe, expect, it } from 'vitest';
import { summarizeReplyText } from '@/utils/messageActions';
import { buildPmReplyBody } from './reply';

describe('Bangumi PM reply helpers', () => {
    it('summarizes reply text with the Dollars-style 50 character limit', () => {
        const text = 'a'.repeat(60);

        expect(summarizeReplyText(text)).toBe('a'.repeat(50));
    });

    it('removes nested quotes and strips rich BBCode while preserving visible text', () => {
        const text = '[quote]old quote[/quote][b]hello[/b] [url=https://bgm.tv]Bangumi[/url] [user=42]Alice[/user]';

        expect(summarizeReplyText(text)).toBe('hello Bangumi @Alice');
    });

    it('uses compact placeholders for media-only messages', () => {
        expect(summarizeReplyText('[img]https://example.com/a.jpg[/img]')).toBe('[图片]');
        expect(summarizeReplyText('[file=notes.txt]https://example.com/file[/file]')).toBe('[附件]');
        expect(summarizeReplyText('[video]https://example.com/a.mp4[/video]')).toBe('[媒体]');
        expect(summarizeReplyText('[sticker]https://example.com/a.webp[/sticker]')).toBe('[表情]');
    });

    it('keeps truncated mask tags balanced', () => {
        const summary = summarizeReplyText(`[mask]${'a'.repeat(80)}[/mask]`);

        expect(summary.startsWith('[mask]')).toBe(true);
        expect(summary.endsWith('[/mask]')).toBe(true);
    });

    it('wraps composed PM replies in a short quote block', () => {
        const body = buildPmReplyBody('reply', {
            conversationId: '42',
            messageId: '10',
            user: 'Peer',
            avatar: '',
            text: 'hello',
            raw: '[b]hello[/b]',
        });

        expect(body).toBe('[quote]hello[/quote]\nreply');
    });
});
