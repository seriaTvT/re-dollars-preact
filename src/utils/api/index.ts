// Re-export everything from split modules for backward compatibility
export {
    fetchRecentMessages,
    fetchHistoryMessages,
    fetchNewerMessages,
    getUnreadCount,
    fetchMessageContext,
    confirmSentMessage,
    sendMessage,
    getFirstMessageIdByDate,
    editMessage,
    deleteMessage,
    toggleReaction,
    searchMessages,
    fetchNotifications,
    markNotificationRead,
    markAllNotificationsRead,
} from './messages';
export type { MessageContextResponse } from './messages';

export {
    fetchUserProfile,
    lookupUsersByName,
} from './users';

export {
    fetchGalleryMedia,
    uploadFile,
    uploadImages,
} from './media';

export {
    checkAuth,
    performLogin,
    performLogout,
} from './auth';
