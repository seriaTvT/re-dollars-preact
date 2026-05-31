import { absoluteBackendUrl, absoluteUploadUrl, apiUrl, fileUploadApiUrl, uploadApiUrl } from './url';

/**
 * 获取相册媒体
 */
export async function fetchGalleryMedia(offset = 0, limit = 50, uid?: number): Promise<{
    items: Array<{
        url: string;
        thumbnailUrl: string;
        type: 'image' | 'video';
        message_id: number;
        timestamp: number;
        uid: number;
        nickname: string;
        avatar: string;
    }>;
    hasMore: boolean;
    total: number;
}> {
    const res = await fetch(apiUrl('/gallery', { offset, limit, uid }));
    const data = await res.json();

    if (data.status) {
        return {
            items: data.items || [],
            hasMore: data.hasMore || false,
            total: data.total || 0,
        };
    }

    return { items: [], hasMore: false, total: 0 };
}

/**
 * 上传文件
 */
const UPLOAD_MAX_IMAGE_SIZE = 50 * 1024 * 1024; // 50MB
const UPLOAD_MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB
const UPLOAD_TIMEOUT_MS = 60_000; // 60s
const UPLOAD_MAX_RETRIES = 1;
const UPLOAD_MAX_BATCH_IMAGES = 20;
const IMAGE_EXTENSIONS = new Set([
    '.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif',
    '.bmp', '.tiff', '.tif', '.svg', '.heic', '.heif',
    '.ico', '.jxl', '.apng',
]);

function getFileExtension(filename: string) {
    const dotIndex = filename.lastIndexOf('.');
    return dotIndex >= 0 ? filename.slice(dotIndex).toLowerCase() : '';
}

function isImageFile(file: File) {
    return file.type.startsWith('image/') || IMAGE_EXTENSIONS.has(getFileExtension(file.name));
}

