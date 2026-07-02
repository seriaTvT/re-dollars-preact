import { useEffect, useRef } from 'preact/hooks';
import type { RefObject } from 'preact';
import { isMobileViewport, isMaximized } from '@/stores/ui';
import { settings } from '@/stores/user';
import { MIN_WINDOW_HEIGHT, MIN_WINDOW_WIDTH } from '@/utils/constants';
import { fitWindowRectToViewport, loadWindowPosition, saveWindowPosition } from '@/utils/windowState';

interface Pointer {
    x: number;
    y: number;
}

function getPointer(e: MouseEvent | TouchEvent): Pointer {
    if ('touches' in e) {
        const t = e.touches[0] || e.changedTouches[0];
        return { x: t.clientX, y: t.clientY };
    }
    return { x: e.clientX, y: e.clientY };
}

function persistWindowPosition(element: HTMLDivElement) {
    if (!settings.value.rememberOpenState) return;

    saveWindowPosition({
        x: element.offsetLeft,
        y: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight
    });
}

export function useChatWindowInteractions(windowRef: RefObject<HTMLDivElement>) {
    const dragState = useRef({
        isDragging: false,
        startX: 0,
        startY: 0,
        initialLeft: 0,
        initialTop: 0,
    });

    const resizeState = useRef({
        isResizing: false,
        startX: 0,
        startY: 0,
        initialWidth: 0,
        initialHeight: 0,
        initialLeft: 0,
        initialTop: 0,
    });

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
        if (!dragState.current.isDragging || !windowRef.current) return;
        e.preventDefault();

        const { x, y } = getPointer(e);
        const dx = x - dragState.current.startX;
        const dy = y - dragState.current.startY;

        const width = windowRef.current.offsetWidth;
        const height = windowRef.current.offsetHeight;
        const maxLeft = Math.max(0, window.innerWidth - width);
        const maxTop = Math.max(0, window.innerHeight - height);

        const newLeft = Math.min(Math.max(0, dragState.current.initialLeft + dx), maxLeft);
        const newTop = Math.min(Math.max(0, dragState.current.initialTop + dy), maxTop);

        windowRef.current.style.left = `${newLeft}px`;
        windowRef.current.style.top = `${newTop}px`;
    };

    const handleDragEnd = () => {
        dragState.current.isDragging = false;
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchmove', handleDragMove);
        document.removeEventListener('touchend', handleDragEnd);

        if (windowRef.current) {
            persistWindowPosition(windowRef.current);
        }
    };

    const handleDragStart = (e: MouseEvent | TouchEvent) => {
        if (isMobileViewport.value || isMaximized.value) return;
        const target = e.target as HTMLElement;
        if (!target.closest('.chat-header') || target.closest('button')) return;

        e.preventDefault();
        const { x, y } = getPointer(e);
        dragState.current = {
            isDragging: true,
            startX: x,
            startY: y,
            initialLeft: windowRef.current?.offsetLeft || 0,
            initialTop: windowRef.current?.offsetTop || 0,
        };

        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchmove', handleDragMove, { passive: false });
        document.addEventListener('touchend', handleDragEnd);
    };

    const handleResizeMove = (e: MouseEvent | TouchEvent) => {
        if (!resizeState.current.isResizing || !windowRef.current) return;
        e.preventDefault();

        const { x, y } = getPointer(e);
        const dx = resizeState.current.startX - x;
        const dy = resizeState.current.startY - y;

        let newWidth = Math.max(MIN_WINDOW_WIDTH, resizeState.current.initialWidth + dx);
        let newHeight = Math.max(MIN_WINDOW_HEIGHT, resizeState.current.initialHeight + dy);
        let newLeft = resizeState.current.initialLeft - (newWidth - resizeState.current.initialWidth);
        let newTop = resizeState.current.initialTop - (newHeight - resizeState.current.initialHeight);

        if (newTop < 0) {
            newHeight += newTop;
            newTop = 0;
        }
        if (newLeft < 0) {
            newWidth += newLeft;
            newLeft = 0;
        }

        windowRef.current.style.width = `${newWidth}px`;
        windowRef.current.style.height = `${newHeight}px`;
        windowRef.current.style.left = `${newLeft}px`;
        windowRef.current.style.top = `${newTop}px`;
    };

    const handleResizeEnd = () => {
        resizeState.current.isResizing = false;
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
        document.removeEventListener('touchmove', handleResizeMove);
        document.removeEventListener('touchend', handleResizeEnd);

        if (windowRef.current) {
            persistWindowPosition(windowRef.current);
        }
    };

    const handleResizeStart = (e: MouseEvent | TouchEvent) => {
        if (isMobileViewport.value || isMaximized.value) return;
        e.preventDefault();
        e.stopPropagation();

        if (!windowRef.current) return;
        const rect = windowRef.current.getBoundingClientRect();
        const { x, y } = getPointer(e);

        resizeState.current = {
            isResizing: true,
            startX: x,
            startY: y,
            initialWidth: rect.width,
            initialHeight: rect.height,
            initialLeft: rect.left,
            initialTop: rect.top,
        };

        document.addEventListener('mousemove', handleResizeMove);
        document.addEventListener('mouseup', handleResizeEnd);
        document.addEventListener('touchmove', handleResizeMove, { passive: false });
        document.addEventListener('touchend', handleResizeEnd);
    };

    useEffect(() => {
        if (isMobileViewport.value || isMaximized.value || !settings.value.rememberOpenState) return;

        const saved = loadWindowPosition();
        if (saved && windowRef.current) {
            const element = windowRef.current;
            const fitted = fitWindowRectToViewport({
                left: saved.x,
                top: saved.y,
                width: saved.width ?? element.offsetWidth,
                height: saved.height ?? element.offsetHeight,
            });

            element.style.left = `${fitted.left}px`;
            element.style.top = `${fitted.top}px`;
            element.style.width = `${fitted.width}px`;
            element.style.height = `${fitted.height}px`;
        }
    }, []);

    useEffect(() => {
        let rafId: number;

        const handleWindowResize = () => {
            if (rafId) return;

            rafId = requestAnimationFrame(() => {
                rafId = 0;
                if (!windowRef.current || isMobileViewport.value || isMaximized.value) return;

                const element = windowRef.current;
                const rect = element.getBoundingClientRect();
                const fitted = fitWindowRectToViewport({
                    left: rect.left,
                    top: rect.top,
                    width: rect.width,
                    height: rect.height,
                });

                if (fitted.width !== rect.width) element.style.width = `${fitted.width}px`;
                if (fitted.height !== rect.height) element.style.height = `${fitted.height}px`;
                if (fitted.left !== rect.left) element.style.left = `${fitted.left}px`;
                if (fitted.top !== rect.top) element.style.top = `${fitted.top}px`;
            });
        };

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleDragMove);
            document.removeEventListener('mouseup', handleDragEnd);
            document.removeEventListener('touchmove', handleDragMove);
            document.removeEventListener('touchend', handleDragEnd);
            document.removeEventListener('mousemove', handleResizeMove);
            document.removeEventListener('mouseup', handleResizeEnd);
            document.removeEventListener('touchmove', handleResizeMove);
            document.removeEventListener('touchend', handleResizeEnd);
        };
    }, []);

    return {
        handleDragStart,
        handleResizeStart,
    };
}
