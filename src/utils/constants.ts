// 配置常量
export const BACKEND_URL = 'https://bgmchat.ry.mk';
export const WEBSOCKET_URL = 'wss://bgmchat.ry.mk/ws';
export const BGM_APP_ID = 'bgm460268b348b05f082';
export const BGM_CALLBACK_URL = `https://bgmchat.ry.mk/api/auth/callback`;

// UI 常量
export const MESSAGE_GROUP_TIME_GAP = 300;

// 右键菜单快捷表情 (6 items for horizontal row)
export const CONTEXT_MENU_REACTIONS = [67, 63, 38, 124, 46, 106].map(n => `(bgm${n})`);

// Re-export SVG icons from dedicated file
export { SVGIcons } from './icons';
