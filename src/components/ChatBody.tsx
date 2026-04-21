import { useEffect, useRef } from 'preact/hooks';
import {
    messageMap,
    getMessageGrouping,
    isLoadingHistory,
    isContextLoading,
    searchQuery,
} from '@/stores/chat';
import { toggleSearch, showUserProfile } from '@/stores/ui';
import { inputAreaHeight } from '@/stores/ui';
import { MessageItem } from './MessageItem';
import { useScrollManager } from '@/hooks/useScrollManager';
import { useHistoryLoader } from '@/hooks/useHistoryLoader';

// Toast 提示

let activeToastTimer: ReturnType<typeof setTimeout> | null = null;

function showToast(message: string, duration = 2500) {
    let toast = document.getElementById('dollars-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'dollars-toast';
        const container = document.getElementById('dollars-main-chat') || document.body;
        container.appendChild(toast);
    }
    toast.classList.remove('dollars-toast-visible');
    void (toast as HTMLElement).offsetWidth;

    toast.textContent = message;
    toast.classList.add('dollars-toast-visible');

    if (activeToastTimer !== null) clearTimeout(activeToastTimer);
    activeToastTimer = setTimeout(() => {
        toast!.classList.remove('dollars-toast-visible');
        activeToastTimer = null;
    }, duration);
}

export function ChatBody() {
    // Use a ref to break the circular dependency between useScrollManager and useHistoryLoader.
    // useScrollManager needs loadHistory/loadNewerHistory callbacks,
    // useHistoryLoader needs the refs created by useScrollManager.
    const historyCallbacksRef = useRef<{ loadHistory: () => void; loadNewerHistory: () => void }>({
        loadHistory: () => {},
        loadNewerHistory: () => {},
    });

    const scrollManager = useScrollManager(
        () => historyCallbacksRef.current.loadHistory(),
        () => historyCallbacksRef.current.loadNewerHistory()
    );

    const { bodyRef, listRef, handleScroll, visibleMessageIds } = scrollManager;

    const { loadHistory, loadNewerHistory, jumpToMessage } = useHistoryLoader(scrollManager);

    // Wire the callbacks now that both hooks are initialized
    historyCallbacksRef.current.loadHistory = loadHistory;
    historyCallbacksRef.current.loadNewerHistory = loadNewerHistory;

    // 监听引用点击和话题标签点击
    useEffect(() => {
        const listEl = listRef.current;
        if (!listEl) return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // 1. 用户提及点击 - 打开用户资料面板
            const mention = target.closest('a.user-mention') as HTMLAnchorElement | null;
            if (mention) {
                e.preventDefault();
                e.stopPropagation();
                const href = mention.getAttribute('href') || '';
                const match = href.match(/^\/user\/(.+)$/);
                if (match) {
                    showUserProfile(match[1]);
                }
                return;
            }

            // 2. 话题标签点击 - 打开搜索并填入 tag
            if (target.classList.contains('chat-tag')) {
                e.preventDefault();
                e.stopPropagation();
                const tag = target.textContent?.trim();
                if (tag) {
                    toggleSearch(true);
                    searchQuery.value = tag;
                }
                return;
            }

            // 3. 查找最近的引用块
            const quote = target.closest('.chat-quote[data-jump-to-id]');
            if (quote) {
                e.preventDefault();
                e.stopPropagation();
                const id = Number((quote as HTMLElement).dataset.jumpToId);
                if (id) {
                    // 检查被引消息来源用户是否已被屏蔽
                    const quoteUid = (quote as HTMLElement).dataset.quoteUid;
                    if (quoteUid) {
                        import('@/stores/user').then(({ blockedUsers }) => {
                            if (blockedUsers.value.has(quoteUid)) {
                                showToast('该用户已被屏蔽');
                            } else {
                                jumpToMessage(id);
                            }
                        });
                    } else {
                        jumpToMessage(id);
                    }
                }
            }
        };

        listEl.addEventListener('click', handleClick);
        return () => listEl.removeEventListener('click', handleClick);
    }, []);

    return (
        <div
            class={`chat-body ${isLoadingHistory.value ? 'loading' : ''} ${isContextLoading.value ? 'context-loading' : ''}`}
            ref={bodyRef}
            onScroll={handleScroll}
            style={{ paddingBottom: `${inputAreaHeight.value + 20}px` }}
        >
            <div class="chat-list" ref={listRef}>
                {visibleMessageIds.map(msgId => {
                    const msg = messageMap.value.get(msgId);
                    if (!msg) return null;

                    const grouping = getMessageGrouping(msgId);

                    return (
                        <MessageItem
                            key={msg.stableKey || msgId}
                            message={msg}
                            isSelf={grouping.isSelf}
                            isGrouped={grouping.isGrouped}
                            isGroupedWithNext={grouping.isGroupedWithNext}
                        />
                    );
                })}
            </div>
        </div>
    );
}
