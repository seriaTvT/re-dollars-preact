import { useRef, useEffect, useCallback, useMemo, useLayoutEffect } from 'preact/hooks';
import type { RefObject } from 'preact';
import {
    messageIds,
    messageMap,
    unreadWhileScrolled,
    unreadJumpList,
    pendingScrollToBottom,
    timelineIsLive,
    currentDateLabel,
    showScrollBottomBtn,
    manualScrollToBottom,
    isChatOpen,
    scrollButtonMode,
    isAtBottom,
    isLoadingHistory,
    historyFullyLoaded,
    // 已读状态和浏览位置管理
    updateReadState,
    getFirstUnreadId,
    hasUnreadMessages,
    saveBrowsePosition,
    clearBrowsePosition
} from '@/stores/chat';
import { blockedUsers } from '@/stores/user';
import { formatDate } from '@/utils/format';
import { smoothScrollTo as sharedSmoothScrollTo } from '@/utils/smoothScroll';
import { MAX_DOM_MESSAGES } from '@/utils/constants';

export interface ScrollManagerRefs {
    bodyRef: RefObject<HTMLDivElement>;
    listRef: RefObject<HTMLDivElement>;
    isStickingToBottom: RefObject<boolean>;
    isRestoringScroll: RefObject<boolean>;
    isProgrammaticScroll: RefObject<boolean>;
    isLoadingRef: RefObject<boolean>;
    prevScrollHeight: RefObject<number>;
}

export interface ScrollManagerResult extends ScrollManagerRefs {
    handleScroll: () => void;
    scrollToBottom: (smooth?: boolean) => void;
    smoothScrollTo: (targetTop: number, duration?: number) => void;
    visibleMessageIds: number[];
    loadHistory: () => void;
    loadNewerHistory: () => void;
    getTopVisibleMessageId: () => number | null;
    getBottomVisibleMessageId: () => number | null;
}

