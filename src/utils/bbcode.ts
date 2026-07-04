import { escapeHTML, getAvatarUrl } from './format';
import { settings } from '@/stores/user';
import { replaceInlineTokens } from './inlineTokens';
import { renderInlineTokenHTML } from './inlineRender';
import {
    renderAudioMarkup,
    renderFileMarkup,
    renderImageMarkup,
    renderVideoMarkup,
} from './mediaMarkup';

const HTTP_URL_RE = /^https?:\/\/[^\s<>"']+$/i;
const MEDIA_WRAPPER_BREAK_RE = /(?:<br>\s*)*(\x00MEDIA_WRAPPER_\d+\x00)(?:\s*<br>)*/g;

type PreviewCardData = { title?: string; description?: string; image?: string };
type ReplyDetails = { uid: number; nickname: string; avatar: string; content: string; firstImage?: string; firstImageMasked?: boolean };

function createPlaceholderStore(prefix: string) {
    const values: string[] = [];

    return {
        push(value: string): string {
            values.push(value);
            return `\x00${prefix}_${values.length - 1}\x00`;
        },
        get(index: string | number): string {
            return values[Number(index)]!;
        },
        resolve(source: string, render: (value: string) => string = (value) => value): string {
            return source.replace(new RegExp(`\\x00${prefix}_(\\d+)\\x00`, 'g'), (_, index) => render(values[Number(index)]!));
        }
    };
}

function sanitizeHttpUrl(rawSrc: string): string | null {
    const cleanSrc = rawSrc.replace(/<[^>]*>?/gm, '').trim();
    return HTTP_URL_RE.test(cleanSrc) ? cleanSrc : null;
}

function collectPreviewCard(
    url: string,
    options: { previewsCollector?: string[]; isInsideQuote?: boolean },
    linkPreviews: Record<string, PreviewCardData>
) {
    if (options.isInsideQuote || !settings.value.linkPreview || !options.previewsCollector) {
        return;
    }

    const preview = linkPreviews[url];
    if (preview) {
        options.previewsCollector.push(generatePreviewCardHTML(preview, url));
    }
}

// 标准化 Bangumi 链接，将 bangumi.tv/bgm.tv/chii.in 转换为相对路径
function normalizeBangumiUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();

        // 检查是否是 Bangumi 相关域名
        if (hostname === 'bangumi.tv' || hostname === 'bgm.tv' || hostname === 'chii.in') {
            // 返回相对路径（去掉协议和域名）
            return urlObj.pathname + urlObj.search + urlObj.hash;
        }
    } catch (e) {
        // URL 解析失败，返回原始 URL
    }
    return url;
}

// 生成预览卡片 HTML
function generatePreviewCardHTML(
    data: PreviewCardData,
    originalUrl: string
): string {
    const normalizedUrl = normalizeBangumiUrl(originalUrl);
    const title = escapeHTML(data.title || originalUrl);
    const desc = data.description ? escapeHTML(data.description) : '';
    const domain = originalUrl.includes('//') ? originalUrl.split('/')[2].replace(/^www\\./, '') : '';

    // 封面图处理
    let coverHTML = '';
    if (data.image) {
        coverHTML = `<div class="cover"><img src="${escapeHTML(data.image)}" loading="lazy" referrerPolicy="no-referrer"></div>`;
    } else {
        coverHTML = `<div class="cover"><div style="font-size: 32px; text-align: center; line-height: 80px; color: var(--dollars-text-placeholder);">🔗</div></div>`;
    }

    return `
        <a href="${escapeHTML(normalizedUrl)}" target="_blank" rel="noopener noreferrer" class="dollars-preview-card" data-entity-type="generic">
            ${coverHTML}
            <div class="inner">
                <p class="title" title="${title}">${title}</p>
                ${desc ? `<p class="info">${desc}</p>` : ''}
                <p class="rateInfo">${escapeHTML(domain)}</p>
            </div>
        </a>`;
}

