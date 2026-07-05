import { getRawMessage } from '@/stores/messageStore';
import type { BangumiPmConversationDetail, BangumiPmMessage } from '@/types/pm';

export type MessageActionTarget =
    | { kind: 'dollars'; id: string }
    | { kind: 'pm'; conversationId: string; id: string };

const REPLY_SUMMARY_MAX_LENGTH = 50;

function truncateReplySummary(text: string) {
    const isTruncated = text.length > REPLY_SUMMARY_MAX_LENGTH;
    let summary = text.slice(0, REPLY_SUMMARY_MAX_LENGTH);
    if (!isTruncated) return summary;

    summary = summary.replace(/\[\/?[a-zA-Z]*$/g, '');
    const openMasks = (summary.match(/\[mask\]/gi) || []).length;
    const closeMasks = (summary.match(/\[\/mask\]/gi) || []).length;
    return openMasks > closeMasks ? `${summary}[/mask]` : summary;
}

function fallbackForMedia(text: string) {
    if (/\[img\][\s\S]*?\[\/img\]/i.test(text)) return '[图片]';
    if (/\[file=[^\]]*\][\s\S]*?\[\/file\]/i.test(text)) return '[附件]';
    if (/\[(?:audio|video)[^\]]*\][\s\S]*?\[\/(?:audio|video)\]/i.test(text)) return '[媒体]';
    if (/\[(?:sticker|emoji)[^\]]*\][\s\S]*?\[\/(?:sticker|emoji)\]/i.test(text)) return '[表情]';
    return '';
}

export function summarizeReplyText(text: string) {
    const withoutQuotes = (text || '').replace(/\[quote[^\]]*\][\s\S]*?\[\/quote\]/gi, '');
    const mediaFallback = fallbackForMedia(withoutQuotes);
    const summary = withoutQuotes
        .replace(/\[img\][\s\S]*?\[\/img\]/gi, '')
        .replace(/\[(?:sticker|emoji|audio|video)[^\]]*\][\s\S]*?\[\/(?:sticker|emoji|audio|video)\]/gi, '')
        .replace(/\[file=[^\]]*\][\s\S]*?\[\/file\]/gi, '')
        .replace(/\[url=[^\]]*\]([\s\S]*?)\[\/url\]/gi, '$1')
        .replace(/\[url\]([\s\S]*?)\[\/url\]/gi, '$1')
        .replace(/\[user=[^\]]*\]([\s\S]*?)\[\/user\]/gi, '@$1')
        .replace(/\[(b|i|u|s|code|color|size|font|center|right|left)[^\]]*\]([\s\S]*?)\[\/\1\]/gi, '$2')
        .replace(/\[(?!mask|\/mask)[^\]]+\]/g, '')
        .replace(/\[mask\]\s*\[\/mask\]/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

    return truncateReplySummary(summary || mediaFallback);
}

export function rawPmMessageText(message: BangumiPmMessage | null | undefined) {
    return message?.rawBody || message?.presentationText || message?.bodyText || '';
}

export function findPmMessage(detail: BangumiPmConversationDetail | null | undefined, messageId: string) {
    return detail?.messages.find(message => message.id === messageId) || null;
}

export function rawMessageForTarget(
    target: MessageActionTarget | null | undefined,
    pmDetail?: BangumiPmConversationDetail | null
) {
    if (!target) return '';
    if (target.kind === 'dollars') return getRawMessage(target.id) || '';
    return rawPmMessageText(findPmMessage(pmDetail, target.id));
}

export async function copyRawMessageText(raw: string) {
    const text = raw.trim();
    if (!text) return false;
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}
