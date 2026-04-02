import { describe, expect, it } from 'vitest';
import { generateSmileyCodes, getGroupedSmileyCodes, getSmileyUrl } from './smilies';

describe('smilies', () => {
    it('resolves official musume and blake smiley urls', () => {
        expect(getSmileyUrl('(musume_96)')).toBe('/img/smiles/musume/musume_96.gif');
        expect(getSmileyUrl('(musume_100)')).toBe('/img/smiles/musume/musume_100.gif');
        expect(getSmileyUrl('(musume_118)')).toBe('/img/smiles/musume/musume_118.gif');
        expect(getSmileyUrl('(musume_97)')).toBeNull();

        expect(getSmileyUrl('(blake_01)')).toBe('/img/smiles/blake/blake_01.gif');
        expect(getSmileyUrl('(blake_96)')).toBe('/img/smiles/blake/blake_96.gif');
        expect(getSmileyUrl('(blake_97)')).toBe('/img/smiles/blake/blake_97.gif');
        expect(getSmileyUrl('(blake_98)')).toBe('/img/smiles/blake/blake_98.gif');
        expect(getSmileyUrl('(blake_99)')).toBe('/img/smiles/blake/blake_99.gif');
        expect(getSmileyUrl('(blake_118)')).toBe('/img/smiles/blake/blake_118.gif');
        expect(getSmileyUrl('(blake_119)')).toBeNull();
    });

    it('generates official musume and blake smiley codes', () => {
        const musumeCodes = generateSmileyCodes('Musume');
        expect(musumeCodes).toHaveLength(116);
        expect(musumeCodes[0]).toBe('(musume_01)');
        expect(musumeCodes).toContain('(musume_100)');
        expect(musumeCodes).toContain('(musume_110)');
        expect(musumeCodes).not.toContain('(musume_97)');

        const codes = generateSmileyCodes('Blake');
        expect(codes).toHaveLength(118);
        expect(codes[0]).toBe('(blake_01)');
        expect(codes[96]).toBe('(blake_97)');
        expect(codes[97]).toBe('(blake_98)');
        expect(codes[117]).toBe('(blake_118)');
        expect(codes).toContain('(blake_110)');
    });

    it('groups musume and blake smileys with official sections', () => {
        const musumeSections = getGroupedSmileyCodes('Musume');
        expect(musumeSections.map(section => section.name)).toEqual([
            '情绪反应',
            '动作道具',
            '日常状态',
            '提示反馈'
        ]);
        expect(musumeSections[0].items[0].code).toBe('(musume_06)');
        expect(musumeSections[3].items[4].code).toBe('(musume_05)');

        const blakeSections = getGroupedSmileyCodes('Blake');
        expect(blakeSections.map(section => section.name)).toEqual([
            '情绪反应',
            '动作道具',
            '得分反馈',
            '日常状态',
            '提示反馈'
        ]);
        expect(blakeSections[2].items.map(item => item.code)).toEqual([
            '(blake_97)',
            '(blake_98)'
        ]);
    });
});
