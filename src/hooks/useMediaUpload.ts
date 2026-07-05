import { useRef, useState } from 'preact/hooks';
import { IMAGE_EXTENSIONS, uploadFile, uploadImages, type UploadResult } from '@/utils/api/media';
import type { RichInputController } from '@/utils/richInput';

export type MediaItem = {
    type: 'image' | 'video';
    url: string;
    width?: number;
    height?: number;
};

const ALLOWED_VIDEO_EXTS = [
    '.mp4', '.webm', '.mov', '.mkv', '.avi',
];
const ALLOWED_AUDIO_EXTS = [
    '.mp3', '.wav', '.ogg', '.aac', '.flac', '.weba', '.webm', '.m4a',
];
export const MEDIA_FILE_ACCEPT = 'image/*,.heic,.heif,video/*';
export const ANY_FILE_ACCEPT = '*/*';

interface MediaKind {
    ext: string;
    isImage: boolean;
    isVideo: boolean;
    isAudio: boolean;
}

function getMediaKind(file: File): MediaKind {
    const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
    return {
        ext,
        isImage: file.type.startsWith('image/') || IMAGE_EXTENSIONS.includes(ext),
        isVideo: file.type.startsWith('video/') || ALLOWED_VIDEO_EXTS.includes(ext),
        isAudio: file.type.startsWith('audio/') || ALLOWED_AUDIO_EXTS.includes(ext),
    };
}

function normalizeUploadFile(file: File, kind: MediaKind) {
    if (file.type || !kind.isImage) return file;

    const mimeMap: Record<string, string> = {
        '.heic': 'image/heic',
        '.heif': 'image/heif',
        '.bmp': 'image/bmp',
        '.tiff': 'image/tiff',
        '.tif': 'image/tiff',
        '.jxl': 'image/jxl',
        '.avif': 'image/avif',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp',
        '.gif': 'image/gif',
    };
    return new File([file], file.name, { type: mimeMap[kind.ext] || 'application/octet-stream' });
}

async function getImageDimensions(file: File) {
    let width = 0;
    let height = 0;

    try {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        await new Promise<void>((resolve) => {
            img.onload = () => {
                width = img.naturalWidth;
                height = img.naturalHeight;
                URL.revokeObjectURL(objectUrl);
                resolve();
            };
            img.onerror = () => {
                URL.revokeObjectURL(objectUrl);
                resolve();
            };
            img.src = objectUrl;
        });
    } catch {
    }

    return { width, height };
}

export function useMediaUpload(
    inputControllerRef: { current: RichInputController | null }
) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewMedia, setPreviewMedia] = useState<MediaItem[]>([]);

    // 解析图片和视频
    const parseMediaFiles = (text: string, knownMeta?: Record<string, { width?: number; height?: number }>) => {
        const media: Array<{ type: 'image' | 'video'; url: string }> = [];

        let match;
        const mediaRegex = /\[(img|video)\](.*?)\[\/\1\]/g;
        while ((match = mediaRegex.exec(text)) !== null) {
            media.push({ type: match[1] === 'img' ? 'image' : 'video', url: match[2] });
        }

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
    };

    // 移除媒体文件
    const handleRemoveMedia = (index: number) => {
        const controller = inputControllerRef.current;
        if (!controller) return;

        const text = controller.getValue();
        const media = previewMedia[index];
        if (!media) return;

        const regex = media.type === 'image'
            ? /\[img\](.*?)\[\/img\]/g
            : /\[video\](.*?)\[\/video\]/g;

        const matchIndex = previewMedia.slice(0, index).filter(item => item.type === media.type).length;
        let currentMediaIndex = 0;

        const newText = text.replace(regex, (match) => {
            if (currentMediaIndex === matchIndex) {
                currentMediaIndex++;
                return '';
            }
            currentMediaIndex++;
            return match;
        });

        controller.setValue(newText, { focus: true });
    };

    const openFilePicker = (accept: string) => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = accept;
            fileInputRef.current.click();
        }
    };

    const handleAttachMediaClick = () => {
        openFilePicker(MEDIA_FILE_ACCEPT);
    };

    const handleAttachFileClick = () => {
        openFilePicker(ANY_FILE_ACCEPT);
    };

    // 文件上传核心逻辑
    const insertUploadResult = (
        file: File,
        kind: MediaKind,
        result: UploadResult,
        dimensions?: { width: number; height: number }
    ) => {
        if (!result.status || !result.url) {
            alert(result.error || '上传失败');
            return;
        }

        const controller = inputControllerRef.current;
        if (!controller) return;

        let tag = 'img';
        if (kind.isVideo) {
            tag = 'video';
        } else if (kind.isAudio) {
            tag = 'audio';
        } else if (!kind.isImage) {
            tag = 'file';
        }

        const safeName = file.name.replace(/[\[\]\r\n]+/g, ' ').trim() || '附件';
        const bbcode = tag === 'file'
            ? `[file=${safeName}]${result.url}[/file]`
            : `[${tag}]${result.url}[/${tag}]`;
        controller.insertText(bbcode, { focus: true });

        if (tag === 'img' && dimensions?.width && dimensions.height) {
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
                        width: dimensions.width,
                        height: dimensions.height
                    };
                    return next;
                }

                if (prev.some(item => item.type === 'image' && item.url === result.url)) {
                    return prev;
                }

                return [...prev, {
                    type: 'image',
                    url: result.url!,
                    width: dimensions.width,
                    height: dimensions.height
                }];
            });
        }
    };

    const handleFilesUpload = async (files: File[]) => {
        if (files.length === 0) return;
        setIsUploading(true);

        try {
            const prepared = files.map((file) => {
                const kind = getMediaKind(file);
                return { original: file, kind, upload: normalizeUploadFile(file, kind) };
            });
            const images = prepared.filter((item) => item.kind.isImage);
            const others = prepared.filter((item) => !item.kind.isImage);

            if (images.length > 0) {
                const [dimensions, results] = await Promise.all([
                    Promise.all(images.map((item) => getImageDimensions(item.upload))),
                    uploadImages(images.map((item) => item.upload)),
                ]);

                if (results.length !== images.length && results[0]?.status === false) {
                    alert(results[0].error || '上传失败');
                } else {
                    images.forEach((item, index) => {
                        insertUploadResult(item.original, item.kind, results[index] ?? { status: false, error: '上传失败' }, dimensions[index]);
                    });
                }
            }

            for (const item of others) {
                const result = await uploadFile(item.upload);
                insertUploadResult(item.original, item.kind, result);
            }
        } catch (e) {
            alert('上传失败，请重试');
        } finally {
            setIsUploading(false);
        }
    };

    // 处理文件选择
    const handleFileChange = async (e: Event) => {
        const input = e.target as HTMLInputElement;
        const files = Array.from(input.files || []);
        if (files.length > 0) {
            await handleFilesUpload(files);
            input.value = ''; // 清空以便重复选择
        }
    };

    // 文件粘贴上传
    const handlePaste = async (e: ClipboardEvent) => {
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
            const files = items.map((item) => item.getAsFile()).filter((file): file is File => Boolean(file));
            await handleFilesUpload(files);
            return;
        }

        const text = e.clipboardData?.getData('text/plain');
        if (text) {
            e.preventDefault();
            inputControllerRef.current?.insertText(text, { focus: true });
        }
    };

    return {
        fileInputRef,
        isUploading,
        previewMedia,
        setPreviewMedia,
        parseMediaFiles,
        handleRemoveMedia,
        handleAttachMediaClick,
        handleAttachFileClick,
        handleFileChange,
        handleFilesUpload,
        handlePaste,
    };
}
