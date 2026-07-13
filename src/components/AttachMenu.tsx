import type { RefObject } from 'preact';
import { FloatingPortal } from './FloatingPortal';

export type AttachMenuItem = {
    icon: string;
    label: string;
    disabled?: boolean;
    onClick: () => void;
};

export function AttachMenu({
    isClosing,
    items,
    menuRef,
    position,
}: {
    isClosing: boolean;
    items: AttachMenuItem[];
    menuRef: RefObject<HTMLDivElement>;
    position: { left: number; bottom: number };
}) {
    return (
        <FloatingPortal>
            <div
                ref={menuRef}
                class={`dollars-attach-menu context-menu-items ${isClosing ? 'closing' : ''}`}
                role="menu"
                style={{
                    left: `${position.left}px`,
                    bottom: `${position.bottom}px`,
                }}
            >
                {items.map(item => (
                    <button type="button" role="menuitem" disabled={item.disabled} onClick={item.onClick}>
                        <span class="context-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: item.icon }} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </FloatingPortal>
    );
}
