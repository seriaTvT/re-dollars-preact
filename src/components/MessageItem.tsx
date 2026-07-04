import { useMemo, useRef, useEffect, useCallback, useState } from 'preact/hooks';
import { memo } from '@/utils/memo';
import { isMobile } from '@/utils/format';
import { getRawMessage } from '@/stores/messageStore';
import { newMessageIds } from '@/stores/chatState';
import { setReplyTo } from '@/stores/composerState';
import { settings } from '@/stores/user';
import { retryFailedMessage } from '@/services/composer/sendMessage';
import type { Message } from '@/types';
import { stripQuotes } from '@/utils/bbcode';
import { escapeHTML, formatDate, getAvatarUrl } from '@/utils/format';
import { showContextMenu } from '@/stores/ui';
import { COLLAPSE_MAX_HEIGHT, NEW_MESSAGE_ANIMATION } from '@/utils/constants';
import { UserAvatar } from './UserAvatar';
import { useSwipeToReply } from '@/hooks/useSwipeToReply';
import { MessageReactions } from './MessageReactions';
import {
    getBubbleTimestampMode,
    hasRichBubbleContent,
    isStickerMessage,
    renderMessageContent,
} from '@/utils/messagePresentation';
import { useMessageVisibilityEffects } from '@/hooks/useMessageVisibilityEffects';
import { useMessageImageViewer } from '@/hooks/useMessageImageViewer';
import { useCollapsibleMessage } from '@/hooks/useCollapsibleMessage';

interface MessageItemProps {
    message: Message;
    isSelf: boolean;
    isGrouped: boolean;
    isGroupedWithNext?: boolean;
}

function areMessagePropsEqual(prev: MessageItemProps, next: MessageItemProps): boolean {
    const prevKey = prev.message.stableKey || prev.message.id;
    const nextKey = next.message.stableKey || next.message.id;

    return (
        prevKey === nextKey
        && prev.message.message === next.message.message
        && prev.message.is_deleted === next.message.is_deleted
        && prev.message.edited_at === next.message.edited_at
        && prev.message.reactions === next.message.reactions
        && prev.message.link_previews === next.message.link_previews
        && prev.message.image_meta === next.message.image_meta
        && prev.message.state === next.message.state
        && prev.isSelf === next.isSelf
        && prev.isGrouped === next.isGrouped
        && prev.isGroupedWithNext === next.isGroupedWithNext
    );
}

