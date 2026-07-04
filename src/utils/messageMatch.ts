// 乐观消息与服务端回流消息的对账用归一化。
// 与后端 hub.ts 的 normalizeMessageForMatch 保持一致：解 HTML 实体、统一空白后 trim，
// 这样"客户端发出的内容"和"scraper 抓回并解码的内容"能可靠相等。

const NAMED_ENTITIES: Record<string, string> = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
};

function decodeHtmlEntities(input: string): string {
    return input.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
        const key = entity.toLowerCase();
        if (key.startsWith('#x')) {
            const code = Number.parseInt(key.slice(2), 16);
            return Number.isFinite(code) && code <= 0x10ffff ? String.fromCodePoint(code) : match;
        }
        if (key.startsWith('#')) {
            const code = Number.parseInt(key.slice(1), 10);
            return Number.isFinite(code) && code <= 0x10ffff ? String.fromCodePoint(code) : match;
        }
        return NAMED_ENTITIES[key] ?? match;
    });
}

// \s 在 JS 正则中已包含   等空白，collapse 即可统一。
export function normalizeForMatch(input: string | undefined | null): string {
    return decodeHtmlEntities(String(input ?? ''))
        .replace(/\s+/g, ' ')
        .trim();
}
