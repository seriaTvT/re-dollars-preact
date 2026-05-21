import { describe, it, expect } from 'vitest';
import { adaptMessage, adaptReaction, adaptReplyDetails, adaptUser, adaptNotification } from './adapt';
import type { V2Message, V2Reaction, V2ReplyDetails, V2UserProfile, V2Notification } from './adapt';

function v2Message(over: Partial<V2Message> = {}): V2Message {
    return {
        id: 1,
        bangumiId: '1001',
        timestamp: 1700000000,
        uid: 42,
        nickname: 'alice',
        avatar: 'https://cdn/a.jpg',
        message: 'hello',
        color: null,
        isHtml: false,
        type: 'text',
        replyToId: null,
        isDeleted: null,
        editedAt: null,
        reactions: [],
        ...over,
    };
}

describe('adaptMessage', () => {
    it('maps core fields and coerces bangumiId to a number', () => {
        const m = adaptMessage(v2Message());
        expect(m.id).toBe(1);
        expect(m.uid).toBe(42);
        expect(m.message).toBe('hello');
        expect(m.bangumi_id).toBe(1001);
    });

    it('defaults null avatar/message/color', () => {
        const m = adaptMessage(v2Message({ avatar: null, message: null, color: null }));
        expect(m.avatar).toBe('');
        expect(m.message).toBe('');
        expect(m.color).toBeUndefined();
    });

    it('maps reactions, renaming userId to user_id', () => {
        const reaction: V2Reaction = {
            id: 9, messageId: 1, userId: 7, nickname: 'bob', avatar: null, emoji: '(bgm38)', createdAt: null,
        };
        const m = adaptMessage(v2Message({ reactions: [reaction] }));
        expect(m.reactions).toEqual([{ emoji: '(bgm38)', user_id: 7, nickname: 'bob', avatar: undefined }]);
    });

    it('maps replyToId and replyDetails', () => {
        const m = adaptMessage(v2Message({
            replyToId: 50,
            replyDetails: { uid: 7, nickname: 'bob', content: 'earlier', avatar: null },
        }));
        expect(m.reply_to_id).toBe(50);
        expect(m.reply_details).toEqual({ uid: 7, nickname: 'bob', avatar: '', content: 'earlier' });
    });

    it('maps imageMeta and drops the placeholder field', () => {
        const m = adaptMessage(v2Message({
            imageMeta: { 'https://cdn/x.jpg': { width: 800, height: 600, placeholder: 'blur' } },
        }));
        expect(m.image_meta).toEqual({ 'https://cdn/x.jpg': { width: 800, height: 600 } });
    });

    it('maps linkPreviews, collapsing null description/image to undefined', () => {
        const m = adaptMessage(v2Message({
            linkPreviews: { 'https://e.com': { title: 'E', description: null, image: null, url: 'https://e.com' } },
        }));
        expect(m.link_previews!['https://e.com']).toEqual({
            title: 'E', description: undefined, image: undefined, url: 'https://e.com',
        });
    });

    it('converts editedAt ISO string to unix seconds, null to undefined', () => {
        expect(adaptMessage(v2Message({ editedAt: '2024-01-01T00:00:00.000Z' })).edited_at).toBe(1704067200);
        expect(adaptMessage(v2Message({ editedAt: null })).edited_at).toBeUndefined();
    });

    it('maps isDeleted', () => {
        expect(adaptMessage(v2Message({ isDeleted: true })).is_deleted).toBe(true);
    });
});

describe('adaptReaction', () => {
    it('keeps a present avatar', () => {
        const r: V2Reaction = { id: 1, messageId: 1, userId: 7, nickname: 'b', avatar: 'a.jpg', emoji: 'x', createdAt: null };
        expect(adaptReaction(r).avatar).toBe('a.jpg');
    });
});

describe('adaptReplyDetails', () => {
    it('defaults a null avatar to empty string', () => {
        const rd: V2ReplyDetails = { uid: 1, nickname: 'b', content: 'c', avatar: null };
        expect(adaptReplyDetails(rd).avatar).toBe('');
    });
});

describe('adaptUser', () => {
    it('defaults nulls and derives the profile url from the username', () => {
        const data: V2UserProfile = { id: 42, username: 'alice', nickname: 'Alice', avatar: null, sign: null };
        const u = adaptUser(data);
        expect(u).toMatchObject({ id: 42, username: 'alice', nickname: 'Alice', avatar: '', sign: undefined });
        expect(u.url).toBe('https://bgm.tv/user/alice');
    });

    it('falls back to the id for the url when username is null', () => {
        const data: V2UserProfile = { id: 42, username: null, nickname: null, avatar: null, sign: null };
        expect(adaptUser(data).url).toBe('https://bgm.tv/user/42');
    });
});

describe('adaptNotification', () => {
    it('flattens the nested message into message_id/nickname/avatar/content', () => {
        const n: V2Notification = {
            id: 5,
            type: 'reply',
            timestamp: 1700000000,
            message: { id: 99, uid: 7, nickname: 'bob', avatar: null, content: 'hi there' },
        };
        expect(adaptNotification(n)).toEqual({
            id: 5,
            type: 'reply',
            message_id: 99,
            nickname: 'bob',
            avatar: undefined,
            content: 'hi there',
        });
    });
});
