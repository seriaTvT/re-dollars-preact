// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
    createPm: vi.fn(),
    fetchPmInbox: vi.fn(async () => ({ conversations: [] as any[], nextPageUrl: null })),
    fetchPmConversation: vi.fn(async () => ({
        id: '63455',
        nickname: 'Peer',
        username: 'peer',
        avatar: '',
        messages: [] as any[],
        previousPageUrl: null as string | null,
        replyForm: null as any,
    })),
    sendPmReply: vi.fn(),
}));

vi.mock('@/services/bangumiPm/client', () => ({
    createPm: mocks.createPm,
    fetchPmConversation: mocks.fetchPmConversation,
    fetchPmInbox: mocks.fetchPmInbox,
    sendPmReply: mocks.sendPmReply,
}));

import { isChatOpen } from './chatState';
import { activeConversationId } from './conversations';
import { chatLayoutReady, isNarrowLayout, mobileChatViewActive } from './ui';
import {
    loadEarlierPmMessages,
    loadPmDetail,
    openPmConversation,
    openPmConversationFromHref,
    openPmDraftForReceiver,
    openPmForUser,
    pmConversations,
    pmDetails,
    pmEarlierMessagesError,
    pmEarlierMessagesLoading,
    pmNewMessageIds,
    pmUnreadByConversation,
    retryPmReply,
    startPmPolling,
    submitPmReply,
} from './bangumiPm';

