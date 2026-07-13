import { useRef } from 'preact/hooks';

interface FloatingDateCapsuleProps {
    label?: string | null;
    preserveLastLabel?: boolean;
}

export function FloatingDateCapsule({ label, preserveLastLabel = true }: FloatingDateCapsuleProps) {
    const lastLabelRef = useRef('');

    if (label) {
        lastLabelRef.current = label;
    }

    const text = label || (preserveLastLabel ? lastLabelRef.current : '');
    if (!text && !preserveLastLabel) return null;

    return (
        <div id="dollars-floating-date" class={label ? 'visible' : ''}>
            {text}
        </div>
    );
}
