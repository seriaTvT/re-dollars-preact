import { calculateImageStyle, escapeHTML, getThumbnailUrl } from '@/utils/format';

export interface ImageMarkupOptions {
    loaded?: boolean;
    masked?: boolean;
    placeholder?: boolean;
}

export function renderImageMarkup(
    src: string,
    meta: { width?: number; height?: number } | undefined,
    { loaded = false, placeholder = false, masked = false }: ImageMarkupOptions = {}
) {
    const imageStyle = calculateImageStyle(meta);
    const metaWidth = meta?.width ?? '';
    const metaHeight = meta?.height ?? '';
    const safeSrc = escapeHTML(src);
    const displaySrc = escapeHTML(placeholder ? getThumbnailUrl(src) : src);
    const classes = `image-container${placeholder ? ' image-placeholder' : ''}${masked ? ' image-masked' : ''}`;
    const imageClasses = `full-image${placeholder || loaded ? ' is-loaded' : ''}`;
    const dataSrc = masked ? ` data-src="${safeSrc}"` : '';
    const loadHint = masked ? '\n            <div class="image-load-hint">显示图片</div>' : '';

    return `<div class="${classes}" style="${imageStyle}" data-iw="${metaWidth}" data-ih="${metaHeight}"${dataSrc}>
            <img src="${displaySrc}" data-full-src="${safeSrc}" class="${imageClasses}" alt="image" loading="lazy" decoding="async" referrerpolicy="no-referrer">${loadHint}
        </div>`;
}

export function renderAudioMarkup(src: string) {
    const safeSrc = escapeHTML(src);
    return `<div class="audio-player-container" style="margin: 5px 0;"><audio controls preload="metadata" style="max-width: 100%; width: 300px; border-radius: 20px;"><source src="${safeSrc}">您的浏览器不支持音频播放。</audio></div>`;
}

export function renderVideoMarkup(src: string) {
    const safeSrc = escapeHTML(src);
    return `<div class="video-player-container" style="max-width: 100%; margin: 5px 0;"><video controls preload="metadata" style="max-width: 100%; max-height: 400px; border-radius: 8px; background: #000;"><source src="${safeSrc}" type="video/mp4"><source src="${safeSrc}" type="video/webm">您的浏览器不支持视频播放。</video></div>`;
}

export function renderFileMarkup(src: string, label: string) {
    const safeSrc = escapeHTML(src);
    const safeLabel = escapeHTML(label.trim() || '附件');
    return `<a href="${safeSrc}" target="_blank" rel="noopener noreferrer" class="chat-file-link" download="${safeLabel}">${safeLabel}</a>`;
}
