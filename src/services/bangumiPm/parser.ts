import type {
    BangumiPmComposeForm,
    BangumiPmConversation,
    BangumiPmConversationDetail,
    BangumiPmForm,
    BangumiPmInboxPage,
    BangumiPmMessage,
} from '@/types/pm';
import {
    renderAudioMarkup,
    renderFileMarkup,
    renderImageMarkup,
    renderVideoMarkup,
} from '@/utils/mediaMarkup';
import { escapeHTML } from '@/utils/format';
import { replaceInlineTokens } from '@/utils/inlineTokens';
import { getSmileyClassName, renderInlineTokenHTML } from '@/utils/inlineRender';

const FALLBACK_ORIGIN = 'https://bangumi.tv';
const ALLOWED_TAGS = new Set([
    'A', 'AUDIO', 'B', 'BLOCKQUOTE', 'BR', 'CODE', 'DEL', 'DIV', 'EM', 'I', 'IMG',
    'LI', 'OL', 'P', 'PRE', 'S', 'SPAN', 'STRONG', 'U', 'UL', 'VIDEO',
]);
const BLOCKED_TAGS = new Set(['IFRAME', 'MATH', 'OBJECT', 'SCRIPT', 'STYLE', 'SVG', 'TEMPLATE']);

export class BangumiPmParseError extends Error {}

function parseDocument(html: string) {
    return new DOMParser().parseFromString(html, 'text/html');
}

function getOrigin() {
    return typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : FALLBACK_ORIGIN;
}

export function toSameOriginPmPath(value: string, baseUrl = getOrigin()) {
    try {
        const url = new URL(value, baseUrl);
        if (!url.pathname.startsWith('/pm')) return null;
        return `${url.pathname}${url.search}${url.hash}`;
    } catch {
        return null;
    }
}

function safeResourceUrl(value: string, baseUrl: string) {
    try {
        const url = new URL(value, baseUrl);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
        return url.href;
    } catch {
        return null;
    }
}

function avatarFrom(element: Element | null, baseUrl: string) {
    const avatar = element?.querySelector<HTMLElement>('.avatarNeue') ?? element as HTMLElement | null;
    const styleValue = avatar?.style.backgroundImage || avatar?.getAttribute('style') || '';
    const match = styleValue.match(/url\(["']?(.+?)["']?\)/i);
    return match ? safeResourceUrl(match[1], baseUrl) || '' : '';
}

function appendRenderedMarkup(target: Node, document: Document, markup: string) {
    const template = document.createElement('template');
    template.innerHTML = markup;
    target.appendChild(template.content);
}

function appendPmImage(
    target: Node,
    document: Document,
    src: string,
    alt: string,
    isSmiley: boolean
) {
    if (isSmiley) {
        const image = document.createElement('img');
        image.setAttribute('src', src);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('decoding', 'async');
        image.setAttribute('referrerpolicy', 'no-referrer');
        image.setAttribute('alt', alt);
        image.className = getSmileyClassName(alt, src, 'smile smiley');
        target.appendChild(image);
        return;
    }

    appendRenderedMarkup(target, document, renderImageMarkup(src, undefined, { loaded: true }));
}

function renderPmInlineText(value: string) {
    return replaceInlineTokens(value, renderInlineTokenHTML, { renderText: escapeHTML });
}

function appendSanitizedInlineText(value: string, target: Node, document: Document) {
    if (!value) return;
    appendRenderedMarkup(target, document, renderPmInlineText(value));
}

function appendSanitizedText(value: string, target: Node, document: Document, baseUrl: string) {
    const mediaPattern = /\[(img|audio|video)\]([\s\S]*?)\[\/\1\]|\[file=([^\]]*)\]([\s\S]*?)\[\/file\]/gi;
    let cursor = 0;
    let match: RegExpExecArray | null;

    while ((match = mediaPattern.exec(value)) !== null) {
        if (match.index > cursor) appendSanitizedInlineText(value.slice(cursor, match.index), target, document);
        const type = match[1]?.toLowerCase();
        const rawUrl = (type ? match[2] : match[4])?.trim() || '';
        const url = safeResourceUrl(rawUrl, baseUrl);
        if (!url) {
            appendSanitizedInlineText(match[0], target, document);
        } else if (type === 'img') {
            appendPmImage(target, document, url, 'image', false);
        } else if (type === 'audio' || type === 'video') {
            appendRenderedMarkup(
                target,
                document,
                type === 'audio' ? renderAudioMarkup(url) : renderVideoMarkup(url)
            );
        } else {
            appendRenderedMarkup(
                target,
                document,
                renderFileMarkup(url, match[3]?.trim() || '附件')
            );
        }
        cursor = mediaPattern.lastIndex;
    }

    if (cursor < value.length) appendSanitizedInlineText(value.slice(cursor), target, document);
}

function parsePmTimestamp(value: string) {
    const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{2})/);
    if (!match) return null;
    const [, year, month, day, hour, minute] = match;
    const timestamp = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute)
    ).getTime() / 1000;
    return Number.isFinite(timestamp) ? timestamp : null;
}

