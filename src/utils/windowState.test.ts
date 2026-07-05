// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest';
import {
    clearChatOpenState,
    clearWindowState,
    fitWindowRectToViewport,
    loadSidebarCollapsedState,
    loadWindowState,
    saveActiveConversationId,
    saveChatOpenState,
    saveMaximizedState,
    saveMobileChatViewState,
    saveSidebarCollapsedState,
    saveWindowPosition,
} from './windowState';
import { MIN_WINDOW_WIDTH, MIN_WINDOW_HEIGHT } from './constants';

beforeEach(() => {
    localStorage.clear();
});

describe('fitWindowRectToViewport', () => {
    it('leaves a rect that already fits untouched', () => {
        const rect = { left: 100, top: 80, width: 400, height: 550 };
        expect(fitWindowRectToViewport(rect, 1440, 900)).toEqual(rect);
    });

    // Bug 1: shrinking the viewport vertically below the window height must clamp
    // the height, otherwise the window's bottom edge overflows the viewport.
    it('clamps height so the bottom edge stays inside a shorter viewport', () => {
        const rect = { left: 0, top: 0, width: 400, height: 550 };
        const fitted = fitWindowRectToViewport(rect, 1440, 400);
        expect(fitted.height).toBe(400);
        expect(fitted.top + fitted.height).toBeLessThanOrEqual(400);
    });

    // Bug 2: geometry saved on a large screen must be pulled fully back on-screen
    // when restored on a smaller viewport, instead of rendering off-screen.
    it('pulls an off-screen restored position back into a smaller viewport', () => {
        const rect = { left: 1200, top: 700, width: 400, height: 550 };
        const fitted = fitWindowRectToViewport(rect, 800, 600);
        expect(fitted.left + fitted.width).toBeLessThanOrEqual(800);
        expect(fitted.top + fitted.height).toBeLessThanOrEqual(600);
        expect(fitted.left).toBeGreaterThanOrEqual(0);
        expect(fitted.top).toBeGreaterThanOrEqual(0);
    });

    it('never shrinks below the minimum window size', () => {
        const rect = { left: 0, top: 0, width: 50, height: 50 };
        const fitted = fitWindowRectToViewport(rect, 1440, 900);
        expect(fitted.width).toBe(MIN_WINDOW_WIDTH);
        expect(fitted.height).toBe(MIN_WINDOW_HEIGHT);
    });

    it('lets the viewport limit win when it is smaller than the minimum size', () => {
        const fitted = fitWindowRectToViewport(
            { left: 10, top: 10, width: 400, height: 550 },
            240,
            160,
        );

        expect(fitted).toEqual({ left: 0, top: 0, width: 240, height: 160 });
    });
});

describe('window state cleanup', () => {
    it('clears only the remembered open state when requested', () => {
        saveChatOpenState(true);
        saveActiveConversationId('pm:42');

        clearChatOpenState();

        expect(loadWindowState().isChatOpen).toBeNull();
        expect(loadWindowState().activeConversationId).toBe('pm:42');
    });

    it('does not clear the remembered active conversation with window state', () => {
        saveChatOpenState(true);
        saveMaximizedState(true);
        saveMobileChatViewState(true);
        saveSidebarCollapsedState(true);
        saveWindowPosition({ x: 10, y: 20, width: 400, height: 550 });
        saveActiveConversationId('pm:42');

        clearWindowState();

        expect(loadWindowState()).toEqual({
            isChatOpen: null,
            isMaximized: null,
            mobileChatViewActive: null,
            activeConversationId: 'pm:42',
            position: null,
        });
        expect(loadSidebarCollapsedState()).toBeNull();
    });
});
