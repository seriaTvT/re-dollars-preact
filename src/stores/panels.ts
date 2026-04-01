import { signal, computed } from '@preact/signals';
import type { ImageViewerItem } from '@/types';

// Panel identifiers
export type PanelId = 'smiley' | 'contextMenu' | 'reactionPicker' | 'profileCard' | 'userProfile' | 'search' | 'imageViewer';

// Panels that are mutually exclusive with each other (popover-style panels).
// Opening one will close the others in this group.
const EXCLUSIVE_GROUP: ReadonlySet<PanelId> = new Set(['smiley', 'contextMenu', 'profileCard']);

// Animation durations per panel (ms)
const ANIMATION_DURATION: Partial<Record<PanelId, number>> = {
    smiley: 200,
    contextMenu: 150,
    reactionPicker: 150,
    profileCard: 200,
    userProfile: 250,
};

// --- Core state ---

/** Set of currently open panels */
export const activePanels = signal<ReadonlySet<PanelId>>(new Set());

/** The panel currently playing its closing animation (at most one at a time per panel) */
export const closingPanels = signal<ReadonlySet<PanelId>>(new Set());

// --- Computed convenience signals (backward-compatible) ---

export const isSmileyPanelOpen = computed(() => activePanels.value.has('smiley'));
export const isSmileyPanelClosing = computed(() => closingPanels.value.has('smiley'));

export const isContextMenuOpen = computed(() => activePanels.value.has('contextMenu'));
export const isContextMenuClosing = computed(() => closingPanels.value.has('contextMenu'));

export const isReactionPickerOpen = computed(() => activePanels.value.has('reactionPicker'));
export const isReactionPickerClosing = computed(() => closingPanels.value.has('reactionPicker'));

export const isProfileCardOpen = computed(() => activePanels.value.has('profileCard'));
export const isProfileCardClosing = computed(() => closingPanels.value.has('profileCard'));

export const isUserProfilePanelOpen = computed(() => activePanels.value.has('userProfile'));
export const isUserProfilePanelClosing = computed(() => closingPanels.value.has('userProfile'));

export const isSearchActive = computed(() => activePanels.value.has('search'));

export const isImageViewerOpen = computed(() => activePanels.value.has('imageViewer'));

// --- Panel-specific extra state ---

// Context menu
export const contextMenuPosition = signal({ x: 0, y: 0 });
export const contextMenuTargetId = signal<string | null>(null);
export const contextMenuImageUrl = signal<string | null>(null);
export const contextMenuBmoCode = signal<string | null>(null);

// Profile card
export const profileCardUserId = signal<string | null>(null);
export const profileCardAnchor = signal<HTMLElement | null>(null);

// User profile panel
export const userProfilePanelUserId = signal<string | null>(null);

// Image viewer
export type ImageViewerSource = 'generic' | 'gallery' | 'userProfile';
export const imageViewerItems = signal<ImageViewerItem[]>([]);
export const imageViewerImages = computed(() => imageViewerItems.value.map(item => item.src));
export const imageViewerIndex = signal(0);
export const imageViewerSource = signal<ImageViewerSource>('generic');

// Reaction picker
export const reactionPickerPosition = signal({ x: 0, y: 0, width: 280 });

// --- Internal helpers ---

function addPanel(id: PanelId): void {
    const next = new Set(activePanels.value);
    next.add(id);
    activePanels.value = next;

    // Clear closing state if re-opening
    if (closingPanels.value.has(id)) {
        const nextClosing = new Set(closingPanels.value);
        nextClosing.delete(id);
        closingPanels.value = nextClosing;
    }
}

function removePanel(id: PanelId): void {
    if (!activePanels.value.has(id)) return;
    const next = new Set(activePanels.value);
    next.delete(id);
    activePanels.value = next;

    // Also clear closing state
    if (closingPanels.value.has(id)) {
        const nextClosing = new Set(closingPanels.value);
        nextClosing.delete(id);
        closingPanels.value = nextClosing;
    }
}

function setClosing(id: PanelId): void {
    const next = new Set(closingPanels.value);
    next.add(id);
    closingPanels.value = next;
}

/** Close all panels in the exclusive group except the given one, without animation. */
function closeExclusiveGroup(except?: PanelId): void {
    for (const id of EXCLUSIVE_GROUP) {
        if (id !== except && activePanels.value.has(id)) {
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
        case 'profileCard':
            profileCardUserId.value = null;
            profileCardAnchor.value = null;
            break;
        case 'userProfile':
            userProfilePanelUserId.value = null;
            break;
        case 'imageViewer':
            imageViewerItems.value = [];
            imageViewerIndex.value = 0;
            imageViewerSource.value = 'generic';
            break;
    }
}

// --- Public API ---

/**
 * Show a panel. If the panel belongs to the exclusive group, close other
 * exclusive panels first. Animated panels clear their closing flag.
 */
export function showPanel(id: PanelId): void {
    if (EXCLUSIVE_GROUP.has(id)) {
        closeExclusiveGroup(id);
    }
    addPanel(id);
}

/**
 * Hide a panel with its closing animation (if it has one).
 * After the animation duration, the panel is fully removed.
 */
export function hidePanel(id: PanelId): void {
    if (!activePanels.value.has(id)) return;
    if (closingPanels.value.has(id)) return; // already closing

    const duration = ANIMATION_DURATION[id];
    if (duration) {
        setClosing(id);
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
    const shouldOpen = open ?? !activePanels.value.has(id);
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

export function showProfileCard(userId: string, anchor: HTMLElement): void {
    // Toggle off if clicking same user
    if (profileCardUserId.value === userId) {
        hideProfileCard();
        return;
    }
    profileCardUserId.value = userId;
    profileCardAnchor.value = anchor;
    showPanel('profileCard');
}

export function hideProfileCard(): void {
    if (!profileCardUserId.value || isProfileCardClosing.value) return;
    hidePanel('profileCard');
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
): void {
    imageViewerItems.value = images.map(item =>
        typeof item === 'string' ? { src: item } : item
    );
    imageViewerIndex.value = index;
    imageViewerSource.value = source;
    showPanel('imageViewer');
}

export function hideImageViewer(): void {
    removePanel('imageViewer');
    cleanupPanelState('imageViewer');
}

export function toggleSearch(active?: boolean): void {
    togglePanel('search', active);
}