export function processBBCode(
    text: string,
    imageMeta: Record<string, { width?: number; height?: number }> = {},
    options: {
        previewsCollector?: string[];
        replyToId?: number;
        replyDetails?: ReplyDetails;
        isInsideQuote?: boolean;
    } = {},
    linkPreviews: Record<string, PreviewCardData> = {}
): string {
    let html = text;

    // 提取 [code] 块，用占位符替换，防止内部内容被解析
    const codeBlocks = createPlaceholderStore('CODE_BLOCK');
    const imageBlocks = createPlaceholderStore('IMAGE_BLOCK');
    const mediaWrappers = createPlaceholderStore('MEDIA_WRAPPER');

    html = html.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (_, content) => {
        return codeBlocks.push(content);
    });

    // 话题标签
    html = html.replace(/(^|\s)(#[\p{L}\p{N}_]{1,50})(?=$|\s|[.,!?;:)])/gu, '$1<span class="chat-tag">$2</span>');

    // 基础格式化
    const bbMap: Record<string, string> = { b: 'strong', i: 'em', u: 'u', s: 's' };
    html = html.replace(/\[(b|i|u|s)\]([\s\S]+?)\[\/\1\]/gi, (_, tag, content) =>
        `<${bbMap[tag.toLowerCase()]}>${processBBCode(content, imageMeta, { ...options, isInsideQuote: true }, linkPreviews)}</${bbMap[tag.toLowerCase()]}>`
    );

    // 遮罩
    html = html.replace(/\[mask\]([\s\S]+?)\[\/mask\]/gi, '<span class="text_mask"><span class="inner">$1</span></span>');

    // 遮罩内的图片
    html = html.replace(/<span class="text_mask"><span class="inner">\[img\]([\s\S]+?)\[\/img\]<\/span><\/span>/gi, (m, src) => {
        const cleanSrc = sanitizeHttpUrl(src);
        if (!cleanSrc) return escapeHTML(m);

        if (options.isInsideQuote) {
            return `<span class="text_mask"><span class="inner"><a href="${cleanSrc}" target="_blank">[图片]</a></span></span>`;
        }

        const meta = imageMeta[cleanSrc];

        // 遮罩图片使用缩略图预览
        return imageBlocks.push(renderImageMarkup(cleanSrc, meta, { placeholder: true, masked: true }));
    });

    // 音频
    html = html.replace(/\[audio\]([\s\S]+?)\[\/audio\]/gi, (m, src) => {
        const cleanSrc = sanitizeHttpUrl(src);
        if (!cleanSrc) return escapeHTML(m);
        if (options.isInsideQuote) {
            return `<a href="${cleanSrc}" target="_blank">[音频]</a>`;
        }
        return renderAudioMarkup(cleanSrc);
    });

    // 视频
    html = html.replace(/\[video\]([\s\S]+?)\[\/video\]/gi, (m, src) => {
        const cleanSrc = sanitizeHttpUrl(src);
        if (!cleanSrc) return escapeHTML(m);
        if (options.isInsideQuote) {
            return `<a href="${cleanSrc}" target="_blank">[视频]</a>`;
        }
        return renderVideoMarkup(cleanSrc);
    });

    // 通用附件
    html = html.replace(/\[file=(.*?)\]([\s\S]+?)\[\/file\]/gi, (m, label, src) => {
        const cleanSrc = sanitizeHttpUrl(src);
        if (!cleanSrc) return escapeHTML(m);
        const name = label.trim() || '附件';
        if (options.isInsideQuote) {
            return `<a href="${cleanSrc}" target="_blank">[附件] ${escapeHTML(name)}</a>`;
        }
        return renderFileMarkup(cleanSrc, name);
    });

    // 图片
    html = html.replace(/\[img\]([\s\S]+?)\[\/img\]/gi, (m, src) => {
        const cleanSrc = sanitizeHttpUrl(src);
        if (!cleanSrc) return escapeHTML(m);

        if (options.isInsideQuote) {
            return `<a href="${cleanSrc}" target="_blank">[图片]</a>`;
        }

        const meta = imageMeta[cleanSrc];

        // 如果不自动加载图片，使用缩略图代替占位
        if (!settings.value.loadImages) {
            return imageBlocks.push(renderImageMarkup(cleanSrc, meta, { placeholder: true }));
        }

        return imageBlocks.push(renderImageMarkup(cleanSrc, meta));
    });

    // 用户提及
    html = html.replace(/\[user=(.+?)\]([\s\S]+?)\[\/user\]/gi, '<a href="/user/$1" target="_blank" class="user-mention">@$2</a>');

    html = replaceInlineTokens(html, renderInlineTokenHTML, { skipInsideHtml: true });

    // URL 链接
    html = html.replace(/\[url=([^\]]+?)\]([\s\S]+?)\[\/url\]/gi, (_, url, label) => {
        const normalizedUrl = normalizeBangumiUrl(url);
        const linkHtml = `<a href="${escapeHTML(normalizedUrl)}" target="_blank" rel="noopener noreferrer">${label}</a>`;

        collectPreviewCard(url, options, linkPreviews);
        return linkHtml;
    });

    // 引用块 (简化处理)
    html = html.replace(/\[quote(?:=(\d+))?\]([\s\S]*?)\[\/quote\]\n?/gi, (_, id, content) => {
        // 如果提供了回复详情，则主内容中的 [quote] 应该丢弃以防重复显示
        if (options.replyDetails) return '';
        if (!content.trim()) return '';
        const attrs = id ? `data-jump-to-id="${id}" title="点击跳转到原文"` : '';
        const processedContent = processBBCode(content, imageMeta, { ...options, isInsideQuote: true }, linkPreviews);
        return `<blockquote class="chat-quote" ${attrs}><div class="quote-content" style="white-space: pre-wrap;">${processedContent}</div></blockquote>`;
    });

    // 自动链接
    html = html.replace(/(https?:\/\/[^\s<>"'\]\[]+)/g, (url, _g1, offset, str) => {
        const before = str.slice(0, offset);
        const after = str.slice(offset + url.length);

        // 跳过已在标签内的链接
        if ((before.endsWith('>') && after.startsWith('</a>')) || (before.endsWith('src="') && after.startsWith('"'))) return url;
        const lastOpen = before.lastIndexOf('<');
        const lastClose = before.lastIndexOf('>');
        if (lastOpen > lastClose) return url;

        const normalizedUrl = normalizeBangumiUrl(url);
        const linkHtml = `<a href="${normalizedUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;

        collectPreviewCard(url, options, linkPreviews);
        return linkHtml;
    });

    // 移除引用块后的换行
    html = html.replace(/(<\/blockquote>)<br\s*\/?>/gi, '$1');

    // 换行
    html = html.replace(/\n/g, '<br>');

    // 合并连续的图片块为网格布局
    html = html.replace(/(\x00IMAGE_BLOCK_\d+\x00(?:\s*<br\s*\/?>\s*)?)+/g, (match) => {
        const indices = [...match.matchAll(/\x00IMAGE_BLOCK_(\d+)\x00/g)].map(m => m[1]);
        const content = indices.map(idx => imageBlocks.get(idx)).join('');
        if (indices.length === 1) {
            return mediaWrappers.push(`<div class="message-media-block">${content}</div>`);
        }
        return mediaWrappers.push(`<div class="message-media-block"><div class="message-media-grid" style="--media-count: ${indices.length}">${content}</div></div>`);
    });

    html = html.replace(MEDIA_WRAPPER_BREAK_RE, '$1');
    html = mediaWrappers.resolve(html);

    // 恢复 code 块（内容需要 HTML 转义以防止 XSS）
    html = codeBlocks.resolve(html, (content) => `<div class="codeHighlight"><pre>${escapeHTML(content)}</pre></div>`);

    return html;
}

function processQuoteMasks(text: string): string {
    let escaped = escapeHTML(text);
    escaped = escaped.replace(/\[mask\]([\s\S]+?)\[\/mask\]/gi, '<span class="text_mask"><span class="inner">$1</span></span>');
    return escaped;
}

/**
 * 渲染回复引用块
 */
export function renderReplyQuote(details: ReplyDetails, replyToId: number): string {
    let content = stripQuotes(details.content)
        .replace(/\[file=.*?\].*?\[\/file\]/gi, '[附件]')
        .replace(/\[mask\]\s*\[\/mask\]/gi, '');

    const isTruncated = content.length > 80;
    content = content.substring(0, 80);

    if (isTruncated) {
        content = content.replace(/\[\/?[a-zA-Z]*$/g, '');
        const openCount = (content.match(/\[mask\]/gi) || []).length;
        const closeCount = (content.match(/\[\/mask\]/gi) || []).length;
        if (openCount > closeCount) {
            content += '[/mask]';
        }
    }

    const parsedContent = processQuoteMasks(content);
    const avatarSrc = getAvatarUrl(details.avatar, 's');

    // 图片缩略图（如果有）
    const imageClasses = `quote-thumbnail${details.firstImageMasked ? ' image-masked' : ''}`;
    const imageHTML = details.firstImage
        ? `<img src="${details.firstImage}" class="${imageClasses}" loading="lazy">`
        : '';

    // 头像（如果没有图片缩略图则显示）
    const avatarHTML = details.firstImage
        ? ''
        : `<img src="${avatarSrc}" class="quote-avatar" loading="lazy">`;

    return `<blockquote class="chat-quote" data-jump-to-id="${replyToId}" data-quote-uid="${details.uid}" title="点击跳转到原文">${imageHTML}<div class="quote-text-wrapper"><div class="quote-header">${avatarHTML}<span class="quote-nickname">${escapeHTML(details.nickname)}</span></div><div class="quote-content">${parsedContent}${isTruncated ? '...' : ''}</div></div></blockquote>`;
}

/**
 * 去除引用块
 */
export function stripQuotes(text: string): string {
    return (text || '').replace(/\[quote(?:=\d+)?\][\s\S]*?\[\/quote\]/gi, '').trim();
}
