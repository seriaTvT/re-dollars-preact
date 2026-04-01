import { signal } from '@preact/signals';
import { loadWindowState, saveMaximizedState, saveMobileChatViewState } from '@/utils/windowState';

// Re-export all panel state and functions from the unified panel manager
export {
    // Panel open/closing signals
    isSmileyPanelOpen,
    isSmileyPanelClosing,
    isContextMenuOpen,
    isContextMenuClosing,
    isReactionPickerOpen,
    isReactionPickerClosing,
    isProfileCardClosing,
    isUserProfilePanelOpen,
    isUserProfilePanelClosing,
    isSearchActive,
    isImageViewerOpen,

    // Panel-specific extra state
    contextMenuPosition,
    contextMenuTargetId,
    contextMenuImageUrl,
    contextMenuBmoCode,
    profileCardUserId,
    profileCardAnchor,
    userProfilePanelUserId,
    imageViewerItems,
    imageViewerImages,
    imageViewerIndex,
    imageViewerSource,
    reactionPickerPosition,

    // Panel functions
    showContextMenu,
    hideContextMenu,
    showReactionPicker,
    hideReactionPicker,
    toggleSmileyPanel,
    showProfileCard,
    hideProfileCard,
    showUserProfile,
    hideUserProfile,
    showImageViewer,
    hideImageViewer,
    toggleSearch,

    // New unified API
    showPanel,
    hidePanel,
    togglePanel,
    activePanels,
    closingPanels,
    type PanelId,
} from '@/stores/panels';

// UI 状态
export const isMobileViewport = signal(window.innerWidth <= 768);
export const isNarrowLayout = signal(false);

// 初始化时不恢复状态，等待设置加载后再决定
export const isMaximized = signal(false);
export const mobileChatViewActive = signal(false);

export const inputAreaHeight = signal(60); // 默认为 60px

// 监听窗口大小
window.addEventListener('resize', () => {
    isMobileViewport.value = window.innerWidth <= 768;
});

// 切换最大化
export function toggleMaximize() {
    isMaximized.value = !isMaximized.value;

    import('@/stores/user').then(({ settings }) => {
        if (settings.value.rememberOpenState) {
            saveMaximizedState(isMaximized.value);
        }
    });
}

export function setMobileChatView(active: boolean) {
    mobileChatViewActive.value = active;

    import('@/stores/user').then(({ settings }) => {
        if (settings.value.rememberOpenState) {
            saveMobileChatViewState(active);
        }
    });
}

// 标记是否已完成首次布局检测
let hasInitializedLayout = false;

// 重置布局检测状态（在聊天窗口首次挂载时调用）
export function resetLayoutCheck() {
    hasInitializedLayout = false;
}

// 检查并更新 narrow 布局
export function checkNarrowLayout(width: number) {
    const wasNarrow = isNarrowLayout.value;
    const isNowNarrow = width < 600 || isMobileViewport.value;
    isNarrowLayout.value = isNowNarrow;

    // 首次检测：如果没有保存的状态，则根据布局设置默认值
    if (!hasInitializedLayout) {
        hasInitializedLayout = true;
        // 只有在没有保存状态时才设置默认值
        const savedMobileChatView = loadWindowState().mobileChatViewActive;
        if (savedMobileChatView === null) {
            if (isNowNarrow) {
                mobileChatViewActive.value = true;
            } else {
                mobileChatViewActive.value = false;
            }
        }
        return;
    }

    // 后续检测（resize）：只在状态变化时切换
    if (!wasNarrow && isNowNarrow) {
        // wide → narrow: 进入聊天视图
        mobileChatViewActive.value = true;
    } else if (wasNarrow && !isNowNarrow) {
        // narrow → wide: 退出单视图模式
        mobileChatViewActive.value = false;
    }
}

// 在聊天窗口打开时调用，确保窄布局下进入聊天视图
export function ensureNarrowLayoutChatView(width: number) {
    const isNowNarrow = width < 600 || isMobileViewport.value;
    isNarrowLayout.value = isNowNarrow;

    if (isNowNarrow && !mobileChatViewActive.value) {
        mobileChatViewActive.value = true;
    }
}
