import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { MEDIA_FILE_ACCEPT, useMediaUpload } from '@/hooks/useMediaUpload';
import { useCollapsibleMessage } from '@/hooks/useCollapsibleMessage';
import { useMessageImageViewer } from '@/hooks/useMessageImageViewer';
import { activeConversationId } from '@/stores/conversations';
import {
    activePmId,
    isBangumiLoggedIn,
    loadPmDetail,
    pmComposeReceiver,
    pmConversations,
    pmDetailError,
    pmDetailLoading,
    pmDetails,
    submitNewPm,
    submitPmReply,
} from '@/stores/bangumiPm';
import { showUserProfile, toggleSmileyPanel } from '@/stores/ui';
import { settings } from '@/stores/user';
import { COLLAPSE_MAX_HEIGHT } from '@/utils/constants';
import { formatDate } from '@/utils/format';
import { getFloatingDateLabel, isNearScrollBottom } from '@/utils/floatingDate';
import { iconFile, iconPhoto } from '@/utils/icons';
import { canGroupAdjacentMessages } from '@/utils/messageGrouping';
import {
    getBubbleTimestampMode,
    hasRichBubbleContent,
    isStickerMessage,
} from '@/utils/messagePresentation';
import type { RichInputController, RichInputValueOptions } from '@/utils/richInput';
import type { BangumiPmMessage } from '@/types/pm';
import { MediaPreview } from './MediaPreview';
import { FloatingDateCapsule } from './FloatingDateCapsule';
import { SmileyPanel } from './SmileyPanel';

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
}: {
    message: BangumiPmMessage;
    nickname: string;
    isGrouped: boolean;
    isGroupedWithNext: boolean;
}) {
    const textContentRef = useRef<HTMLDivElement>(null);
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
    const handleAvatarClick = (event: MouseEvent) => {
        const username = message.userHref.match(/^\/user\/(.+)$/)?.[1];
        if (!username) return;
        event.preventDefault();
        event.stopPropagation();
        showUserProfile('bgm:' + decodeURIComponent(username));
    };

    return (
        <div
            class={`chat-message dollars-pm-message${message.isSelf ? ' self' : ''}${isGrouped ? ' is-grouped-with-prev' : ''}${isGroupedWithNext ? ' is-grouped-with-next' : ''}`}
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
                <div class={`bubble${isSticker ? ' sticker-mode' : ''}${timestampMode === 'trailing' ? ' has-trailing-timestamp' : ''}${timestampMode === 'stacked' ? ' has-stacked-timestamp' : ''}`}>
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

function handleComposerKeyDown(event: KeyboardEvent, submit: () => void) {
    if (event.key !== 'Enter' || event.isComposing || event.keyCode === 229) return;
    const modifier = event.ctrlKey || event.metaKey;
    const shouldSend = settings.value.sendShortcut === 'Enter' ? !modifier : modifier;
    if (!shouldSend) return;
    event.preventDefault();
    submit();
}

function PmConversationView({ id }: { id: string }) {
    const detail = pmDetails.value[id];
    const conversation = pmConversations.value.find(item => item.id === id);
    const displayDetail = detail || {
        id,
        nickname: conversation?.nickname || 'Bangumi 短信',
        username: '',
        avatar: conversation?.avatar || '',
        messages: [],
        replyForm: null,
    };
    const isInitialLoading = !detail && (pmDetailLoading.value || !pmDetailError.value);
    const [body, setBody] = useState('');
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState('');
    const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const composerRef = useRef<HTMLTextAreaElement>(null);
    const inputControllerRef = useRef<RichInputController | null>(null);
    const bodyRef = useRef('');
    const selectionRef = useRef({ start: 0, end: 0 });
    const attachButtonRef = useRef<HTMLButtonElement>(null);
    const attachMenuRef = useRef<HTMLDivElement>(null);
    const previousLastId = useRef('');
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

    const resizeComposer = useCallback(() => {
        const textarea = composerRef.current;
        if (!textarea) return;
        textarea.style.height = '38px';
        textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_INPUT_HEIGHT)}px`;
        textarea.style.overflowY = textarea.scrollHeight > MAX_INPUT_HEIGHT ? 'auto' : 'hidden';
    }, []);

    const applyBody = useCallback((value: string, options: RichInputValueOptions = {}) => {
        const selection = options.selection || { start: value.length, end: value.length };
        bodyRef.current = value;
        selectionRef.current = selection;
        setBody(value);
        parseMediaFiles(value, options.knownMeta);
        requestAnimationFrame(() => {
            resizeComposer();
            if (options.focus) composerRef.current?.focus();
            composerRef.current?.setSelectionRange(selection.start, selection.end);
        });
    }, [parseMediaFiles, resizeComposer]);

    inputControllerRef.current = {
        focus: () => composerRef.current?.focus(),
        getSelection: () => {
            const textarea = composerRef.current;
            if (textarea) {
                selectionRef.current = {
                    start: textarea.selectionStart,
                    end: textarea.selectionEnd,
                };
            }
            return selectionRef.current;
        },
        getValue: () => bodyRef.current,
        insertText: (text, options = {}) => {
            const selection = inputControllerRef.current?.getSelection() || selectionRef.current;
            inputControllerRef.current?.replaceRange(text, selection.start, selection.end, options);
        },
        replaceRange: (text, start, end, options = {}) => {
            const value = bodyRef.current;
            const nextValue = value.substring(0, start) + text + value.substring(end);
            const selection = options.selection || {
                start: start + text.length,
                end: start + text.length,
            };
            applyBody(nextValue, { ...options, selection });
        },
        setSelection: (start, end = start) => {
            selectionRef.current = { start, end };
            composerRef.current?.setSelectionRange(start, end);
        },
        setValue: applyBody,
    };

    useEffect(() => {
        if (!detail) void loadPmDetail(id);
    }, [id]);

    useEffect(() => {
        const lastId = detail?.messages[detail.messages.length - 1]?.id || '';
        if (lastId && lastId !== previousLastId.current) {
            requestAnimationFrame(() => {
                if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
            });
        }
        previousLastId.current = lastId;
    }, [detail?.messages]);

    useEffect(() => {
        if (!isAttachMenuOpen) return;
        const closeOnOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (attachButtonRef.current?.contains(target) || attachMenuRef.current?.contains(target)) return;
            setIsAttachMenuOpen(false);
        };
        document.addEventListener('mousedown', closeOnOutsideClick);
        return () => document.removeEventListener('mousedown', closeOnOutsideClick);
    }, [isAttachMenuOpen]);

    const send = async () => {
        const content = body.trim();
        if (!content || sending || isUploading) return;
        setSending(true);
        setSendError('');
        const result = await submitPmReply(id, content);
        setSending(false);
        if (result.status === 'sent') {
            applyBody('', { focus: true });
            setPreviewMedia([]);
            return;
        }
        setSendError(result.error);
    };

    let previousTopic = '';
    return (
        <div class="dollars-pm-view">
            <PmFloatingDate listRef={listRef} />
            <div class="dollars-pm-message-scroll" ref={listRef}>
                {isInitialLoading && (
                    <div class="pm-empty-state">正在加载短信…</div>
                )}
                {!isInitialLoading && !detail && (
                    <div class="pm-empty-state">
                        {pmDetailError.value || '短信会话暂不可用'}
                        <button type="button" onClick={() => void loadPmDetail(id)}>重试</button>
                    </div>
                )}
                {displayDetail.messages.map((message, index) => {
                    const showTopic = !!message.topic && message.topic !== previousTopic;
                    previousTopic = message.topic || previousTopic;
                    const isGrouped = arePmMessagesGrouped(displayDetail.messages[index - 1], message);
                    const isGroupedWithNext = arePmMessagesGrouped(message, displayDetail.messages[index + 1]);
                    return (
                        <div key={message.id}>
                            {showTopic && <div class="dollars-pm-topic">{message.topic}</div>}
                            <PmMessageItem
                                message={message}
                                nickname={displayDetail.nickname}
                                isGrouped={isGrouped}
                                isGroupedWithNext={isGroupedWithNext}
                            />
                        </div>
                    );
                })}
                {!isInitialLoading && detail && detail.messages.length === 0 && <div class="pm-empty-state">这个会话还没有短信</div>}
            </div>
            <div class="chat-input-container dollars-pm-input-container">
                <SmileyPanel
                    onSelect={code => inputControllerRef.current?.insertText(code, { focus: true })}
                    textareaRef={composerRef}
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
                            disabled={sending || isUploading || !detail?.replyForm}
                            onClick={() => toggleSmileyPanel()}
                        />
                        <div class="dollars-input-wrapper">
                            <textarea
                                ref={composerRef}
                                class="chat-textarea dollars-pm-textarea"
                                value={body}
                                placeholder="输入短信"
                                disabled={sending || !detail?.replyForm}
                                onInput={event => {
                                    const textarea = event.currentTarget;
                                    bodyRef.current = textarea.value;
                                    selectionRef.current = {
                                        start: textarea.selectionStart,
                                        end: textarea.selectionEnd,
                                    };
                                    setBody(textarea.value);
                                    parseMediaFiles(textarea.value);
                                    resizeComposer();
                                }}
                                onSelect={event => {
                                    selectionRef.current = {
                                        start: event.currentTarget.selectionStart,
                                        end: event.currentTarget.selectionEnd,
                                    };
                                }}
                                onPaste={handlePaste}
                                onKeyDown={event => handleComposerKeyDown(event, send)}
                            />
                        </div>
                        <div class="input-actions">
                            <div class="dollars-attach-menu-wrapper">
                                <button
                                    ref={attachButtonRef}
                                    type="button"
                                    id="dollars-attach-btn"
                                    class={`action-btn ${isAttachMenuOpen ? 'active' : ''}`}
                                    title="上传附件"
                                    aria-haspopup="menu"
                                    aria-expanded={isAttachMenuOpen}
                                    disabled={sending || isUploading || !detail?.replyForm}
                                    onClick={() => setIsAttachMenuOpen(open => !open)}
                                />
                                {isAttachMenuOpen && (
                                    <div ref={attachMenuRef} class="dollars-pm-attach-menu context-menu-items" role="menu">
                                        <button type="button" role="menuitem" onClick={() => {
                                            setIsAttachMenuOpen(false);
                                            handleAttachMediaClick();
                                        }}>
                                            <span class="context-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: iconPhoto }} />
                                            <span>媒体</span>
                                        </button>
                                        <button type="button" role="menuitem" onClick={() => {
                                            setIsAttachMenuOpen(false);
                                            handleAttachFileClick();
                                        }}>
                                            <span class="context-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: iconFile }} />
                                            <span>文件</span>
                                        </button>
                                    </div>
                                )}
                            </div>
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
                                disabled={sending || isUploading || !detail?.replyForm}
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
    const [receiver, setReceiver] = useState(pmComposeReceiver.value);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => setReceiver(pmComposeReceiver.value), [pmComposeReceiver.value]);

    const send = async () => {
        if (!receiver.trim() || !title.trim() || !body.trim() || sending) return;
        setSending(true);
        setError('');
        const result = await submitNewPm(receiver.trim(), title.trim(), body.trim());
        setSending(false);
        if (result.status !== 'sent') setError(result.error);
    };

    return (
        <div class="dollars-pm-compose-view">
            <div class="dollars-pm-compose-card">
                <label>
                    收件人
                    <input value={receiver} autocomplete="off" onInput={event => setReceiver(event.currentTarget.value)} />
                </label>
                <label>
                    主题
                    <input value={title} onInput={event => setTitle(event.currentTarget.value)} />
                </label>
                <label class="dollars-pm-compose-body">
                    正文
                    <textarea
                        value={body}
                        onInput={event => setBody(event.currentTarget.value)}
                        onKeyDown={event => handleComposerKeyDown(event, send)}
                    />
                </label>
                {error && <div class="dollars-pm-error">{error}</div>}
                <div class="dollars-pm-compose-actions">
                    <button type="button" class="secondary" onClick={() => {
                        setReceiver('');
                        setTitle('');
                        setBody('');
                        setError('');
                    }}>清空</button>
                    <button type="button" disabled={sending || !receiver.trim() || !title.trim() || !body.trim()} onClick={send}>
                        {sending ? '发送中…' : '发送短信'}
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
    const id = activePmId();
    return id ? <PmConversationView id={id} /> : <div class="pm-empty-state">请选择一个短信会话</div>;
}
