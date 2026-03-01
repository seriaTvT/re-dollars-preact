import { useEffect, useState } from 'preact/hooks';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import {
    isUserProfilePanelOpen,
    isUserProfilePanelClosing,
    userProfilePanelUserId,
    hideUserProfile,
    toggleSearch,
    isNarrowLayout,
    isSearchActive,
} from '@/stores/ui';
import { searchQuery, pendingJumpToMessage, toggleChat } from '@/stores/chat';
import { fetchUserProfile, fetchGalleryMedia } from '@/utils/api';
import { getAvatarUrl, formatDate } from '@/utils/format';
import { SVGIcons } from '@/utils/constants';
import type { UserProfile } from '@/types';

interface MediaItem {
    url: string;
    thumbnailUrl: string;
    type: 'image' | 'video';
    message_id: number;
    nickname: string;
    avatar: string;
    timestamp: number;
}

export function UserProfilePanel() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [mediaLoading, setMediaLoading] = useState(false);

    const userId = userProfilePanelUserId.value;

    useEffect(() => {
        if (!userId) {
            setProfile(null);
            setMedia([]);
            return;
        }

        const loadProfile = async () => {
            setLoading(true);
            const data = await fetchUserProfile(userId);
            if (data) {
                setProfile(data);
            }
            setLoading(false);
        };

        loadProfile();
    }, [userId]);

    // Load user's shared media
    useEffect(() => {
        if (!profile?.id) {
            setMedia([]);
            return;
        }

        const loadMedia = async () => {
            setMediaLoading(true);
            const result = await fetchGalleryMedia(0, 6, profile.id);
            setMedia(result.items.map(item => ({
                url: item.url,
                thumbnailUrl: item.thumbnailUrl,
                type: item.type,
                message_id: item.message_id,
                nickname: item.nickname,
                avatar: item.avatar,
                timestamp: item.timestamp,
            })));
            setMediaLoading(false);
        };

        loadMedia();
    }, [profile?.id]);

    if (!isUserProfilePanelOpen.value) return null;

    const handleHistory = () => {
        if (profile) {
            searchQuery.value = `user:${profile.username}`;
            hideUserProfile();
            toggleSearch(true);
        }
    };

    const handleHomepage = () => {
        if (profile) {
            window.open(`/user/${profile.username}`, '_blank');
        }
    };

    const isActive = !loading && profile?.stats?.last_message_time &&
        formatDate(new Date(profile.stats.last_message_time).getTime() / 1000, 'label') === '今天';

    const isNarrow = isNarrowLayout.value;

    // Format last active text
    const lastActiveText = profile?.stats?.last_message_time ? (() => {
        const date = new Date(profile.stats!.last_message_time);
        const ts = date.getTime() / 1000;
        const label = formatDate(ts, 'label');
        const time = formatDate(ts, 'time');
        return `${label} ${time}`;
    })() : null;

    return (
        <div
            id="dollars-user-profile-panel"
            class={`${isNarrow ? 'narrow' : 'wide'} ${isUserProfilePanelOpen.value && !isUserProfilePanelClosing.value ? 'visible' : ''} ${isUserProfilePanelClosing.value ? 'closing' : ''}`}
        >
            {/* 宽视图卡片标题栏（窄视图由 ChatHeader 接管） */}
            {!isNarrow && (
                <div class="uprofile-card-header">
                    <button
                        class="header-btn dollars-back-btn"
                        title="返回"
                        onClick={hideUserProfile}
                    />
                    <span class="uprofile-card-title">用户资料</span>
                </div>
            )}

            {/* Banner + 居中头像 */}
            <div class="uprofile-banner">
                <img
                    class="uprofile-avatar"
                    src={profile ? getAvatarUrl(profile.avatar, 'l') : ''}
                    alt="avatar"
                />
            </div>

            {/* 滚动内容区 */}
            <div class="uprofile-content">
                {loading ? (
                    <div class="uprofile-skeleton-wrap">
                        <div class="uprofile-skeleton uprofile-skeleton-name" />
                        <div class="uprofile-skeleton uprofile-skeleton-username" />
                        <div class="uprofile-skeleton uprofile-skeleton-actions" />
                        <div class="uprofile-skeleton uprofile-skeleton-row" />
                        <div class="uprofile-skeleton uprofile-skeleton-row" />
                    </div>
                ) : (
                    <>
                        {/* 名称区（居中） */}
                        <div class="uprofile-name-section">
                            <div class="uprofile-nickname">
                                {profile?.nickname ?? userId}
                                {isActive && <span class="uprofile-status-dot active" />}
                            </div>
                            <div class="uprofile-username">
                                @{profile?.username ?? userId}
                            </div>
                            {lastActiveText && (
                                <div class="uprofile-last-active">
                                    {isActive ? '在线' : `最近活跃 ${lastActiveText}`}
                                </div>
                            )}
                        </div>

                        {/* 操作按钮（紧跟名称区） */}
                        {profile && (
                            <div class="uprofile-actions">
                                <button class="uprofile-action-btn" onClick={handleHistory}>
                                    <span dangerouslySetInnerHTML={{ __html: SVGIcons.history }} />
                                    搜索发言
                                </button>
                                <button class="uprofile-action-btn" onClick={handleHomepage}>
                                    <span dangerouslySetInnerHTML={{ __html: SVGIcons.home }} />
                                    主页
                                </button>
                            </div>
                        )}

                        {/* 信息行 */}
                        <div class="uprofile-info-section">
                            {profile?.sign && (
                                <div class="uprofile-info-row">
                                    <span class="context-icon" dangerouslySetInnerHTML={{ __html: SVGIcons.pen }} />
                                    <div class="uprofile-info-content">
                                        <div class="uprofile-info-label">个性签名</div>
                                        <div class="uprofile-info-value">{profile.sign}</div>
                                    </div>
                                </div>
                            )}

                            {profile?.stats && (
                                <div class="uprofile-info-row">
                                    <span class="context-icon" dangerouslySetInnerHTML={{ __html: SVGIcons.reply }} />
                                    <div class="uprofile-info-content">
                                        <div class="uprofile-info-label">发言统计</div>
                                        <div class="uprofile-info-value">
                                            {profile.stats.message_count.toLocaleString()} 条消息 · 日均 {profile.stats.average_messages_per_day.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {profile?.stats?.first_message_time && (
                                <div class="uprofile-info-row">
                                    <span class="context-icon" dangerouslySetInnerHTML={{ __html: SVGIcons.calendar }} />
                                    <div class="uprofile-info-content">
                                        <div class="uprofile-info-label">首次发言</div>
                                        <div class="uprofile-info-value">
                                            {formatDate(new Date(profile.stats!.first_message_time).getTime() / 1000, 'full')}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 共享媒体 */}
                        {!mediaLoading && media.length > 0 && (
                            <div class="uprofile-media-section">
                                <div class="uprofile-media-header">
                                    <span>媒体</span>
                                </div>
                                <PhotoProvider
                                    brokenElement={<img src="/img/no_img.gif" alt="加载失败" style={{ maxWidth: 200, maxHeight: 200 }} />}
                                    overlayRender={(props) => {
                                        const { index } = props;
                                        const imageItems = media.filter(item => item.type === 'image');
                                        const currentItem = imageItems[index];
                                        if (!currentItem) return null;
                                        return (
                                            <div class="gallery-photo-capsule" onClick={(e) => {
                                                e.stopPropagation();
                                                hideUserProfile();
                                                pendingJumpToMessage.value = currentItem.message_id;
                                                isSearchActive.value = false;
                                                toggleChat(true);
                                            }}>
                                                <img src={getAvatarUrl(currentItem.avatar, 's')} alt={currentItem.nickname} class="capsule-avatar" />
                                                <div class="capsule-info">
                                                    <span class="capsule-nickname">{currentItem.nickname}</span>
                                                    <span class="capsule-date">{formatDate(currentItem.timestamp, 'full')}</span>
                                                </div>
                                            </div>
                                        );
                                    }}
                                >
                                    <div class="uprofile-media-grid">
                                        {media.map((item, idx) => (
                                            <div
                                                class="uprofile-media-item"
                                                key={item.message_id + item.url + idx}
                                            >
                                                {item.type === 'video' ? (
                                                    <div
                                                        style={{ width: '100%', height: '100%' }}
                                                        onClick={() => window.open(item.url, '_blank')}
                                                    >
                                                        <img
                                                            src={item.thumbnailUrl}
                                                            alt=""
                                                            loading="lazy"
                                                        />
                                                        <div class="uprofile-media-video-badge">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <PhotoView src={item.url} width={800} height={600}>
                                                        <img
                                                            src={item.thumbnailUrl}
                                                            alt=""
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                const target = e.currentTarget;
                                                                target.src = '/img/no_img.gif';
                                                                target.onerror = null;
                                                            }}
                                                        />
                                                    </PhotoView>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </PhotoProvider>
                            </div>
                        )}

                        {/* 无发言记录 */}
                        {!profile?.stats && profile && (
                            <div class="uprofile-empty-hint">暂无发言记录</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