export function useScrollManager(
    onLoadHistory: () => void,
    onLoadNewerHistory: () => void
): ScrollManagerResult {
    const bodyRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const isLoadingRef = useRef(false);
    const isStickingToBottom = useRef(true);
    const prevScrollHeight = useRef(0);
    const isRestoringScroll = useRef(false);
    const hideDateLabelTimer = useRef<number | null>(null);
    const scrollAnimationRef = useRef<number | null>(null);
    const isProgrammaticScroll = useRef(false); // 程序滚动标记，防止 ResizeObserver 干扰

    /**
     * 自定义平滑滚动函数 - 委托给共享的平滑滚动工具
     * @param targetTop - 目标滚动位置
     * @param duration - 动画时长 (ms)，如果未指定则根据距离动态计算
     */
    const smoothScrollTo = useCallback((targetTop: number, duration?: number) => {
        if (!bodyRef.current) return;

        // 取消之前的滚动动画
        if (scrollAnimationRef.current) {
            cancelAnimationFrame(scrollAnimationRef.current);
        }

        const animId = sharedSmoothScrollTo(bodyRef.current, targetTop, { duration });
        scrollAnimationRef.current = animId;
    }, []);


    // 滚动到底部
    const scrollToBottom = useCallback((smooth = true) => {
        if (!bodyRef.current) return;

        const targetTop = bodyRef.current.scrollHeight;

        if (smooth) {
            isProgrammaticScroll.current = true;
            smoothScrollTo(targetTop);
            // 动画结束后重置标记
            setTimeout(() => {
                isProgrammaticScroll.current = false;
            }, 700);
        } else {
            bodyRef.current.scrollTop = targetTop;
        }

        isStickingToBottom.current = true;
    }, [smoothScrollTo]);

    // 获取视口顶部可见消息的 ID
    const getTopVisibleMessageId = useCallback((): number | null => {
        if (!bodyRef.current || !listRef.current) return null;
        const scrollTop = bodyRef.current.scrollTop;
        const topThreshold = scrollTop + 60;

        const msgs = Array.from(listRef.current.querySelectorAll('.chat-message[data-db-id]')) as HTMLElement[];
        const topMsg = msgs.find(el => (el.offsetTop + el.offsetHeight) > topThreshold);

        return topMsg?.dataset.dbId ? parseInt(topMsg.dataset.dbId, 10) : null;
    }, []);

    // 获取视口底部可见消息的 ID
    const getBottomVisibleMessageId = useCallback((): number | null => {
        if (!bodyRef.current || !listRef.current) return null;
        const scrollTop = bodyRef.current.scrollTop;
        const clientHeight = bodyRef.current.clientHeight;
        const bottomThreshold = scrollTop + clientHeight - 60;

        const msgs = Array.from(listRef.current.querySelectorAll('.chat-message[data-db-id]')) as HTMLElement[];
        // 从后往前找第一个在视口底部上方的消息
        for (let i = msgs.length - 1; i >= 0; i--) {
            const el = msgs[i];
            if (el.offsetTop < bottomThreshold) {
                return el.dataset.dbId ? parseInt(el.dataset.dbId, 10) : null;
            }
        }
        return null;
    }, []);

    // 更新滚动按钮模式 (Telegram-style: 未读 -> 底部)
    const updateScrollButtonMode = useCallback(() => {
        if (!bodyRef.current) return;

        // 检查是否有未读消息
        if (hasUnreadMessages.value) {
            const firstUnreadId = getFirstUnreadId();
            if (firstUnreadId) {
                // 检查第一条未读消息是否在视口下方
                const unreadEl = document.getElementById(`db-${firstUnreadId}`);
                if (unreadEl) {
                    const rect = unreadEl.getBoundingClientRect();
                    const containerRect = bodyRef.current.getBoundingClientRect();
                    // 如果未读消息在视口下方，显示 "跳转到未读"
                    if (rect.top > containerRect.bottom) {
                        scrollButtonMode.value = 'to-unread';
                        return;
                    }
                } else {
                    // 未读消息不在 DOM 中（需要加载更多消息）
                    scrollButtonMode.value = 'to-unread';
                    return;
                }
            }
        }

        // 默认：跳转到底部
        scrollButtonMode.value = 'to-bottom';
    }, []);

    // 浮动 UI 逻辑 helpers
    const updateFloatingUI = (scrollTop: number, clientHeight: number) => {
        if (!bodyRef.current || !listRef.current) return;

        // 1. Scroll Button Visibility
        const nearBottom = bodyRef.current.scrollHeight - scrollTop - clientHeight <= 150;
        // 在实时模式下，不在底部时显示按钮（方便快速回到底部）
        // 在非实时模式下，始终显示按钮（需要回到最新消息）
        showScrollBottomBtn.value = !nearBottom || !timelineIsLive.value;

        // 2. Floating Date Label
        if (typeof hideDateLabelTimer.current === 'number') {
            clearTimeout(hideDateLabelTimer.current);
            hideDateLabelTimer.current = null;
        }

        if (nearBottom) {
            currentDateLabel.value = null;
            return;
        }

        // Find top visible message
        const msgs = Array.from(listRef.current.children) as HTMLElement[];
        const topThreshold = scrollTop + 50;

        const topMsg = msgs.find(el => {
            return el.classList.contains('chat-message') &&
                (el.offsetTop + el.offsetHeight) > topThreshold;
        });

        if (topMsg && topMsg.dataset.timestamp) {
            const ts = parseInt(topMsg.dataset.timestamp, 10);
            const label = formatDate(ts, 'label');
            if (currentDateLabel.peek() !== label) {
                currentDateLabel.value = label;
            }

            // Set timeout to hide
            hideDateLabelTimer.current = window.setTimeout(() => {
                currentDateLabel.value = null;
            }, 1000);
        }
    };

    // 处理滚动事件
    const handleScroll = useCallback(() => {
        if (!bodyRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = bodyRef.current;

        // 检查是否在底部
        const atBottom = scrollHeight - scrollTop - clientHeight < 50;
        // 同步到全局信号 (供 WebSocket 使用)
        isAtBottom.value = atBottom;

        // 只有在非程序滚动时更新吸附状态（用户的滚动意图始终优先）
        if (!isProgrammaticScroll.current) {
            isStickingToBottom.current = atBottom;
        }

        // 清空未读 (在底部时)
        if (atBottom && timelineIsLive.value) {
            unreadWhileScrolled.value = 0;
            unreadJumpList.value = [];
            // 移除分隔线
            const unreadSep = document.querySelector('.unread-separator');
            if (unreadSep) unreadSep.remove();
            const browseSep = document.querySelector('.browse-separator');
            if (browseSep) browseSep.remove();
        }

        // --- 保存当前浏览位置 ---
        // 只有在用户主动向上滚动（离开底部）时才保存浏览位置
        // 如果在底部，则清除浏览位置（表示用户想要 live 模式）
        if (listRef.current) {
            if (atBottom && timelineIsLive.value) {
                // 在底部：清除浏览位置
                clearBrowsePosition();
            } else {
                // 不在底部：保存浏览位置
                const topVisibleMsg = getTopVisibleMessageId();
                if (topVisibleMsg) {
                    saveBrowsePosition(topVisibleMsg);
                }
            }

            // 更新已读位置（使用底部可见消息，只增不减）
            const bottomVisibleMsg = getBottomVisibleMessageId();
            if (bottomVisibleMsg) {
                updateReadState(bottomVisibleMsg);
            }
        }

        // --- [Telegram-style] 更新滚动按钮模式 ---
        updateScrollButtonMode();

        // --- 浮动 UI 更新 (Date & ScrollButton) ---
        updateFloatingUI(scrollTop, clientHeight);

        // 加载历史 (滚动到顶部时)
        if (scrollTop < 200 && !isLoadingRef.current && !historyFullyLoaded.value) {
            onLoadHistory();
        }

        // 加载更新消息 (在历史模式中滚动到底部时)
        if (atBottom && !isLoadingRef.current && !timelineIsLive.value) {
            isStickingToBottom.current = false;
            onLoadNewerHistory();
        }
    }, []);

    // 监听手动滚动请求
    useEffect(() => {
        if (manualScrollToBottom.value > 0) {
            scrollToBottom(true); // 平滑滚动
        }
    }, [manualScrollToBottom.value]);

    // 窗口打开时自动滚动到底部
    // 注意：只有在实时模式下且吸附在底部时才执行
    useEffect(() => {
        if (isChatOpen.value && messageIds.value.length > 0 && timelineIsLive.value && isStickingToBottom.current) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (bodyRef.current) {
                        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
                    }
                });
            });
        }
    }, [isChatOpen.value]);

    // 新消息到达时滚动
    useLayoutEffect(() => {
        if (pendingScrollToBottom.value) {
            pendingScrollToBottom.value = false;

            // 如果之前在底部吸附状态，则滚动到底部
            if (isStickingToBottom.current) {
                requestAnimationFrame(() => {
                    scrollToBottom(true);
                });
            }
        }
    }, [pendingScrollToBottom.value, scrollToBottom]);

    // 获取要渲染的消息 ID 列表 (应用 DOM 限制)
    const visibleMessageIds = useMemo(() => {
        const allIds = messageIds.value;
        const blocked = blockedUsers.value;

        // 过滤屏蔽用户
        const filteredIds = allIds.filter(id => {
            const msg = messageMap.peek().get(id);
            return msg && !blocked.has(String(msg.uid));
        });

        // 应用 DOM 消息上限 (在底部时保留最新的消息)
        if (filteredIds.length > MAX_DOM_MESSAGES && isStickingToBottom.current) {
            return filteredIds.slice(-MAX_DOM_MESSAGES);
        }

        return filteredIds;
    }, [messageIds.value, blockedUsers.value]);

    // 恢复滚动位置 (消息列表更新后同步执行)
    useLayoutEffect(() => {
        if (isRestoringScroll.current && bodyRef.current) {
            const newScrollHeight = bodyRef.current.scrollHeight;
            const scrollDiff = newScrollHeight - prevScrollHeight.current;

            // 只有当高度确实增加时才调整滚动位置
            if (scrollDiff > 0) {
                bodyRef.current.scrollTop = scrollDiff;
            }
            isRestoringScroll.current = false;
        }
    }, [visibleMessageIds]);

    // ResizeObserver: 监听列表大小变化，确保图片加载后保持底部吸附
    // 与原版 ScrollManager.observer 逻辑一致
    useEffect(() => {
        const listEl = listRef.current;
        if (!listEl) return;

        const observer = new ResizeObserver(() => {
            if (!isStickingToBottom.current || isProgrammaticScroll.current || !bodyRef.current) return;
            // 双重检查：ref 说吸附 + 实际位置确实在底部附近，才自动滚动
            const { scrollTop, scrollHeight, clientHeight } = bodyRef.current;
            if (scrollHeight - scrollTop - clientHeight < 150) {
                bodyRef.current.scrollTop = scrollHeight;
            }
        });

        observer.observe(listEl);
        return () => observer.disconnect();
    }, []);

    return {
        bodyRef,
        listRef,
        isStickingToBottom,
        isRestoringScroll,
        isProgrammaticScroll,
        isLoadingRef,
        prevScrollHeight,
        handleScroll,
        scrollToBottom,
        smoothScrollTo,
        visibleMessageIds,
        loadHistory: onLoadHistory,
        loadNewerHistory: onLoadNewerHistory,
        getTopVisibleMessageId,
        getBottomVisibleMessageId,
    };
}
