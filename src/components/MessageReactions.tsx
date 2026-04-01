import { useRef, useEffect } from 'preact/hooks';
import { userInfo } from '@/stores/user';
import { toggleReaction } from '@/utils/api';
import { getSmileyUrl } from '@/utils/smilies';
import { getAvatarUrl, generateReactionTooltip } from '@/utils/format';
import { MAX_AVATARS_SHOWN } from '@/utils/constants';
import type { Reaction } from '@/types';

interface MessageReactionsProps {
    reactions: Reaction[];
    messageId: number;
}

export function MessageReactions({ reactions, messageId }: MessageReactionsProps) {
    if (!reactions || reactions.length === 0) return null;

    // 按 emoji 分组
    const grouped = reactions.reduce((acc, r) => {
        if (!acc[r.emoji]) acc[r.emoji] = [];
        acc[r.emoji].push(r);
        return acc;
    }, {} as Record<string, Reaction[]>);

    return (
        <div class="reactions-container likes_grid">
            {Object.entries(grouped).map(([emoji, users]) => (
                <ReactionItem key={emoji} emoji={emoji} users={users} messageId={messageId} />
            ))}
        </div>
    );
}

interface ReactionItemProps {
    emoji: string;
    users: Reaction[];
    messageId: number;
}

function ReactionItem({ emoji, users, messageId }: ReactionItemProps) {
    const url = getSmileyUrl(emoji);
    const itemRef = useRef<HTMLDivElement>(null);
    const isBmo = emoji.startsWith('(bmo');

    // 使用 peek() 避免订阅信号
    const isSelected = users.some(u => String(u.user_id) === String(userInfo.peek().id));

    // 分离有头像和无头像的用户
    const usersWithAvatar = users.filter(u => u.avatar);
    const anonymousCount = users.length - usersWithAvatar.length;

    // 限制显示的头像数量
    const avatarsToShow = usersWithAvatar.slice(0, MAX_AVATARS_SHOWN);
    const extraAvatarCount = usersWithAvatar.length - MAX_AVATARS_SHOWN;

    // 计算额外人数显示 (超出的头像用户 + 匿名用户)
    const extraCount = Math.max(0, extraAvatarCount) + anonymousCount;

    useEffect(() => {
        const el = itemRef.current;
        if (!el) return;

        const $ = (window as any).$;
        if (typeof $ === 'undefined' || typeof $.fn?.tooltip !== 'function') {
            el.setAttribute('title', users.map(u => u.nickname).join('、'));
            return;
        }

        el.setAttribute('data-original-title', generateReactionTooltip(users));
        el.setAttribute('title', '');

        const $el = $(el);
        let hideTimeout: ReturnType<typeof setTimeout> | undefined;
        const getTip = () => {
            const tooltip = $el.data('bs.tooltip');
            return tooltip?.$tip || (typeof tooltip?.tip === 'function' ? $(tooltip.tip()) : null);
        };
        const clearHideTimeout = () => {
            if (!hideTimeout) return;
            clearTimeout(hideTimeout);
            hideTimeout = undefined;
        };
        const scheduleHide = () => {
            clearHideTimeout();
            hideTimeout = setTimeout(() => $el.tooltip('hide'), 300);
        };
        const syncTooltipHover = () => {
            const $tip = getTip();
            if (!$tip?.length) return;

            $tip.off('.dollarsTooltip');
            $tip.on('mouseenter.dollarsTooltip', clearHideTimeout);
            $tip.on('mouseleave.dollarsTooltip', scheduleHide);
            $tip.on('click.dollarsTooltip', (event: Event) => event.stopPropagation());
        };
        const handleMouseEnter = () => {
            clearHideTimeout();
            $el.tooltip('show');
            syncTooltipHover();
        };

        $el.tooltip('destroy');
        $el.tooltip({
            container: 'body',
            html: true,
            placement: 'top',
            animation: true,
            trigger: 'manual',
            template: '<div class="tooltip dollars-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        });
        $el.off('.dollarsTooltip');
        $el.on('mouseenter.dollarsTooltip', handleMouseEnter);
        $el.on('mouseleave.dollarsTooltip', scheduleHide);

        return () => {
            clearHideTimeout();
            getTip()?.off('.dollarsTooltip');
            $el.off('.dollarsTooltip');
            $el.tooltip('hide');
            $el.tooltip('destroy');
        };
    }, [users]);

    const handleToggle = async (e: MouseEvent) => {
        e.stopPropagation();
        await toggleReaction(messageId, emoji);
    };

    return (
        <div
            ref={itemRef}
            class={`reaction-item item ${isSelected ? 'selected' : ''}`}
            data-emoji={emoji}
            onClick={handleToggle}
        >
            <span
                class="emoji"
                style={url ? { backgroundImage: `url('${url}')` } : undefined}
            >
                {!url && !isBmo && emoji}
                {isBmo && <span class="bmo" data-code={emoji}></span>}
            </span>

            {/* 头像列表 */}
            {avatarsToShow.length > 0 && (
                <span class="reaction-avatars">
                    {avatarsToShow.map((u, i) => (
                        <img
                            key={u.user_id}
                            class="reaction-avatar"
                            src={getAvatarUrl(u.avatar!, 'l')}
                            alt={u.nickname}
                            style={{ zIndex: MAX_AVATARS_SHOWN - i }}
                        />
                    ))}
                </span>
            )}

            {/* 纯数字计数 (无头像时) 或 额外人数 */}
            {avatarsToShow.length === 0 ? (
                <span class="num">{users.length}</span>
            ) : extraCount > 0 ? (
                <span class="num extra">+{extraCount}</span>
            ) : null}
        </div>
    );
}
