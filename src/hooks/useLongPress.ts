import { useRef } from 'preact/hooks';

interface LongPressOptions {
    threshold?: number;
    onLongPress: (e: MouseEvent | TouchEvent) => void;
    onClick?: (e: MouseEvent | TouchEvent) => void;
}

export function useLongPress({ threshold = 500, onLongPress, onClick }: LongPressOptions) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isLongPressRef = useRef(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);

    function start(e: MouseEvent | TouchEvent) {
        // Only accept left click or touch
        if (e instanceof MouseEvent && e.button !== 0) return;

        if (e instanceof TouchEvent) {
            startXRef.current = e.touches[0].clientX;
            startYRef.current = e.touches[0].clientY;
        } else {
            startXRef.current = e.clientX;
            startYRef.current = e.clientY;
        }

        isLongPressRef.current = false;
        timerRef.current = setTimeout(() => {
            isLongPressRef.current = true;
            onLongPress(e);
        }, threshold);
    }

    function clear() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }

    function move(e: MouseEvent | TouchEvent) {
        if (!timerRef.current) return;

        const moveThreshold = 10;
        let x = 0, y = 0;

        if (e instanceof TouchEvent) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }

        if (
            Math.abs(x - startXRef.current) > moveThreshold ||
            Math.abs(y - startYRef.current) > moveThreshold
        ) {
            clear();
        }
    }

    function end(e: MouseEvent | TouchEvent) {
        clear();
        
        // 如果是长按，阻止事件冒泡到父组件
        if (isLongPressRef.current) {
            e.stopPropagation();
            if (e.cancelable) e.preventDefault();
            return;
        }
        
        // 短按：触发 onClick 并标记已处理
        if (onClick) {
            e.stopPropagation();
            onClick(e);
        }
    }

    return {
        onMouseDown: (e: MouseEvent) => start(e),
        onMouseMove: (e: MouseEvent) => move(e),
        onMouseUp: (e: MouseEvent) => end(e),
        onMouseLeave: (_e: MouseEvent) => clear(),
        onTouchStart: (e: TouchEvent) => { e.stopPropagation(); start(e); },
        onTouchMove: (e: TouchEvent) => move(e),
        onTouchEnd: (e: TouchEvent) => end(e),
    };
}
