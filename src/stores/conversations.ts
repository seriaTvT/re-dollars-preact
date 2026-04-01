import { signal } from '@preact/signals';
import type { Conversation } from '@/types';

// 会话列表
export const conversations = signal<Conversation[]>([
    {
        id: 'dollars',
        type: 'channel',
        title: 'Re:Dollars',
        avatar: 'https://lsky.ry.mk/i/2025/09/06/68bc5540a8c51.webp',
        lastMessage: { text: '', timestamp: 0 },
        unreadCount: 0
    }
]);

export const activeConversationId = signal('dollars');

/**
 * 设置当前会话
 */
export function setActiveConversation(conversationId: string) {
    activeConversationId.value = conversationId;

    // 清除扩展项的激活状态并调用 onDeactivate 回调
    // 使用动态导入避免循环依赖
    import('./extensionConversations').then(({ activeExtensionId, extensionConversations }) => {
        if (activeExtensionId.value !== null) {
            // 找到当前激活的扩展项并调用其 onDeactivate
            const activeExt = extensionConversations.value.find(
                (item: { id: string }) => item.id === activeExtensionId.value
            );
            if (activeExt?.onDeactivate) {
                activeExt.onDeactivate();
            }
            activeExtensionId.value = null;
        }
    });
}

/**
 * 更新会话最后消息
 */
export function updateConversationLastMessage(conversationId: string, text: string, timestamp: number) {
    const updated = conversations.value.map(conv =>
        conv.id === conversationId
            ? { ...conv, lastMessage: { text, timestamp } }
            : conv
    );
    // 按时间排序 (就地排序，避免额外数组分配)
    updated.sort((a, b) => (b.lastMessage.timestamp || 0) - (a.lastMessage.timestamp || 0));
    conversations.value = updated;
}
