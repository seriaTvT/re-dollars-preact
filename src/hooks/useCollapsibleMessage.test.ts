import { describe, expect, it } from 'vitest';
import { COLLAPSE_MAX_HEIGHT } from '@/utils/constants';
import { getRenderedContentHeight, shouldCollapseMessage } from './useCollapsibleMessage';

const baseMeasurement = {
    contentHeight: COLLAPSE_MAX_HEIGHT + 2,
    hasNonTextContent: false,
    isDeleted: false,
    isSticker: false,
};

describe('shouldCollapseMessage', () => {
    it('collapses pure text taller than the visual limit', () => {
        expect(shouldCollapseMessage(baseMeasurement)).toBe(true);
    });

    it('keeps text at the visual limit expanded', () => {
        expect(shouldCollapseMessage({
            ...baseMeasurement,
            contentHeight: COLLAPSE_MAX_HEIGHT + 1,
        })).toBe(false);
    });

    it.each([
        { field: 'media or preview content', values: { hasNonTextContent: true } },
        { field: 'deleted content', values: { isDeleted: true } },
        { field: 'stickers', values: { isSticker: true } },
    ])('does not collapse $field', ({ values }) => {
        expect(shouldCollapseMessage({ ...baseMeasurement, ...values })).toBe(false);
    });

    it('uses the bounding height when trailing timestamp styles make scrollHeight unreliable', () => {
        const contentHeight = getRenderedContentHeight(0, COLLAPSE_MAX_HEIGHT + 200);
        expect(shouldCollapseMessage({ ...baseMeasurement, contentHeight })).toBe(true);
    });
});
