import { describe, expect, it } from 'vitest';
import { generateSmileyCodes, getSmileyUrl } from './smilies';

describe('smilies', () => {
    it('resolves blake smiley urls', () => {
        expect(getSmileyUrl('(blake_01)')).toBe('/img/smiles/blake/blake_01.gif');
        expect(getSmileyUrl('(blake_96)')).toBe('/img/smiles/blake/blake_96.gif');
        expect(getSmileyUrl('(blake_97)')).toBeNull();
    });

    it('generates blake smiley codes', () => {
        const codes = generateSmileyCodes('Blake');
        expect(codes).toHaveLength(96);
        expect(codes[0]).toBe('(blake_01)');
        expect(codes[95]).toBe('(blake_96)');
    });
});
