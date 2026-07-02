// Compatibility barrel for the original chat store import path.
// New code should prefer the focused modules when possible.
export { browsePosition, saveBrowsePosition, loadBrowsePosition, clearBrowsePosition, shouldRestoreBrowsePosition } from './browsePosition';
export type { BrowsePosition } from './browsePosition';

export { currentDraft, saveDraft, loadDraft, clearDraft } from './drafts';
export type { ReplyInfo, Draft } from './drafts';

export {
    lastReadId,
    pendingReadId,
    isReadStateSyncing,
    hasUnreadMessages,
    unreadCount,
    loadReadState,
    updateReadState,
    markSentMessageAsRead,
    getFirstUnreadId,
} from './readState';

export {
    conversations,
    activeConversationId,
    setActiveConversation,
    updateConversationLastMessage,
} from './conversations';

export * from './chatState';
export * from './composerState';
export * from './messageStore';
