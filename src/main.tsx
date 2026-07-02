import { App } from './App';
import { bootstrapUserscriptApp } from '@/app/bootstrap';

// 等待 DOM 加载完成
function init() {
    bootstrapUserscriptApp(App);
}

// 确保 DOM 已加载
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
