import { useEffect, useRef, useState } from 'preact/hooks';

const ATTACH_MENU_WIDTH = 176;

type FloatingAttachMenuOptions = {
    containerRef: { current: HTMLElement | null };
};

export function useFloatingAttachMenu({ containerRef }: FloatingAttachMenuOptions) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [position, setPosition] = useState<{ left: number; bottom: number } | null>(null);

    function updatePosition() {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        setPosition({
            left: Math.min(window.innerWidth - ATTACH_MENU_WIDTH - 8, Math.max(8, rect.right - ATTACH_MENU_WIDTH)),
            bottom: Math.max(5, window.innerHeight - rect.top + 5),
        });
    }

    function close() {
        if (!isOpen || isClosing) return;

        setIsClosing(true);
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        closeTimerRef.current = setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
            closeTimerRef.current = null;
        }, 200);
    }

    function toggle() {
        if (isOpen) {
            close();
            return;
        }

        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setIsClosing(false);
        updatePosition();
        setIsOpen(true);
    }

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node | null;
            if (target && buttonRef.current?.contains(target)) return;
            if (target && menuRef.current?.contains(target)) return;
            close();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close();
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [containerRef, isClosing, isOpen]);

    useEffect(() => () => {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    }, []);

    return {
        attachButtonRef: buttonRef,
        attachMenuRef: menuRef,
        attachMenuPosition: position,
        closeAttachMenu: close,
        isAttachMenuClosing: isClosing,
        isAttachMenuOpen: isOpen,
        toggleAttachMenu: toggle,
    };
}
