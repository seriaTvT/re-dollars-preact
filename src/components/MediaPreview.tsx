import { showImageViewer } from '@/stores/ui';
import type { MediaItem } from '@/hooks/useMediaUpload';

interface MediaPreviewProps {
    previewMedia: MediaItem[];
    onRemoveMedia: (index: number) => void;
}

export function MediaPreview({ previewMedia, onRemoveMedia }: MediaPreviewProps) {
    if (previewMedia.length === 0) return null;

    return (
        <div class="image-preview-container visible">
            {previewMedia.map((media, index) => (
                <div key={index} class={`image-preview-item ${media.type === 'video' ? 'video-preview-item' : ''}`}>
                    {media.type === 'image' ? (
                        <img
                            src={media.url}
                            class="preview-image"
                            onClick={() => {
                                const imageUrls = previewMedia
                                    .filter(m => m.type === 'image')
                                    .map(m => m.url);
                                const imageIndex = previewMedia
                                    .slice(0, index)
                                    .filter(m => m.type === 'image')
                                    .length;
                                showImageViewer(imageUrls, imageIndex);
                            }}
                            style={{ cursor: 'zoom-in' }}
                        />
                    ) : (
                        <>
                            <video
                                src={media.url}
                                class="preview-video"
                                muted
                                preload="metadata"
                            />
                            <div class="video-play-overlay">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </>
                    )}
                    <button
                        class="preview-remove-btn"
                        onClick={() => onRemoveMedia(index)}
                        title={media.type === 'image' ? '删除图片' : '删除视频'}
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}
