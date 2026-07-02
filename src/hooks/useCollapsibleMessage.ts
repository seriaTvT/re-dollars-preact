import { useEffect, useState } from 'preact/hooks';
import type { RefObject } from 'preact';
import { COLLAPSE_MAX_HEIGHT } from '@/utils/constants';

export function useCollapsibleMessage(
    textContentRef: RefObject<HTMLDivElement>,
    content: string,
    isDeleted: boolean | undefined,
    isSticker: boolean,
) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCollapsible, setIsCollapsible] = useState(false);

    useEffect(() => {
        const el = textContentRef.current;
        if (!el || isDeleted || isSticker) {
            setIsCollapsible(false);
            return;
        }

        let frameId = 0;
        const imageListeners: Array<{ image: HTMLImageElement; handleChange: () => void }> = [];
        const resizeObserver = new ResizeObserver(() => {
            if (frameId) cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(measure);
        });

        const measure = () => {
            frameId = 0;
            const nextCollapsible = el.scrollHeight > COLLAPSE_MAX_HEIGHT + 1;
            setIsCollapsible((prev) => prev === nextCollapsible ? prev : nextCollapsible);
        };

        resizeObserver.observe(el);
        el.querySelectorAll('img').forEach((node) => {
            const image = node as HTMLImageElement;
            const handleChange = () => {
                if (frameId) cancelAnimationFrame(frameId);
                frameId = requestAnimationFrame(measure);
            };
            image.addEventListener('load', handleChange);
            image.addEventListener('error', handleChange);
            imageListeners.push({ image, handleChange });
        });

        measure();

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
            imageListeners.forEach(({ image, handleChange }) => {
                image.removeEventListener('load', handleChange);
                image.removeEventListener('error', handleChange);
            });
        };
    }, [content, isDeleted, isSticker]);

    useEffect(() => {
        if (!isCollapsible && isExpanded) {
            setIsExpanded(false);
        }
    }, [isCollapsible, isExpanded]);

    return {
        isExpanded,
        setIsExpanded,
        isCollapsible,
        shouldCollapse: isCollapsible && !isExpanded,
    };
}
