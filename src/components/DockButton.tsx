import { useEffect } from 'preact/hooks';
import { isChatOpen, toggleChat } from '@/stores/chat';
import { dockIconFlashing, stopDockFlashing, notifications } from './NotificationManager';

const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13.05 20.1l-3.05 -6.1l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5l-3.312 9.173" /><path d="M19 16l-2 3h4l-2 3" /></svg>`;

const svgDataUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;

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
    icon.style.backgroundImage = `url('${svgDataUrl}')`;
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
