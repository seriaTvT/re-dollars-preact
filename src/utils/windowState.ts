const CHAT_OPEN_KEY = 'dollars.isChatOpen';
const MAXIMIZED_KEY = 'dollars.isMaximized';
const MOBILE_CHAT_VIEW_KEY = 'dollars.mobileChatViewActive';
const CHAT_POSITION_KEY = 'dollarsChatPosition';

export interface SavedChatWindowPosition {
    x: number;
    y: number;
    width?: number;
    height?: number;
}

export interface SavedWindowState {
    isChatOpen: boolean | null;
    isMaximized: boolean | null;
    mobileChatViewActive: boolean | null;
    position: SavedChatWindowPosition | null;
}

function readBoolean(key: string): boolean | null {
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? null : JSON.parse(raw);
    } catch {
        return null;
    }
}

export function loadWindowState(): SavedWindowState {
    return {
        isChatOpen: readBoolean(CHAT_OPEN_KEY),
        isMaximized: readBoolean(MAXIMIZED_KEY),
        mobileChatViewActive: readBoolean(MOBILE_CHAT_VIEW_KEY),
        position: loadWindowPosition(),
    };
}

export function saveChatOpenState(isOpen: boolean): void {
    localStorage.setItem(CHAT_OPEN_KEY, JSON.stringify(isOpen));
}

export function saveMaximizedState(isMaximized: boolean): void {
    localStorage.setItem(MAXIMIZED_KEY, JSON.stringify(isMaximized));
}

export function saveMobileChatViewState(active: boolean): void {
    localStorage.setItem(MOBILE_CHAT_VIEW_KEY, JSON.stringify(active));
}

export function saveWindowPosition(position: SavedChatWindowPosition): void {
    localStorage.setItem(CHAT_POSITION_KEY, JSON.stringify(position));
}

export function loadWindowPosition(): SavedChatWindowPosition | null {
    try {
        const raw = localStorage.getItem(CHAT_POSITION_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function clearWindowState(): void {
    localStorage.removeItem(CHAT_OPEN_KEY);
    localStorage.removeItem(MAXIMIZED_KEY);
    localStorage.removeItem(MOBILE_CHAT_VIEW_KEY);
    localStorage.removeItem(CHAT_POSITION_KEY);
}
