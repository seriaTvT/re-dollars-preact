import { useEffect } from 'preact/hooks';
import type { RefObject } from 'preact';
import { showImageViewer } from '@/stores/ui';

export function useMessageImageViewer(messageRef: RefObject<HTMLDivElement>, content: string) {
    useEffect(() => {
        const el = messageRef.current;
        if (!el) return;

        const handlers: Array<{ el: Element, fn: (e: Event) => void }> = [];

        const addImageViewerHandler = (img: HTMLImageElement) => {
            const handler = (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                const allImgs = el.querySelectorAll('.full-image');
                const imageUrls = Array.from(allImgs).map(i => (i as HTMLImageElement).dataset.fullSrc || (i as HTMLImageElement).src);
                const currentUrl = img.dataset.fullSrc || img.src;
                const index = imageUrls.indexOf(currentUrl);
                showImageViewer(imageUrls, Math.max(0, index));
            };
            img.addEventListener('click', handler);
            img.style.cursor = 'zoom-in';
            handlers.push({ el: img, fn: handler });
        };

        const placeholders = el.querySelectorAll('.image-placeholder[data-src]');
        placeholders.forEach((placeholder) => {
            const container = placeholder as HTMLElement;
            if (container.classList.contains('image-masked')) return;
            const handler = (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                const img = container.querySelector('.full-image') as HTMLImageElement | null;
                if (!img) return;
                const fullSrc = img.dataset.fullSrc || container.dataset.src || img.src;
                showImageViewer([fullSrc], 0);
            };
            container.addEventListener('click', handler);
            handlers.push({ el: container, fn: handler });
        });

        el.querySelectorAll('.full-image').forEach((img) => {
            addImageViewerHandler(img as HTMLImageElement);
        });

        return () => {
            handlers.forEach(({ el, fn }) => {
                el.removeEventListener('click', fn);
            });
        };
    }, [content]);
}
