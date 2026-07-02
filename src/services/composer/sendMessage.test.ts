import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const sendMessageMock = vi.hoisted(() => vi.fn());
const confirmSentMessageMock = vi.hoisted(() => vi.fn());
const editMessageMock = vi.hoisted(() => vi.fn());
const sendPendingMessageMock = vi.hoisted(() => vi.fn());
const uploadFileMock = vi.hoisted(() => vi.fn());

vi.hoisted(() => {
    Object.defineProperty(globalThis, 'window', {
        value: {
            CHOBITS_UID: '1',
            CHOBITS_USERNAME: 'tester',
        },
        configurable: true,
        writable: true,
    });
});

vi.mock('@/utils/api/messages', () => ({
    sendMessage: sendMessageMock,
    confirmSentMessage: confirmSentMessageMock,
    editMessage: editMessageMock,
}));

vi.mock('@/utils/api/users', () => ({
    lookupUsersByName: vi.fn(),
}));

vi.mock('@/utils/api/media', () => ({
    uploadFile: uploadFileMock,
}));

vi.mock('@/services/websocket/client', () => ({
    sendPendingMessage: sendPendingMessageMock,
}));

import { submitComposerMessage } from './sendMessage';
import {
    editingMessage,
    replyingTo,
} from '@/stores/composerState';
import {
    messageMap,
} from '@/stores/messageStore';
import { userInfo } from '@/stores/user';

beforeEach(() => {
    vi.useFakeTimers();
    const storage = new Map<string, string>();
    vi.stubGlobal('localStorage', {
        getItem: vi.fn((key: string) => storage.get(key) ?? null),
        setItem: vi.fn((key: string, value: string) => storage.set(key, value)),
        removeItem: vi.fn((key: string) => storage.delete(key)),
    });
    messageMap.value = new Map();
    replyingTo.value = null;
    editingMessage.value = null;
    userInfo.value = {
        id: '1',
        name: 'tester',
        nickname: 'Tester',
        avatar: 'avatar.jpg',
        formhash: '',
    };
    sendMessageMock.mockReset();
    confirmSentMessageMock.mockReset();
    editMessageMock.mockReset();
    sendPendingMessageMock.mockReset();
    uploadFileMock.mockReset();
    vi.stubGlobal('alert', vi.fn());
});

afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
});

describe('submitComposerMessage', () => {
    it('creates an optimistic message, sends pending websocket metadata, and confirms it', async () => {
        let resolveSend!: (value: { status: boolean }) => void;
        const sendDone = new Promise<{ status: boolean }>((resolve) => {
            resolveSend = resolve;
        });
        sendMessageMock.mockReturnValue(sendDone);
        confirmSentMessageMock.mockResolvedValue({
            id: 123,
            uid: 1,
            nickname: 'Tester',
            avatar: 'avatar.jpg',
            message: 'hello',
            timestamp: 1000,
        });
        const clearInput = vi.fn();
        const clearMediaPreview = vi.fn();

        const submitDone = submitComposerMessage({
            content: ' hello ',
            imageMeta: {},
            clearInput,
            clearMediaPreview,
        });
        await Promise.resolve();

        const pending = [...messageMap.value.values()].find(msg => msg.state === 'sending');
        expect(pending).toBeDefined();
        expect(sendPendingMessageMock).toHaveBeenCalledWith(expect.stringMatching(/^temp-/), 'hello');
        expect(clearInput).toHaveBeenCalledWith(true);
        expect(clearMediaPreview).toHaveBeenCalledOnce();
        expect(sendMessageMock).toHaveBeenCalledWith('hello');

        resolveSend({ status: true });
        await submitDone;
        await Promise.resolve();
        expect(messageMap.value.get(123)).toMatchObject({
            id: 123,
            stableKey: pending?.stableKey,
            state: 'sent',
        });
    });

    it('rolls back optimistic messages when sending fails', async () => {
        sendMessageMock.mockResolvedValue({ status: false, error: 'nope' });

        await submitComposerMessage({
            content: 'hello',
            imageMeta: {},
            clearInput: vi.fn(),
            clearMediaPreview: vi.fn(),
        });

        expect([...messageMap.value.values()]).toHaveLength(0);
        expect(alert).toHaveBeenCalledWith('nope');
    });

    it('uploads and sends a voice draft without text content', async () => {
        uploadFileMock.mockResolvedValue({ status: true, url: 'https://rd.ry.mk/uploads/voice.webm' });
        sendMessageMock.mockResolvedValue({ status: true });
        confirmSentMessageMock.mockResolvedValue(null);
        const clearInput = vi.fn();
        const clearMediaPreview = vi.fn();
        const clearVoiceDraft = vi.fn();

        await submitComposerMessage({
            content: ' ',
            imageMeta: {},
            voiceDraft: {
                file: new File(['voice'], 'voice.webm', { type: 'audio/webm' }),
                url: 'blob:voice',
                duration: 2,
            },
            clearInput,
            clearMediaPreview,
            clearVoiceDraft,
        });

        expect(uploadFileMock).toHaveBeenCalledWith(expect.objectContaining({ name: 'voice.webm' }));
        expect(sendPendingMessageMock).toHaveBeenCalledWith(expect.stringMatching(/^temp-/), '[audio]https://rd.ry.mk/uploads/voice.webm[/audio]');
        expect(sendMessageMock).toHaveBeenCalledWith('[audio]https://rd.ry.mk/uploads/voice.webm[/audio]');
        expect(clearInput).toHaveBeenCalledWith(true);
        expect(clearMediaPreview).toHaveBeenCalledOnce();
        expect(clearVoiceDraft).toHaveBeenCalledOnce();
    });

    it('keeps the voice draft when voice upload fails', async () => {
        uploadFileMock.mockResolvedValue({ status: false, error: 'upload failed' });
        const clearInput = vi.fn();
        const clearMediaPreview = vi.fn();
        const clearVoiceDraft = vi.fn();

        await expect(submitComposerMessage({
            content: '',
            imageMeta: {},
            voiceDraft: {
                file: new File(['voice'], 'voice.webm', { type: 'audio/webm' }),
                url: 'blob:voice',
                duration: 2,
            },
            clearInput,
            clearMediaPreview,
            clearVoiceDraft,
        })).rejects.toThrow('upload failed');

        expect(sendPendingMessageMock).not.toHaveBeenCalled();
        expect(sendMessageMock).not.toHaveBeenCalled();
        expect(clearInput).not.toHaveBeenCalled();
        expect(clearMediaPreview).not.toHaveBeenCalled();
        expect(clearVoiceDraft).not.toHaveBeenCalled();
    });

    it('edits the active message and preserves image metadata', async () => {
        messageMap.value = new Map([[5, {
            id: 5,
            uid: 1,
            nickname: 'Tester',
            avatar: 'avatar.jpg',
            message: 'old',
            timestamp: 1000,
        }]]);
        editingMessage.value = { id: '5', raw: 'old' };
        editMessageMock.mockResolvedValue({ status: true });
        const clearInput = vi.fn();

        await submitComposerMessage({
            content: 'new',
            imageMeta: { 'https://example.com/a.jpg': { width: 640, height: 480 } },
            clearInput,
            clearMediaPreview: vi.fn(),
        });

        expect(editMessageMock).toHaveBeenCalledWith(5, 'new');
        expect(clearInput).toHaveBeenCalledOnce();
        expect(messageMap.value.get(5)?.image_meta).toEqual({
            'https://example.com/a.jpg': { width: 640, height: 480 },
        });
        expect(editingMessage.value).toBeNull();
    });
});