function stringValue(value: unknown): string | undefined {
    return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function numberValue(value: unknown): number | undefined {
    const parsed = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
}

function firstString(...values: unknown[]): string | undefined {
    for (const value of values) {
        const str = stringValue(value);
        if (!str) continue;
        const url = str.match(/https?:\/\/[^\s"'()[\]]+/)?.[0] ?? str;
        return url;
    }
    return undefined;
}

function normalizeUploadResponse(data: any, isImage: boolean) {
    const nested = data?.data ?? {};
    const links = nested?.links ?? data?.links ?? {};
    const rawUrl = firstString(
        data?.url,
        isImage ? data?.imageUrl : data?.fileUrl,
        isImage ? data?.image_url : data?.videoUrl,
        nested?.url,
        nested?.path,
        nested?.pathname,
        links?.url,
        links?.thumbnail_url,
        links?.imageUrl,
        links?.image_url,
        links?.html,
        links?.markdown,
        links?.bbcode,
        data?.fileUrl,
        data?.imageUrl,
        data?.videoUrl,
    );
    const url = rawUrl ? (isImage ? absoluteUploadUrl(rawUrl) : absoluteBackendUrl(rawUrl)) : undefined;
    const width = numberValue(data?.width ?? nested?.width);
    const height = numberValue(data?.height ?? nested?.height);
    const status = data?.status !== false && Boolean(url);

    return {
        ...data,
        status,
        ...(url ? { url } : {}),
        ...(width != null ? { width } : {}),
        ...(height != null ? { height } : {}),
    };
}

function uploadError(message: string): UploadResult {
    return { status: false, error: message };
}

function validateUploadFile(file: File, isImage: boolean): UploadResult | null {
    const maxSize = isImage ? UPLOAD_MAX_IMAGE_SIZE : UPLOAD_MAX_FILE_SIZE;
    if (file.size <= maxSize) return null;

    const maxMB = Math.round(maxSize / (1024 * 1024));
    return uploadError(`文件过大 (${(file.size / (1024 * 1024)).toFixed(1)}MB)，最大支持 ${maxMB}MB`);
}

async function parseUploadResponse(res: Response) {
    try {
        return await res.json();
    } catch {
        if (!res.ok) {
            return { status: false, error: `服务器错误 (HTTP ${res.status})` };
        }
        return { status: false, error: '服务器返回了无法解析的响应' };
    }
}

function batchItems(data: any): any[] {
    const nested = data?.data ?? {};
    const candidates = [
        Array.isArray(data) ? data : undefined,
        data?.items,
        data?.images,
        data?.files,
        data?.urls,
        data?.success,
        data?.successful,
        data?.list,
        nested?.items,
        nested?.images,
        nested?.files,
        nested?.urls,
        nested?.success,
        nested?.successful,
        nested?.list,
        Array.isArray(nested) ? nested : undefined,
    ];

    for (const candidate of candidates) {
        if (!Array.isArray(candidate)) continue;
        return candidate.map((item) => typeof item === 'string' ? { url: item } : item);
    }

    return [];
}

export interface UploadResult {
    status: boolean;
    url?: string;
    width?: number;
    height?: number;
    error?: string;
}

export async function uploadFile(file: File): Promise<UploadResult> {
    const isImage = isImageFile(file);
    const validationError = validateUploadFile(file, isImage);
    if (validationError) return validationError;

    const fieldName = isImage ? 'image' : 'file';
    const endpoint = isImage ? uploadApiUrl() : fileUploadApiUrl();

    let lastError = '上传失败';

    for (let attempt = 0; attempt <= UPLOAD_MAX_RETRIES; attempt++) {
        if (attempt > 0) {
            // Wait before retry
            await new Promise(r => setTimeout(r, 2000));
        }

        try {
            const formData = new FormData();
            formData.append(fieldName, file);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);

            const res = await fetch(endpoint, {
                method: 'POST',
                credentials: isImage ? 'omit' : 'include',
                body: formData,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            let data: any = await parseUploadResponse(res);

            if (!res.ok) {
                // Extract error message from response
                lastError = data?.message || data?.error || `上传失败 (HTTP ${res.status})`;
                if (res.status >= 500) continue; // Retry on 5xx
                return { status: false, error: lastError };
            }

            data = normalizeUploadResponse(data, isImage);

            if (!data.status) {
                return { status: false, error: data.message || data.error || '上传处理失败' };
            }

            return data;
        } catch (e: any) {
            if (e.name === 'AbortError') {
                lastError = '上传超时，请检查网络后重试';
                continue; // Retry on timeout
            }
            lastError = '网络错误，请检查连接后重试';
            continue; // Retry on network errors
        }
    }

    return { status: false, error: lastError };
}

export async function uploadImages(files: File[]): Promise<UploadResult[]> {
    if (files.length === 0) return [];

    if (files.length === 1) {
        return [await uploadFile(files[0])];
    }

    if (files.length > UPLOAD_MAX_BATCH_IMAGES) {
        return [uploadError(`一次最多上传 ${UPLOAD_MAX_BATCH_IMAGES} 张图片`)];
    }

    for (const file of files) {
        if (!isImageFile(file)) return [uploadError('批量上传仅支持图片')];
        const validationError = validateUploadFile(file, true);
        if (validationError) return [validationError];
    }

    const formData = new FormData();
    for (const file of files) {
        formData.append('images', file);
    }

    try {
        const res = await fetch(uploadApiUrl('/batch'), {
            method: 'POST',
            credentials: 'omit',
            body: formData,
            signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS),
        });
        const data = await parseUploadResponse(res);

        if (!res.ok || data?.status === false) {
            return [uploadError(data?.message || data?.error || `上传失败 (HTTP ${res.status})`)];
        }

        const items = batchItems(data);
        if (items.length === 0) {
            const normalized = normalizeUploadResponse(data, true);
            return normalized.status ? [normalized] : [uploadError(data?.message || data?.error || '上传处理失败')];
        }

        return items.map((item) => {
            const normalized = normalizeUploadResponse(item, true);
            return normalized.status ? normalized : uploadError(item?.message || item?.error || '上传处理失败');
        });
    } catch (e: any) {
        if (e.name === 'TimeoutError' || e.name === 'AbortError') {
            return [uploadError('上传超时，请检查网络后重试')];
        }
        return [uploadError('网络错误，请检查连接后重试')];
    }
}
