import { useEffect, useRef, useState } from 'preact/hooks';
import { MEDIA_FILE_ACCEPT, useMediaUpload } from '@/hooks/useMediaUpload';
import { useCollapsibleMessage } from '@/hooks/useCollapsibleMessage';
import { useFloatingAttachMenu } from '@/hooks/useFloatingAttachMenu';
import { useMessageImageViewer } from '@/hooks/useMessageImageViewer';
import { useRichInput } from '@/hooks/useRichInput';
import { activeConversationId } from '@/stores/conversations';
import {
    activePmKey,
    isBangumiLoggedIn,
    loadEarlierPmMessages,
    loadPmDetail,
    pmComposeReceiver,
    pmConversations,
    pmDetailError,
    pmDetailLoading,
    pmDetails,
    pmEarlierMessagesError,
    pmEarlierMessagesLoading,
    pmNewMessageIds,
    openPmDraftForReceiver,
    openPmForUser,
    retryPmReply,
    submitPmReply,
} from '@/stores/bangumiPm';
import { showUserProfile, toggleSmileyPanel } from '@/stores/ui';
import { settings } from '@/stores/user';
import { COLLAPSE_MAX_HEIGHT, MAX_MENTION_RESULTS, MENTION_DEBOUNCE, NEW_MESSAGE_ANIMATION } from '@/utils/constants';
import { formatDate } from '@/utils/format';
import { searchMentionUsers, type MentionSearchUser } from '@/utils/api/users';
import { getFloatingDateLabel, isNearScrollBottom } from '@/utils/floatingDate';
import { iconFile, iconPhoto } from '@/utils/icons';
import { canGroupAdjacentMessages } from '@/utils/messageGrouping';
import {
    getBubbleTimestampMode,
    hasRichBubbleContent,
    isStickerMessage,
} from '@/utils/messagePresentation';
import type { RichInputController } from '@/utils/richInput';
import type { BangumiPmMessage } from '@/types/pm';
import { MediaPreview } from './MediaPreview';
import { FloatingDateCapsule } from './FloatingDateCapsule';
import { SmileyPanel } from './SmileyPanel';
import { TextFormatter } from './TextFormatter';
import { AttachMenu } from './AttachMenu';
import { MentionCompleter } from './MentionCompleter';

const MAX_INPUT_HEIGHT = 150;

function arePmMessagesGrouped(current: BangumiPmMessage | undefined, adjacent: BangumiPmMessage | undefined) {
    return canGroupAdjacentMessages(
        current && {
            senderId: current.userHref || (current.isSelf ? 'self' : 'peer'),
            timestamp: current.timestamp,
            boundaryId: current.topic,
        },
        adjacent && {
            senderId: adjacent.userHref || (adjacent.isSelf ? 'self' : 'peer'),
            timestamp: adjacent.timestamp,
            boundaryId: adjacent.topic,
        }
    );
}

