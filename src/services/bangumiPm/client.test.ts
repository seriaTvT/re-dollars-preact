// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
import { createPm, sendPmReply } from './client';
import type { BangumiPmConversationDetail } from '@/types/pm';

const conversationHtml = `
    <div id="contentPM">
        <div class="pm-chat-header"><div class="pm-chat-title"><strong><a href="/user/peer">Peer</a></strong></div></div>
        <div class="pm-message-list"><div id="msg_11" class="pm-message pm-message-self">
            <a href="/user/me"></a><div class="pm-message-body">sent</div>
            <div class="pm-message-info"><small>2026-7-5 02:04 / del</small></div>
        </div></div>
        <form id="pmReplyForm" action="/pm/create.chii">
            <input name="formhash" value="redacted"><input name="msg_receivers" value="peer"><input name="related" value="11">
        </form>
    </div>
`;

function htmlResponse(html: string, url: string, ok = true, status = 200) {
    return { ok, status, url, text: vi.fn().mockResolvedValue(html) } as unknown as Response;
}

afterEach(() => vi.unstubAllGlobals());

describe('Bangumi PM client', () => {
    it('submits replies with the native hidden fields', async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            htmlResponse(conversationHtml, 'https://bgm.tv/pm/conversation/9.chii')
        );
        vi.stubGlobal('fetch', fetchMock);
        const detail = {
            id: '9', nickname: 'Peer', username: 'peer', avatar: '', messages: [],
            previousPageUrl: null,
            replyForm: {
                action: '/pm/create.chii',
                fields: { formhash: 'redacted', msg_receivers: 'peer', related: '10' },
            },
        } satisfies BangumiPmConversationDetail;

        const result = await sendPmReply(detail, 'hello');
        expect(result.status).toBe('sent');
        expect(fetchMock).toHaveBeenCalledWith('/pm/create.chii', expect.objectContaining({ method: 'POST' }));
        const body = fetchMock.mock.calls[0][1].body as URLSearchParams;
        expect(body.get('formhash')).toBe('redacted');
        expect(body.get('msg_receivers')).toBe('peer');
        expect(body.get('related')).toBe('10');
        expect(body.get('msg_body')).toBe('hello');
        expect(body.get('submit')).toBe('发送');
    });

    it('loads the native compose form before creating a conversation', async () => {
        const fetchMock = vi.fn()
            .mockResolvedValueOnce(htmlResponse(`
                <form id="pmForm" action="/pm/create.chii">
                    <input name="formhash" value="redacted"><input name="msg_receivers" value="">
                </form>
            `, 'https://bgm.tv/pm/compose.chii'))
            .mockResolvedValueOnce(htmlResponse(conversationHtml, 'https://bgm.tv/pm/conversation/9.chii'));
        vi.stubGlobal('fetch', fetchMock);

        const result = await createPm('peer', 'topic', 'hello');
        expect(result.status).toBe('sent');
        expect(fetchMock.mock.calls[0][0]).toBe('/pm/compose.chii');
        const body = fetchMock.mock.calls[1][1].body as URLSearchParams;
        expect(body.get('msg_receivers')).toBe('peer');
        expect(body.get('msg_title')).toBe('topic');
        expect(body.get('msg_body')).toBe('hello');
    });

    it('does not retry when the send request fails', async () => {
        const fetchMock = vi.fn().mockRejectedValue(new TypeError('network'));
        vi.stubGlobal('fetch', fetchMock);
        const detail = {
            id: '9', nickname: 'Peer', username: 'peer', avatar: '', messages: [],
            previousPageUrl: null,
            replyForm: { action: '/pm/create.chii', fields: { formhash: 'redacted' } },
        } satisfies BangumiPmConversationDetail;

        const result = await sendPmReply(detail, 'hello');
        expect(result.status).toBe('unknown');
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});
