import { useLayoutEffect, useState } from 'preact/hooks';
import type { RefObject } from 'preact';
import { COLLAPSE_MAX_HEIGHT } from '@/utils/constants';

const NON_TEXT_CONTENT_SELECTOR = '.message-media-block, .message-previews, .audio-player-container, .video-player-container';

interface CollapseMeasurement {
    contentHeight: number;
    hasNonTextContent: boolean;
    isDeleted: boolean;
    isSticker: boolean;
}

export function getRenderedContentHeight(scrollHeight: number, boundingHeight: number): number {
    return Math.max(scrollHeight, boundingHeight);
}

export function shouldCollapseMessage(measurement: CollapseMeasurement): boolean {
    return !measurement.isDeleted
        && !measurement.isSticker
        && !measurement.hasNonTextContent
        && measurement.contentHeight > COLLAPSE_MAX_HEIGHT + 1;
}

export function useCollapsibleMessage(
    textContentRef: RefObject<HTMLDivElement>,
    contentKey: string,
    isDeleted: boolean | undefined,
    isSticker: boolean,
) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCollapsible, setIsCollapsible] = useState(false);

    useLayoutEffect(() => {
        const element = textContentRef.current;
        if (!element) return;

        const hasNonTextContent = !!element.querySelector(NON_TEXT_CONTENT_SELECTOR);
        const measure = (resetExpanded = false) => {
            const nextValue = shouldCollapseMessage({
                contentHeight: getRenderedContentHeight(
                    element.scrollHeight,
                    element.getBoundingClientRect().height,
                ),
                hasNonTextContent,
                isDeleted: !!isDeleted,
                isSticker,
            });
            setIsCollapsible(nextValue);
            if (resetExpanded || !nextValue) setIsExpanded(false);
        };

        measure(true);
        if (isDeleted || isSticker || hasNonTextContent) return;

        let frameId = 0;
        const resizeObserver = new ResizeObserver(() => {
            if (frameId) cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(() => measure());
        });
        resizeObserver.observe(element.closest('.bubble') || element);

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
        };
    }, [contentKey, isDeleted, isSticker]);

    return {
        isExpanded,
        isCollapsible,
        shouldCollapse: isCollapsible && !isExpanded,
        toggleExpanded: () => setIsExpanded((value) => isCollapsible ? !value : false),
    };
}
