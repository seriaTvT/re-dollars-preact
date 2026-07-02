import { signal } from '@preact/signals';
import type { ImageViewerItem } from '@/types';

// Panel identifiers
export type PanelId = 'smiley' | 'contextMenu' | 'reactionPicker' | 'userProfile' | 'search' | 'imageViewer';

type PanelState = [ReturnType<typeof signal<boolean>>, ReturnType<typeof signal<boolean>>?, number?];

const panels: Record<PanelId, PanelState> = {
    smiley: [signal(false), signal(false), 200],
    contextMenu: [signal(false), signal(false), 150],
    reactionPicker: [signal(false), signal(false), 150],
    userProfile: [signal(false), signal(false), 250],
    search: [signal(false)],
    imageViewer: [signal(false)],
};

export const isSmileyPanelOpen = panels.smiley[0];
export const isSmileyPanelClosing = panels.smiley[1]!;
export const isContextMenuOpen = panels.contextMenu[0];
export const isContextMenuClosing = panels.contextMenu[1]!;
export const isReactionPickerOpen = panels.reactionPicker[0];
export const isReactionPickerClosing = panels.reactionPicker[1]!;
export const isUserProfilePanelOpen = panels.userProfile[0];
export const isUserProfilePanelClosing = panels.userProfile[1]!;
export const isSearchActive = panels.search[0];
export const isImageViewerOpen = panels.imageViewer[0];

// Search panel gallery mode (shared so external components can trigger it)
export const searchGalleryMode = signal(false);

// --- Panel-specific extra state ---

// Context menu
export const contextMenuPosition = signal({ x: 0, y: 0 });
export const contextMenuTargetId = signal<string | null>(null);
export const contextMenuImageUrl = signal<string | null>(null);
export const contextMenuBmoCode = signal<string | null>(null);

// User profile panel
export const userProfilePanelUserId = signal<string | null>(null);

// Image viewer
export type ImageViewerSource = 'generic' | 'gallery' | 'userProfile' | 'timeline';
export interface ImageViewerTimelineState {
    beforeId: number;
    beforeIndex: number;
    afterId: number;
    afterIndex: number;
    hasOlder: boolean;
    hasNewer: boolean;
}
export const imageViewerItems = signal<ImageViewerItem[]>([]);
export const imageViewerIndex = signal(0);
export const imageViewerSource = signal<ImageViewerSource>('generic');
export const imageViewerTimelineState = signal<ImageViewerTimelineState | null>(null);

// Reaction picker
export const reactionPickerPosition = signal({ x: 0, y: 0, width: 280 });

// --- Internal helpers ---

function addPanel(id: PanelId): void {
    const panel = panels[id];
    panel[0].value = true;
    if (panel[1]) panel[1].value = false;
}

function removePanel(id: PanelId): void {
    const panel = panels[id];
    if (!panel[0].value) return;
    panel[0].value = false;
    if (panel[1]) panel[1].value = false;
}

/** Close all panels in the exclusive group except the given one, without animation. */
function closeExclusiveGroup(except?: PanelId): void {
    for (const id of ['smiley', 'contextMenu'] as const) {
        if (id !== except && panels[id][0].value) {
            // Instant close for exclusive siblings
            hidePanelImmediate(id);
        }
    }
}

/** Immediately remove a panel and clean up its extra state. */
function hidePanelImmediate(id: PanelId): void {
    removePanel(id);
    cleanupPanelState(id);
}

/** Reset panel-specific extra state on close. */
function cleanupPanelState(id: PanelId): void {
    switch (id) {
        case 'contextMenu':
            contextMenuTargetId.value = null;
            contextMenuImageUrl.value = null;
            contextMenuBmoCode.value = null;
            break;
        case 'userProfile':
            userProfilePanelUserId.value = null;
            break;
        case 'imageViewer':
            imageViewerItems.value = [];
            imageViewerIndex.value = 0;
            imageViewerSource.value = 'generic';
            imageViewerTimelineState.value = null;
            break;
    }
}

// --- Public API ---

/**
 * Show a panel. If the panel belongs to the exclusive group, close other
 * exclusive panels first. Animated panels clear their closing flag.
 */
export function showPanel(id: PanelId): void {
    if (id === 'smiley' || id === 'contextMenu') {
        closeExclusiveGroup(id);
    }
    addPanel(id);
}

/**
 * Hide a panel with its closing animation (if it has one).
 * After the animation duration, the panel is fully removed.
 */
export function hidePanel(id: PanelId): void {
    const panel = panels[id];
    const open = panel[0];
    const closing = panel[1];
    if (!open.value || closing?.value) return;

    const duration = panel[2];
    if (duration) {
        closing!.value = true;
        setTimeout(() => {
            removePanel(id);
            cleanupPanelState(id);
        }, duration);
    } else {
        removePanel(id);
        cleanupPanelState(id);
    }
}

/**
 * Toggle a panel open/closed.
 */
export function togglePanel(id: PanelId, open?: boolean): void {
    const shouldOpen = open ?? !panels[id][0].value;
    if (shouldOpen) {
        showPanel(id);
    } else {
        hidePanel(id);
    }
}

// --- High-level convenience functions (preserve existing API signatures) ---

export function showContextMenu(x: number, y: number, targetId: string | null, imageUrl?: string | null, bmoCode?: string | null): void {
    contextMenuPosition.value = { x, y };
    contextMenuTargetId.value = targetId;
    contextMenuImageUrl.value = imageUrl ?? null;
    contextMenuBmoCode.value = bmoCode ?? null;
    showPanel('contextMenu');
}

export function hideContextMenu(): void {
    if (!isContextMenuOpen.value || isContextMenuClosing.value) return;
    // Also close reaction picker when closing context menu
    hideReactionPicker();
    hidePanel('contextMenu');
}

export function showReactionPicker(x: number, y: number, width?: number): void {
    reactionPickerPosition.value = { x, y, width: width || 280 };
    showPanel('reactionPicker');
}

export function hideReactionPicker(): void {
    if (!isReactionPickerOpen.value || isReactionPickerClosing.value) return;
    hidePanel('reactionPicker');
}

export function toggleSmileyPanel(open?: boolean): void {
    togglePanel('smiley', open);
}

export function showUserProfile(userId: string): void {
    userProfilePanelUserId.value = userId;
    showPanel('userProfile');
}

export function hideUserProfile(): void {
    if (!isUserProfilePanelOpen.value || isUserProfilePanelClosing.value) return;
    hidePanel('userProfile');
}

export function showImageViewer(
    images: Array<string | ImageViewerItem>,
    index: number = 0,
    source: ImageViewerSource = 'generic',
    timeline?: Pick<ImageViewerTimelineState, 'beforeId' | 'afterId'>,
): void {
    imageViewerItems.value = images.map(item =>
        typeof item === 'string' ? { src: item } : item
    );
    imageViewerIndex.value = index;
    imageViewerSource.value = source;
    imageViewerTimelineState.value = source === 'timeline' && timeline
        ? {
            ...timeline,
            beforeIndex: 0,
            afterIndex: 2_147_483_647,
            hasOlder: true,
            hasNewer: true,
        }
        : null;
    showPanel('imageViewer');
}

export function hideImageViewer(): void {
    removePanel('imageViewer');
    cleanupPanelState('imageViewer');
}

export function toggleSearch(active?: boolean): void {
    togglePanel('search', active);
}