describe('Bangumi PM polling', () => {
    beforeEach(() => {
        window.CHOBITS_UID = '1';
        isChatOpen.value = false;
        activeConversationId.value = 'dollars';
        chatLayoutReady.value = true;
        isNarrowLayout.value = false;
        mobileChatViewActive.value = false;
        pmConversations.value = [];
        pmDetails.value = {};
        pmEarlierMessagesLoading.value = new Set();
        pmEarlierMessagesError.value = {};
        pmNewMessageIds.value = new Set();
        pmUnreadByConversation.value = {};
        mocks.fetchPmInbox.mockResolvedValue({ conversations: [], nextPageUrl: null });
        mocks.fetchPmInbox.mockClear();
        mocks.fetchPmConversation.mockClear();
        mocks.createPm.mockReset();
        mocks.sendPmReply.mockReset();
    });

    it('does not load the PM inbox while a narrow Re:Dollars chat view is active', async () => {
        isNarrowLayout.value = true;
        mobileChatViewActive.value = true;
        isChatOpen.value = true;

        const stop = startPmPolling();
        await Promise.resolve();

        expect(mocks.fetchPmInbox).not.toHaveBeenCalled();
        expect(mocks.fetchPmConversation).not.toHaveBeenCalled();
        stop();
    });

    it('does not load the PM inbox before chat layout has been measured', async () => {
        chatLayoutReady.value = false;
        isNarrowLayout.value = false;
        mobileChatViewActive.value = false;
        activeConversationId.value = 'dollars';
        isChatOpen.value = true;

        const stop = startPmPolling();
        await Promise.resolve();

        expect(mocks.fetchPmInbox).not.toHaveBeenCalled();
        expect(mocks.fetchPmConversation).not.toHaveBeenCalled();
        stop();
    });

    it('does not load the PM inbox when narrow layout becomes ready in the Re:Dollars chat view', async () => {
        chatLayoutReady.value = false;
        isNarrowLayout.value = true;
        mobileChatViewActive.value = false;
        activeConversationId.value = 'dollars';
        isChatOpen.value = true;

        const stop = startPmPolling();
        await Promise.resolve();
        expect(mocks.fetchPmInbox).not.toHaveBeenCalled();

        mobileChatViewActive.value = true;
        chatLayoutReady.value = true;
        await Promise.resolve();

        expect(mocks.fetchPmInbox).not.toHaveBeenCalled();
        expect(mocks.fetchPmConversation).not.toHaveBeenCalled();
        stop();
    });

    it('loads the PM inbox when narrow layout becomes ready in the conversation list view', async () => {
        chatLayoutReady.value = false;
        isNarrowLayout.value = true;
        mobileChatViewActive.value = false;
        activeConversationId.value = 'dollars';
        isChatOpen.value = true;

        const stop = startPmPolling();
        chatLayoutReady.value = true;

        await vi.waitFor(() => expect(mocks.fetchPmInbox).toHaveBeenCalledOnce());
        stop();
    });

    it('refreshes only the active PM detail in a narrow PM chat view', async () => {
        isNarrowLayout.value = true;
        mobileChatViewActive.value = true;
        activeConversationId.value = 'pm:63455';
        isChatOpen.value = true;

        const stop = startPmPolling();

        await vi.waitFor(() => expect(mocks.fetchPmConversation).toHaveBeenCalledOnce());
        expect(mocks.fetchPmInbox).not.toHaveBeenCalled();
        stop();
    });

    it('stays idle while chat is closed and ignores focus refreshes', async () => {
        const stop = startPmPolling();
        expect(mocks.fetchPmInbox).not.toHaveBeenCalled();

        window.dispatchEvent(new Event('focus'));
        await Promise.resolve();
        expect(mocks.fetchPmInbox).not.toHaveBeenCalled();
        stop();
    });

    it('opens a PM conversation directly from a native notice href', async () => {
        const opened = openPmConversationFromHref('https://bgm.tv/pm/conversation/777.chii');

        expect(opened).toBe(true);
        expect(activeConversationId.value).toBe('pm:777');
        expect(mocks.fetchPmConversation).toHaveBeenCalledWith('/pm/conversation/777.chii');
        expect(mocks.fetchPmInbox).toHaveBeenCalledOnce();
    });

    it('opens an existing PM conversation from cached user details', async () => {
        pmDetails.value = {
            '42': {
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: '',
                messages: [],
                previousPageUrl: null,
                replyForm: null,
            },
        };

        const result = await openPmForUser({ username: 'peer', nickname: 'Peer', avatar: '' });

        expect(result).toBe('conversation');
        expect(activeConversationId.value).toBe('pm:42');
        expect(mocks.fetchPmInbox).not.toHaveBeenCalled();
        expect(mocks.fetchPmConversation).toHaveBeenCalledWith('/pm/conversation/42.chii');
    });

    it('refreshes a recently cached PM detail when the inbox reports unread messages', async () => {
        mocks.fetchPmConversation.mockResolvedValue({
            id: '42',
            nickname: 'Peer',
            username: 'peer',
            avatar: '',
            messages: [],
            previousPageUrl: null,
            replyForm: null,
        });
        await loadPmDetail('42', undefined, true);
        mocks.fetchPmConversation.mockClear();

        openPmConversation({
            id: '42',
            href: '/pm/conversation/42.chii',
            nickname: 'Peer',
            avatar: '',
            dateText: '',
            lastMessage: 'new message',
            unreadCount: 1,
        });

        await vi.waitFor(() => expect(mocks.fetchPmConversation).toHaveBeenCalledWith('/pm/conversation/42.chii'));
    });

    it('queues a forced refresh when an older PM detail request is still running', async () => {
        let resolveFirst!: (detail: any) => void;
        mocks.fetchPmConversation
            .mockImplementationOnce(() => new Promise(resolve => { resolveFirst = resolve; }))
            .mockResolvedValueOnce({
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: '',
                messages: [],
                previousPageUrl: null,
                replyForm: null,
            });

        const firstRequest = loadPmDetail('42', undefined, true);
        const forcedRequest = loadPmDetail('42', undefined, true);
        resolveFirst({
            id: '42',
            nickname: 'Peer',
            username: 'peer',
            avatar: '',
            messages: [],
            previousPageUrl: null,
            replyForm: null,
        });

        await Promise.all([firstRequest, forcedRequest]);
        expect(mocks.fetchPmConversation).toHaveBeenCalledTimes(2);
    });

    it('refreshes inbox and opens an existing PM conversation by nickname', async () => {
        mocks.fetchPmInbox.mockResolvedValueOnce({
            conversations: [{
                id: '88',
                href: '/pm/conversation/88.chii',
                nickname: 'Target',
                avatar: '',
                dateText: '',
                lastMessage: 'hello',
                unreadCount: 0,
            }],
            nextPageUrl: null,
        });

        const result = await openPmForUser({ username: 'target_user', nickname: 'Target', avatar: '' });

        expect(result).toBe('conversation');
        expect(activeConversationId.value).toBe('pm:88');
        expect(mocks.fetchPmInbox).toHaveBeenCalledOnce();
        expect(mocks.fetchPmConversation).toHaveBeenCalledWith('/pm/conversation/88.chii');
    });

    it('opens a draft PM conversation when the user has no existing history', async () => {
        const result = await openPmForUser({ username: 'new_user', nickname: 'New User', avatar: 'avatar.jpg' });
        const draftId = 'draft:new_user';

        expect(result).toBe('draft');
        expect(activeConversationId.value).toBe('pm:draft:new_user');
        expect(pmDetails.value[draftId]).toMatchObject({
            id: draftId,
            nickname: 'New User',
            username: 'new_user',
            messages: [],
            previousPageUrl: null,
            replyForm: null,
            isDraft: true,
            draftTitle: '来自 Re:Dollars 的短信',
        });
        expect(mocks.fetchPmInbox).toHaveBeenCalledOnce();
        expect(mocks.fetchPmConversation).not.toHaveBeenCalled();
    });

    it('opens an existing PM conversation from a trimmed receiver', async () => {
        mocks.fetchPmInbox.mockResolvedValueOnce({
            conversations: [{
                id: '88',
                href: '/pm/conversation/88.chii',
                nickname: 'target_user',
                avatar: '',
                dateText: '',
                lastMessage: 'hello',
                unreadCount: 0,
            }],
            nextPageUrl: null,
        });

        const result = await openPmDraftForReceiver(' target_user ');

        expect(result).toEqual({ status: 'opened', target: 'conversation' });
        expect(activeConversationId.value).toBe('pm:88');
        expect(mocks.fetchPmInbox).toHaveBeenCalledOnce();
        expect(mocks.fetchPmConversation).toHaveBeenCalledWith('/pm/conversation/88.chii');
    });

    it('creates a draft PM conversation from a receiver without history', async () => {
        const result = await openPmDraftForReceiver(' new_user ');
        const draftId = 'draft:new_user';

        expect(result).toEqual({ status: 'opened', target: 'draft' });
        expect(activeConversationId.value).toBe('pm:draft:new_user');
        expect(pmDetails.value[draftId]).toMatchObject({
            id: draftId,
            nickname: 'new_user',
            username: 'new_user',
            messages: [],
            previousPageUrl: null,
            replyForm: null,
            isDraft: true,
            draftTitle: '来自 Re:Dollars 的短信',
        });
        expect(mocks.fetchPmInbox).toHaveBeenCalledOnce();
        expect(mocks.fetchPmConversation).not.toHaveBeenCalled();
    });

    it('rejects an empty PM receiver without changing the active conversation', async () => {
        const result = await openPmDraftForReceiver('   ');

        expect(result).toEqual({ status: 'rejected', error: '请输入收件人' });
        expect(activeConversationId.value).toBe('dollars');
        expect(pmDetails.value).toEqual({});
        expect(mocks.fetchPmInbox).not.toHaveBeenCalled();
        expect(mocks.fetchPmConversation).not.toHaveBeenCalled();
    });

    it('prepends earlier PM messages and advances the history cursor', async () => {
        pmDetails.value = {
            '42': {
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: 'peer.jpg',
                messages: [{
                    id: '20',
                    isSelf: false,
                    avatar: '',
                    userHref: '/user/peer',
                    bodyHtml: 'newer',
                    bodyText: 'newer',
                    presentationText: 'newer',
                    timestamp: 20,
                    timestampText: 'newer',
                }],
                previousPageUrl: '/pm/conversation/42.chii?page=1&before_msg_id=20',
                replyForm: { action: '/pm/conversation/42.chii', fields: {} },
            },
        };
        mocks.fetchPmConversation.mockResolvedValueOnce({
            id: '42',
            nickname: 'Peer',
            username: 'peer',
            avatar: 'peer.jpg',
            messages: [{
                id: '10',
                isSelf: false,
                avatar: '',
                userHref: '/user/peer',
                bodyHtml: 'older',
                bodyText: 'older',
                presentationText: 'older',
                timestamp: 10,
                timestampText: 'older',
            }],
            previousPageUrl: '/pm/conversation/42.chii?page=1&before_msg_id=10',
            replyForm: { action: '/pm/conversation/42.chii', fields: {} },
        });

        await loadEarlierPmMessages('42');

        expect(mocks.fetchPmConversation).toHaveBeenCalledWith('/pm/conversation/42.chii?page=1&before_msg_id=20');
        expect(pmDetails.value['42'].messages.map(message => message.id)).toEqual(['10', '20']);
        expect(pmDetails.value['42'].previousPageUrl).toBe('/pm/conversation/42.chii?page=1&before_msg_id=10');
        expect(pmEarlierMessagesLoading.value.has('42')).toBe(false);
    });

    it('stops PM history loading when the earlier page does not advance', async () => {
        pmDetails.value = {
            '42': {
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: 'peer.jpg',
                messages: [{
                    id: '10',
                    isSelf: false,
                    avatar: '',
                    userHref: '/user/peer',
                    bodyHtml: 'oldest',
                    bodyText: 'oldest',
                    presentationText: 'oldest',
                    timestamp: 10,
                    timestampText: 'oldest',
                }],
                previousPageUrl: '/pm/conversation/42.chii?page=1&before_msg_id=10',
                replyForm: { action: '/pm/conversation/42.chii', fields: {} },
            },
        };
        mocks.fetchPmConversation.mockResolvedValueOnce({
            id: '42',
            nickname: 'Peer',
            username: 'peer',
            avatar: 'peer.jpg',
            messages: [{
                id: '10',
                isSelf: false,
                avatar: '',
                userHref: '/user/peer',
                bodyHtml: 'oldest',
                bodyText: 'oldest',
                presentationText: 'oldest',
                timestamp: 10,
                timestampText: 'oldest',
            }],
            previousPageUrl: '/pm/conversation/42.chii?page=1&before_msg_id=10',
            replyForm: { action: '/pm/conversation/42.chii', fields: {} },
        });

        await loadEarlierPmMessages('42');
        await loadEarlierPmMessages('42');

        expect(mocks.fetchPmConversation).toHaveBeenCalledOnce();
        expect(pmDetails.value['42'].messages.map(message => message.id)).toEqual(['10']);
        expect(pmDetails.value['42'].previousPageUrl).toBeNull();
    });

    it('keeps loaded PM history when refreshing the latest page', async () => {
        pmDetails.value = {
            '42': {
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: 'peer.jpg',
                messages: [{
                    id: '10',
                    isSelf: false,
                    avatar: '',
                    userHref: '/user/peer',
                    bodyHtml: 'older',
                    bodyText: 'older',
                    presentationText: 'older',
                    timestamp: 10,
                    timestampText: 'older',
                }, {
                    id: '20',
                    isSelf: false,
                    avatar: '',
                    userHref: '/user/peer',
                    bodyHtml: 'current',
                    bodyText: 'current',
                    presentationText: 'current',
                    timestamp: 20,
                    timestampText: 'current',
                }],
                previousPageUrl: '/pm/conversation/42.chii?page=1&before_msg_id=10',
                replyForm: { action: '/pm/conversation/42.chii', fields: {} },
            },
        };
        mocks.fetchPmConversation.mockResolvedValueOnce({
            id: '42',
            nickname: 'Peer',
            username: 'peer',
            avatar: 'peer.jpg',
            messages: [{
                id: '20',
                isSelf: false,
                avatar: '',
                userHref: '/user/peer',
                bodyHtml: 'current',
                bodyText: 'current',
                presentationText: 'current',
                timestamp: 20,
                timestampText: 'current',
            }, {
                id: '21',
                isSelf: false,
                avatar: '',
                userHref: '/user/peer',
                bodyHtml: 'fresh',
                bodyText: 'fresh',
                presentationText: 'fresh',
                timestamp: 21,
                timestampText: 'fresh',
            }],
            previousPageUrl: '/pm/conversation/42.chii?page=1&before_msg_id=20',
            replyForm: { action: '/pm/conversation/42.chii', fields: {} },
        });

        await loadPmDetail('42', undefined, true);

        expect(pmDetails.value['42'].messages.map(message => message.id)).toEqual(['10', '20', '21']);
        expect(pmDetails.value['42'].previousPageUrl).toBe('/pm/conversation/42.chii?page=1&before_msg_id=10');
    });

    it('adds an optimistic PM reply and reconciles it with the sent detail', async () => {
        pmDetails.value = {
            '42': {
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: 'peer.jpg',
                messages: [],
                previousPageUrl: null,
                replyForm: { action: '/pm/conversation/42.chii', fields: {} },
            },
        };
        let resolveSend: (value: any) => void = () => {};
        mocks.sendPmReply.mockReturnValue(new Promise(resolve => { resolveSend = resolve; }));

        const pending = submitPmReply('42', 'hello');

        const optimistic = pmDetails.value['42'].messages[0];
        expect(optimistic).toMatchObject({
            isSelf: true,
            bodyText: 'hello',
            state: 'sending',
        });
        expect(optimistic.id).toMatch(/^temp-/);
        expect(pmNewMessageIds.value.has(optimistic.id)).toBe(true);

        resolveSend({
            status: 'sent',
            detail: {
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: 'peer.jpg',
                messages: [{
                    id: '99',
                    isSelf: true,
                    avatar: '',
                    userHref: '/user/me',
                    bodyHtml: 'hello',
                    bodyText: 'hello',
                    presentationText: 'hello',
                    timestamp: optimistic.timestamp,
                    timestampText: '刚刚',
                }],
                previousPageUrl: null,
                replyForm: { action: '/pm/conversation/42.chii', fields: {} },
            },
        });
        await pending;

        expect(pmDetails.value['42'].messages).toHaveLength(1);
        expect(pmDetails.value['42'].messages[0].id).toBe('99');
        expect(pmDetails.value['42'].messages[0]).toMatchObject({
            stableKey: optimistic.stableKey,
            state: 'sent',
        });
        expect(pmNewMessageIds.value.has('99')).toBe(false);
    });

    it('reconciles quoted optimistic PM replies when Bangumi removes quote-adjacent whitespace', async () => {
        pmDetails.value = {
            '42': {
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: 'peer.jpg',
                messages: [],
                previousPageUrl: null,
                replyForm: { action: '/pm/conversation/42.chii', fields: {} },
            },
        };
        let resolveSend: (value: any) => void = () => {};
        mocks.sendPmReply.mockReturnValue(new Promise(resolve => { resolveSend = resolve; }));

        const pending = submitPmReply('42', '[quote]hello[/quote]\nreply');

        const optimistic = pmDetails.value['42'].messages[0];
        expect(optimistic).toMatchObject({
            bodyText: '[quote]hello[/quote]\nreply',
            state: 'sending',
        });

        resolveSend({
            status: 'sent',
            detail: {
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: 'peer.jpg',
                messages: [{
                    id: '100',
                    isSelf: true,
                    avatar: '',
                    userHref: '/user/me',
                    bodyHtml: '<blockquote class="chat-quote"></blockquote>reply',
                    bodyText: 'helloreply',
                    presentationText: '[quote]hello[/quote]reply',
                    timestamp: optimistic.timestamp,
                    timestampText: '刚刚',
                }],
                previousPageUrl: null,
                replyForm: { action: '/pm/conversation/42.chii', fields: {} },
            },
        });
        await pending;

        expect(pmDetails.value['42'].messages).toHaveLength(1);
        expect(pmDetails.value['42'].messages[0]).toMatchObject({
            id: '100',
            stableKey: optimistic.stableKey,
            state: 'sent',
        });
    });

    it('sends the first draft PM through createPm and switches to the real conversation', async () => {
        const draftId = 'draft:new_user';
        pmDetails.value = {
            [draftId]: {
                id: draftId,
                nickname: 'New User',
                username: 'new_user',
                avatar: 'peer.jpg',
                messages: [],
                previousPageUrl: null,
                replyForm: null,
                isDraft: true,
                draftTitle: '来自 Re:Dollars 的短信',
            },
        };
        activeConversationId.value = `pm:${draftId}`;
        let resolveSend: (value: any) => void = () => {};
        mocks.createPm.mockReturnValue(new Promise(resolve => { resolveSend = resolve; }));

        const pending = submitPmReply(draftId, 'hello');

        const optimistic = pmDetails.value[draftId].messages[0];
        expect(optimistic).toMatchObject({
            isSelf: true,
            bodyText: 'hello',
            state: 'sending',
        });
        expect(mocks.createPm).toHaveBeenCalledWith('new_user', '来自 Re:Dollars 的短信', 'hello');
        expect(mocks.sendPmReply).not.toHaveBeenCalled();

        resolveSend({
            status: 'sent',
            detail: {
                id: '99',
                nickname: 'New User',
                username: 'new_user',
                avatar: 'peer.jpg',
                messages: [{
                    id: '500',
                    isSelf: true,
                    avatar: '',
                    userHref: '/user/me',
                    bodyHtml: 'hello',
                    bodyText: 'hello',
                    presentationText: 'hello',
                    timestamp: optimistic.timestamp,
                    timestampText: '刚刚',
                }],
                previousPageUrl: null,
                replyForm: { action: '/pm/conversation/99.chii', fields: {} },
            },
        });
        await pending;

        expect(pmDetails.value[draftId]).toBeUndefined();
        expect(pmDetails.value['99'].messages).toHaveLength(1);
        expect(pmDetails.value['99'].messages[0]).toMatchObject({
            id: '500',
            stableKey: optimistic.stableKey,
            state: 'sent',
        });
        expect(activeConversationId.value).toBe('pm:99');
    });

    it('marks a rejected draft PM failed and retries it through createPm', async () => {
        const draftId = 'draft:new_user';
        pmDetails.value = {
            [draftId]: {
                id: draftId,
                nickname: 'New User',
                username: 'new_user',
                avatar: 'peer.jpg',
                messages: [],
                previousPageUrl: null,
                replyForm: null,
                isDraft: true,
                draftTitle: '来自 Re:Dollars 的短信',
            },
        };
        activeConversationId.value = `pm:${draftId}`;
        mocks.createPm.mockResolvedValueOnce({ status: 'rejected', error: 'too fast' });

        const result = await submitPmReply(draftId, 'hello');
        const failed = pmDetails.value[draftId].messages[0];

        expect(result).toEqual({ status: 'rejected', error: 'too fast' });
        expect(failed.state).toBe('failed');
        expect(failed.timestampText).toBe('发送失败');

        mocks.createPm.mockResolvedValueOnce({
            status: 'sent',
            detail: {
                id: '100',
                nickname: 'New User',
                username: 'new_user',
                avatar: 'peer.jpg',
                messages: [{
                    id: '501',
                    isSelf: true,
                    avatar: '',
                    userHref: '/user/me',
                    bodyHtml: 'hello',
                    bodyText: 'hello',
                    presentationText: 'hello',
                    timestamp: failed.timestamp,
                    timestampText: '刚刚',
                }],
                previousPageUrl: null,
                replyForm: { action: '/pm/conversation/100.chii', fields: {} },
            },
        });

        await retryPmReply(draftId, failed.id);

        expect(mocks.createPm).toHaveBeenLastCalledWith('new_user', '来自 Re:Dollars 的短信', 'hello');
        expect(pmDetails.value[draftId]).toBeUndefined();
        expect(pmDetails.value['100'].messages[0].id).toBe('501');
        expect(activeConversationId.value).toBe('pm:100');
    });

    it('keeps an unknown draft PM pending without loading a fake conversation URL', async () => {
        const draftId = 'draft:new_user';
        pmDetails.value = {
            [draftId]: {
                id: draftId,
                nickname: 'New User',
                username: 'new_user',
                avatar: 'peer.jpg',
                messages: [],
                previousPageUrl: null,
                replyForm: null,
                isDraft: true,
                draftTitle: '来自 Re:Dollars 的短信',
            },
        };
        mocks.createPm.mockResolvedValueOnce({ status: 'unknown', error: 'unknown' });

        await submitPmReply(draftId, 'hello');

        expect(pmDetails.value[draftId].messages).toHaveLength(1);
        expect(pmDetails.value[draftId].messages[0]).toMatchObject({
            bodyText: 'hello',
            state: 'sending',
        });
        expect(mocks.fetchPmConversation).not.toHaveBeenCalled();
        expect(mocks.fetchPmInbox).toHaveBeenCalledOnce();
    });

    it('marks an optimistic PM reply failed when Bangumi rejects it and retries from the failed bubble', async () => {
        pmDetails.value = {
            '42': {
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: 'peer.jpg',
                messages: [],
                previousPageUrl: null,
                replyForm: { action: '/pm/conversation/42.chii', fields: {} },
            },
        };
        mocks.sendPmReply.mockResolvedValueOnce({ status: 'rejected', error: 'too fast' });

        const result = await submitPmReply('42', 'hello');
        const failed = pmDetails.value['42'].messages[0];

        expect(result).toEqual({ status: 'rejected', error: 'too fast' });
        expect(failed.state).toBe('failed');
        expect(failed.timestampText).toBe('发送失败');

        mocks.sendPmReply.mockResolvedValueOnce({
            status: 'sent',
            detail: {
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: 'peer.jpg',
                messages: [{
                    id: '100',
                    isSelf: true,
                    avatar: '',
                    userHref: '/user/me',
                    bodyHtml: 'hello',
                    bodyText: 'hello',
                    presentationText: 'hello',
                    timestamp: failed.timestamp,
                    timestampText: '刚刚',
                }],
                previousPageUrl: null,
                replyForm: { action: '/pm/conversation/42.chii', fields: {} },
            },
        });

        await retryPmReply('42', failed.id);

        expect(mocks.sendPmReply).toHaveBeenLastCalledWith(expect.anything(), 'hello');
        expect(pmDetails.value['42'].messages).toHaveLength(1);
        expect(pmDetails.value['42'].messages[0].id).toBe('100');
    });

    it('keeps unknown PM replies pending when a forced refresh cannot confirm them', async () => {
        pmDetails.value = {
            '42': {
                id: '42',
                nickname: 'Peer',
                username: 'peer',
                avatar: 'peer.jpg',
                messages: [],
                previousPageUrl: null,
                replyForm: { action: '/pm/conversation/42.chii', fields: {} },
            },
        };
        mocks.sendPmReply.mockResolvedValueOnce({ status: 'unknown', error: 'unknown' });
        mocks.fetchPmConversation.mockResolvedValueOnce({
            id: '42',
            nickname: 'Peer',
            username: 'peer',
            avatar: 'peer.jpg',
            messages: [],
            previousPageUrl: null,
            replyForm: { action: '/pm/conversation/42.chii', fields: {} },
        } as any);

        await submitPmReply('42', 'hello');

        expect(pmDetails.value['42'].messages).toHaveLength(1);
        expect(pmDetails.value['42'].messages[0]).toMatchObject({
            bodyText: 'hello',
            state: 'sending',
        });
    });
});