function pmPresentationText(source: Node): string {
    if (source.nodeType === Node.TEXT_NODE) return source.textContent || '';
    if (!(source instanceof Element)) return '';

    const content = Array.from(source.childNodes).map(pmPresentationText).join('');
    switch (source.tagName) {
        case 'BR':
            return '\n';
        case 'IMG':
            return source.classList.contains('smile')
                ? source.getAttribute('alt') || ''
                : `[img]${source.getAttribute('src') || 'image'}[/img]`;
        case 'BLOCKQUOTE':
            return `[quote]${content}[/quote]`;
        case 'PRE':
            return `[code]${source.textContent || ''}[/code]`;
        case 'CODE':
            return source.parentElement?.tagName === 'PRE' ? content : `[code]${content}[/code]`;
        case 'VIDEO':
            return `[video]${source.getAttribute('src') || content}[/video]`;
        case 'AUDIO':
            return `[audio]${source.getAttribute('src') || content}[/audio]`;
        default:
            return content;
    }
}

function appendSanitizedNode(
    source: Node,
    target: Node,
    document: Document,
    baseUrl: string,
    parseMediaText = true
) {
    if (source.nodeType === Node.TEXT_NODE) {
        const value = source.textContent || '';
        if (parseMediaText) appendSanitizedText(value, target, document, baseUrl);
        else target.appendChild(document.createTextNode(value));
        return;
    }
    if (!(source instanceof Element)) return;

    if (BLOCKED_TAGS.has(source.tagName)) return;

    if (!ALLOWED_TAGS.has(source.tagName)) {
        for (const child of Array.from(source.childNodes)) {
            appendSanitizedNode(child, target, document, baseUrl, parseMediaText);
        }
        return;
    }

    if (source.tagName === 'IMG') {
        const src = safeResourceUrl(source.getAttribute('src') || '', baseUrl);
        if (src) appendPmImage(
            target,
            document,
            src,
            source.getAttribute('alt') || '',
            source.classList.contains('smile')
        );
        return;
    }

    if (source.tagName === 'AUDIO' || source.tagName === 'VIDEO') {
        const srcValue = source.getAttribute('src')
            || source.querySelector('source')?.getAttribute('src')
            || '';
        const src = safeResourceUrl(srcValue, baseUrl);
        if (src) appendRenderedMarkup(
            target,
            document,
            source.tagName === 'AUDIO' ? renderAudioMarkup(src) : renderVideoMarkup(src)
        );
        return;
    }

    const element = document.createElement(source.tagName.toLowerCase());
    if (source.tagName === 'A') {
        const href = safeResourceUrl(source.getAttribute('href') || '', baseUrl);
        if (href) {
            element.setAttribute('href', href);
            element.setAttribute('target', '_blank');
            element.setAttribute('rel', 'noopener noreferrer');
        }
        if (source.hasAttribute('download') || source.classList.contains('chat-file-link')) {
            element.className = 'chat-file-link';
            const filename = source.getAttribute('download') || source.textContent?.trim() || '附件';
            element.setAttribute('download', filename);
        }
        const title = source.getAttribute('title');
        if (title) element.setAttribute('title', title);
    }

    const parseChildMedia = parseMediaText && source.tagName !== 'CODE' && source.tagName !== 'PRE';
    for (const child of Array.from(source.childNodes)) {
        appendSanitizedNode(child, element, document, baseUrl, parseChildMedia);
    }
    target.appendChild(element);
}

export function sanitizePmBody(source: Element, baseUrl: string) {
    const container = source.ownerDocument.createElement('div');
    for (const child of Array.from(source.childNodes)) {
        appendSanitizedNode(child, container, source.ownerDocument, baseUrl);
    }
    return container.innerHTML;
}

function extractForm(form: HTMLFormElement, baseUrl: string): BangumiPmForm {
    const fields: Record<string, string> = {};
    for (const control of Array.from(form.elements)) {
        if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement || control instanceof HTMLSelectElement)) continue;
        if (!control.name || control.disabled) continue;
        if (control instanceof HTMLInputElement) {
            if ((control.type === 'checkbox' || control.type === 'radio') && !control.checked) continue;
            if (control.type === 'submit' || control.type === 'button' || control.type === 'file') continue;
        }
        fields[control.name] = control.value;
    }

    return {
        action: toSameOriginPmPath(form.action || '/pm/create.chii', baseUrl) || '/pm/create.chii',
        fields,
    };
}

function ensurePmPage(document: Document) {
    if (document.querySelector('#loginForm') || document.querySelector('input[name="email"][type="text"]')) {
        throw new BangumiPmParseError('Bangumi 登录已失效');
    }
}

