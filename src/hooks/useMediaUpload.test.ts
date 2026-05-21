import { describe, expect, it } from 'vitest';
import { MEDIA_FILE_ACCEPT } from './useMediaUpload';

describe('MEDIA_FILE_ACCEPT', () => {
    it('explicitly includes HEIC and HEIF extensions', () => {
        expect(MEDIA_FILE_ACCEPT).toContain('.heic');
        expect(MEDIA_FILE_ACCEPT).toContain('.heif');
    });
});
