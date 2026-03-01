import { PhotoSlider } from 'react-photo-view';
import { isImageViewerOpen, imageViewerImages, imageViewerIndex, hideImageViewer, imageViewerIndex as imageViewerIndexSignal } from '@/stores/ui';

export function ImageViewer() {
    return (
        <PhotoSlider
            images={imageViewerImages.value.map((item) => ({ src: item, key: item, width: 800, height: 600 }))}
            visible={isImageViewerOpen.value}
            onClose={hideImageViewer}
            index={imageViewerIndex.value}
            onIndexChange={(index) => {
                imageViewerIndexSignal.value = index;
            }}
            brokenElement={<img src="/img/no_img.gif" alt="加载失败" style={{ maxWidth: 200, maxHeight: 200 }} />}
        />
    );
}
