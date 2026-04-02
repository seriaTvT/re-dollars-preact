import { useSignal } from '@preact/signals';
import { useCallback, useRef, useEffect } from 'preact/hooks';
import { searchQuery } from '@/stores/chat';
import { fetchGalleryMedia, lookupUsersByName } from '@/utils/api';
import { showImageViewer } from '@/stores/ui';

interface GalleryItem {
    url: string;
    thumbnailUrl?: string;
    type: 'image' | 'video';
    message_id: number;
    nickname: string;
    avatar: string;
    timestamp: number;
}

interface GalleryPanelProps {
    onClose: () => void;
}

export function GalleryPanel({ onClose }: GalleryPanelProps) {
    const items = useSignal<GalleryItem[]>([]);
    const isLoading = useSignal(false);
    const hasMore = useSignal(true);
    const offset = useRef(0);
    const initialized = useRef(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const targetUid = useSignal<number | undefined>(undefined);
    const isResolvingUser = useSignal(false);

    // Filter effect: Parse search query for user:xxx
    useEffect(() => {
        const parseUserFilter = async () => {
            const query = searchQuery.value.trim();
            const userMatch = query.match(/^user:(\S+)$/i);

            if (userMatch && userMatch[1]) {
                const username = userMatch[1];
                isResolvingUser.value = true;
                // clear previous items while resolving if query changed substantially
                // actually better to just wait

                try {
                    const result = await lookupUsersByName([username]);
                    if (result && result[username]) {
                        const newUid = result[username].id;
                        if (targetUid.value !== newUid) {
                            targetUid.value = newUid;
                            // Reset and reload
                            items.value = [];
                            offset.current = 0;
                            hasMore.value = true;
                            loadMore();
                        }
                    } else {
                        // User not found, maybe just treat as valid UID 0 (no results) or ignore?
                        // For now let's just not filter if user lookup fails, or filter by invalid UID?
                        // Filter by invalid UID to show empty result is probably safer than showing all
                        if (targetUid.value !== -1) {
                            targetUid.value = -1;
                            items.value = [];
                            offset.current = 0;
                            hasMore.value = false;
                        }
                    }
                } catch (e) {
                    console.error('Failed to resolve user filter', e);
                } finally {
                    isResolvingUser.value = false;
                }
            } else {
                if (targetUid.value !== undefined) {
                    targetUid.value = undefined;
                    // Reset to show all
                    items.value = [];
                    offset.current = 0;
                    hasMore.value = true;
                    loadMore();
                }
            }
        };

        parseUserFilter();
    }, [searchQuery.value]);

    const loadMore = useCallback(async () => {
        if (isLoading.value || !hasMore.value || isResolvingUser.value) return;
        if (targetUid.value === -1) return; // Invalid user filter

        isLoading.value = true;
        try {
            const data = await fetchGalleryMedia(offset.current, 50, targetUid.value);
            items.value = [...items.value, ...data.items];
            hasMore.value = data.hasMore;
            offset.current += data.items.length;
        } catch (e) {
            console.error('[GalleryPanel] Failed to load:', e);
        } finally {
            isLoading.value = false;
        }
    }, [targetUid.value, isResolvingUser.value]);

    // Initial load - only if not blocked by user resolution
    useEffect(() => {
        if (!initialized.current && !isResolvingUser.value) {
            // If we have a query, the filter effect above will trigger load
            // If we assume empty query, we might need to trigger manually?
            // actually strict effect parsing handles it.
            // But if searchQuery is empty initially, targetUid is undefined.
            // We need to ensure we load at least once.

            // The dependency on searchQuery.value means the effect above runs on mount.
            // So we don't need manual initial load if that effect covers it.
            // However, that effect makes `loadMore` async call which might collide if we call it here too.
            // best to let the effect driver handle it.

            initialized.current = true;
        }
    }, []);

    // Check if we need more items to fill the view
    useEffect(() => {
        const checkAndLoadMore = () => {
            const grid = gridRef.current;
            if (grid && hasMore.value && !isLoading.value && !isResolvingUser.value) {
                // If content doesn't fill the container, load more
                if (grid.scrollHeight <= grid.clientHeight) {
                    loadMore();
                }
            }
        };
        // Check after items update
        const timer = setTimeout(checkAndLoadMore, 100);
        return () => clearTimeout(timer);
    }, [items.value.length, hasMore.value, isLoading.value, isResolvingUser.value]);

    const handleScroll = (e: Event) => {
        const el = e.target as HTMLDivElement;
        if (
            !isLoading.value &&
            hasMore.value &&
            el.scrollHeight - el.scrollTop - el.clientHeight < 100
        ) {
            loadMore();
        }
    };

    const imageItems = items.value.filter(item => item.type === 'image');
    const viewerItems = imageItems.map(item => ({
        src: item.url,
        messageId: item.message_id,
        nickname: item.nickname,
        avatar: item.avatar,
        timestamp: item.timestamp,
    }));

    return (
        <div class="gallery-container">
            <div class="gallery-header">
                <span class="gallery-title">相册</span>
                <div
                    class="gallery-close-btn"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </div>
            </div>

            <div class="gallery-grid" ref={gridRef} onScroll={handleScroll}>
                    {items.value.map((item, idx) => {
                        const imageIndex = imageItems.indexOf(item);
                        return (
                            <div
                                key={`${item.message_id}-${idx}`}
                                class="gallery-item"
                            >
                                {item.type === 'video' ? (
                                    <div class="video-container" onClick={() => {
                                        window.open(item.url, '_blank');
                                    }}>
                                        <img
                                            src={item.thumbnailUrl || item.url}
                                            alt="Video thumbnail"
                                            loading="lazy"
                                            style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;"
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                target.src = '/img/no_img.gif';
                                                target.onerror = null;
                                            }}
                                        />
                                        <div class="video-overlay">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={item.thumbnailUrl || item.url}
                                        alt=""
                                        loading="lazy"
                                        style="cursor: pointer;"
                                        onClick={() => {
                                            showImageViewer(viewerItems, imageIndex, 'gallery');
                                        }}
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            target.src = '/img/no_img.gif';
                                            target.onerror = null;
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}

                    {isLoading.value && (
                        <div class="gallery-loading">加载中...</div>
                    )}
                </div>
        </div>
    );
}
