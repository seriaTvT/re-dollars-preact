import { Fragment } from 'preact';
import {
    currentDateLabel,
    showScrollBottomBtn,
    manualScrollToBottom,
    unreadWhileScrolled,
    unreadJumpList,
    timelineIsLive,
    historyOldestId,
    historyNewestId,
    historyFullyLoaded,
    pendingJumpToMessage,
    scrollButtonMode,
} from '@/stores/chatState';
import {
    setMessages,
    messageIds,
} from '@/stores/messageStore';
import {
    getFirstUnreadId,
    hasUnreadMessages,
    updateReadState,
    unreadCount
} from '@/stores/readState';
import { clearBrowsePosition } from '@/stores/browsePosition';
import { inputAreaHeight } from '@/stores/ui';
import { fetchRecentMessages } from '@/utils/api/messages';
import { blockedUsers } from '@/stores/user';
import { syncPresenceSubscriptions } from '@/services/websocket/client';
import { FloatingDateCapsule } from './FloatingDateCapsule';

export function FloatingUI() {
    /**
     * Telegram-style 滚动按钮处理
     * - Mode 'to-unread': 跳转到第一条未读消息
     * - Mode 'to-bottom': 跳转到最新消息
     */
    const handleScrollBottom = async (e: Event) => {
        e.preventDefault();

        // Mode 1: 跳转到未读消息
        if (scrollButtonMode.value === 'to-unread' && hasUnreadMessages.value) {
            const firstUnreadId = getFirstUnreadId();
            if (firstUnreadId) {
                pendingJumpToMessage.value = firstUnreadId;
                // 跳转后切换到 to-bottom 模式
                scrollButtonMode.value = 'to-bottom';
                return;
            }
        }

        // Mode 2: 跳转到底部
        // 清除浏览位置 (已到达底部)
        clearBrowsePosition();

        // 更新已读位置到最新消息
        const ids = messageIds.value;
        if (ids.length > 0) {
            updateReadState(ids[ids.length - 1]);
        }

        // 如果已经在 live 模式，直接平滑滚动到底部
        if (timelineIsLive.value) {
            manualScrollToBottom.value++;
            return;
        }

        // 非 live 模式：重新加载最新消息
        try {
            const recentMessages = await fetchRecentMessages(50);
            if (recentMessages.length > 0) {
                const filtered = recentMessages.filter(m => !blockedUsers.value.has(String(m.uid)));
                setMessages(filtered);

                if (filtered.length > 0) {
                    historyOldestId.value = filtered[0].id;
                    historyNewestId.value = filtered[filtered.length - 1].id;
                }
                historyFullyLoaded.value = false;
                timelineIsLive.value = true;
                unreadWhileScrolled.value = 0;
                showScrollBottomBtn.value = false;

                syncPresenceSubscriptions();

                // 等待 DOM 更新后滚动到底部
                requestAnimationFrame(() => {
                    manualScrollToBottom.value++;
                });
            }
        } catch (e) {
            // ignore
        }
    };

    // 跳转到下一个提及消息
    const handleScrollToMention = (e: Event) => {
        e.preventDefault();
        const jumpList = unreadJumpList.value;
        if (jumpList.length === 0) return;
        const nextMentionId = jumpList[0];
        unreadJumpList.value = jumpList.slice(1);
        pendingJumpToMessage.value = nextMentionId;
    };

    // 计算按钮位置
    const bottomBtnBottom = inputAreaHeight.value + 20;
    const mentionBtnBottom = bottomBtnBottom + 50;

    const jumpList = unreadJumpList.value;
    const showMentionBtn = jumpList.length > 0;
    const scrollBtnClasses = `nav-btn ${showScrollBottomBtn.value ? 'visible' : ''} mode-${scrollButtonMode.value}`;
    // 使用 lastReadId 计算未读数量
    const currentUnreadCount = unreadCount.value;

    const getTooltip = () => {
        return scrollButtonMode.value === 'to-unread' ? '跳转到未读消息' : '跳转到最新消息';
    };

    return (
        <Fragment>
            <FloatingDateCapsule label={currentDateLabel.value || ''} />

            <div
                id="dollars-scroll-mention-btn"
                class={`nav-btn ${showMentionBtn ? 'visible' : ''}`}
                onClick={handleScrollToMention}
                style={{ bottom: `${mentionBtnBottom}px` }}
                title="跳转到提及消息"
            >
                {showMentionBtn && (
                    <div id="dollars-mention-badge" class="nav-btn-badge">
                        {jumpList.length > 99 ? '99+' : jumpList.length}
                    </div>
                )}
            </div>

            <div
                id="dollars-scroll-bottom-btn"
                class={scrollBtnClasses}
                onClick={handleScrollBottom}
                style={{ bottom: `${bottomBtnBottom}px` }}
                title={getTooltip()}
            >
                {currentUnreadCount > 0 && (
                    <div id="dollars-unread-badge" class="nav-btn-badge">
                        {currentUnreadCount > 99 ? '99+' : currentUnreadCount}
                    </div>
                )}
            </div>
        </Fragment>
    );
}
