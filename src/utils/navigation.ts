/** 跳转到指定消息并执行高亮动画 */
export async function navigateToMessage(msgId: number) {
    const { loadMessageContext } = await import('@/stores/chat');
    const { smoothScrollToCenter } = await import('./smoothScroll');

    const result = await loadMessageContext(msgId);
    if (!result) return;

    setTimeout(() => {
        const targetId = `db-${msgId}`;
        const el = document.getElementById(targetId);
        const listEl = document.querySelector('.chat-list');

        if (el) {
            el.scrollIntoView({ behavior: 'auto', block: 'center' });

            setTimeout(() => {
                const container = document.querySelector('.chat-body') as HTMLElement | null;
                if (container) {
                    smoothScrollToCenter(container, el);
                } else {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);

            if (listEl) listEl.classList.add('focus-mode');

            el.classList.remove('message-highlight');
            void el.offsetWidth;
            el.classList.add('message-highlight');

            setTimeout(() => {
                if (listEl) listEl.classList.remove('focus-mode');
                el.classList.remove('message-highlight');
            }, 800);
        } else if (listEl && result.targetIndex >= 0) {
            const msgs = listEl.querySelectorAll('.chat-message');
            if (result.targetIndex < msgs.length) {
                msgs[result.targetIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, 300);
}
