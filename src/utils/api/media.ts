import { BACKEND_URL } from '../constants';
import { getAuthHeaders } from '@/stores/user';

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
    let url = `${BACKEND_URL}/api/gallery?offset=${offset}&limit=${limit}`;
    if (uid) {
        url += `&uid=${uid}`;
    }
    const res = await fetch(url);
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
const UPLOAD_MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB
const UPLOAD_TIMEOUT_MS = 60_000; // 60s
const UPLOAD_MAX_RETRIES = 1;

export async function uploadFile(file: File): Promise<{
    status: boolean;
    url?: string;
    width?: number;
    height?: number;
    error?: string;
}> {
    const isVideo = file.type.startsWith('video/') || file.type.startsWith('audio/');
    const maxSize = isVideo ? UPLOAD_MAX_VIDEO_SIZE : UPLOAD_MAX_IMAGE_SIZE;

    // Client-side file size validation
    if (file.size > maxSize) {
        const maxMB = Math.round(maxSize / (1024 * 1024));
        return { status: false, error: `文件过大 (${(file.size / (1024 * 1024)).toFixed(1)}MB)，最大支持 ${maxMB}MB` };
    }

    const fieldName = isVideo ? 'video' : 'image';
    const endpoint = isVideo ? `${BACKEND_URL}/api/upload/video` : `${BACKEND_URL}/api/upload`;

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
                headers: getAuthHeaders(),
                credentials: 'include',
                body: formData,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            // Try to parse response body
            let data: any;
            try {
                data = await res.json();
            } catch {
                // Non-JSON response
                if (!res.ok) {
                    lastError = `服务器错误 (HTTP ${res.status})`;
                    if (res.status >= 500) continue; // Retry on 5xx
                    return { status: false, error: lastError };
                }
                return { status: false, error: '服务器返回了无法解析的响应' };
            }

            if (!res.ok) {
                // Extract error message from response
                lastError = data?.message || `上传失败 (HTTP ${res.status})`;
                if (res.status >= 500) continue; // Retry on 5xx
                return { status: false, error: lastError };
            }

            // 兼容后端返回字段: imageUrl/videoUrl -> url
            if (data.status && data.imageUrl) {
                data.url = data.imageUrl;
            }
            if (data.status && data.videoUrl) {
                data.url = data.videoUrl;
            }
            // 确保 URL 是完整路径
            if (data.status && data.url && !data.url.startsWith('http')) {
                data.url = `${BACKEND_URL}${data.url}`;
            }

            if (!data.status) {
                return { status: false, error: data.message || '上传处理失败' };
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
