import {
    addMessage,
    addOptimisticMessage,
    markMessageFailed,
    retryMessage,
    updateMessage,
} from '@/stores/messageStore';
import {
    cancelReplyOrEdit,
    editingMessage,
    replyingTo,
} from '@/stores/composerState';
import { clearDraft } from '@/stores/drafts';
import { userInfo } from '@/stores/user';
import { confirmSentMessage, editMessage as apiEditMessage, postChatMessage } from '@/utils/api/messages';
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

    clearInput(true);
    clearMediaPreview();
    clearVoiceDraft?.();
    clearDraft();
    cancelReplyOrEdit();

    await dispatch(tempId, stableKey, transformedContent);
}

/**
 * 发送一条乐观消息对应的内容。这是初次发送与失败重试共用的唯一出口：
 * - 'rejected'（Bangumi 明确拒绝）→ 标记失败，供用户重试；
 * - 'sent' / 'unknown' → 保留 sending 气泡，由 WS 回流或看门狗对账，
 *   绝不在此重发，从根源杜绝"发两条一样的"。
 */
async function dispatch(tempId: number, stableKey: string, content: string) {
    sendPendingMessage(stableKey, content);
    const outcome = await postChatMessage(content);
    if (outcome === 'rejected') {
        markMessageFailed(tempId);
    }
}

/**
 * 重试一条失败的消息。重发前先确认它上次是否其实已经落库——
 * 若已落库则直接对账、不重发，保证重试的幂等性。
 */
export async function retryFailedMessage(tempId: number) {
    const revived = retryMessage(tempId);
    if (!revived) return;

    const existing = await confirmSentMessage(revived.content, 2);
    if (existing) {
        addMessage(existing, revived.stableKey);
        return;
    }

    await dispatch(tempId, revived.stableKey, revived.content);
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
