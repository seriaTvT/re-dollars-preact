export interface SmileyRange {
    name: string;
    start?: number;
    end?: number;
    ids?: readonly number[];
    path?: (id: number) => string;
    tabIconId?: number;
    /** 表情代码前缀，默认 'bgm'，musume 系列为 'musume_' */
    codePrefix?: string;
    /** 是否为大尺寸动图表情（如 musume 系列） */
    isLarge?: boolean;
    /** 代码数字部分的补零位数，如 2 表示补零到两位 */
    codePad?: number;
}

export interface SmileySection {
    name: string;
    ids: readonly number[];
}

// Bangumi 官网新版角色动态表情改为稀疏编号。项目内继续保持数字顺序，避免打乱现有面板排布。
const ids = (start: number, end: number, ...extra: number[]) => [
    ...Array.from({ length: end - start + 1 }, (_, index) => start + index),
    ...extra,
];

export const musumeSmileyIds = ids(1, 96, ...ids(99, 118));
export const blakeSmileyIds = ids(1, 118);

const musumeSmileySections: readonly SmileySection[] = [
    {
        name: '情绪反应',
        ids: ids(6, 42, 100, 106, 108, 118)
    },
    {
        name: '动作道具',
        ids: ids(43, 76, 101, 102, 103, 99, 107, 112, 109, 110, 111, 113, 114, 115, 116, 117)
    },
    {
        name: '日常状态',
        ids: ids(77, 93, 104, 105, 94, 95, 96)
    },
    {
        name: '提示反馈',
        ids: ids(1, 5)
    }
];

const blakeSmileySections: readonly SmileySection[] = [
    musumeSmileySections[0],
    musumeSmileySections[1],
    {
        name: '得分反馈',
        ids: [97, 98]
    },
    musumeSmileySections[2],
    musumeSmileySections[3]
];

const groupedSmileySections: Readonly<Record<string, readonly SmileySection[]>> = {
    Musume: musumeSmileySections,
    Blake: blakeSmileySections
};

function getRangeIds(range: SmileyRange): readonly number[] {
    if (range.ids) return range.ids;
    if (range.start == null || range.end == null) return [];
    return Array.from({ length: range.end - range.start + 1 }, (_, index) => range.start! + index);
}

function rangeIncludesId(range: SmileyRange, id: number): boolean {
    return getRangeIds(range).includes(id);
}

function formatSmileyCode(prefix: string, id: number, codePad?: number): string {
    const num = codePad ? String(id).padStart(codePad, '0') : String(id);
    return `(${prefix}${num})`;
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
        ids: musumeSmileyIds,
        codePrefix: 'musume_',
        codePad: 2,
        tabIconId: 3,
        isLarge: true,
        path: (id: number) => `/img/smiles/musume/musume_${String(id).padStart(2, '0')}.gif`
    },
    {
        name: 'Blake',
        ids: blakeSmileyIds,
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
            const range = smileyRanges.find(r => r.codePrefix === prefix && rangeIncludesId(r, id));
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
    if (!range) return [];

    const prefix = range.codePrefix || 'bgm';
    const ids = getRangeIds(range);
    return ids.map(id => formatSmileyCode(prefix, id, range.codePad));
}

export function getGroupedSmileyCodes(groupName: string): Array<{
    name: string;
    items: Array<{ id: number; code: string }>;
}> {
    const range = smileyRanges.find(r => r.name === groupName);
    const sections = groupedSmileySections[groupName];
    if (!range || !sections) return [];

    const prefix = range.codePrefix || 'bgm';
    return sections.map(section => ({
        name: section.name,
        items: section.ids
            .filter(id => rangeIncludesId(range, id))
            .map(id => ({
                id,
                code: formatSmileyCode(prefix, id, range.codePad)
            }))
    })).filter(section => section.items.length > 0);
}