function findNextConversationPage(document: Document, baseUrl: string) {
    const current = new URL(baseUrl, FALLBACK_ORIGIN);
    const currentPage = Number.parseInt(current.searchParams.get('page') || '1', 10);
    const candidates = Array.from(document.querySelectorAll<HTMLAnchorElement>('#pm_pager a'))
        .flatMap(link => {
            const path = toSameOriginPmPath(link.href, baseUrl);
            if (!path) return [];
            const page = Number.parseInt(new URL(link.href, baseUrl).searchParams.get('page') || '', 10);
            return Number.isFinite(page) && page > currentPage ? [{ path, page }] : [];
        })
        .sort((a, b) => a.page - b.page);
    return candidates[0]?.path || null;
}

export function parsePmInbox(html: string, baseUrl = getOrigin()): BangumiPmInboxPage {
    const document = parseDocument(html);
    ensurePmPage(document);
    const container = document.querySelector('#contentPM');
    if (!container) throw new BangumiPmParseError('无法识别 Bangumi 短信列表');

    const conversations: BangumiPmConversation[] = Array.from(container.querySelectorAll<HTMLAnchorElement>('a.pm-conversation-item')).flatMap(item => {
        const path = toSameOriginPmPath(item.href, baseUrl);
        const id = path?.match(/^\/pm\/conversation\/(\d+)\.chii/)?.[1];
        if (!path || !id) return [];
        return [{
            id,
            href: path,
            nickname: item.querySelector('.pm-conversation-name')?.textContent?.trim() || '',
            avatar: avatarFrom(item, baseUrl),
            dateText: item.querySelector('.pm-conversation-date')?.textContent?.trim() || '',
            lastMessage: item.querySelector('.pm-conversation-desc')?.textContent?.trim() || '',
            unreadCount: Number.parseInt(item.querySelector('.pm-conversation-unread')?.textContent || '0', 10) || 0,
        }];
    });
    return { conversations, nextPageUrl: findNextConversationPage(document, baseUrl) };
}

export function parsePmConversation(html: string, baseUrl: string): BangumiPmConversationDetail {
    const document = parseDocument(html);
    ensurePmPage(document);
    const list = document.querySelector('.pm-message-list');
    const id = new URL(baseUrl, FALLBACK_ORIGIN).pathname.match(/^\/pm\/conversation\/(\d+)\.chii/)?.[1]
        || document.querySelector<HTMLAnchorElement>('a.pm-conversation-item.selected')?.href.match(/\/conversation\/(\d+)\.chii/)?.[1];
    if (!list || !id) throw new BangumiPmParseError('无法识别 Bangumi 短信会话');

    const peerLink = document.querySelector<HTMLAnchorElement>('.pm-chat-title strong a[href*="/user/"]');
    const username = peerLink?.pathname.match(/^\/user\/(.+)$/)?.[1] || '';
    const messages: BangumiPmMessage[] = [];
    let topic: string | undefined;

    for (const child of Array.from(list.children)) {
        if (child.classList.contains('pm-thread-label')) {
            topic = child.textContent?.trim() || undefined;
            continue;
        }
        if (!child.classList.contains('pm-message')) continue;
        const messageId = child.id.match(/^msg_(\d+)$/)?.[1];
        const body = child.querySelector('.pm-message-body');
        if (!messageId || !body) continue;
        const userLink = child.querySelector<HTMLAnchorElement>('a[href*="/user/"]');
        const info = child.querySelector('.pm-message-info small')?.textContent || '';
        const timestampText = info.split('/')[0]?.trim() || '';
        messages.push({
            id: messageId,
            isSelf: child.classList.contains('pm-message-self'),
            avatar: avatarFrom(child, baseUrl),
            userHref: userLink ? new URL(userLink.href, baseUrl).pathname : '',
            bodyHtml: sanitizePmBody(body, baseUrl),
            bodyText: body.textContent?.trim() || '',
            presentationText: Array.from(body.childNodes).map(pmPresentationText).join('').trim(),
            timestamp: parsePmTimestamp(timestampText),
            timestampText,
            topic,
        });
    }

    const formElement = document.querySelector<HTMLFormElement>('#pmReplyForm');
    return {
        id,
        nickname: peerLink?.textContent?.trim() || '',
        username: decodeURIComponent(username),
        avatar: avatarFrom(document.querySelector('.pm-chat-header'), baseUrl),
        messages,
        replyForm: formElement ? extractForm(formElement, baseUrl) : null,
    };
}

export function parsePmComposeForm(html: string, baseUrl: string): BangumiPmComposeForm {
    const document = parseDocument(html);
    ensurePmPage(document);
    const form = document.querySelector<HTMLFormElement>('#pmForm, form[action*="/pm/create.chii"]');
    if (!form) throw new BangumiPmParseError('无法识别 Bangumi 短信表单');
    const parsed = extractForm(form, baseUrl);
    return { form: parsed, receiver: parsed.fields.msg_receivers || '' };
}

export function findPmError(html: string) {
    const document = parseDocument(html);
    if (document.querySelector('#loginForm')) return 'Bangumi 登录已失效';
    const error = document.querySelector('.error, .message, .alert, #robot_speech_js');
    const text = error?.textContent?.trim();
    return text && /错误|失败|拒绝|不存在|不能为空|无权限|频繁/.test(text) ? text : null;
}
