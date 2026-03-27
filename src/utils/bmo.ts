export interface BmoItem {
    code: string;
    name?: string;
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
