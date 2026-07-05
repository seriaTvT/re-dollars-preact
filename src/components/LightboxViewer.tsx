import { useEffect, useRef } from 'preact/hooks';
import { batch } from '@preact/signals';
import {
    isImageViewerOpen,
    imageViewerItems,
    imageViewerIndex,
    imageViewerSource,
    imageViewerTimelineState,
    hideImageViewer,
    hideUserProfile,
    toggleSearch,
} from '@/stores/ui';
import { pendingJumpToMessage, toggleChat } from '@/stores/chatState';
import { formatDate, getAvatarUrl } from '@/utils/format';
import { fetchGalleryTimelineImages } from '@/utils/api/media';
import { mergeTimelineImagePage } from '@/utils/messageImageViewer';

const SWIPE_THRESHOLD = 50;
const SWIPE_DOWN_THRESHOLD = 80;
const DOUBLE_TAP_DELAY = 300;
const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ANIM_DURATION = 250;

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
    const timelineLoading = useRef(false);

    const items = imageViewerItems.value;
    const index = imageViewerIndex.value;
    const source = imageViewerSource.value;
    const timelineState = imageViewerTimelineState.value;
    const visible = isImageViewerOpen.value;
    const total = items.length;
    const currentItem = items[index];

    const handleCapsuleClick = (e: MouseEvent) => {
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
    };

    const applyTransform = () => {
        const img = imgRef.current;
        if (img) {
            img.style.transform = `translate3d(${tx.current}px,${ty.current}px,0) scale(${scale.current})`;
        }
    };

    const zoomAtPoint = (clientX: number, clientY: number, nextScale: number) => {
        const img = imgRef.current;
        if (!img) return;

        const currentScale = scale.current;
        const clampedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);

        if (clampedScale <= MIN_SCALE) {
            scale.current = 1;
            tx.current = 0;
            ty.current = 0;
            img.classList.remove('lb-dragging');
            applyTransform();
            return;
        }

        const rect = img.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const ratio = clampedScale / currentScale;

        tx.current += (clientX - centerX) * (1 - ratio);
        ty.current += (clientY - centerY) * (1 - ratio);
        scale.current = clampedScale;
        img.classList.remove('lb-dragging');
        applyTransform();
    };

    const toggleZoomAtPoint = (clientX: number, clientY: number) => {
        zoomAtPoint(clientX, clientY, scale.current > 1.1 ? 1 : 2.5);
    };

    const resetTransform = () => {
        scale.current = 1;
        tx.current = 0;
        ty.current = 0;
        const img = imgRef.current;
        if (img) {
            img.classList.remove('lb-dragging');
            img.style.transform = '';
        }
    };

    const close = () => {
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
    };

    const loadTimelinePage = async (direction: 'before' | 'after') => {
        const timeline = imageViewerTimelineState.peek();
        const isBefore = direction === 'before';
        const hasMore = isBefore ? timeline?.hasOlder : timeline?.hasNewer;
        if (!timeline || !hasMore || timelineLoading.current) return;

        timelineLoading.current = true;
        try {
            const cursorId = isBefore ? timeline.beforeId : timeline.afterId;
            const cursorIndex = isBefore ? timeline.beforeIndex : timeline.afterIndex;
            const page = await fetchGalleryTimelineImages(direction, cursorId, cursorIndex);
            if (
                !isImageViewerOpen.peek()
                || imageViewerSource.peek() !== 'timeline'
                || imageViewerTimelineState.peek() !== timeline
            ) {
                return;
            }

            if (page.items.length === 0) {
                imageViewerTimelineState.value = isBefore
                    ? { ...timeline, hasOlder: false }
                    : { ...timeline, hasNewer: false };
                return;
            }

            const currentItems = imageViewerItems.peek();
            const merged = mergeTimelineImagePage(currentItems, page.items, direction);
            const boundaryId = isBefore
                ? page.items[0].messageId!
                : page.items[page.items.length - 1].messageId!;
            const boundaryIndex = isBefore
                ? page.items[0].mediaIndex!
                : page.items[page.items.length - 1].mediaIndex!;

            batch(() => {
                if (isBefore) {
                    imageViewerItems.value = merged.items;
                    imageViewerIndex.value = merged.index;
                    imageViewerTimelineState.value = {
                        ...timeline,
                        beforeId: boundaryId,
                        beforeIndex: boundaryIndex,
                        hasOlder: page.hasMore,
                    };
                } else {
                    imageViewerItems.value = merged.items;
                    imageViewerIndex.value = merged.index;
                    imageViewerTimelineState.value = {
                        ...timeline,
                        afterId: boundaryId,
                        afterIndex: boundaryIndex,
                        hasNewer: page.hasMore,
                    };
                }
            });
            resetTransform();
        } catch {
            // Keep the boundary retryable after transient network errors.
        } finally {
            timelineLoading.current = false;
        }
    };

    const navigate = (dir: number) => {
        const currentItems = imageViewerItems.peek();
        const currentIndex = imageViewerIndex.peek();
        const nextIndex = currentIndex + dir;

        if (nextIndex >= 0 && nextIndex < currentItems.length) {
            imageViewerIndex.value = nextIndex;
            resetTransform();
            return;
        }

        if (imageViewerSource.peek() === 'timeline') {
            void loadTimelinePage(dir < 0 ? 'before' : 'after');
            return;
        }

        if (currentItems.length > 1) {
            imageViewerIndex.value = (nextIndex + currentItems.length) % currentItems.length;
            resetTransform();
        }
    };

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
    }, [visible]);

    // Fade in on mount
    useEffect(() => {
        if (!visible) return;
        resetTransform();
        requestAnimationFrame(() => {
            overlayRef.current?.classList.add('lb-visible');
        });
    }, [visible, index]);

    if (!visible || total === 0) return null;

    const src = currentItem?.src;
    const canNavigatePrevious = source === 'timeline'
        ? index > 0 || !!timelineState?.hasOlder
        : total > 1;
    const canNavigateNext = source === 'timeline'
        ? index < total - 1 || !!timelineState?.hasNewer
        : total > 1;

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
                toggleZoomAtPoint(t.clientX, t.clientY);
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
        imgRef.current?.classList.add('lb-dragging');
        zoomAtPoint(e.clientX, e.clientY, scale.current * delta);

        // re-enable transition after a tick
        setTimeout(() => imgRef.current?.classList.remove('lb-dragging'), 50);
    };

    const onBackdropClick = (e: MouseEvent) => {
        if (e.target === overlayRef.current) {
            close();
        }
    };

    const onImageDoubleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleZoomAtPoint(e.clientX, e.clientY);
    };

    return (
        <div
            ref={overlayRef}
            class="lb-overlay"
            onClick={onBackdropClick}
        >
            {/* Close button */}
            <button class="lb-close" onClick={close} aria-label="Close" />

            {/* Counter */}
            {(canNavigatePrevious || canNavigateNext) && (
                <div class="lb-counter">{index + 1} / {total}</div>
            )}

            {/* Nav buttons */}
            {canNavigatePrevious && (
                <button class="lb-nav lb-prev" onClick={() => navigate(-1)} aria-label="Previous" />
            )}
            {canNavigateNext && (
                <button class="lb-nav lb-next" onClick={() => navigate(1)} aria-label="Next" />
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
            >
                <img
                    ref={imgRef}
                    class="lb-img"
                    src={src}
                    alt=""
                    draggable={false}
                    onDblClick={onImageDoubleClick}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onWheel={onWheel}
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/img/no_img.gif';
                    }}
                />
            </div>
        </div>
    );
}
