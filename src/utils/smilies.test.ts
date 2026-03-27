import { describe, expect, it } from 'vitest';
import { generateSmileyCodes, getSmileyUrl } from './smilies';

describe('smilies', () => {
    it('resolves blake smiley urls', () => {
        expect(getSmileyUrl('(blake_01)')).toBe('/img/smiles/blake/blake_01.gif');
        expect(getSmileyUrl('(blake_96)')).toBe('/img/smiles/blake/blake_96.gif');
        expect(getSmileyUrl('(blake_97)')).toBe('/img/smiles/blake/blake_97.gif');
        expect(getSmileyUrl('(blake_98)')).toBe('/img/smiles/blake/blake_98.gif');
        expect(getSmileyUrl('(blake_99)')).toBeNull();
    });

    it('generates blake smiley codes', () => {
        const codes = generateSmileyCodes('Blake');
        expect(codes).toHaveLength(98);
        expect(codes[0]).toBe('(blake_01)');
        expect(codes[96]).toBe('(blake_97)');
        expect(codes[97]).toBe('(blake_98)');
    });
});
