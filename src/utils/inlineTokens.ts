import { getSmileyUrl } from './smilies';

export type ParsedInlineToken =
    | {
        raw: string;
        type: 'custom-image';
        src: string;
        isCommunityEmoji: boolean;
    }
    | {
        raw: string;
        type: 'smiley';
        variant: 'bgm' | 'musume' | 'blake';
        src: string;
    }
    | {
        raw: string;
        type: 'bmo';
        code: string;
    };

export const INLINE_TOKEN_REGEX = /\[(emoji|sticker)\]([\s\S]+?)\[\/\1\]|\(((?:musume_|blake_))(\d+)\)|\(bgm(\d+)\)|\((bmo(?:C|_)[a-zA-Z0-9_-]+)\)/gi;

function isValidInlineMediaUrl(src: string): boolean {
    return /^https?:\/\/[^\s<>"']+$/i.test(src.trim());
}

function isInsideHtmlTag(text: string, index: number): boolean {
    const before = text.slice(0, index);
    return before.lastIndexOf('<') > before.lastIndexOf('>');
}

export function parseInlineTokenMatch(match: RegExpExecArray): ParsedInlineToken | null {
    const raw = match[0];
    const [, customTag, customSrc, largePrefix, , , bmoCode] = match;

    if (customTag && customSrc) {
        if (!isValidInlineMediaUrl(customSrc)) return null;
        const src = customSrc.trim();
        return {
            raw,
            type: 'custom-image',
            src,
            isCommunityEmoji: src.includes('/emojis/')
        };
    }

    if (bmoCode) {
        return {
            raw,
            type: 'bmo',
            code: raw
        };
    }

    const src = getSmileyUrl(raw);
    if (!src) return null;

    return {
        raw,
        type: 'smiley',
        variant: largePrefix === 'musume_'
            ? 'musume'
            : largePrefix === 'blake_'
                ? 'blake'
                : 'bgm',
        src
    };
}

export function collectRenderableInlineTokenRaws(text: string): string[] {
    const tokens: string[] = [];
    const matcher = new RegExp(INLINE_TOKEN_REGEX);
    let match: RegExpExecArray | null;

    while ((match = matcher.exec(text)) !== null) {
        const token = parseInlineTokenMatch(match);
        if (token) {
            tokens.push(token.raw);
        }
    }

    return tokens;
}

export function replaceInlineTokens(
    text: string,
    renderMatch: (token: ParsedInlineToken | null, raw: string) => string,
    options: {
        renderText?: (text: string) => string;
        skipInsideHtml?: boolean;
    } = {}
): string {
    const matcher = new RegExp(INLINE_TOKEN_REGEX);
    const renderText = options.renderText || ((chunk: string) => chunk);
    let lastIndex = 0;
    let result = '';
    let match: RegExpExecArray | null;

    while ((match = matcher.exec(text)) !== null) {
        result += renderText(text.slice(lastIndex, match.index));

        const raw = match[0];
        if (options.skipInsideHtml && isInsideHtmlTag(text, match.index)) {
            result += raw;
        } else {
            result += renderMatch(parseInlineTokenMatch(match), raw);
        }

        lastIndex = match.index + raw.length;
    }

    return result + renderText(text.slice(lastIndex));
}
