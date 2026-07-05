import { useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import {
    isContextMenuOpen,
    isContextMenuClosing,
    contextMenuPosition,
    contextMenuTarget,
    contextMenuTargetId,
    contextMenuImageUrl,
    contextMenuBmoCode,
    contextMenuSource,
    hideContextMenu,
    showReactionPicker,
    hideReactionPicker,
    isReactionPickerOpen,
} from '@/stores/ui';
import { setReplyTo, setEditingMessage } from '@/stores/composerState';
import { pmDetails, setPmReplyToMessage } from '@/stores/bangumiPm';
import { messageMap } from '@/stores/messageStore';
import { userInfo } from '@/stores/user';
import { toggleReaction as apiToggleReaction, deleteMessage as apiDeleteMessage } from '@/utils/api/messages';
import { CONTEXT_MENU_REACTIONS } from '@/utils/constants';
import { iconCopy, iconDelete, iconEdit, iconExpand, iconFavorite, iconReply } from '@/utils/icons';
import { getSmileyUrl } from '@/utils/smilies';
import { copyRawMessageText, rawMessageForTarget, summarizeReplyText } from '@/utils/messageActions';
import { addFavorite } from '@/stores/favorites';
import { ReactionPickerFloating } from './ReactionPickerFloating';
import { onBmoReady } from '@/utils/bmo';

export function ContextMenu() {
    const menuRef = useRef<HTMLDivElement>(null);

    // 点击外部关闭
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const menu = menuRef.current;
            const picker = document.getElementById('dollars-reaction-picker-floating');
            if (menu && !menu.contains(e.target as Node) && (!picker || !picker.contains(e.target as Node))) {
                hideContextMenu();
            }
        };

        if (isContextMenuOpen.value) {
            document.addEventListener('click', handleClick);
        }

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [isContextMenuOpen.value]);

    // 防止溢出屏幕
    useLayoutEffect(() => {
        if (isContextMenuOpen.value && menuRef.current) {
            const el = menuRef.current;
            const rect = el.getBoundingClientRect();
            let { x, y } = contextMenuPosition.value;
            let hasChanged = false;

            // X 轴修正
            if (x + rect.width > window.innerWidth) {
                x = Math.max(10, window.innerWidth - rect.width - 10); // 右侧留 10px 边距
                hasChanged = true;
            }
            if (x < 10) {
                x = 10;
                hasChanged = true;
            }

            // Y 轴修正
            if (y + rect.height > window.innerHeight) {
                y = Math.max(10, window.innerHeight - rect.height - 10); // 底部留 10px 边距
                hasChanged = true;
            }
            if (y < 10) {
                y = 10;
                hasChanged = true;
            }

            if (hasChanged) {
                el.style.left = `${x}px`;
                el.style.top = `${y}px`;
            }
        }
    }, [isContextMenuOpen.value, contextMenuPosition.value]);

    // Render BMO emojis when menu opens
    useEffect(() => {
        if (!isContextMenuOpen.value) return;

        const renderBmo = () => {
            requestAnimationFrame(() => {
                if ((window as any).Bmoji && menuRef.current) {
                    (window as any).Bmoji.renderAll(menuRef.current, { width: 24, height: 24 });
                }
            });
        };

        renderBmo();
        return onBmoReady(renderBmo);
    }, [isContextMenuOpen.value]);

    const handleReaction = async (emoji: string) => {
        const target = contextMenuTarget.value;
        if (!target || target.kind !== 'dollars') return;

        hideContextMenu();
        await apiToggleReaction(Number(target.id), emoji);
    };

    const handleMoreReactions = (e: MouseEvent) => {
        e.stopPropagation();

        // 如果已打开则关闭
        if (isReactionPickerOpen.value) {
            hideReactionPicker();
            return;
        }

        const button = e.currentTarget as HTMLElement;
        const reactionsRow = button.closest('.context-menu-reactions');

        if (reactionsRow) {
            const rect = reactionsRow.getBoundingClientRect();
            // Align with the left edge of the reactions row (same as items)
            // 8px gap matches the gap between reactions and items
            showReactionPicker(rect.left, rect.bottom + 8, rect.width);
        }
    };

    const handleReply = () => {
        const target = contextMenuTarget.value;
        if (!target) return;

        hideContextMenu();

        if (target.kind === 'pm') {
            if (!setPmReplyToMessage(target.conversationId, target.id)) return;
            requestAnimationFrame(() => {
                const editor = document.querySelector('.dollars-pm-textarea') as HTMLElement | null;
                editor?.focus();
            });
            return;
        }

        const message = messageMap.value.get(Number(target.id));
        const raw = rawMessageForTarget(target);
        if (!raw || !message) return;

        setReplyTo({
            id: target.id,
            uid: String(message.uid),
            user: message.nickname,
            text: summarizeReplyText(raw),
            raw,
            avatar: message.avatar,
        });
    };

    const handleEdit = () => {
        const target = contextMenuTarget.value;
        if (!target || target.kind !== 'dollars') return;

        hideContextMenu();

        const msg = messageMap.value.get(Number(target.id));
        if (!msg) return;

        const rawContent = msg.message;
        const quoteRegex = /^(\[quote(?:=[^\]]*)?\][\s\S]*?\[\/quote\])\s*/i;
        const match = rawContent.match(quoteRegex);

        let hiddenQuote = '';
        let editableText = rawContent;

        if (match) {
            hiddenQuote = match[1];
            editableText = rawContent.substring(match[0].length);
        }

        setEditingMessage({
            id: target.id,
            raw: editableText,
            hiddenQuote,
            image_meta: msg.image_meta
        });
    };

    const handleCopy = async () => {
        const target = contextMenuTarget.value;
        if (!target) return;

        hideContextMenu();

        await copyRawMessageText(rawMessageForTarget(
            target,
            target.kind === 'pm' ? pmDetails.peek()[target.conversationId] : undefined
        ));
    };

    const handleDelete = async () => {
        const target = contextMenuTarget.value;
        if (!target || target.kind !== 'dollars') return;

        hideContextMenu(); // Close first to improve responsiveness

        if (!confirm('确认撤回这条消息吗？')) {
            return;
        }

        const result = await apiDeleteMessage(Number(target.id));
        if (!result.status) {
            alert(result.error || '撤回失败');
        }
    };

    const handleFavorite = (e: MouseEvent) => {
        const button = e.currentTarget as HTMLButtonElement;
        const label = button.querySelector('span:not(.context-icon)');
        const setLabel = (text: string) => {
            if (label) label.textContent = text;
        };

        if (contextMenuBmoCode.value) {
            const bmoCode = contextMenuBmoCode.value;
            try {
                const bmoji = (window as any).Bmoji;
                const existing = bmoji.savedBmo.list() || [];
                if (!existing.some((i: any) => i.code === bmoCode)) {
                    bmoji.savedBmo.create({ code: bmoCode, name: bmoCode });
                    setLabel('已存入BMO面板');
                } else {
                    setLabel('已存在');
                }
            } catch (err) {
                setLabel('收藏失败');
            }
        } else if (contextMenuImageUrl.value) {
            // Logic for regular images
            try {
                addFavorite(contextMenuImageUrl.value);
                setLabel('已收藏');
            } catch (err) {
                setLabel('收藏失败');
            }
        }

        setTimeout(() => {
            hideContextMenu();
        }, 1000);
    };



    if (!isContextMenuOpen.value) {
        return null;
    }

    const { x, y } = contextMenuPosition.value;
    const target = contextMenuTarget.value;
    const targetId = target?.id ?? contextMenuTargetId.value;
    const isPmMenu = target?.kind === 'pm' || contextMenuSource.value === 'pm';
    const msg = target?.kind === 'dollars' ? messageMap.value.get(Number(target.id)) : null;
    const isSelf = msg && String(msg.uid) === String(userInfo.value.id);
    const hasImage = !isPmMenu && (!!contextMenuImageUrl.value || !!contextMenuBmoCode.value);

    return (
        <>
            <div
                id="dollars-context-menu"
                ref={menuRef}
                class={`visible has-items-wrapper ${hasImage ? 'image-mode' : ''} ${isContextMenuClosing.value ? 'closing' : ''}`}
                style={{ left: `${x}px`, top: `${y}px`, pointerEvents: 'auto' }}
            >
                {/* 快捷表情行 - Telegram 风格 */}
                {targetId && !isPmMenu && (
                    <div class="context-menu-reactions">
                        {CONTEXT_MENU_REACTIONS.map((emoji) => {
                            const url = getSmileyUrl(emoji);
                            const isBmo = emoji.startsWith('(bmo');
                            return (
                                <div
                                    key={emoji}
                                    class="reaction-item"
                                    data-emoji={emoji}
                                    onClick={() => handleReaction(emoji)}
                                >
                                    {url && <img src={url} alt={emoji} />}
                                    {isBmo && <span class="bmo" data-code={emoji}></span>}
                                </div>
                            );
                        })}
                        {/* More button */}
                        <button
                            class={`context-menu-reactions-more ${isReactionPickerOpen.value ? 'expanded' : ''}`}
                            onClick={handleMoreReactions}
                            title="更多表情"
                            dangerouslySetInnerHTML={{ __html: iconExpand }}
                        />
                    </div>
                )}

                {/* 菜单项 */}
                {/* 菜单项 - 当表情选择器打开时隐藏 */}
                {!isReactionPickerOpen.value && isPmMenu && (
                    <div class="context-menu-items">
                        <button data-action="reply" onClick={handleReply}>
                            <span class="context-icon" dangerouslySetInnerHTML={{ __html: iconReply }} />
                            <span>回复</span>
                        </button>
                        <button data-action="copy" onClick={handleCopy}>
                            <span class="context-icon" dangerouslySetInnerHTML={{ __html: iconCopy }} />
                            <span>复制</span>
                        </button>
                    </div>
                )}

                {!isReactionPickerOpen.value && !isPmMenu && (
                    <div class="context-menu-items">
                        <button data-action="reply" onClick={handleReply}>
                            <span class="context-icon" dangerouslySetInnerHTML={{ __html: iconReply }} />
                            <span>回复</span>
                        </button>
                        <button data-action="copy" onClick={handleCopy}>
                            <span class="context-icon" dangerouslySetInnerHTML={{ __html: iconCopy }} />
                            <span>复制</span>
                        </button>

                        {hasImage && (
                            <button class="image-action" data-action="favorite" onClick={handleFavorite}>
                                <span class="context-icon" dangerouslySetInnerHTML={{ __html: iconFavorite }} />
                                <span>收藏表情</span>
                            </button>
                        )}

                        {isSelf && (
                            <>
                                <button class="auth-action" data-action="edit" onClick={handleEdit}>
                                    <span class="context-icon" dangerouslySetInnerHTML={{ __html: iconEdit }} />
                                    <span>编辑</span>
                                </button>
                                <button class="auth-action danger" data-action="delete" onClick={handleDelete}>
                                    <span class="context-icon" dangerouslySetInnerHTML={{ __html: iconDelete }} />
                                    <span>撤回</span>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* 浮动表情选择器 */}
            <ReactionPickerFloating />
        </>
    );
}
