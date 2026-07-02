import type { Message } from '@/types';
import { processBBCode, renderReplyQuote } from '@/utils/bbcode';
import { escapeHTML } from '@/utils/format';

export type BubbleTimestampMode = 'hidden' | 'trailing' | 'stacked' | 'overlay';

export function hasRichBubbleContent(
    messageText: string,
    hasReplyQuote: boolean,
    hasLinkPreviewCards: boolean,
    hasCollapseToggle: boolean
) {
    if (hasReplyQuote || hasLinkPreviewCards || hasCollapseToggle) {
        return true;
    }

    return /\[(?:img|emoji|sticker|audio|video|code|quote)\]|\[file=.*?\]|\((?:musume|blake)_\d+\)/i.test(messageText);
}

export function getBubbleTimestampMode(
    isGroupedWithNext: boolean,
    editedAt: number | undefined,
    isDeleted: boolean,
    isSticker: boolean,
    prefersTrailing: boolean
): BubbleTimestampMode {
    if (isGroupedWithNext && !(editedAt && !isDeleted)) {
        return 'hidden';
    }

    if (isSticker) {
        return 'overlay';
    }

    return prefersTrailing ? 'trailing' : 'stacked';
}

export function isStickerMessage(messageText: string, isDeleted: boolean | undefined, replyToId: number | undefined) {
    if (isDeleted) return false;
    const raw = (messageText || '').trim();
    return /^(\[img\][^\[]+\[\/img\]|\[(?:emoji|sticker)\][^\[]+\[\/(?:emoji|sticker)\]|\((?:musume|blake)_\d+\))$/i.test(raw) && !replyToId;
}

export function renderMessageContent(message: Message) {
    if (message.is_deleted) {
        return '<div class="text-content deleted">此消息已撤回</div>';
    }

    const previews: string[] = [];
    let html = processBBCode(
        escapeHTML(message.message),
        message.image_meta || {},
        {
            replyToId: message.reply_to_id,
            replyDetails: message.reply_details,
            previewsCollector: previews,
        },
        message.link_previews || {}
    );

    if (message.reply_to_id && message.reply_details) {
        html = renderReplyQuote(message.reply_details, message.reply_to_id) + html;
    }

    if (previews.length > 0) {
        html += '<div class="message-previews">' + previews.join('') + '</div>';
    }

    return html;
}
