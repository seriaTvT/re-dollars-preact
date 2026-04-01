export interface BmoItem {
    code: string;
    name?: string;
}

export const BMO_READY_EVENT = 'dollars:bmo-ready';

function announceBmoReady() {
    window.dispatchEvent(new Event(BMO_READY_EVENT));
}

export function ensureBmoji() {
    if ((window as any).Bmoji) {
        announceBmoReady();
        return;
    }

    const existingScript = document.querySelector('script[data-dollars-bmo], script[src*="/js/lib/bmo/bmo.js"]') as HTMLScriptElement | null;
    if (existingScript) {
        existingScript.addEventListener('load', announceBmoReady, { once: true });
        return;
    }

    const version = (window as any).CHOBITS_VER;
    const script = document.createElement('script');
    script.dataset.dollarsBmo = '1';
    script.src = version ? `/js/lib/bmo/bmo.js?${version}` : '/js/lib/bmo/bmo.js';
    script.addEventListener('load', announceBmoReady, { once: true });
    document.head.appendChild(script);
}

export function onBmoReady(callback: () => void) {
    window.addEventListener(BMO_READY_EVENT, callback);
    return () => {
        window.removeEventListener(BMO_READY_EVENT, callback);
    };
}

export function loadSavedBmoItems(): BmoItem[] {
    try {
        const bmoji = (window as any).Bmoji;
        const savedBmo = bmoji?.savedBmo?.list?.() || JSON.parse(localStorage.getItem('chii_saved_bmo') || '[]');
        return Array.isArray(savedBmo) ? savedBmo.filter((item: any): item is BmoItem => !!item?.code) : [];
    } catch {
        return [];
    }
}
