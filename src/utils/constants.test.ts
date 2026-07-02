import { describe, expect, it } from 'vitest';
import {
    BACKEND_API_URL,
    BACKEND_URL,
    AUTH_BASE_URL,
    AUTH_CLIENT,
    BGM_CALLBACK_URL,
    FILE_UPLOAD_API_URL,
    UPLOAD_API_URL,
    UPLOAD_BASE_URL,
    WEBSOCKET_URL,
} from './constants';

describe('network constants', () => {
    it('defaults the audited userscript to the new versioned backend domain', () => {
        expect(BACKEND_URL).toBe('https://rd.ry.mk');
        expect(BACKEND_API_URL).toBe('https://rd.ry.mk/api/v1');
        expect(UPLOAD_BASE_URL).toBe('https://up.ry.mk');
        expect(UPLOAD_API_URL).toBe('https://up.ry.mk/api/upload');
        expect(FILE_UPLOAD_API_URL).toBe('https://rd.ry.mk/api/v1/upload/file');
        expect(WEBSOCKET_URL).toBe('wss://rd.ry.mk/ws');
        expect(AUTH_BASE_URL).toBe('https://auth.ry.mk');
        expect(AUTH_CLIENT).toBe('re-dollars');
        expect(BGM_CALLBACK_URL).toBe('https://rd.ry.mk/api/v1/auth/callback');
    });
});
