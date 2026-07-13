import { conversations, activeConversationId, setActiveConversation } from '@/stores/conversations';
import { isNarrowLayout, setMobileChatView } from '@/stores/ui';
import { extensionConversations, activeExtensionId, setActiveExtension } from '@/stores/extensionConversations';
import { formatDate } from '@/utils/format';
import {
    loadMorePmConversations,
    openPmConversation,
    pmConversations,
    pmInboxError,
    pmInboxLoading,
    pmMoreInboxLoading,
    pmNextInboxPage,
} from '@/stores/bangumiPm';

export function ConversationList({ searchTerm = '' }: { searchTerm?: string }) {
    const query = searchTerm.toLowerCase();
    const activeId = activeConversationId.value;
    const isNarrow = isNarrowLayout.value;
    // 过滤扩展会话项
    const extensionItems = extensionConversations.value
        .filter(item => !query || item.title.toLowerCase().includes(query))
        .sort((a, b) => (b.priority || 0) - (a.priority || 0));

    const filteredConversations = query
        ? conversations.value.filter(conv =>
            conv.title.toLowerCase().includes(query)
        )
        : conversations.value;
    const filteredPmConversations = query
        ? pmConversations.value.filter(conversation =>
            `${conversation.nickname} ${conversation.lastMessage}`.toLowerCase().includes(query)
        )
        : pmConversations.value;

    const handleClick = (conversationId: string) => {
        setActiveConversation(conversationId);
        // 在 narrow 模式下，切换到聊天视图
        if (isNarrow) {
            setMobileChatView(true);
        }
    };

    const handleExtensionClick = (item: typeof extensionItems[0]) => {
        setActiveExtension(item.id);
        item.onClick();
        // 在 narrow 模式下，切换到聊天视图
        if (isNarrow) {
            setMobileChatView(true);
        }
    };

    return (
        <div id="dollars-conversation-list">
            {/* 扩展项 (置于顶部) */}
            {extensionItems.map(item => {
                const isActive = item.id === activeExtensionId.value;
                return (
                    <div
                        key={`ext-${item.id}`}
                        class={`conversation-item extension-item ${isActive ? 'active' : ''}`}
                        onClick={() => handleExtensionClick(item)}
                    >
                        <img src={item.avatar} class="avatar" alt={item.title} loading="lazy" />
                        <div class="dollars-conv-content">
                            <div class="dollars-conv-title">
                                <span class="dollars-conv-nickname">{item.title}</span>
                            </div>
                            {item.subtitle && <div class="dollars-conv-last-message">{item.subtitle}</div>}
                        </div>
                        {item.badge && <div class="unread-badge">{item.badge}</div>}
                    </div>
                );
            })}
            {/* 原有会话列表 */}
            {filteredConversations.map(conv => {
                const isActive = conv.id === activeId;
                const title = conv.type === 'channel' ? conv.title : conv.user?.nickname || conv.title;
                const avatarUrl = conv.type === 'channel' ? conv.avatar : conv.user?.avatar || conv.avatar;
                const lastMessageText = (conv.lastMessage.text || '').replace(/\[.*?\]/g, '').trim();
                const timeText = conv.lastMessage.timestamp ? formatDate(conv.lastMessage.timestamp, 'time') : '';

                return (
                    <div
                        key={conv.id}
                        class={`conversation-item ${isActive ? 'active' : ''}`}
                        data-conversation-id={conv.id}
                        onClick={() => handleClick(conv.id)}
                    >
                        <img src={avatarUrl} class="avatar" alt={title} loading="lazy" />
                        <div class="dollars-conv-content">
                            <div class="dollars-conv-title">
                                <span class="dollars-conv-nickname">{title}</span>
                                <span class="dollars-conv-timestamp">{timeText}</span>
                            </div>
                            <div class="dollars-conv-last-message">{lastMessageText || ' '}</div>
                        </div>
                        {conv.unreadCount > 0 && (
                            <div class="unread-badge">{conv.unreadCount}</div>
                        )}
                    </div>
                );
            })}
            {filteredPmConversations.map(conversation => {
                const conversationId = `pm:${conversation.id}`;
                return (
                    <div
                        key={conversationId}
                        class={`conversation-item ${activeId === conversationId ? 'active' : ''}`}
                        data-conversation-id={conversationId}
                        onClick={() => openPmConversation(conversation)}
                    >
                        <img src={conversation.avatar || '/img/no_icon_subject.png'} class="avatar" alt={conversation.nickname} loading="lazy" />
                        <div class="dollars-conv-content">
                            <div class="dollars-conv-title">
                                <span class="dollars-conv-nickname">{conversation.nickname}</span>
                                <span class="dollars-conv-timestamp">{conversation.dateText}</span>
                            </div>
                            <div class="dollars-conv-last-message">{conversation.lastMessage || ' '}</div>
                        </div>
                        {conversation.unreadCount > 0 && <div class="unread-badge">{conversation.unreadCount}</div>}
                    </div>
                );
            })}
            {pmInboxLoading.value && pmConversations.value.length === 0 && (
                <div class="dollars-conversation-hint">正在加载 Bangumi 短信…</div>
            )}
            {pmInboxError.value && (
                <div class="dollars-conversation-hint error">{pmInboxError.value}</div>
            )}
            {pmNextInboxPage.value && (
                <button
                    class="dollars-pm-load-more-conversations"
                    type="button"
                    disabled={pmMoreInboxLoading.value}
                    onClick={() => void loadMorePmConversations()}
                >
                    {pmMoreInboxLoading.value ? '加载中…' : '加载更多短信会话'}
                </button>
            )}
        </div>
    );
}
