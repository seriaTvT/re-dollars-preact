import { BACKEND_API_URL, BACKEND_URL, FILE_UPLOAD_API_URL, UPLOAD_API_URL, UPLOAD_BASE_URL } from '../constants';

type QueryValue = string | number | boolean | null | undefined;

function joinUrl(base: string, path = ''): string {
    if (!path) return base;
    return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function apiUrl(path: string, query?: Record<string, QueryValue>): string {
    const url = joinUrl(BACKEND_API_URL, path);
    if (!query) return url;

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
        if (value === null || value === undefined) continue;
        params.set(key, String(value));
    }

    const search = params.toString();
    if (!search) return url;
    return `${url}${url.includes('?') ? '&' : '?'}${search}`;
}

export function uploadApiUrl(path = ''): string {
    if (!path) return UPLOAD_API_URL;
    if (path === '/batch') return `${UPLOAD_API_URL}/batch`;
    return joinUrl(UPLOAD_API_URL, path);
}

export function fileUploadApiUrl(): string {
    return FILE_UPLOAD_API_URL;
}

export function absoluteUploadUrl(url: string): string {
    if (url.startsWith('http')) return url;
    return joinUrl(UPLOAD_BASE_URL, url);
}

export function absoluteBackendUrl(url: string): string {
    if (url.startsWith('http')) return url;
    return joinUrl(BACKEND_URL, url);
}
