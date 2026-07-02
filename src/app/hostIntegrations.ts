import { isChatOpen, toggleChat } from '@/stores/chatState';
import { settings } from '@/stores/user';
import cssContent from 'virtual:dollars-css';

const STYLE_MARKER = 'data-dollars-styles';

export function injectStyles() {
    if (document.querySelector(`[${STYLE_MARKER}]`)) return;

    const style = document.createElement('style');
    style.setAttribute(STYLE_MARKER, '');
    style.textContent = cssContent;
    document.head.appendChild(style);
}

function syncHomeCardVisibility() {
    const card = document.getElementById('dollars-card');
    if (card) {
        card.style.display = settings.value.showCard ? '' : 'none';
    }
}

export function installHomeCard() {
    if (window.location.pathname !== '/') return;

    const sideInner = document.querySelector('#columnHomeB .sideInner');
    if (!sideInner) return;
    if (document.getElementById('dollars-card')) {
        syncHomeCardVisibility();
        return;
    }

    const cardContainer = document.createElement('div');
    cardContainer.className = 'featuredItems';

    const card = document.createElement('div');
    card.id = 'dollars-card';
    card.className = 'appItem';

    const link = document.createElement('a');
    link.href = '#';

    const title = document.createElement('p');
    title.className = 'title';
    title.textContent = '全站聊天窗💫';

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Re:Dollars';

    link.append(title, subtitle);
    card.appendChild(link);
    cardContainer.appendChild(card);

    sideInner.parentNode?.insertBefore(cardContainer, sideInner);
    syncHomeCardVisibility();

    card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleChat(!isChatOpen.value);
    });
}
