import { render } from 'preact';
import { App } from './App';
import { initDollarsAPI } from './extensionAPI';
import { settings } from './stores/user';
import { toggleChat, isChatOpen } from './stores/chat';
import cssContent from '@/styles/index.css?inline';

// 提前注入样式，避免 FOUC (Flash of Unstyled Content)
function injectStyles() {
    // 检查是否已注入
    if (document.querySelector('[data-dollars-styles]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-dollars-styles', '');
    style.textContent = cssContent;
    document.head.appendChild(style);
}

// 提前注入 SVG 滤镜
function injectSVGFilters() {
    // 检查是否已注入
    if (document.querySelector('[data-dollars-svg-filters]')) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('data-dollars-svg-filters', '');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.cssText = 'position:absolute;left:-9999px;top:-9999px;pointer-events:none;z-index:-1;';
    svg.innerHTML = `
        <defs>
            <symbol id="message-tail-filled" viewBox="0 0 11 20">
                <g transform="translate(9 -14)" fill="currentColor" fill-rule="evenodd">
                    <path d="M-6 16h6v17c-.193-2.84-.876-5.767-2.05-8.782-.904-2.325-2.446-4.485-4.625-6.48A1 1 0 01-6 16z" transform="matrix(1 0 0 -1 0 49)" id="corner-fill"/>
                </g>
            </symbol>
        </defs>
    `;
    document.body.appendChild(svg);
}

// 注入首页 Re:Dollars 卡片
function injectHomeCard() {
    if (window.location.pathname !== '/') return;

    const sideInner = document.querySelector('#columnHomeB .sideInner');
    if (!sideInner) return;

    // 检查是否已存在
    if (document.getElementById('dollars-card')) return;

    const cardContainer = document.createElement('div');
    cardContainer.className = 'featuredItems';
    cardContainer.innerHTML = `
        <div id="dollars-card" class="appItem">
            <a href="#"><p class="title">全站聊天窗💫</p><p>Re:Dollars</p></a>
        </div>
    `;

    sideInner.parentNode?.insertBefore(cardContainer, sideInner);

    // 根据设置显示/隐藏
    const card = document.getElementById('dollars-card');
    if (card && !settings.value.showCard) {
        card.style.display = 'none';
    }

    // 点击卡片打开聊天窗口
    card?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleChat(!isChatOpen.value);
    });
}

// 等待 DOM 加载完成
function init() {
    // 1. 先注入样式和 SVG（避免闪现）
    injectStyles();
    injectSVGFilters();

    // 2. 初始化扩展 API
    initDollarsAPI();

    // 3. 创建挂载点
    const container = document.createElement('div');
    container.id = 'dollars-app-mount';
    document.body.appendChild(container);

    // 4. 渲染应用
    render(<App />, container);

    // 5. 注入首页卡片
    setTimeout(injectHomeCard, 0);
}

// 确保 DOM 已加载
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