function PmMessageItem({
    message,
    nickname,
    isGrouped,
    isGroupedWithNext,
    onRetry,
}: {
    message: BangumiPmMessage;
    nickname: string;
    isGrouped: boolean;
    isGroupedWithNext: boolean;
    onRetry?: (messageId: string) => void;
}) {
    const textContentRef = useRef<HTMLDivElement>(null);
    const [isNew, setIsNew] = useState(() => pmNewMessageIds.peek().has(message.id));
    const presentationText = message.presentationText || message.bodyText;
    const isSticker = isStickerMessage(presentationText, false, undefined);
    const { isExpanded, isCollapsible, shouldCollapse, toggleExpanded } = useCollapsibleMessage(
        textContentRef,
        message.bodyHtml,
        false,
        isSticker,
        'img:not(.smile), video, audio'
    );
    const prefersTrailingTimestamp = !hasRichBubbleContent(
        presentationText,
        false,
        false,
        isCollapsible
    );
    const timestampMode = getBubbleTimestampMode(
        isGroupedWithNext,
        undefined,
        false,
        isSticker,
        prefersTrailingTimestamp
    );
    const timeText = message.timestamp === null
        ? message.timestampText
        : formatDate(message.timestamp, 'time');
    const fullTimeText = message.timestamp === null
        ? message.timestampText
        : formatDate(message.timestamp, 'full');

    useEffect(() => {
        if (isNew) {
            const timer = setTimeout(() => setIsNew(false), NEW_MESSAGE_ANIMATION);
            return () => clearTimeout(timer);
        }
    }, [isNew]);

    const handleBubbleClick = (event: MouseEvent) => {
        if (message.state !== 'failed') return;
        event.stopPropagation();
        onRetry?.(message.id);
    };
    const handleAvatarClick = (event: MouseEvent) => {
        const username = message.userHref.match(/^\/user\/(.+)$/)?.[1];
        if (!username) return;
        event.preventDefault();
        event.stopPropagation();
        showUserProfile('bgm:' + decodeURIComponent(username));
    };

    return (
        <div
            class={`chat-message dollars-pm-message${message.isSelf ? ' self' : ''}${isGrouped ? ' is-grouped-with-prev' : ''}${isGroupedWithNext ? ' is-grouped-with-next' : ''}${isNew ? ' new-message' : ''}${message.state === 'sending' ? ' pending' : ''}${message.state === 'failed' ? ' failed' : ''}`}
            data-timestamp={message.timestamp ?? undefined}
        >
            <a class="dollars-pm-avatar-link" href={message.userHref || '#'} target="_blank" rel="noopener noreferrer" onClick={handleAvatarClick}>
                <img class="avatar" src={message.avatar || '/img/no_icon_subject.png'} alt={message.isSelf ? '' : nickname} />
            </a>
            <div class="message-content">
                <span class="nickname">
                    <a href={message.userHref || '#'} target="_blank" rel="noopener noreferrer">
                        {nickname}
                    </a>
                </span>
                <div
                    class={`bubble${isSticker ? ' sticker-mode' : ''}${timestampMode === 'trailing' ? ' has-trailing-timestamp' : ''}${timestampMode === 'stacked' ? ' has-stacked-timestamp' : ''}`}
                    onClick={message.state === 'failed' ? handleBubbleClick : undefined}
                    style={message.state === 'failed' ? { cursor: 'pointer' } : undefined}
                >
                    <span class="bubble-nickname">{nickname}</span>
                    <div
                        ref={textContentRef}
                        class={`text-content ${shouldCollapse ? 'is-collapsed' : ''}`}
                        style={{ '--collapse-max-height': `${COLLAPSE_MAX_HEIGHT}px` } as any}
                        dangerouslySetInnerHTML={{ __html: message.bodyHtml }}
                    />
                    {isCollapsible && (
                        <button
                            type="button"
                            class="expand-toggle-btn"
                            aria-expanded={isExpanded}
                            onClick={toggleExpanded}
                        >
                            {isExpanded ? '收起' : '展开全文'}
                        </button>
                    )}
                    {timestampMode !== 'hidden' && (
                        <span
                            class={`bubble-timestamp ${timestampMode === 'overlay' ? 'is-overlay' : timestampMode === 'trailing' ? 'is-trailing' : 'is-stacked'}`}
                            title={fullTimeText}
                        >
                            {timeText}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

function PmFloatingDate({ listRef }: { listRef: { current: HTMLDivElement | null } }) {
    const [label, setLabel] = useState('');
    const hideTimerRef = useRef<number | null>(null);
    const messagesRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const refreshMessages = () => {
            messagesRef.current = Array.from(list.querySelectorAll<HTMLElement>('.chat-message[data-timestamp]'));
        };
        refreshMessages();

        const update = () => {
            if (hideTimerRef.current !== null) {
                clearTimeout(hideTimerRef.current);
                hideTimerRef.current = null;
            }

            if (isNearScrollBottom(list)) {
                setLabel('');
                return;
            }

            const nextLabel = getFloatingDateLabel(list, messagesRef.current);
            if (!nextLabel) {
                setLabel('');
                return;
            }

            setLabel(nextLabel);
            hideTimerRef.current = window.setTimeout(() => {
                setLabel('');
                hideTimerRef.current = null;
            }, 1000);
        };

        const observer = new MutationObserver(refreshMessages);
        observer.observe(list, { childList: true, subtree: true });
        list.addEventListener('scroll', update, { passive: true });
        return () => {
            observer.disconnect();
            list.removeEventListener('scroll', update);
            if (hideTimerRef.current !== null) {
                clearTimeout(hideTimerRef.current);
                hideTimerRef.current = null;
            }
        };
    }, [listRef.current]);

    return <FloatingDateCapsule label={label} preserveLastLabel={false} />;
}

function PmConversationView({ id }: { id: string }) {
    const detail = pmDetails.value[id];
    const conversation = pmConversations.value.find(item => item.id === id);
    const messages = detail?.messages || [];
    const nickname = detail?.nickname || conversation?.nickname || 'Bangumi 短信';
    const isDraftId = id.startsWith('draft:');
    const isInitialLoading = !isDraftId && !detail && (pmDetailLoading.value || !pmDetailError.value);
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState('');
    const [inputHeight, setInputHeight] = useState(80);
    const listRef = useRef<HTMLDivElement>(null);
    const composerRef = useRef<HTMLDivElement>(null);
    const composerProxyRef = useRef<HTMLTextAreaElement>(null);
    const inputControllerRef = useRef<RichInputController | null>(null);
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const previousLastId = useRef('');
    const isAutoLoadingEarlierRef = useRef(false);
    const {
        attachButtonRef,
        attachMenuRef,
        attachMenuPosition,
        closeAttachMenu,
        isAttachMenuClosing,
        isAttachMenuOpen,
        toggleAttachMenu,
    } = useFloatingAttachMenu({ containerRef: inputContainerRef });
    const {
        fileInputRef,
        isUploading,
        previewMedia,
        setPreviewMedia,
        parseMediaFiles,
        handleRemoveMedia,
        handleAttachMediaClick,
        handleAttachFileClick,
        handleFileChange,
        handlePaste,
    } = useMediaUpload(inputControllerRef);
    useMessageImageViewer(listRef, detail?.messages, {
        mode: 'generic',
        scopeSelector: '.dollars-pm-message-scroll',
    });

    // 与 Dollars 主聊天共用的富文本编辑器：实时把表情/贴纸渲染成图片
    const { handleInput, handleCompositionStart, handleCompositionEnd } = useRichInput({
        editorRef: composerRef,
        proxyRef: composerProxyRef,
        controllerRef: inputControllerRef,
        maxHeight: MAX_INPUT_HEIGHT,
        onValueChange: (value, options) => parseMediaFiles(value, options.knownMeta),
    });

    const canCompose = !!detail?.replyForm || !!detail?.isDraft;
    const isLoadingEarlier = pmEarlierMessagesLoading.value.has(id);
    const earlierError = pmEarlierMessagesError.value[id] || '';

    const handleEditorKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Enter' || event.isComposing || event.keyCode === 229) return;
        const modifier = event.ctrlKey || event.metaKey;
        const shouldSend = settings.value.sendShortcut === 'Enter' ? !modifier : modifier;
        event.preventDefault();
        if (shouldSend) {
            void send();
        } else {
            inputControllerRef.current?.insertText('\n', { focus: true });
        }
    };

    useEffect(() => {
        if (!detail && !isDraftId) void loadPmDetail(id);
    }, [id]);

    useEffect(() => {
        const container = inputContainerRef.current;
        if (!container) return;

        const updateHeight = () => setInputHeight(container.offsetHeight);
        const observer = new ResizeObserver(updateHeight);
        observer.observe(container);
        updateHeight();

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const lastId = detail?.messages[detail.messages.length - 1]?.id || '';
        if (lastId && lastId !== previousLastId.current) {
            requestAnimationFrame(() => {
                if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
            });
        }
        previousLastId.current = lastId;
    }, [detail?.messages]);

    const send = async () => {
        const content = (inputControllerRef.current?.getValue() || '').trim();
        if (!content || sending || isUploading) return;
        setSending(true);
        setSendError('');
        const pending = submitPmReply(id, content);
        inputControllerRef.current?.setValue('', { focus: true });
        setPreviewMedia([]);
        const result = await pending;
        setSending(false);
        if (result.status !== 'sent') setSendError(result.error);
    };

    const retry = async (messageId: string) => {
        if (sending || isUploading) return;
        setSending(true);
        setSendError('');
        const result = await retryPmReply(id, messageId);
        setSending(false);
        if (result.status !== 'sent') setSendError(result.error);
    };

    const loadEarlier = async () => {
        if (!detail?.previousPageUrl || isLoadingEarlier || isAutoLoadingEarlierRef.current) return;
        const list = listRef.current;
        const previousHeight = list?.scrollHeight || 0;
        const previousTop = list?.scrollTop || 0;
        isAutoLoadingEarlierRef.current = true;
        try {
            await loadEarlierPmMessages(id);
        } finally {
            requestAnimationFrame(() => {
                if (list) list.scrollTop = list.scrollHeight - previousHeight + previousTop;
                isAutoLoadingEarlierRef.current = false;
            });
        }
    };

    const handleMessageScroll = () => {
        const list = listRef.current;
        if (!list || list.scrollTop >= 200) return;
        void loadEarlier();
    };

    let previousTopic = '';
    return (
        <div class="dollars-pm-view">
            <PmFloatingDate listRef={listRef} />
            <div
                class="dollars-pm-message-scroll"
                ref={listRef}
                onScroll={handleMessageScroll}
                style={{ paddingBottom: `${inputHeight + 20}px` }}
            >
                {isInitialLoading && (
                    <div class="pm-empty-state">正在加载短信…</div>
                )}
                {!isInitialLoading && !detail && (
                    <div class="pm-empty-state">
                        {pmDetailError.value || '短信会话暂不可用'}
                        <button type="button" onClick={() => void loadPmDetail(id)}>重试</button>
                    </div>
                )}
                {isLoadingEarlier && <div class="dollars-pm-history-status">正在加载更早短信…</div>}
                {earlierError && (
                    <div class="dollars-pm-history-status error">{earlierError}，继续向上滚动重试</div>
                )}
                {messages.map((message, index) => {
                    const showTopic = !!message.topic && message.topic !== previousTopic;
                    previousTopic = message.topic || previousTopic;
                    const isGrouped = arePmMessagesGrouped(messages[index - 1], message);
                    const isGroupedWithNext = arePmMessagesGrouped(message, messages[index + 1]);
                    return (
                        <div key={message.stableKey || message.id}>
                            {showTopic && <div class="dollars-pm-topic">{message.topic}</div>}
                            <PmMessageItem
                                message={message}
                                nickname={nickname}
                                isGrouped={isGrouped}
                                isGroupedWithNext={isGroupedWithNext}
                                onRetry={retry}
                            />
                        </div>
                    );
                })}
                {!isInitialLoading && detail && detail.messages.length === 0 && <div class="pm-empty-state">这个会话还没有短信</div>}
            </div>
            <div class="chat-input-container dollars-pm-input-container" ref={inputContainerRef}>
                <TextFormatter editorRef={composerRef} inputControllerRef={inputControllerRef} />
                <MentionCompleter editorRef={composerRef} inputControllerRef={inputControllerRef} />
                <SmileyPanel
                    onSelect={code => inputControllerRef.current?.insertText(code, { focus: true })}
                    textareaRef={composerProxyRef}
                />
                <div class="chat-input-area">
                    {sendError && <div class="dollars-pm-error dollars-pm-input-error">{sendError}</div>}
                    <MediaPreview previewMedia={previewMedia} onRemoveMedia={handleRemoveMedia} />
                    <div class="input-wrapper">
                        <button
                            type="button"
                            id="dollars-emoji-btn"
                            class="action-btn"
                            title="表情"
                            disabled={sending || isUploading || !canCompose}
                            onClick={() => toggleSmileyPanel()}
                        />
                        <div class="dollars-input-wrapper">
                            <div
                                ref={composerRef}
                                class={`chat-textarea chat-rich-editor dollars-pm-textarea${canCompose ? '' : ' is-disabled'}`}
                                contentEditable={canCompose}
                                role="textbox"
                                aria-multiline="true"
                                data-placeholder="输入短信"
                                spellcheck={false}
                                onInput={handleInput}
                                onCompositionStart={handleCompositionStart}
                                onCompositionEnd={handleCompositionEnd}
                                onPaste={handlePaste}
                                onKeyDown={handleEditorKeyDown}
                            />
                            <textarea
                                ref={composerProxyRef}
                                class="chat-textarea-proxy"
                                tabIndex={-1}
                                aria-hidden="true"
                            />
                        </div>
                        <div class="input-actions">
                            <div class="dollars-attach-menu-wrapper">
                                <button
                                    ref={attachButtonRef}
                                    type="button"
                                    id="dollars-attach-btn"
                                    class={`action-btn ${isAttachMenuOpen && !isAttachMenuClosing ? 'active' : ''}`}
                                    title="上传附件"
                                    aria-haspopup="menu"
                                    aria-expanded={isAttachMenuOpen && !isAttachMenuClosing}
                                    disabled={sending || isUploading || !canCompose}
                                    onClick={toggleAttachMenu}
                                />
                            </div>
                            {isAttachMenuOpen && attachMenuPosition && (
                                <AttachMenu
                                    isClosing={isAttachMenuClosing}
                                    menuRef={attachMenuRef}
                                    position={attachMenuPosition}
                                    items={[
                                        { icon: iconPhoto, label: '媒体', onClick: () => { closeAttachMenu(); handleAttachMediaClick(); } },
                                        { icon: iconFile, label: '文件', onClick: () => { closeAttachMenu(); handleAttachFileClick(); } },
                                    ]}
                                />
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept={MEDIA_FILE_ACCEPT}
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <button
                                type="button"
                                class={`send-btn ${isUploading ? 'uploading' : ''}`}
                                disabled={sending || isUploading || !canCompose}
                                onClick={send}
                                title={sending || isUploading ? '发送中…' : '发送'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PmComposeView() {
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const queryRef = useRef('');
    const [receiver, setReceiver] = useState(pmComposeReceiver.value);
    const [suggestions, setSuggestions] = useState<MentionSearchUser[]>([]);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => setReceiver(pmComposeReceiver.value), [pmComposeReceiver.value]);

    useEffect(() => () => {
        if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    }, []);

    const hideSuggestions = () => {
        setSuggestionsVisible(false);
        setActiveSuggestionIndex(0);
    };

    const fetchReceiverSuggestions = async (query: string) => {
        const users = await searchMentionUsers(query, MAX_MENTION_RESULTS);
        if (query !== queryRef.current) return;
        setSuggestions(users);
        setActiveSuggestionIndex(0);
        setSuggestionsVisible(users.length > 0);
    };

    const scheduleReceiverSearch = (value: string) => {
        const query = value.trim();
        queryRef.current = query;
        if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

        if (!query) {
            setSuggestions([]);
            hideSuggestions();
            return;
        }

        searchTimerRef.current = setTimeout(() => {
            void fetchReceiverSuggestions(query);
        }, MENTION_DEBOUNCE);
    };

    const handleReceiverInput = (event: Event) => {
        const value = event.currentTarget instanceof HTMLInputElement ? event.currentTarget.value : '';
        setReceiver(value);
        setError('');
        scheduleReceiverSearch(value);
    };

    const confirmReceiver = async () => {
        if (!receiver.trim() || sending) return;
        setSending(true);
        setError('');
        hideSuggestions();
        const result = await openPmDraftForReceiver(receiver);
        setSending(false);
        if (result.status === 'rejected') setError(result.error);
    };

    const openSuggestedUser = async (user: MentionSearchUser) => {
        if (sending) return;
        const username = user.username.trim();
        if (!username) return;
        setReceiver(username);
        setSending(true);
        setError('');
        hideSuggestions();
        await openPmForUser({
            username,
            nickname: user.nickname || username,
            avatar: user.avatar_url || '',
        });
        setSending(false);
    };

    const handleReceiverKeyDown = (event: KeyboardEvent) => {
        if (event.isComposing || event.keyCode === 229) return;
        if (suggestionsVisible && suggestions.length > 0) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setActiveSuggestionIndex(index => (index + 1) % suggestions.length);
                return;
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                setActiveSuggestionIndex(index => (index + suggestions.length - 1) % suggestions.length);
                return;
            }
            if (event.key === 'Escape') {
                event.preventDefault();
                hideSuggestions();
                return;
            }
        }
        if (event.key !== 'Enter') return;
        event.preventDefault();
        if (suggestionsVisible && suggestions[activeSuggestionIndex]) {
            void openSuggestedUser(suggestions[activeSuggestionIndex]);
        } else {
            void confirmReceiver();
        }
    };

    return (
        <div class="dollars-pm-compose-view">
            <div class="dollars-pm-compose-card">
                <label class="dollars-pm-receiver-field">
                    收件人
                    <input
                        value={receiver}
                        autocomplete="off"
                        autofocus
                        onInput={handleReceiverInput}
                        onKeyDown={handleReceiverKeyDown}
                        onBlur={event => {
                            if (suggestionsRef.current?.contains(event.relatedTarget as Node)) return;
                            setTimeout(hideSuggestions, 120);
                        }}
                    />
                    {suggestionsVisible && suggestions.length > 0 && (
                        <div
                            ref={suggestionsRef}
                            class="dollars-pm-receiver-suggestions visible"
                        >
                            {suggestions.map((user, index) => (
                                <button
                                    key={user.id}
                                    type="button"
                                    class={`mention-item ${index === activeSuggestionIndex ? 'active' : ''}`}
                                    onMouseDown={event => {
                                        event.preventDefault();
                                        void openSuggestedUser(user);
                                    }}
                                >
                                    <img
                                        src={user.avatar_url || '//lain.bgm.tv/pic/user/m/000/00/00/0.jpg'}
                                        alt=""
                                    />
                                    <span class="mention-item-info">
                                        <span class="mention-item-nick">{user.nickname || user.username}</span>
                                        <span class="mention-item-user">@{user.username}</span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </label>
                {error && <div class="dollars-pm-error">{error}</div>}
                <div class="dollars-pm-compose-actions">
                    <button type="button" class="secondary" onClick={() => {
                        setReceiver('');
                        setError('');
                    }}>清空</button>
                    <button type="button" disabled={sending || !receiver.trim()} onClick={confirmReceiver}>
                        {sending ? '打开中…' : '开始聊天'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function BangumiPmChat() {
    if (!isBangumiLoggedIn()) {
        return (
            <div class="pm-empty-state">
                请先登录 Bangumi 后使用短信
                <a href="/login" target="_blank" rel="noopener noreferrer">前往登录</a>
            </div>
        );
    }
    if (activeConversationId.value === 'pm:new') return <PmComposeView />;
    const id = activePmKey();
    return id ? <PmConversationView id={id} /> : <div class="pm-empty-state">请选择一个短信会话</div>;
}
