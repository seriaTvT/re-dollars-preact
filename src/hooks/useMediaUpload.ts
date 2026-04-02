import { useRef, useState, useCallback } from 'preact/hooks';
import { uploadFile } from '@/utils/api';
import type { RichInputController } from '@/utils/richInput';

export type MediaItem = {
    type: 'image' | 'video';
    url: string;
    width?: number;
    height?: number;
};

// Known file extensions for client-side validation
const ALLOWED_IMAGE_EXTS = new Set([
    '.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif',
    '.bmp', '.tiff', '.tif', '.svg', '.heic', '.heif',
    '.ico', '.jxl', '.apng',
]);
const ALLOWED_VIDEO_EXTS = new Set([
    '.mp4', '.webm', '.mov', '.mkv', '.avi',
]);
const ALLOWED_AUDIO_EXTS = new Set([
    '.mp3', '.wav', '.ogg', '.aac', '.flac', '.weba',
]);

export function useMediaUpload(
    inputControllerRef: { current: RichInputController | null }
) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewMedia, setPreviewMedia] = useState<MediaItem[]>([]);
    const attachLongPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isAttachLongPressRef = useRef(false);

    // 解析图片和视频
    const parseMediaFiles = useCallback((text: string, knownMeta?: Record<string, { width?: number; height?: number }>) => {
        const imgRegex = /\[img\](.*?)\[\/img\]/g;
        const videoRegex = /\[video\](.*?)\[\/video\]/g;

        const media: Array<{ type: 'image' | 'video'; url: string; position: number }> = [];

        // 收集所有图片
        let match;
        while ((match = imgRegex.exec(text)) !== null) {
            media.push({ type: 'image', url: match[1], position: match.index });
        }

        // 收集所有视频
        while ((match = videoRegex.exec(text)) !== null) {
            media.push({ type: 'video', url: match[1], position: match.index });
        }

        // 按出现顺序排序
        media.sort((a, b) => a.position - b.position);

        setPreviewMedia(prev => {
            if (prev.length === media.length &&
                prev.every((item, i) => item.type === media[i].type && item.url === media[i].url)) {
                return prev;
            }
            // 保留已有的尺寸信息
            return media.map(({ type, url }) => {
                const existing = prev.find(p => p.url === url);
                if (existing) {
                    return { ...existing, type, url };
                }
                // 如果有已知的 meta 信息，使用它
                if (knownMeta && knownMeta[url]) {
                    const meta = knownMeta[url];
                    return {
                        type,
                        url,
                        width: meta.width,
                        height: meta.height
                    };
                }
                return { type, url };
            });
        });
    }, []);

    // 移除媒体文件
    const handleRemoveMedia = useCallback((index: number) => {
        const controller = inputControllerRef.current;
        if (!controller) return;

        const text = controller.getValue();
        const currentPreviewMedia = previewMedia;
        const media = currentPreviewMedia[index];
        if (!media) return;

        const regex = media.type === 'image'
            ? /\[img\](.*?)\[\/img\]/g
            : /\[video\](.*?)\[\/video\]/g;

        let matchIndex = 0;
        let currentMediaIndex = 0;

        // 计算当前媒体在同类型中的索引
        for (let i = 0; i < index; i++) {
            if (currentPreviewMedia[i].type === media.type) {
                matchIndex++;
            }
        }

        const newText = text.replace(regex, (match) => {
            if (currentMediaIndex === matchIndex) {
                currentMediaIndex++;
                return '';
            }
            currentMediaIndex++;
            return match;
        });

        controller.setValue(newText, { focus: true });
    }, [inputControllerRef, previewMedia]);

    // 处理附件按钮点击（图片/视频）
    const handleAttachClick = useCallback(() => {
        if (isAttachLongPressRef.current) {
            isAttachLongPressRef.current = false;
            return;
        }
        if (fileInputRef.current) {
            fileInputRef.current.accept = 'image/*,video/*';
            fileInputRef.current.click();
        }
    }, []);

    // 处理附件按钮长按开始（音频）
    const handleAttachTouchStart = useCallback(() => {
        isAttachLongPressRef.current = false;
        attachLongPressRef.current = setTimeout(() => {
            isAttachLongPressRef.current = true;
            if (navigator.vibrate) navigator.vibrate(50);
            if (fileInputRef.current) {
                fileInputRef.current.accept = '*/*';
                fileInputRef.current.click();
            }
        }, 500);
    }, []);

    // 处理附件按钮长按结束
    const handleAttachTouchEnd = useCallback(() => {
        if (attachLongPressRef.current) {
            clearTimeout(attachLongPressRef.current);
            attachLongPressRef.current = null;
        }
    }, []);

    // 文件上传核心逻辑
    const handleFileUpload = useCallback(async (file: File) => {
        // Client-side file type validation
        const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
        const isImage = file.type.startsWith('image/') || ALLOWED_IMAGE_EXTS.has(ext);
        const isVideo = file.type.startsWith('video/') || ALLOWED_VIDEO_EXTS.has(ext);
        const isAudio = file.type.startsWith('audio/') || ALLOWED_AUDIO_EXTS.has(ext);

        // Handle files with missing MIME type (common for HEIC on some platforms)
        let fileToUpload = file;
        if (!file.type && isImage) {
            // Create a new file with corrected MIME type based on extension
            const mimeMap: Record<string, string> = {
                '.heic': 'image/heic', '.heif': 'image/heif',
                '.bmp': 'image/bmp', '.tiff': 'image/tiff', '.tif': 'image/tiff',
                '.jxl': 'image/jxl', '.avif': 'image/avif',
                '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
                '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif',
            };
            const correctedMime = mimeMap[ext] || 'application/octet-stream';
            fileToUpload = new File([file], file.name, { type: correctedMime });
        }

        setIsUploading(true);

        // Pre-calculate image dimensions client-side (before upload)
        let clientWidth = 0;
        let clientHeight = 0;
        if (isImage) {
            try {
                const img = new Image();
                const objectUrl = URL.createObjectURL(fileToUpload);
                await new Promise<void>((resolve) => {
                    img.onload = () => {
                        clientWidth = img.naturalWidth;
                        clientHeight = img.naturalHeight;
                        URL.revokeObjectURL(objectUrl);
                        resolve();
                    };
                    img.onerror = () => {
                        URL.revokeObjectURL(objectUrl);
                        resolve();
                    };
                    img.src = objectUrl;
                });
            } catch (e) {
                console.warn('Failed to get image dimensions:', e);
            }
        }

        try {
            const result = await uploadFile(fileToUpload);
            if (result.status && result.url) {
                const controller = inputControllerRef.current;
                if (!controller) return;

                let tag = 'img';
                if (isVideo) {
                    tag = 'video';
                } else if (isAudio) {
                    tag = 'audio';
                } else if (!isImage) {
                    tag = 'file';
                }
                const safeName = file.name.replace(/[\[\]\r\n]+/g, ' ').trim() || '附件';
                const bbcode = tag === 'file'
                    ? `[file=${safeName}]${result.url}[/file]`
                    : `[${tag}]${result.url}[/${tag}]`;
                controller.insertText(bbcode, { focus: true });

                // Use client-side dimensions (more reliable than async backend)
                if (tag === 'img' && clientWidth && clientHeight) {
                    setPreviewMedia(prev => {
                        const existingIndex = prev.findIndex((item) =>
                            item.type === 'image' &&
                            item.url === result.url &&
                            (!item.width || !item.height)
                        );

                        if (existingIndex >= 0) {
                            const next = [...prev];
                            next[existingIndex] = {
                                ...next[existingIndex],
                                width: clientWidth,
                                height: clientHeight
                            };
                            return next;
                        }

                        if (prev.some(item => item.type === 'image' && item.url === result.url)) {
                            return prev;
                        }

                        return [...prev, {
                            type: 'image',
                            url: result.url!,
                            width: clientWidth,
                            height: clientHeight
                        }];
                    });
                }
            } else {
                alert(result.error || '上传失败');
            }
        } catch (e) {
            alert('上传失败，请重试');
        } finally {
            setIsUploading(false);
        }
    }, [inputControllerRef]);

    // 处理文件选择
    const handleFileChange = useCallback(async (e: Event) => {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            await handleFileUpload(file);
            input.value = ''; // 清空以便重复选择
        }
    }, [handleFileUpload]);

    // 文件粘贴上传
    const handlePaste = useCallback(async (e: ClipboardEvent) => {
        const items = [...(e.clipboardData?.items || [])].filter(
            (it) => it.kind === 'file' && (
                it.type.startsWith('image/') ||
                it.type.startsWith('video/') ||
                it.type.startsWith('audio/') ||
                it.type === 'application/octet-stream' ||
                it.type === ''
            )
        );

        if (items.length > 0) {
            e.preventDefault();
            for (const item of items) {
                const file = item.getAsFile();
                if (file) {
                    await handleFileUpload(file);
                }
            }
            return;
        }

        const text = e.clipboardData?.getData('text/plain');
        if (text) {
            e.preventDefault();
            inputControllerRef.current?.insertText(text, { focus: true });
        }
    }, [handleFileUpload]);

    return {
        fileInputRef,
        isUploading,
        previewMedia,
        setPreviewMedia,
        parseMediaFiles,
        handleRemoveMedia,
        handleAttachClick,
        handleAttachTouchStart,
        handleAttachTouchEnd,
        handleFileChange,
        handleFileUpload,
        handlePaste,
    };
}
