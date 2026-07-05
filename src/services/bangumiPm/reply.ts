import type { BangumiPmReplyTarget } from '@/types/pm';
import { summarizeReplyText } from '@/utils/messageActions';

export function buildPmReplyBody(content: string, reply: BangumiPmReplyTarget | null) {
    const body = content.trim();
    if (!reply) return body;
    const quote = summarizeReplyText(reply.raw || reply.text) || reply.text;
    return quote ? `[quote]${quote}[/quote]\n${body}` : body;
}
