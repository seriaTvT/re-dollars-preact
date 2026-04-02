import { describe, expect, it } from 'vitest';
import { collectRenderableRichInputTokens, renderRichInputHTML } from './richInput';

describe('richInput', () => {
    it('collects renderable inline tokens in source order', () => {
        expect(
            collectRenderableRichInputTokens('hi (bgm38) [sticker]https://example.com/a.png[/sticker] (bmoCAIAWgEuAKIBf)')
        ).toEqual([
            '(bgm38)',
            '[sticker]https://example.com/a.png[/sticker]',
            '(bmoCAIAWgEuAKIBf)'
        ]);
    });

    it('renders bangumi smiles, large smiles, bmo, and sticker tags as inline nodes', () => {
        const html = renderRichInputHTML(
            '(bgm38) (musume_01) (blake_01) (bmoCAIAWgEuAKIBf) [sticker]https://example.com/a.png[/sticker]'
        );

        expect(html).toContain('data-rich-raw="(bgm38)"');
        expect(html).toContain('data-rich-raw="(musume_01)"');
        expect(html).toContain('data-rich-raw="(blake_01)"');
        expect(html).toContain('data-rich-raw="(bmoCAIAWgEuAKIBf)"');
        expect(html).toContain('data-rich-raw="[sticker]https://example.com/a.png[/sticker]"');
        expect(html).toContain('chat-input-inline-large');
        expect(html).toContain('class="bmo"');
    });

    it('keeps invalid sticker urls as escaped plain text', () => {
        expect(renderRichInputHTML('[sticker]not-a-url[/sticker]')).toBe('[sticker]not-a-url[/sticker]');
    });
});
