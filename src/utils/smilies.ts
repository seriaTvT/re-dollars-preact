export interface SmileyRange {
    name: string;
    start?: number;
    end?: number;
    path?: (id: number) => string;
    tabIconId?: number;
    /** 表情代码前缀，默认 'bgm'，musume 系列为 'musume_' */
    codePrefix?: string;
    /** 是否为大尺寸动图表情（如 musume 系列） */
    isLarge?: boolean;
    /** 代码数字部分的补零位数，如 2 表示补零到两位 */
    codePad?: number;
}

// 表情范围配置 - 统一定义
export const smileyRanges: SmileyRange[] = [
    {
        name: 'TV',
        start: 24,
        end: 125,
        path: (id: number) => `/img/smiles/tv/${String(id - 23).padStart(2, '0')}.gif`
    },
    {
        name: 'BGM',
        start: 1,
        end: 23,
        path: (id: number) => {
            const ext = (id === 11 || id === 23) ? 'gif' : 'png';
            return `/img/smiles/bgm/${String(id).padStart(2, '0')}.${ext}`;
        }
    },
    {
        name: 'VS',
        start: 200,
        end: 238,
        path: (id: number) => `/img/smiles/tv_vs/bgm_${id}.png`
    },
    {
        name: '500',
        start: 500,
        end: 529,
        path: (id: number) => {
            const gifIds = new Set([500, 501, 505, 515, 516, 517, 518, 519, 521, 522, 523]);
            const ext = gifIds.has(id) ? 'gif' : 'png';
            return `/img/smiles/tv_500/bgm_${id}.${ext}`;
        }
    },
    {
        name: 'Musume',
        start: 1,
        end: 96,
        codePrefix: 'musume_',
        codePad: 2,
        tabIconId: 3,
        isLarge: true,
        path: (id: number) => `/img/smiles/musume/musume_${String(id).padStart(2, '0')}.gif`
    },
    {
        name: 'Blake',
        start: 1,
        end: 96,
        codePrefix: 'blake_',
        codePad: 2,
        tabIconId: 3,
        isLarge: true,
        path: (id: number) => `/img/smiles/blake/blake_${String(id).padStart(2, '0')}.gif`
    },
    { name: 'BMO' },
    { name: '收藏' }
];

// 不包含收藏和大尺寸表情的范围（用于 ReactionPicker）
export const smileyRangesWithoutFavorites = smileyRanges.filter(r => r.name !== '收藏' && !r.isLarge);

// 获取表情 URL
export function getSmileyUrl(code: string | number): string | null {
    if (typeof code === 'string') {
        // 尝试匹配大尺寸表情格式: (musume_XX) / (blake_XX)
        const largeSmileyMatch = code.match(/\(((?:musume_|blake_))(\d+)\)/);
        if (largeSmileyMatch) {
            const [, prefix, rawId] = largeSmileyMatch;
            const id = parseInt(rawId, 10);
            const range = smileyRanges.find(r => r.codePrefix === prefix && r.start && r.end && id >= r.start && id <= r.end);
            return range?.path?.(id) ?? null;
        }
        // 标准 bgm 格式: (bgmXX)
        const bgmMatch = code.match(/\(bgm(\d+)\)/);
        if (!bgmMatch) return null;
        const id = parseInt(bgmMatch[1], 10);
        const range = smileyRanges.find(r => !r.codePrefix && r.start && r.end && id >= r.start && id <= r.end);
        return range?.path?.(id) ?? null;
    }
    // 数字 id 仍按 bgm 系列查找
    const range = smileyRanges.find(r => !r.codePrefix && r.start && r.end && code >= r.start && code <= r.end);
    return range?.path?.(code) ?? null;
}

// 生成表情代码列表
export function generateSmileyCodes(groupName: string): string[] {
    const range = smileyRanges.find(r => r.name === groupName);
    if (!range || range.start == null || range.end == null) return [];

    const prefix = range.codePrefix || 'bgm';
    const codes: string[] = [];
    for (let i = range.start; i <= range.end; i++) {
        const num = range.codePad ? String(i).padStart(range.codePad, '0') : String(i);
        codes.push(`(${prefix}${num})`);
    }
    return codes;
}

// 兼容旧的导出名称（用于 bbcode.ts）
export const SMILIES = smileyRanges.filter(r => r.start && r.end && r.path) as Array<{
    name: string;
    start: number;
    end: number;
    path: (id: number) => string;
}>;