export const MessageItem = memo(function MessageItem({ message, isSelf, isGrouped, isGroupedWithNext }: MessageItemProps) {
    const messageRef = useRef<HTMLDivElement>(null);
    const textContentRef = useRef<HTMLDivElement>(null);
    const [isNew, setIsNew] = useState(() => newMessageIds.peek().has(message.id));

    useEffect(() => {
        if (isNew) {
            const timer = setTimeout(() => setIsNew(false), NEW_MESSAGE_ANIMATION);
            return () => clearTimeout(timer);
        }
    }, [isNew]);

    // 提取原始值用于依赖
    const messageId = message.id;
    const messageText = message.message;
    const isDeleted = message.is_deleted;
    const editedAt = message.edited_at;
    const replyToId = message.reply_to_id;
    const replyDetails = message.reply_details;
    const imageMeta = message.image_meta;
    const linkPreviews = message.link_previews;

    const content = useMemo(() => {
        return renderMessageContent(message);
    }, [messageId, messageText, isDeleted, replyToId, replyDetails, imageMeta, linkPreviews, settings.value.linkPreview, settings.value.loadImages]);

    useMessageVisibilityEffects(messageRef, messageId, content);
    useMessageImageViewer(messageRef, content);

    const isSticker = useMemo(() => {
        return isStickerMessage(messageText, isDeleted, replyToId);
    }, [messageText, isDeleted, replyToId]);
    const { isExpanded, isCollapsible, shouldCollapse, toggleExpanded } = useCollapsibleMessage(
        textContentRef,
        content,
        isDeleted,
        isSticker
    );
    const hasReplyQuote = !!(replyToId && replyDetails);
    const hasLinkPreviewCards = settings.value.linkPreview && Object.keys(linkPreviews || {}).length > 0;
    const prefersTrailingTimestamp = !isDeleted && (
        (hasReplyQuote && !hasLinkPreviewCards && !isCollapsible) ||
        !hasRichBubbleContent(
            messageText,
            hasReplyQuote,
            hasLinkPreviewCards,
            isCollapsible
        )
    );

    // 时间戳
    const timeText = formatDate(message.timestamp, 'time') +
        (editedAt && !isDeleted ? ' (已编辑)' : '');
    const fullTimeText = formatDate(message.timestamp, 'full');
    const timestampMode = getBubbleTimestampMode(
        !!isGroupedWithNext,
        editedAt,
        !!isDeleted,
        isSticker,
        prefersTrailingTimestamp
    );

    // 头像 URL
    const avatarUrl = getAvatarUrl(message.avatar, 'l');

    // 昵称颜色
    const nickColor = message.color || 'var(--primary-color)';

    // 上下文菜单
    const handleContextMenu = useCallback((e: MouseEvent) => {
        let imageUrl: string | null = null;
        let bmoCode: string | null = null;
        const target = e.target as HTMLElement;

        const bmoElement = target.closest('.bmo') as HTMLElement | null;
        if (bmoElement) {
            bmoCode = bmoElement.dataset.code || null;
        } else if (target.tagName === 'IMG') {
            imageUrl = (target as HTMLImageElement).src;
        } else if (target.classList.contains('emoji') || target.style.backgroundImage) {
            const bg = window.getComputedStyle(target).backgroundImage;
            const match = bg.match(/url\(["']?(.*?)["']?\)/);
            if (match && match[1]) {
                imageUrl = match[1];
            }
        }

        if (isMobile() && !imageUrl && !bmoCode) {
            return;
        }

        e.preventDefault();
        showContextMenu(e.clientX, e.clientY, String(messageId), imageUrl, bmoCode);
    }, [messageId]);

    // 触发回复
    const triggerReply = useCallback(() => {
        const rawContent = (getRawMessage(messageId) || messageText || '').trim();
        const text = stripQuotes(escapeHTML(rawContent))
            .replace(/\[img\].*?\[\/img\]/gi, '[图片]')
            .replace(/\[file=.*?\].*?\[\/file\]/gi, '[附件]')
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        setReplyTo({
            id: String(messageId),
            uid: String(message.uid),
            user: message.nickname,
            text: text,
            raw: rawContent,
            avatar: message.avatar
        });
        const textarea = document.querySelector('#dollars-main-chat textarea') as HTMLTextAreaElement;
        if (textarea) textarea.focus();
    }, [messageId, messageText, message.uid, message.nickname, message.avatar]);

    // 重试发送失败的消息（重发前先确认幂等，避免重复）
    const handleRetry = useCallback(() => {
        void retryFailedMessage(messageId);
    }, [messageId]);

    // 气泡点击处理
    const handleBubbleClick = useCallback((e: MouseEvent) => {
        if (message.state === 'failed') {
            e.stopPropagation();
            handleRetry();
        }
    }, [message.state, handleRetry]);

    // 滑动回复
    const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeToReply({
        messageId,
        onReply: triggerReply,
        elementRef: messageRef,
    });

    const className = `chat-message${isSelf ? ' self' : ''}${isGrouped ? ' is-grouped-with-prev' : ''}${isGroupedWithNext ? ' is-grouped-with-next' : ''}${editedAt && !isDeleted ? ' is-edited' : ''}${isNew ? ' new-message' : ''}${message.state === 'sending' ? ' pending' : ''}${message.state === 'failed' ? ' failed' : ''}`;

    return (
        <div
            id={`db-${messageId}`}
            ref={messageRef}
            class={className}
            data-db-id={messageId}
            data-uid={message.uid}
            data-timestamp={message.timestamp}
            onContextMenu={handleContextMenu}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
        >
            <div class="swipe-reply-indicator"></div>

            <UserAvatar
                uid={message.uid}
                src={avatarUrl}
                nickname={message.nickname}
            />

            <div class="message-content">
                <span class="nickname">
                    <a
                        href={message.uid === 0 ? '/user/bangumi' : `/user/${message.uid}`}
                        target="_blank"
                        rel="noopener"
                    >
                        {message.nickname}
                    </a>
                </span>

                <div
                    class={`bubble${isSticker ? ' sticker-mode' : ''}${timestampMode === 'trailing' ? ' has-trailing-timestamp' : ''}${timestampMode === 'stacked' ? ' has-stacked-timestamp' : ''}`}
                    onClick={message.state === 'failed' ? handleBubbleClick : undefined}
                    style={message.state === 'failed' ? { cursor: 'pointer' } : undefined}
                >
                    <span class="bubble-nickname" style={{ '--nick-color': nickColor } as any}>
                        {message.nickname}
                    </span>

                    <>
                        <div
                            ref={textContentRef}
                            class={`text-content ${shouldCollapse ? 'is-collapsed' : ''}`}
                            style={{ '--collapse-max-height': `${COLLAPSE_MAX_HEIGHT}px` } as any}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                        {isCollapsible && (
                            <button
                                type="button"
                                class="expand-toggle-btn"
                                aria-expanded={isExpanded}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpanded();
                                }}
                            >
                                {isExpanded ? '收起' : '展开全文'}
                            </button>
                        )}
                    </>

                    {timestampMode !== 'hidden' && (
                        <span
                            class={`bubble-timestamp ${timestampMode === 'overlay' ? 'is-overlay' : timestampMode === 'trailing' ? 'is-trailing' : 'is-stacked'}`}
                            title={fullTimeText}
                        >
                            {timeText}
                        </span>
                    )}
                </div>

                <MessageReactions reactions={message.reactions || []} messageId={messageId} />
            </div>
        </div>
    );
}, areMessagePropsEqual);
