import { useEffect, useCallback } from 'preact/hooks';
import type { ScrollManagerRefs } from './useScrollManager';
import {
    messageIds,
    messageMap,
    isLoadingHistory,
    historyFullyLoaded,
    historyOldestId,
    historyNewestId,
    unreadWhileScrolled,
    addMessagesBatch,
    setMessages,
    timelineIsLive,
    isContextLoading,
    showScrollBottomBtn,
    isChatOpen,
    pendingJumpToMessage,
    initialMessagesLoaded,
    // 已读状态和浏览位置管理
    loadReadState,
    lastReadId,
    unreadCount,
    loadBrowsePosition,
    clearBrowsePosition
} from '@/stores/chat';
import { blockedUsers } from '@/stores/user';
import { fetchHistoryMessages, fetchRecentMessages, fetchMessageContext, fetchNewerMessages } from '@/utils/api';
import { syncPresenceSubscriptions } from '@/hooks/useWebSocket';
import { insertUnreadSeparator } from '@/hooks/useStateKeeper';

export function useHistoryLoader(refs: ScrollManagerRefs) {
    const { bodyRef, listRef, isLoadingRef, isStickingToBottom, prevScrollHeight, isRestoringScroll } = refs;

    // 加载历史消息
    const loadHistory = useCallback(async () => {
        if (isLoadingRef.current || historyFullyLoaded.value) return;
        const oldestId = historyOldestId.value;
        if (!oldestId) return;

        isLoadingRef.current = true;
        isLoadingHistory.value = true;

        // 保存当前滚动位置
        if (bodyRef.current) {
            prevScrollHeight.current = bodyRef.current.scrollHeight;
        }

        try {
            const newMessages = await fetchHistoryMessages(oldestId, 50);
            if (newMessages.length === 0) {
                historyFullyLoaded.value = true;
            } else {
                // 更新最旧消息ID (取最小值以防 API 排序不确定)
                const minId = Math.min(...newMessages.map(m => m.id));
                historyOldestId.value = minId;

                // 过滤屏蔽用户
                const filtered = newMessages.filter(m => !blockedUsers.value.has(String(m.uid)));

                // 标记需要恢复滚动
                isRestoringScroll.current = true;
                addMessagesBatch(filtered);

                // 订阅新出现用户的在线状态
                syncPresenceSubscriptions();
            }
        } catch (e) {
            // ignore
        } finally {
            isLoadingRef.current = false;
            isLoadingHistory.value = false;
        }
    }, []);

    // 加载更新消息 (在历史模式中向下加载)
    const loadNewerHistory = useCallback(async () => {
        if (isLoadingRef.current || timelineIsLive.value) return;
        const newestId = historyNewestId.value;
        if (!newestId) return;

        isLoadingRef.current = true;
        const LIMIT = 50;

        try {
            const newMessages = await fetchNewerMessages(newestId, LIMIT);

            // 过滤已存在的消息
            const existingIds = new Set(messageIds.peek());
            const filteredNewMessages = newMessages.filter(m =>
                !existingIds.has(m.id) && !blockedUsers.value.has(String(m.uid))
            );

            if (filteredNewMessages.length > 0) {
                // 追加新消息
                addMessagesBatch(filteredNewMessages);

                // 更新最新消息ID
                const maxId = Math.max(...filteredNewMessages.map(m => m.id));
                historyNewestId.value = maxId;

                // 如果返回的消息少于限制，说明已追赶到最新
                if (newMessages.length < LIMIT) {
                    timelineIsLive.value = true;
                    unreadWhileScrolled.value = 0;
                    showScrollBottomBtn.value = false;
                    clearBrowsePosition(); // 清除浏览位置，切换到 live 模式
                    syncPresenceSubscriptions();
                }
            } else {
                // 没有新消息，恢复实时模式
                timelineIsLive.value = true;
                unreadWhileScrolled.value = 0;
                showScrollBottomBtn.value = false;
                clearBrowsePosition(); // 清除浏览位置，切换到 live 模式
                syncPresenceSubscriptions();
            }
        } catch (e) {
            // ignore
        } finally {
            // 延迟重置 loading 状态，防止滚动事件立即再次触发加载
            setTimeout(() => {
                isLoadingRef.current = false;
            }, 100);
        }
    }, []);

    // 跳转到指定消息
    const jumpToMessage = useCallback(async (id: number) => {
        const targetId = String(id);
        const highlightDuration = 800;

        /**
         * 高亮消息并滚动到视图
         */
        const scrollAndHighlight = (el: HTMLElement, hideOverlay = false) => {
            // 解除底部吸附
            isStickingToBottom.current = false;

            if (!bodyRef.current) return;

            // 立即跳转以确保元素可见 (此时可能还在 Overlay 后面)
            el.scrollIntoView({ behavior: 'auto', block: 'center' });

            // 如果需要隐藏 Overlay，放在这里执行，确保先 scroll 后 fade
            if (hideOverlay) {
                // 确保在下一帧执行，防止 scrollIntoView 还没生效
                requestAnimationFrame(() => {
                    isContextLoading.value = false;
                });
            }

            // 应用高亮效果
            if (listRef.current) listRef.current.classList.add('focus-mode');
            el.classList.remove('message-highlight'); // 先移除，确保动画重新触发
            void el.offsetWidth; // 触发重绘
            el.classList.add('message-highlight');

            setTimeout(() => {
                if (listRef.current) listRef.current.classList.remove('focus-mode');
                el.classList.remove('message-highlight');
            }, highlightDuration);
        };

        // 检查消息是否已在 DOM 中
        const existingElement = document.getElementById(`db-${targetId}`);

        if (existingElement) {
            // 消息已存在，直接滚动
            scrollAndHighlight(existingElement);
            return;
        }

        // 消息不在 DOM 中，需要加载上下文
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        isLoadingHistory.value = true;
        isContextLoading.value = true;

        try {
            // 获取消息上下文
            const contextResult = await fetchMessageContext(id);

            if (contextResult && contextResult.messages.length > 0) {
                // 过滤屏蔽用户
                const filtered = contextResult.messages.filter(
                    m => !blockedUsers.value.has(String(m.uid))
                );

                // 更新消息列表
                setMessages(filtered);

                // 更新历史状态
                if (filtered.length > 0) {
                    historyOldestId.value = filtered[0].id;
                    historyNewestId.value = filtered[filtered.length - 1].id;
                    historyFullyLoaded.value = !contextResult.has_more_before;
                }

                // 标记为非实时模式 (重要：防止新消息覆盖)
                timelineIsLive.value = false;

                // 等待 DOM 渲染完成后滚动
                // 使用多层延迟确保内容（包括图片占位符等）已经渲染
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        const newElement = document.getElementById(`db-${targetId}`);
                        if (newElement) {
                            scrollAndHighlight(newElement, true); // true = hide overlay after scroll
                        } else {
                            // 尝试滚动到 target_index 对应的位置
                            const msgElements = listRef.current?.querySelectorAll('.chat-message');
                            if (msgElements && contextResult.target_index < msgElements.length) {
                                scrollAndHighlight(msgElements[contextResult.target_index] as HTMLElement);
                            }
                        }
                    }, 300); // 300ms 延迟，与原版脚本一致
                });
            } else {
                // ignore
            }
        } catch (e) {
            isContextLoading.value = false;
        } finally {
            isLoadingRef.current = false;
            isLoadingHistory.value = false;
            // 注意：isContextLoading.value 这里不设置 false，
            // 而是延迟到 scrollAndHighlight 内部（成功时）或 catch 块（失败时）
        }
    }, []);

    // 监听外部跳转请求 (例如从 NotificationManager 触发)
    useEffect(() => {
        const messageId = pendingJumpToMessage.value;
        if (messageId !== null) {
            // 清空请求
            pendingJumpToMessage.value = null;
            // 执行跳转
            jumpToMessage(messageId);
        }
    }, [pendingJumpToMessage.value]);

    // 初始加载消息
    useEffect(() => {
        if (!isChatOpen.value) return;

        const loadInitialMessages = async () => {
            // 使用 initialMessagesLoaded 而不是 messageIds.length 来判断
            // 因为 WebSocket 可能在窗口打开前就接收了新消息，但这些不应该阻止加载初始消息
            if (initialMessagesLoaded.value) {
                syncPresenceSubscriptions();
                return;
            }

            isLoadingHistory.value = true;
            isContextLoading.value = true;

            // 从后端加载已读状态
            await loadReadState();

            try {
                const savedBrowse = loadBrowsePosition();
                const currentUnreadCount = unreadCount.value;

                console.log('[Browse Position Debug]', {
                    savedBrowse,
                    currentUnreadCount,
                    lastReadId: lastReadId.value,
                });

                // 如果有保存的浏览位置，恢复到该位置
                if (savedBrowse) {
                    console.log('[Browse Position] Attempting to restore to message:', savedBrowse.anchorMessageId);

                    // 恢复到浏览位置
                    unreadWhileScrolled.value = currentUnreadCount;
                    showScrollBottomBtn.value = currentUnreadCount > 0;

                    const contextResult = await fetchMessageContext(savedBrowse.anchorMessageId, 25, 50);
                    if (contextResult && contextResult.messages.length > 0) {
                        const filtered = contextResult.messages.filter(
                            m => !blockedUsers.value.has(String(m.uid))
                        );

                        setMessages(filtered);
                        if (filtered.length > 0) {
                            historyOldestId.value = filtered[0].id;
                            historyNewestId.value = filtered[filtered.length - 1].id;
                        }
                        historyFullyLoaded.value = !contextResult.has_more_before;
                        timelineIsLive.value = false;
                        isStickingToBottom.current = false;

                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                // 插入未读消息分隔线（在第一条未读消息之前）
                                const readId = lastReadId.value;
                                if (readId) {
                                    const firstUnreadId = filtered.find(m => m.id > readId)?.id;
                                    if (firstUnreadId) {
                                        insertUnreadSeparator(String(firstUnreadId));
                                    }
                                }

                                // 滚动到锚点消息
                                const browseEl = document.getElementById(`db-${savedBrowse.anchorMessageId}`);
                                if (browseEl && bodyRef.current) {
                                    bodyRef.current.scrollTop = browseEl.offsetTop - 10;
                                    console.log('[Browse Position] Restored successfully');
                                } else if (bodyRef.current) {
                                    // 锚点消息不在加载的范围内，滚动到顶部
                                    bodyRef.current.scrollTop = 0;
                                    console.warn('[Browse Position] Anchor message not found in loaded messages, scrolled to top');
                                }

                                syncPresenceSubscriptions();
                                isLoadingHistory.value = false;
                                isContextLoading.value = false;
                                initialMessagesLoaded.value = true;
                            });
                        });

                        return;
                    } else {
                        // 浏览位置的消息不存在或加载失败，清除无效的浏览位置
                        console.warn('[Browse Position] Failed to load context, clearing invalid browse position');
                        clearBrowsePosition();
                        // 继续执行 fallback 逻辑
                    }
                }

                // Fallback: 加载最新消息并滚动到底部
                timelineIsLive.value = true;
                isStickingToBottom.current = true;
                clearBrowsePosition();

                const recentMessages = await fetchRecentMessages(50);
                if (recentMessages.length > 0) {
                    const filtered = recentMessages.filter(m => !blockedUsers.value.has(String(m.uid)));
                    addMessagesBatch(filtered);

                    if (filtered.length > 0) {
                        historyOldestId.value = filtered[0].id;
                        historyNewestId.value = filtered[filtered.length - 1].id;
                    }

                    // 使用双重 RAF 确保 Preact 已完成 DOM 渲染
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            if (bodyRef.current) {
                                bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
                                isStickingToBottom.current = true;
                            }
                            syncPresenceSubscriptions();
                            isLoadingHistory.value = false;
                            isContextLoading.value = false;
                            initialMessagesLoaded.value = true;
                        });
                    });
                } else {
                    isLoadingHistory.value = false;
                    isContextLoading.value = false;
                    initialMessagesLoaded.value = true;
                }
            } catch (e) {
                isLoadingHistory.value = false;
                isContextLoading.value = false;
            }
        };

        loadInitialMessages();
    }, [isChatOpen.value]);

    return {
        loadHistory,
        loadNewerHistory,
        jumpToMessage,
    };
}
