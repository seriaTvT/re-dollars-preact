import { useEffect } from 'preact/hooks';
import type { RefObject } from 'preact';
import { onBmoReady } from '@/utils/bmo';

const BMO_RENDER_OPTIONS = { width: 21, height: 21 };

export function useBmoRenderer(containerRef: RefObject<HTMLElement>) {
    useEffect(() => {
        if (!containerRef.current) return;
        let hasObserved = false;

        const renderBmo = () => {
            const bmoji = (window as any).Bmoji;
            if (!bmoji || !containerRef.current) return;

            if (!hasObserved && typeof bmoji.observe === 'function') {
                bmoji.observe(containerRef.current, BMO_RENDER_OPTIONS);
                hasObserved = true;
            }
            if (typeof bmoji.renderAll === 'function') {
                bmoji.renderAll(containerRef.current, BMO_RENDER_OPTIONS);
            }
        };

        renderBmo();
        const disposeBmoReady = onBmoReady(renderBmo);

        return () => {
            disposeBmoReady();
            const bmoji = (window as any).Bmoji;
            if (typeof bmoji?.disconnect === 'function') {
                bmoji.disconnect();
            }
        };
    }, []);
}
