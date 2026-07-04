import type {
    BangumiPmComposeForm,
    BangumiPmConversationDetail,
    BangumiPmSendOutcome,
} from '@/types/pm';
import {
    findPmError,
    parsePmComposeForm,
    parsePmConversation,
    parsePmInbox,
    toSameOriginPmPath,
} from './parser';

const HTML_HEADERS = { Accept: 'text/html,application/xhtml+xml' };

async function fetchHtml(path: string, init: RequestInit = {}) {
    const response = await fetch(path, {
        ...init,
        credentials: 'same-origin',
        headers: { ...HTML_HEADERS, ...init.headers },
    });
    const html = await response.text();
    return { response, html };
}

export async function fetchPmInbox(path = '/pm/inbox.chii', signal?: AbortSignal) {
    const safePath = toSameOriginPmPath(path);
    if (!safePath || (!safePath.startsWith('/pm/inbox') && !safePath.startsWith('/pm/conversation/'))) {
        throw new Error('无效的 Bangumi 短信列表地址');
    }
    const { response, html } = await fetchHtml(safePath, { signal });
    if (!response.ok) throw new Error(`Bangumi 短信列表请求失败 (${response.status})`);
    return parsePmInbox(html, response.url || new URL(safePath, window.location.origin).href);
}

export async function fetchPmConversation(path: string, signal?: AbortSignal) {
    const safePath = toSameOriginPmPath(path);
    if (!safePath?.startsWith('/pm/conversation/')) throw new Error('无效的 Bangumi 短信地址');
    const { response, html } = await fetchHtml(safePath, { signal });
    if (!response.ok) throw new Error(`Bangumi 短信会话请求失败 (${response.status})`);
    return parsePmConversation(html, response.url || new URL(safePath, window.location.origin).href);
}

export async function fetchPmComposeForm(signal?: AbortSignal): Promise<BangumiPmComposeForm> {
    const { response, html } = await fetchHtml('/pm/compose.chii', { signal });
    if (!response.ok) throw new Error(`Bangumi 短信表单请求失败 (${response.status})`);
    return parsePmComposeForm(html, response.url || new URL('/pm/compose.chii', window.location.origin).href);
}

async function submitPm(fields: Record<string, string>, action: string): Promise<BangumiPmSendOutcome> {
    const params = new URLSearchParams(fields);
    params.set('submit', '发送');
    let result: Awaited<ReturnType<typeof fetchHtml>>;
    try {
        result = await fetchHtml(action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: params,
        });
    } catch {
        return { status: 'unknown', error: '网络异常，短信可能已经发送' };
    }

    if (!result.response.ok) {
        return { status: 'unknown', error: `Bangumi 返回 ${result.response.status}，短信状态未知` };
    }
    const error = findPmError(result.html);
    if (error) return { status: 'rejected', error };
    try {
        return {
            status: 'sent',
            detail: parsePmConversation(result.html, result.response.url || window.location.origin),
        };
    } catch {
        return { status: 'unknown', error: '未能确认 Bangumi 的发送结果' };
    }
}

export function sendPmReply(detail: BangumiPmConversationDetail, body: string) {
    if (!detail.replyForm) {
        return Promise.resolve<BangumiPmSendOutcome>({ status: 'rejected', error: '当前会话缺少回复表单' });
    }
    return submitPm({ ...detail.replyForm.fields, msg_body: body }, detail.replyForm.action);
}

export async function createPm(receiver: string, title: string, body: string) {
    let compose: BangumiPmComposeForm;
    try {
        compose = await fetchPmComposeForm();
    } catch (error) {
        return { status: 'rejected', error: error instanceof Error ? error.message : '无法加载短信表单' } satisfies BangumiPmSendOutcome;
    }
    return submitPm({
        ...compose.form.fields,
        msg_receivers: receiver,
        msg_title: title,
        msg_body: body,
    }, compose.form.action);
}
