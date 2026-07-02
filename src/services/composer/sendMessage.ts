import {
    addMessage,
    addOptimisticMessage,
    removeOptimisticMessage,
    updateMessage,
} from '@/stores/messageStore';
import {
    cancelReplyOrEdit,
    editingMessage,
    replyingTo,
} from '@/stores/composerState';
import { clearDraft } from '@/stores/drafts';
import { userInfo } from '@/stores/user';
import { confirmSentMessage, editMessage as apiEditMessage, sendMessage as apiSendMessage } from '@/utils/api/messages';
import { uploadFile } from '@/utils/api/media';
import { lookupUsersByName } from '@/utils/api/users';
import { transformMentions } from '@/utils/mentions';
import { sendPendingMessage } from '@/services/websocket/client';
import type { VoiceDraft } from '@/hooks/useVoiceRecorder';

export type ComposerImageMeta = Record<string, { width: number; height: number }>;

export interface SubmitComposerMessageOptions {
    content: string;
    imageMeta: ComposerImageMeta;
    voiceDraft?: VoiceDraft | null;
    clearInput: (focus?: boolean) => void;
    clearMediaPreview: () => void;
    clearVoiceDraft?: () => void;
}

function withOptionalImageMeta(imageMeta: ComposerImageMeta) {
    return Object.keys(imageMeta).length > 0 ? imageMeta : undefined;
}

async function appendUploadedVoice(content: string, voiceDraft?: VoiceDraft | null) {
    if (!voiceDraft) return content;

    const result = await uploadFile(voiceDraft.file);
    if (!result.status || !result.url) {
        throw new Error(result.error || '语音上传失败');
    }

    const voiceBBCode = `[audio]${result.url}[/audio]`;
    return content ? `${content}\n${voiceBBCode}` : voiceBBCode;
}

async function submitEdit(content: string, imageMeta: ComposerImageMeta, clearInput: (focus?: boolean) => void) {
    if (!editingMessage.value) return;

    let finalContent = content;
    if (editingMessage.value.hiddenQuote) {
        finalContent = `${editingMessage.value.hiddenQuote}\n${content}`;
    }

    finalContent = await transformMentions(finalContent, lookupUsersByName);

    const result = await apiEditMessage(Number(editingMessage.value.id), finalContent);
    if (!result.status) {
        alert(result.error || '编辑失败');
    } else {
        clearInput();

        const meta = withOptionalImageMeta(imageMeta);
        if (meta) {
            updateMessage(Number(editingMessage.value.id), { image_meta: meta });
        }
    }
    cancelReplyOrEdit();
}

async function submitNewMessage(
    content: string,
    imageMeta: ComposerImageMeta,
    voiceDraft: VoiceDraft | null | undefined,
    clearInput: (focus?: boolean) => void,
    clearMediaPreview: () => void,
    clearVoiceDraft?: () => void,
) {
    const reply = replyingTo.value;
    const contentWithVoice = voiceDraft ? await appendUploadedVoice(content, voiceDraft) : content;
    const quotedContent = reply ? `[quote=${reply.id}][/quote]${contentWithVoice}` : contentWithVoice;
    const transformedContent = await transformMentions(quotedContent, lookupUsersByName);
    const meta = withOptionalImageMeta(imageMeta);

    const user = userInfo.value;
    const { tempId, stableKey } = addOptimisticMessage(
        transformedContent,
        { id: user.id, nickname: user.nickname, avatar: user.avatar },
        reply ? Number(reply.id) : undefined,
        reply ? { uid: Number(reply.uid), nickname: reply.user, avatar: reply.avatar, content: reply.text } : undefined,
        meta
    );

    sendPendingMessage(stableKey, transformedContent);

    clearInput(true);
    clearMediaPreview();
    clearVoiceDraft?.();
    clearDraft();
    cancelReplyOrEdit();

    const result = await apiSendMessage(transformedContent);
    if (!result.status) {
        removeOptimisticMessage(tempId);
        alert(result.error || '发送失败');
    } else {
        void confirmSentMessage(transformedContent).then((message) => {
            if (message) addMessage(message, stableKey);
        });
    }
}

export async function submitComposerMessage({
    content,
    imageMeta,
    voiceDraft,
    clearInput,
    clearMediaPreview,
    clearVoiceDraft,
}: SubmitComposerMessageOptions) {
    const trimmedContent = content.trim();

    if (editingMessage.value) {
        if (!trimmedContent) return;
        await submitEdit(trimmedContent, imageMeta, clearInput);
        return;
    }

    if (!trimmedContent && !voiceDraft) return;

    await submitNewMessage(trimmedContent, imageMeta, voiceDraft, clearInput, clearMediaPreview, clearVoiceDraft);
}
