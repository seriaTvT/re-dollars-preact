import { signal } from '@preact/signals';
import {
    loadSidebarCollapsedState,
    loadWindowState,
    saveMaximizedState,
    saveMobileChatViewState,
    saveSidebarCollapsedState,
} from '@/utils/windowState';

// Re-export all panel state and functions from the unified panel manager
export {
    // Panel open/closing signals
    isSmileyPanelOpen,
    isSmileyPanelClosing,
    isContextMenuOpen,
    isContextMenuClosing,
    isReactionPickerOpen,
    isReactionPickerClosing,
    isUserProfilePanelOpen,
    isUserProfilePanelClosing,
    isSearchActive,
    isImageViewerOpen,

    // Panel-specific extra state
    contextMenuPosition,
    contextMenuTarget,
    contextMenuTargetId,
    contextMenuImageUrl,
    contextMenuBmoCode,
    contextMenuSource,
    userProfilePanelUserId,
    imageViewerItems,
    imageViewerIndex,
    imageViewerSource,
    imageViewerTimelineState,
    reactionPickerPosition,
    searchGalleryMode,

    // Panel functions
    showContextMenu,
    hideContextMenu,
    showReactionPicker,
    hideReactionPicker,
    toggleSmileyPanel,
    showUserProfile,
    hideUserProfile,
    showImageViewer,
    hideImageViewer,
    toggleSearch,

} from '@/stores/panels';

export type { ContextMenuSource } from '@/stores/panels';
export type { MessageActionTarget } from '@/utils/messageActions';

const browserWindow = typeof window !== 'undefined' ? window : undefined;
const savedWindowState = loadWindowState();
const initialWideSidebarCollapsed = loadSidebarCollapsedState() ?? savedWindowState.mobileChatViewActive ?? false;
const initialNarrowChatViewActive = savedWindowState.mobileChatViewActive ?? false;

// UI 状态
export const isMobileViewport = signal((browserWindow?.innerWidth || 1024) <= 768);
export const isNarrowLayout = signal(false);

// 初始化时不恢复状态，等待设置加载后再决定
export const isMaximized = signal(false);
// 侧边栏可见性（mobileChatViewActive === true 表示隐藏侧边栏、只显示聊天）。
// CSS 仍使用这个 signal；真实记忆分别存在 wideSidebarCollapsed / narrowChatViewActive。
export const mobileChatViewActive = signal(initialWideSidebarCollapsed);
export const chatLayoutReady = signal(false);

export const inputAreaHeight = signal(60); // 默认为 60px
let layoutMeasured = false;
let wideSidebarCollapsed = initialWideSidebarCollapsed;
let narrowChatViewActive = initialNarrowChatViewActive;

// 监听窗口大小
browserWindow?.addEventListener?.('resize', () => {
    isMobileViewport.value = browserWindow.innerWidth <= 768;
});

// 切换最大化
export function toggleMaximize() {
    isMaximized.value = !isMaximized.value;
    saveMaximizedState(isMaximized.value);
}

export function setMobileChatView(active: boolean) {
    if (isNarrowLayout.peek()) {
        narrowChatViewActive = active;
        saveMobileChatViewState(active);
    } else {
        wideSidebarCollapsed = active;
        saveSidebarCollapsedState(active);
    }
    mobileChatViewActive.value = active;
}

// 重置布局检测状态（在聊天窗口首次挂载时调用）
export function resetLayoutCheck() {
    chatLayoutReady.value = false;
    layoutMeasured = false;
    const savedNarrowChatView = loadWindowState().mobileChatViewActive;
    const savedWideSidebarCollapsed = loadSidebarCollapsedState();
    narrowChatViewActive = savedNarrowChatView ?? mobileChatViewActive.peek();
    wideSidebarCollapsed = savedWideSidebarCollapsed ?? mobileChatViewActive.peek();
}

function isNarrowWidth(width: number) {
    return width < 600 || isMobileViewport.value;
}

function syncMobileChatView() {
    mobileChatViewActive.value = isNarrowLayout.peek()
        ? narrowChatViewActive
        : wideSidebarCollapsed;
}

function applyNarrowLayout(width: number) {
    const wasMeasured = layoutMeasured;
    const wasNarrow = isNarrowLayout.peek();
    const nextIsNarrow = isNarrowWidth(width);

    if (wasMeasured) {
        if (wasNarrow) narrowChatViewActive = mobileChatViewActive.peek();
        else wideSidebarCollapsed = mobileChatViewActive.peek();
    }

    isNarrowLayout.value = nextIsNarrow;
    layoutMeasured = true;

    if (wasMeasured && !wasNarrow && nextIsNarrow) {
        narrowChatViewActive = true;
    }

    syncMobileChatView();
}

// 检查并更新 narrow 布局。
// 从双栏宽屏收窄到单栏时，保持用户正在看的聊天界面，而不是切到会话列表。
export function checkNarrowLayout(width: number) {
    applyNarrowLayout(width);
}

// 在聊天窗口打开时调用：更新布局模式并标记布局就绪。
// 首次测量不覆盖恢复的侧边栏状态；后续宽屏→窄屏 transition 由 applyNarrowLayout 保持聊天视图。
export function ensureNarrowLayoutChatView(width: number) {
    applyNarrowLayout(width);
    chatLayoutReady.value = true;
}
