export type BangumiPmConversation = {
    id: string;
    href: string;
    nickname: string;
    avatar: string;
    dateText: string;
    lastMessage: string;
    unreadCount: number;
};

export type BangumiPmInboxPage = {
    conversations: BangumiPmConversation[];
    nextPageUrl: string | null;
};

export type BangumiPmMessage = {
    id: string;
    isSelf: boolean;
    avatar: string;
    userHref: string;
    bodyHtml: string;
    bodyText: string;
    presentationText: string;
    timestamp: number | null;
    timestampText: string;
    topic?: string;
};

export type BangumiPmForm = {
    action: string;
    fields: Record<string, string>;
};

export type BangumiPmConversationDetail = {
    id: string;
    nickname: string;
    username: string;
    avatar: string;
    messages: BangumiPmMessage[];
    replyForm: BangumiPmForm | null;
};

export type BangumiPmComposeForm = {
    form: BangumiPmForm;
    receiver: string;
};

export type BangumiPmSendOutcome =
    | { status: 'sent'; detail: BangumiPmConversationDetail }
    | { status: 'rejected'; error: string }
    | { status: 'unknown'; error: string };
