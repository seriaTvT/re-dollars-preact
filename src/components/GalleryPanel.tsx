import { useSignal } from '@preact/signals';
import { useRef, useEffect } from 'preact/hooks';
import { searchQuery } from '@/stores/chatState';
import { fetchGalleryMedia } from '@/utils/api/media';
import { lookupUsersByName } from '@/utils/api/users';
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
    const gridRef = useRef<HTMLDivElement>(null);
    const targetUid = useSignal<number | undefined>(undefined);
    const isResolvingUser = useSignal(false);

    async function loadMore() {
        if (isLoading.value || !hasMore.value || isResolvingUser.value || targetUid.value === -1) return;

        isLoading.value = true;
        try {
            const data = await fetchGalleryMedia(offset.current, 50, targetUid.value);
            items.value = [...items.value, ...data.items];
            hasMore.value = data.hasMore;
            offset.current += data.items.length;
        } catch {
        } finally {
            isLoading.value = false;
        }
    }

    // Filter effect: Parse search query for user:xxx
    useEffect(() => {
        const parseUserFilter = async () => {
            const query = searchQuery.value.trim();
            const userMatch = query.match(/^user:(\S+)$/i);

            if (userMatch) {
                const username = userMatch[1];
                isResolvingUser.value = true;

                try {
                    const result = await lookupUsersByName([username]);
                    const user = result?.[username];
                    if (user) {
                        const newUid = user.id;
                        if (targetUid.value !== newUid) {
                            targetUid.value = newUid;
                            items.value = [];
                            offset.current = 0;
                            hasMore.value = true;
                            loadMore();
                        }
                    } else {
                        if (targetUid.value !== -1) {
                            targetUid.value = -1;
                            items.value = [];
                            offset.current = 0;
                            hasMore.value = false;
                        }
                    }
                } catch {
                } finally {
                    isResolvingUser.value = false;
                }
            } else {
                if (targetUid.value !== undefined) {
                    targetUid.value = undefined;
                    items.value = [];
                    offset.current = 0;
                    hasMore.value = true;
                    loadMore();
                }
            }
        };

        parseUserFilter();
    }, [searchQuery.value]);

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
                />
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
                                        <div class="video-overlay" />
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
