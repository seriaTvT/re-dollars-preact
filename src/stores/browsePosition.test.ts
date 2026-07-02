import { describe, expect, it } from 'vitest';
import { shouldRestoreBrowsePosition } from './browsePosition';

describe('browse position restore policy', () => {
    it('restores saved browse position only when unread messages pass the threshold', () => {
        expect(shouldRestoreBrowsePosition(0)).toBe(false);
        expect(shouldRestoreBrowsePosition(5)).toBe(false);
        expect(shouldRestoreBrowsePosition(6)).toBe(true);
    });
});
