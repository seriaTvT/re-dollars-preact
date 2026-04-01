import { useEffect, useRef, useCallback } from 'preact/hooks';
import {
    isImageViewerOpen,
    imageViewerItems,
    imageViewerImages,
    imageViewerIndex,
    imageViewerSource,
    hideImageViewer,
    imageViewerIndex as indexSignal,
    hideUserProfile,
    toggleSearch,
} from '@/stores/ui';
import { pendingJumpToMessage, toggleChat } from '@/stores/chat';
import { formatDate, getAvatarUrl } from '@/utils/format';

const SWIPE_THRESHOLD = 50;
const SWIPE_DOWN_THRESHOLD = 80;
const DOUBLE_TAP_DELAY = 300;
const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ANIM_DURATION = 250;

/** Inject lightbox styles once */
let stylesInjected = false;
function injectStyles() {
    if (stylesInjected) return;
    stylesInjected = true;
    const css = `
.lb-overlay{position:fixed;inset:0;z-index:var(--dollars-z-index-modal,2000);background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s ease;touch-action:none;user-select:none;-webkit-user-select:none}
.lb-overlay.lb-visible{opacity:1}
.lb-overlay.lb-closing{opacity:0}
.lb-img-wrap{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden}
.lb-img{max-width:90vw;max-height:90vh;object-fit:contain;transform-origin:center center;transition:transform .25s ease,opacity .2s ease;will-change:transform;pointer-events:none;-webkit-user-drag:none}
.lb-img.lb-dragging{transition:none}
.lb-nav{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border:none;background:rgba(255,255,255,.15);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);color:#fff;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;transition:background .2s,opacity .2s;opacity:.7}
.lb-nav:hover{background:rgba(255,255,255,.3);opacity:1}
.lb-prev{left:12px}
.lb-next{right:12px}
.lb-close{position:absolute;top:12px;right:12px;width:40px;height:40px;border:none;background:rgba(255,255,255,.15);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);color:#fff;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;transition:background .2s;font-size:20px}
.lb-close:hover{background:rgba(255,255,255,.3)}
.lb-counter{position:absolute;top:16px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.7);font-size:14px;z-index:2;pointer-events:none}
.lb-capsule{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:8px;max-width:min(76vw,340px);padding:7px 12px 7px 9px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(12,12,14,.56);backdrop-filter:blur(12px) saturate(1.1);-webkit-backdrop-filter:blur(12px) saturate(1.1);box-shadow:0 8px 20px rgba(0,0,0,.24);color:#fff;cursor:pointer;z-index:2;transition:background-color .18s ease,border-color .18s ease,transform .18s ease;appearance:none;-webkit-appearance:none;font:inherit;text-align:left}
.lb-capsule:hover{background:rgba(12,12,14,.68);border-color:rgba(255,255,255,.2);transform:translateX(-50%) scale(1.015)}
.lb-capsule:active{transform:translateX(-50%) scale(.985)}
.lb-capsule-avatar{width:28px;height:28px;border-radius:50%;object-fit:cover;border:1px solid rgba(255,255,255,.18);flex-shrink:0}
.lb-capsule-info{display:flex;flex-direction:column;min-width:0;gap:2px;line-height:1.1}
.lb-capsule-nickname,.lb-capsule-date{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lb-capsule-nickname{font-size:12px;font-weight:600;letter-spacing:.01em;text-shadow:0 1px 2px rgba(0,0,0,.35)}
.lb-capsule-date{font-size:10px;color:rgba(255,255,255,.72)}
@media(max-width:600px){.lb-nav{display:none}.lb-img{max-width:100vw;max-height:100vh}.lb-capsule{bottom:18px;max-width:calc(100vw - 28px);padding:7px 11px 7px 9px}}
`;
    const el = document.createElement('style');
    el.setAttribute('data-lb-styles', '');
    el.textContent = css;
    document.head.appendChild(el);
}

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}

