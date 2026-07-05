// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest';
import {
    chatLayoutReady,
    checkNarrowLayout,
    isMobileViewport,
    isNarrowLayout,
    mobileChatViewActive,
    resetLayoutCheck,
    setMobileChatView,
} from './ui';
import { loadSidebarCollapsedState } from '@/utils/windowState';

describe('narrow layout transitions', () => {
    beforeEach(() => {
        localStorage.clear();
        isMobileViewport.value = false;
        isNarrowLayout.value = false;
        mobileChatViewActive.value = false;
        chatLayoutReady.value = true;
        resetLayoutCheck();
    });

    it('keeps the chat pane visible when a dual-pane window narrows', () => {
        checkNarrowLayout(800);
        expect(isNarrowLayout.value).toBe(false);
        expect(mobileChatViewActive.value).toBe(false);

        checkNarrowLayout(500);

        expect(isNarrowLayout.value).toBe(true);
        expect(mobileChatViewActive.value).toBe(true);

        checkNarrowLayout(800);

        expect(isNarrowLayout.value).toBe(false);
        expect(mobileChatViewActive.value).toBe(false);
        expect(loadSidebarCollapsedState()).toBeNull();
    });

    it('does not force chat view on the first narrow measurement', () => {
        checkNarrowLayout(500);

        expect(isNarrowLayout.value).toBe(true);
        expect(mobileChatViewActive.value).toBe(false);
    });

    it('restores a collapsed wide sidebar after returning from narrow layout', () => {
        checkNarrowLayout(800);
        setMobileChatView(true);
        expect(loadSidebarCollapsedState()).toBe(true);

        checkNarrowLayout(500);
        expect(isNarrowLayout.value).toBe(true);
        expect(mobileChatViewActive.value).toBe(true);

        checkNarrowLayout(800);

        expect(isNarrowLayout.value).toBe(false);
        expect(mobileChatViewActive.value).toBe(true);
        expect(loadSidebarCollapsedState()).toBe(true);
    });
});
