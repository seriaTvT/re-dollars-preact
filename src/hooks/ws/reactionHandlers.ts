import { getMessageById, updateMessage } from '@/stores/chat';
import { userInfo } from '@/stores/user';

/**
 * 更新反应 UI
 */
function updateReactionUI(messageId: number, reaction: { user_id: number | string; nickname: string; emoji: string; avatar?: string }, action: 'add' | 'remove') {
    const msg = getMessageById(messageId);
    if (!msg) return;

    const reactions = [...(msg.reactions || [])];
    const reactionUserId = String(reaction.user_id);

    if (action === 'add') {
        const existingIdx = reactions.findIndex(r => r.emoji === reaction.emoji && String(r.user_id) === reactionUserId);
        if (existingIdx === -1) {
            reactions.push({
                emoji: reaction.emoji,
                user_id: reaction.user_id as number,
                nickname: reaction.nickname,
                avatar: reaction.avatar,
            });
        }
    } else {
        const idx = reactions.findIndex(r => r.emoji === reaction.emoji && String(r.user_id) === reactionUserId);
        if (idx !== -1) {
            reactions.splice(idx, 1);
        }
    }

    updateMessage(messageId, { reactions });

    if (action === 'add' && String(reaction.user_id) === String(userInfo.value.id)) {
        setTimeout(() => {
            const el = document.querySelector(`#db-${messageId} .reaction-item[data-emoji="${reaction.emoji}"]`);
            if (el) {
                el.classList.add('live_selected');
                setTimeout(() => el.classList.remove('live_selected'), 1000);
            }
        }, 10);
    }
}

/**
 * 处理反应添加
 */
export function handleReactionAdd(data: any) {
    updateReactionUI(data.payload.message_id, data.payload.reaction, 'add');
}

/**
 * 处理反应移除
 */
export function handleReactionRemove(data: any) {
    const { message_id, user_id, emoji, nickname } = data.payload;
    updateReactionUI(message_id, { user_id, nickname: nickname || '', emoji }, 'remove');
}
