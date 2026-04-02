// 配置常量
export const BACKEND_URL = 'https://bgmchat.ry.mk';
export const UPLOAD_BASE_URL = 'https://lsky.ry.mk';
export const WEBSOCKET_URL = 'wss://bgmchat.ry.mk/ws';
export const BGM_APP_ID = 'bgm460268b348b05f082';
export const BGM_CALLBACK_URL = `https://bgmchat.ry.mk/api/auth/callback`;

// UI 常量
export const MESSAGE_GROUP_TIME_GAP = 300;

// 时间常量 (ms)
export const TYPING_STOP_DELAY = 2500;
export const DRAFT_SAVE_DELAY = 1000;
export const SEARCH_DEBOUNCE = 500;
export const MENTION_DEBOUNCE = 300;
export const READ_STATE_SYNC_DELAY = 500;
export const PRESENCE_SYNC_DELAY = 120;
export const TYPING_AUTO_CLEAR = 10000;
export const HEARTBEAT_INTERVAL = 25000;
export const RECONNECT_DELAY = 2000;
export const CONNECTION_CHECK_INTERVAL = 10000;

// 滚动阈值 (px)
export const SCROLL_BOTTOM_THRESHOLD = 50;
export const NEAR_BOTTOM_THRESHOLD = 150;
export const HISTORY_LOAD_THRESHOLD = 200;

// DOM 限制
export const MAX_DOM_MESSAGES = 100;
export const MAX_MENTION_RESULTS = 10;
export const MAX_AVATARS_SHOWN = 5;
export const COLLAPSE_MAX_HEIGHT = 300;

// 动画时长 (ms)
export const PANEL_CLOSE_DURATION = 300;
export const SCROLL_ANIMATION_DURATION = 700;
export const HIGHLIGHT_ANIMATION_DURATION = 800;
export const NEW_MESSAGE_ANIMATION = 350;

// 右键菜单快捷表情 (6 items for horizontal row)
export const CONTEXT_MENU_REACTIONS = [67, 63, 38, 124, 46, 106].map(n => `(bgm${n})`);
