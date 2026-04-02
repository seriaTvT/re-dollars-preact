import { render } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { isChatOpen, toggleChat } from '@/stores/chat';
import { dockIconFlashing, stopDockFlashing, notificationCount } from './NotificationManager';

export function DockButton() {
    useEffect(() => {
        const notifyLink = document.querySelector('#dock a[href*="/notify/all"]');
        if (!notifyLink) return;

        const parentLi = notifyLink.closest('li');
        if (!parentLi) return;

        const li = document.createElement('li');
        li.className = 'chat';
        parentLi.before(li);
        render(<DockButtonContent />, li);

        return () => {
            render(null, li);
            li.remove();
        };
    }, []);

    return null;
}

const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13.05 20.1l-3.05 -6.1l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5l-3.312 9.173" /><path d="M19 16l-2 3h4l-2 3" /></svg>`;

const svgDataUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;

function DockButtonContent() {
    const linkRef = useRef<HTMLAnchorElement>(null);

    // Subscribe to flashing state
    useEffect(() => {
        const unsubscribe = dockIconFlashing.subscribe((flashing) => {
            const link = linkRef.current;
            if (!link) return;
            if (flashing) {
                link.classList.add('flashing');
            } else {
                link.classList.remove('flashing');
            }
        });
        return unsubscribe;
    }, []);

    // Subscribe to notification count for badge
    useEffect(() => {
        const unsubscribe = notificationCount.subscribe((count) => {
            const link = linkRef.current;
            if (!link) return;
            let badge = link.querySelector('.dock-notif-badge') as HTMLElement;
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
        });
        return unsubscribe;
    }, []);

    const handleClick = (e: Event) => {
        e.preventDefault();
        toggleChat(!isChatOpen.value);
        if (!isChatOpen.value) {
            stopDockFlashing();
        }
    };

    return (
        <a ref={linkRef} href="#" id="dock-chat-link" title="打开聊天窗口" onClick={handleClick}>
            <span
                class="ico ico-sq ico_robot_open"
                style={{ backgroundImage: `url('${svgDataUrl}')` }}
            >
                聊天
            </span>
        </a>
    );
}
