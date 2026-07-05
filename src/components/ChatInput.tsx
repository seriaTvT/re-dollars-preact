import { useRef, useEffect, useState } from 'preact/hooks';
import {
    replyingTo,
    editingMessage,
    cancelReplyOrEdit,
    pendingMention,
    setReplyTo,
} from '@/stores/composerState';
import {
    saveDraft,
    loadDraft,
    type ReplyInfo
} from '@/stores/drafts';
import { toggleSmileyPanel, inputAreaHeight } from '@/stores/ui';
import { settings } from '@/stores/user';
import { sendTypingStart, sendTypingStop } from '@/services/websocket/client';
import { DRAFT_SAVE_DELAY, TYPING_STOP_DELAY } from '@/utils/constants';
import { escapeHTML, getAvatarUrl } from '@/utils/format';
import { TypingIndicator } from './TypingIndicator';
import { SmileyPanel } from './SmileyPanel';
import { TextFormatter } from './TextFormatter';
import { MentionCompleter } from './MentionCompleter';
import { MediaPreview } from './MediaPreview';
import { AttachMenu } from './AttachMenu';
import { MEDIA_FILE_ACCEPT, useMediaUpload } from '@/hooks/useMediaUpload';
import { useFloatingAttachMenu } from '@/hooks/useFloatingAttachMenu';
import { useRichInput } from '@/hooks/useRichInput';
import type { RichInputController, RichInputValueOptions } from '@/utils/richInput';
import { useMessageComposerSend } from '@/hooks/useMessageComposerSend';
import { formatVoiceDuration, useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { iconFile, iconMic, iconPhoto } from '@/utils/icons';

const MAX_INPUT_HEIGHT = 150;

export function ChatInput() {
    const editorRef = useRef<HTMLDivElement>(null);
    const textareaProxyRef = useRef<HTMLTextAreaElement>(null);
    const inputControllerRef = useRef<RichInputController | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isTypingRef = useRef(false);
    const draftSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dragDepthRef = useRef(0);
    const [isDraggingFiles, setIsDraggingFiles] = useState(false);
    const {
        attachButtonRef,
        attachMenuRef,
        attachMenuPosition,
        closeAttachMenu,
        isAttachMenuClosing,
        isAttachMenuOpen,
        toggleAttachMenu,
    } = useFloatingAttachMenu({ containerRef });

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
        handleFilesUpload,
        handlePaste,
    } = useMediaUpload(inputControllerRef);
    const {
        voiceDraft,
        recordingDuration,
        isRecording,
        startRecording,
        stopRecording,
        cancelVoice,
        clearVoiceDraft,
    } = useVoiceRecorder();
    const { isSending, send } = useMessageComposerSend();

    const scheduleDraftSave = (value: string) => {
        if (editingMessage.value) return;

        if (draftSaveTimerRef.current) {
            clearTimeout(draftSaveTimerRef.current);
        }

        draftSaveTimerRef.current = setTimeout(() => {
            const content = value.trim();
            const reply = replyingTo.value;
            const replyInfo: ReplyInfo | null = reply ? {
                id: reply.id,
                uid: reply.uid,
                user: reply.user,
                avatar: reply.avatar,
                text: reply.text,
                raw: reply.raw
            } : null;
            saveDraft(content, replyInfo);
        }, DRAFT_SAVE_DELAY);
    };

    const processInputState = (value: string, options: RichInputValueOptions = {}) => {
        parseMediaFiles(value, options.knownMeta);

        if (options.silent) {
            if (typingTimerRef.current) {
                clearTimeout(typingTimerRef.current);
            }
            if (isTypingRef.current) {
                sendTypingStop();
                isTypingRef.current = false;
            }
            if (draftSaveTimerRef.current) {
                clearTimeout(draftSaveTimerRef.current);
            }
        } else {
            if (settings.value.sharePresence && !isTypingRef.current) {
                sendTypingStart();
                isTypingRef.current = true;
            }

            if (typingTimerRef.current) {
                clearTimeout(typingTimerRef.current);
            }
            typingTimerRef.current = setTimeout(() => {
                if (isTypingRef.current) {
                    sendTypingStop();
                    isTypingRef.current = false;
                }
            }, TYPING_STOP_DELAY);
            scheduleDraftSave(value);
        }
    };

    const {
        handleInput: handleEditorInput,
        handleCompositionStart,
        handleCompositionEnd,
        isComposing,
        didJustEndComposition,
        updateHeight: updateEditorHeight,
    } = useRichInput({
        editorRef,
        proxyRef: textareaProxyRef,
        controllerRef: inputControllerRef,
        maxHeight: MAX_INPUT_HEIGHT,
        onValueChange: processInputState,
    });

    const clearInput = (focus = false) => {
        inputControllerRef.current?.setValue('', {
            focus,
            silent: true
        });
    };

    // Handle long-press avatar mention
    useEffect(() => {
        const mention = pendingMention.value;
        const controller = inputControllerRef.current;
        if (!mention || !controller) return;

        const { uid, nickname } = mention;
        const mentionText = uid === 'bot' ? `@${nickname}` : `[user=${uid}]${nickname}[/user]`;
        const { start, end } = controller.getSelection();
        const value = controller.getValue();
        const before = value.slice(0, start);
        const needsLeadingSpace = before.length > 0 && !/\s$/.test(before);
        const text = `${needsLeadingSpace ? ' ' : ''}${mentionText} `;

        controller.replaceRange(text, start, end, { focus: true });
        pendingMention.value = null;
    }, [pendingMention.value]);

    // 加载草稿（初始化时）
    useEffect(() => {
        if (editingMessage.value) return;

        const draft = loadDraft();

        if (draft?.content) {
            inputControllerRef.current?.setValue(draft.content, {
                silent: true,
                selection: { start: draft.content.length, end: draft.content.length }
            });
        } else {
            updateEditorHeight();
        }

        if (draft?.replyTo) {
            setReplyTo({
                ...draft.replyTo,
                raw: draft.replyTo.raw || draft.replyTo.text
            });
        }
    }, []);

    // Populate editor when entering edit mode
    useEffect(() => {
        const msg = editingMessage.value;
        if (msg) {
            inputControllerRef.current?.setValue(msg.raw, {
                focus: true,
                knownMeta: msg.image_meta,
                silent: true,
                selection: { start: msg.raw.length, end: msg.raw.length }
            });
            return;
        }

        updateEditorHeight();
    }, [editingMessage.value, updateEditorHeight]);

    useEffect(() => {
        return () => {
            if (typingTimerRef.current) {
                clearTimeout(typingTimerRef.current);
            }
            if (draftSaveTimerRef.current) {
                clearTimeout(draftSaveTimerRef.current);
            }
            if (isTypingRef.current) {
                sendTypingStop();
            }
        };
    }, []);

    const getImageMeta = () => previewMedia.reduce<Record<string, { width: number; height: number }>>((meta, media) => {
        if (media.type === 'image' && media.width && media.height) {
            meta[media.url] = {
                width: media.width,
                height: media.height
            };
        }
        return meta;
    }, {});

    const handleSend = () => send({
        content: inputControllerRef.current?.getValue() || '',
        imageMeta: getImageMeta(),
        voiceDraft,
        clearInput,
        clearMediaPreview: () => setPreviewMedia([]),
        clearVoiceDraft,
    });

    const hasDraggedFiles = (event: DragEvent) => {
        return event.dataTransfer?.types.includes('Files');
    };

    const handleDragEnter = (event: DragEvent) => {
        if (!hasDraggedFiles(event)) return;
        event.preventDefault();
        dragDepthRef.current += 1;
        setIsDraggingFiles(true);
    };

    const handleDragOver = (event: DragEvent) => {
        if (!hasDraggedFiles(event)) return;
        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'copy';
        }
        setIsDraggingFiles(true);
    };

    const handleDragLeave = (event: DragEvent) => {
        if (!hasDraggedFiles(event)) return;
        event.preventDefault();
        dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
        if (dragDepthRef.current === 0) {
            setIsDraggingFiles(false);
        }
    };

    const handleDrop = async (event: DragEvent) => {
        if (!hasDraggedFiles(event)) return;
        event.preventDefault();
        dragDepthRef.current = 0;
        setIsDraggingFiles(false);

        const files = Array.from(event.dataTransfer?.files || []);
        if (files.length) {
            await handleFilesUpload(files);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== 'Enter') return;

        if (isComposing() || didJustEndComposition() || e.keyCode === 229) {
            return;
        }

        const isShortcut = e.ctrlKey || e.metaKey;
        const shouldSend = settings.value.sendShortcut === 'Enter' ? !isShortcut : isShortcut;

        if (shouldSend) {
            e.preventDefault();
            handleSend();
            return;
        }

        e.preventDefault();
        inputControllerRef.current?.insertText('\n', { focus: true });
    };

    // Report height
    useEffect(() => {
        if (!containerRef.current) return;

        const updateHeight = () => {
            if (containerRef.current) {
                inputAreaHeight.value = containerRef.current.offsetHeight;
            }
        };

        const observer = new ResizeObserver(updateHeight);
        observer.observe(containerRef.current);
        updateHeight();

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} class="chat-input-container">
            <SmileyPanel
                onSelect={(code) => inputControllerRef.current?.insertText(code, { focus: true })}
                textareaRef={textareaProxyRef}
            />

            <TextFormatter editorRef={editorRef} inputControllerRef={inputControllerRef} />

            <MentionCompleter editorRef={editorRef} inputControllerRef={inputControllerRef} />

            <TypingIndicator />

            <div
                class={`chat-input-area ${isDraggingFiles ? 'drag-over' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {(replyingTo.value || editingMessage.value) && (
                    <div id="dollars-reply-preview" class={`reply-preview visible`}>
                        <div class="reply-bar"></div>
                        {replyingTo.value && (
                            <>
                                <img
                                    class="reply-avatar"
                                    src={getAvatarUrl(replyingTo.value.avatar, 's')}
                                    alt=""
                                />
                                <div class="reply-info">
                                    <span class="reply-user">{escapeHTML(replyingTo.value.user)}</span>
                                    <span class="reply-text">{escapeHTML(replyingTo.value.text.substring(0, 50))}</span>
                                </div>
                            </>
                        )}
                        {editingMessage.value && (
                            <div class="reply-info">
                                <span class="reply-user">编辑消息</span>
                                <span class="reply-text">{escapeHTML(editingMessage.value.raw.substring(0, 50))}</span>
                            </div>
                        )}
                        <button
                            class="reply-cancel-btn"
                            onClick={() => {
                                clearInput();
                                cancelReplyOrEdit();
                            }}
                        >
                            ✕
                        </button>
                    </div>
                )}

                <MediaPreview
                    previewMedia={previewMedia}
                    onRemoveMedia={handleRemoveMedia}
                />

                {(isRecording || voiceDraft) && (
                    <div class="voice-preview-container visible">
                        {isRecording ? (
                            <>
                                <div class="voice-recording-dot" aria-hidden="true" />
                                <span class="voice-preview-title">正在录音</span>
                                <span class="voice-preview-duration">{formatVoiceDuration(recordingDuration)}</span>
                                <button type="button" class="voice-preview-action primary" onClick={stopRecording}>
                                    停止
                                </button>
                                <button type="button" class="voice-preview-action" onClick={cancelVoice}>
                                    取消
                                </button>
                            </>
                        ) : voiceDraft && (
                            <>
                                <audio class="voice-preview-audio" controls preload="metadata" src={voiceDraft.url} />
                                <span class="voice-preview-duration">{formatVoiceDuration(voiceDraft.duration)}</span>
                                <button type="button" class="voice-preview-action" onClick={cancelVoice} title="删除语音">
                                    删除
                                </button>
                            </>
                        )}
                    </div>
                )}

                <div class="input-wrapper">
                    <button
                        id="dollars-emoji-btn"
                        class="action-btn"
                        title="表情"
                        onClick={() => toggleSmileyPanel()}
                    />

                    <div class="dollars-input-wrapper">
                        <div
                            ref={editorRef}
                            class="chat-textarea chat-rich-editor"
                            contentEditable
                            role="textbox"
                            aria-multiline="true"
                            data-placeholder="说点什么..."
                            spellcheck={false}
                            onInput={handleEditorInput}
                            onKeyDown={handleKeyDown}
                            onPaste={handlePaste}
                            onCompositionStart={handleCompositionStart}
                            onCompositionEnd={handleCompositionEnd}
                        />
                        <textarea
                            ref={textareaProxyRef}
                            class="chat-textarea-proxy"
                            tabIndex={-1}
                            aria-hidden="true"
                        />
                    </div>

                    <div class="input-actions">
                        <div class="dollars-attach-menu-wrapper">
                            <button
                                ref={attachButtonRef}
                                id="dollars-attach-btn"
                                class={`action-btn ${isAttachMenuOpen && !isAttachMenuClosing ? 'active' : ''}`}
                                title="上传附件"
                                aria-haspopup="menu"
                                aria-expanded={isAttachMenuOpen && !isAttachMenuClosing}
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
                                    {
                                        icon: iconMic,
                                        label: isRecording ? '停止录音' : (voiceDraft ? '重录语音' : '语音'),
                                        disabled: !!editingMessage.value || (!isRecording && (isSending || isUploading)),
                                        onClick: () => {
                                            closeAttachMenu();
                                            if (isRecording) stopRecording();
                                            else void startRecording();
                                        },
                                    },
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
                            class={`send-btn ${isUploading ? 'uploading' : ''}`}
                            disabled={isSending || isUploading || isRecording}
                            onClick={handleSend}
                            onMouseDown={(e) => e.preventDefault()}
                            title={isUploading || isSending ? '发送中...' : (isRecording ? '请先停止录音' : '发送')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