function dist(a: Touch, b: Touch) {
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function midpoint(a: Touch, b: Touch) {
    return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
}

export function LightboxViewer() {
    const overlayRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    // gesture state (refs to avoid re-renders)
    const scale = useRef(1);
    const tx = useRef(0);
    const ty = useRef(0);
    const startTouches = useRef<{ x: number; y: number }[]>([]);
    const startScale = useRef(1);
    const startTx = useRef(0);
    const startTy = useRef(0);
    const startDist = useRef(0);
    const startMid = useRef({ x: 0, y: 0 });
    const lastTap = useRef(0);
    const isDragging = useRef(false);
    const hasMoved = useRef(false);
    const swipeStartX = useRef(0);
    const swipeStartY = useRef(0);
    const closing = useRef(false);

    const items = imageViewerItems.value;
    const images = imageViewerImages.value;
    const index = imageViewerIndex.value;
    const source = imageViewerSource.value;
    const visible = isImageViewerOpen.value;
    const total = images.length;
    const currentItem = items[index];

    const handleCapsuleClick = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        const messageId = currentItem?.messageId;
        if (!messageId) return;

        hideImageViewer();
        if (source === 'userProfile') {
            hideUserProfile();
        }
        if (source !== 'generic') {
            toggleSearch(false);
        }
        pendingJumpToMessage.value = messageId;
        toggleChat(true);
    }, [currentItem?.messageId, source]);

    const applyTransform = useCallback(() => {
        const img = imgRef.current;
        if (img) {
            img.style.transform = `translate3d(${tx.current}px,${ty.current}px,0) scale(${scale.current})`;
        }
    }, []);

    const resetTransform = useCallback(() => {
        scale.current = 1;
        tx.current = 0;
        ty.current = 0;
        const img = imgRef.current;
        if (img) {
            img.classList.remove('lb-dragging');
            img.style.transform = '';
        }
    }, []);

    const close = useCallback(() => {
        if (closing.current) return;
        closing.current = true;
        const overlay = overlayRef.current;
        if (overlay) {
            overlay.classList.add('lb-closing');
            overlay.classList.remove('lb-visible');
        }
        setTimeout(() => {
            hideImageViewer();
            closing.current = false;
        }, ANIM_DURATION);
    }, []);

    const navigate = useCallback((dir: number) => {
        if (total <= 1) return;
        const next = (index + dir + total) % total;
        indexSignal.value = next;
        resetTransform();
    }, [index, total, resetTransform]);

    // Keyboard
    useEffect(() => {
        if (!visible) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { close(); e.preventDefault(); }
            else if (e.key === 'ArrowLeft') { navigate(-1); e.preventDefault(); }
            else if (e.key === 'ArrowRight') { navigate(1); e.preventDefault(); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [visible, close, navigate]);

    // Fade in on mount
    useEffect(() => {
        if (!visible) return;
        resetTransform();
        requestAnimationFrame(() => {
            overlayRef.current?.classList.add('lb-visible');
        });
    }, [visible, index, resetTransform]);

    // Inject styles once
    useEffect(injectStyles, []);

    if (!visible || total === 0) return null;

    const src = images[index];

    // --- Touch handlers ---
    const onTouchStart = (e: TouchEvent) => {
        const touches = e.touches;
        hasMoved.current = false;

        if (touches.length === 1) {
            const t = touches[0];
            isDragging.current = true;
            startTouches.current = [{ x: t.clientX, y: t.clientY }];
            startTx.current = tx.current;
            startTy.current = ty.current;
            swipeStartX.current = t.clientX;
            swipeStartY.current = t.clientY;

            // double-tap detection
            const now = Date.now();
            if (now - lastTap.current < DOUBLE_TAP_DELAY) {
                e.preventDefault();
                if (scale.current > 1.1) {
                    // zoom out
                    scale.current = 1;
                    tx.current = 0;
                    ty.current = 0;
                    imgRef.current?.classList.remove('lb-dragging');
                    applyTransform();
                } else {
                    // zoom to 2x at tap point
                    const img = imgRef.current;
                    if (img) {
                        const rect = img.getBoundingClientRect();
                        const cx = rect.left + rect.width / 2;
                        const cy = rect.top + rect.height / 2;
                        scale.current = 2.5;
                        tx.current = (cx - t.clientX) * 1.5;
                        ty.current = (cy - t.clientY) * 1.5;
                        img.classList.remove('lb-dragging');
                    }
                    applyTransform();
                }
                lastTap.current = 0;
                isDragging.current = false;
                return;
            }
            lastTap.current = now;
        } else if (touches.length === 2) {
            e.preventDefault();
            isDragging.current = false;
            startScale.current = scale.current;
            startTx.current = tx.current;
            startTy.current = ty.current;
            startDist.current = dist(touches[0], touches[1]);
            startMid.current = midpoint(touches[0], touches[1]);
        }
    };

    const onTouchMove = (e: TouchEvent) => {
        const touches = e.touches;
        hasMoved.current = true;

        if (touches.length === 2) {
            e.preventDefault();
            const d = dist(touches[0], touches[1]);
            const mid = midpoint(touches[0], touches[1]);
            const ratio = d / startDist.current;
            scale.current = clamp(startScale.current * ratio, 0.5, MAX_SCALE);
            tx.current = startTx.current + (mid.x - startMid.current.x);
            ty.current = startTy.current + (mid.y - startMid.current.y);
            imgRef.current?.classList.add('lb-dragging');
            applyTransform();
        } else if (touches.length === 1 && isDragging.current) {
            const t = touches[0];
            const dx = t.clientX - startTouches.current[0].x;
            const dy = t.clientY - startTouches.current[0].y;

            if (scale.current > 1.05) {
                // pan
                e.preventDefault();
                tx.current = startTx.current + dx;
                ty.current = startTy.current + dy;
                imgRef.current?.classList.add('lb-dragging');
                applyTransform();
            } else {
                // swipe tracking: apply vertical offset for feedback
                ty.current = dy * 0.5;
                imgRef.current?.classList.add('lb-dragging');
                applyTransform();
            }
        }
    };

    const onTouchEnd = (e: TouchEvent) => {
        if (e.touches.length > 0) return;
        isDragging.current = false;
        imgRef.current?.classList.remove('lb-dragging');

        // snap scale
        if (scale.current < MIN_SCALE) {
            scale.current = MIN_SCALE;
            tx.current = 0;
            ty.current = 0;
            applyTransform();
        }

        if (scale.current <= 1.05 && hasMoved.current) {
            const changedTouch = e.changedTouches[0];
            if (changedTouch) {
                const dx = changedTouch.clientX - swipeStartX.current;
                const dy = changedTouch.clientY - swipeStartY.current;

                // swipe down to close
                if (dy > SWIPE_DOWN_THRESHOLD && Math.abs(dx) < dy) {
                    close();
                    return;
                }

                // horizontal swipe to navigate
                if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dy) < Math.abs(dx)) {
                    navigate(dx < 0 ? 1 : -1);
                    return;
                }
            }

            // reset any residual translate
            tx.current = 0;
            ty.current = 0;
            applyTransform();
        }
    };

    // Mouse wheel zoom
    const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = clamp(scale.current * delta, MIN_SCALE, MAX_SCALE);

        if (newScale === MIN_SCALE) {
            tx.current = 0;
            ty.current = 0;
        }
        scale.current = newScale;
        imgRef.current?.classList.add('lb-dragging');
        applyTransform();

        // re-enable transition after a tick
        setTimeout(() => imgRef.current?.classList.remove('lb-dragging'), 50);
    };

    const onBackdropClick = (e: MouseEvent) => {
        if (e.target === overlayRef.current || (e.target as HTMLElement)?.classList?.contains('lb-img-wrap')) {
            close();
        }
    };

    return (
        <div
            ref={overlayRef}
            class="lb-overlay"
            onClick={onBackdropClick}
        >
            {/* Close button */}
            <button class="lb-close" onClick={close} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {/* Counter */}
            {total > 1 && (
                <div class="lb-counter">{index + 1} / {total}</div>
            )}

            {/* Nav buttons */}
            {total > 1 && (
                <>
                    <button class="lb-nav lb-prev" onClick={() => navigate(-1)} aria-label="Previous">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <button class="lb-nav lb-next" onClick={() => navigate(1)} aria-label="Next">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                </>
            )}

            {currentItem?.messageId && currentItem.nickname && currentItem.timestamp != null && (
                <button class="lb-capsule" onClick={handleCapsuleClick}>
                    <img
                        class="lb-capsule-avatar"
                        src={getAvatarUrl(currentItem.avatar || '', 's')}
                        alt={currentItem.nickname}
                    />
                    <span class="lb-capsule-info">
                        <span class="lb-capsule-nickname">{currentItem.nickname}</span>
                        <span class="lb-capsule-date">{formatDate(currentItem.timestamp, 'full')}</span>
                    </span>
                </button>
            )}

            {/* Image */}
            <div
                class="lb-img-wrap"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onWheel={onWheel}
            >
                <img
                    ref={imgRef}
                    class="lb-img"
                    src={src}
                    alt=""
                    draggable={false}
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/img/no_img.gif';
                    }}
                />
            </div>
        </div>
    );
}
