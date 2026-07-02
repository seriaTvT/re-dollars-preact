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
import { lookupUsersByName } from '@/utils/api/users';
import { transformMentions } from '@/utils/mentions';
import { sendPendingMessage } from '@/services/websocket/client';

export type ComposerImageMeta = Record<string, { width: number; height: number }>;

export interface SubmitComposerMessageOptions {
    content: string;
    imageMeta: ComposerImageMeta;
    clearInput: (focus?: boolean) => void;
    clearMediaPreview: () => void;
}

function withOptionalImageMeta(imageMeta: ComposerImageMeta) {
    return Object.keys(imageMeta).length > 0 ? imageMeta : undefined;
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
    clearInput: (focus?: boolean) => void,
    clearMediaPreview: () => void,
) {
    const reply = replyingTo.value;
    const quotedContent = reply ? `[quote=${reply.id}][/quote]${content}` : content;
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
    clearInput,
    clearMediaPreview,
}: SubmitComposerMessageOptions) {
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    if (editingMessage.value) {
        await submitEdit(trimmedContent, imageMeta, clearInput);
        return;
    }

    await submitNewMessage(trimmedContent, imageMeta, clearInput, clearMediaPreview);
}
