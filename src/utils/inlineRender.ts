import { escapeHTML } from '@/utils/format';
import type { ParsedInlineToken } from '@/utils/inlineTokens';

export function getSmileyClassName(rawOrAlt: string, src = '', baseClass = 'smiley') {
    let className = baseClass;
    if (/\(musume_\d+\)/i.test(rawOrAlt) || /\/smiles\/musume\//i.test(src)) {
        className += ' smiley-musume';
    } else if (/\(blake_\d+\)/i.test(rawOrAlt) || /\/smiles\/blake\//i.test(src)) {
        className += ' smiley-blake';
    }
    return className;
}

export function renderInlineTokenHTML(token: ParsedInlineToken | null, raw: string) {
    if (!token) {
        return raw.startsWith('[') ? escapeHTML(raw) : raw;
    }

    switch (token.type) {
        case 'custom-image': {
            const className = token.isCommunityEmoji ? 'smiley' : 'custom-emoji';
            return '<img src="' + escapeHTML(token.src) + '" class="' + className + '" alt="sticker" loading="lazy" decoding="async" fetchpriority="low" referrerpolicy="no-referrer">';
        }
        case 'smiley': {
            const className = getSmileyClassName(token.raw, token.src);
            const size = token.variant === 'bgm' ? ' width="21" height="21"' : '';
            return '<img src="' + escapeHTML(token.src) + '" class="' + className + '" alt="' + escapeHTML(token.raw) + '"' + size + '>';
        }
        case 'bmo':
            return '<span class="bmo" data-code="' + escapeHTML(token.code) + '"></span>';
    }
}
