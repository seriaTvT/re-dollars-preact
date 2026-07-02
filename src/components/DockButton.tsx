import { useEffect } from 'preact/hooks';
import { isChatOpen, toggleChat } from '@/stores/chatState';
import { dockIconFlashing, stopDockFlashing, notifications } from './NotificationManager';

function updateBadge(link: HTMLAnchorElement, count: number) {
    let badge = link.querySelector('.dock-notif-badge') as HTMLElement | null;
    if (count > 0) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'dock-notif-badge';
            link.appendChild(badge);
        }
        badge.textContent = count > 99 ? '99+' : String(count);
        badge.style.display = 'block';
    } else if (badge) {
        badge.style.display = 'none';
    }
}

function createDockLink() {
    const link = document.createElement('a');
    link.href = '#';
    link.id = 'dock-chat-link';
    link.title = '打开聊天窗口';

    const icon = document.createElement('span');
    icon.className = 'ico ico-sq ico_robot_open';
    icon.textContent = '聊天';
    link.appendChild(icon);

    link.addEventListener('click', (e) => {
        e.preventDefault();
        toggleChat(!isChatOpen.value);
        if (!isChatOpen.value) {
            stopDockFlashing();
        }
    });

    return link;
}

export function DockButton() {
    useEffect(() => {
        const notifyLink = document.querySelector('#dock a[href*="/notify/all"]');
        if (!notifyLink) return;

        const parentLi = notifyLink.closest('li');
        if (!parentLi) return;

        const li = document.createElement('li');
        li.className = 'chat';
        const link = createDockLink();
        li.appendChild(link);
        parentLi.before(li);

        const unsubscribe = dockIconFlashing.subscribe((flashing) => {
            link.classList.toggle('flashing', flashing);
        });
        const unsubscribeCount = notifications.subscribe((items) => updateBadge(link, items.length));

        return () => {
            unsubscribe();
            unsubscribeCount();
            li.remove();
        };
    }, []);

    return null;
}
