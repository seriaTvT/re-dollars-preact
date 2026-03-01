/** 平滑滚动：easeOutExpo 缓动 */
const ease = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

interface Opts { duration?: number; easing?: (t: number) => number; cancelPreviousId?: number | null; }

/**
 * 对容器执行平滑滚动到指定位置
 * @returns requestAnimationFrame ID，可用于取消动画
 */
export function smoothScrollTo(
    container: HTMLElement,
    targetTop: number,
    options: Opts = {}
): number | null {
    const { duration: explicitDuration, easing = ease } = options;

    const startTop = container.scrollTop;
    const distance = Math.abs(targetTop - startTop);

    // 距离很短，直接跳转
    if (distance < 10) {
        container.scrollTop = targetTop;
        return null;
    }

    // 动态计算时长
    const duration = explicitDuration ?? Math.min(250 + Math.sqrt(distance) * 8, 650);
    const startTime = performance.now();
    const diff = targetTop - startTop;

    let animId: number;

    const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        container.scrollTop = startTop + diff * easing(progress);

        if (progress < 1) {
            animId = requestAnimationFrame(animate);
        }
    };

    animId = requestAnimationFrame(animate);
    return animId;
}

/**
 * 将元素平滑滚动到容器的可视中心
 * @returns requestAnimationFrame ID
 */
export function smoothScrollToCenter(
    container: HTMLElement,
    el: HTMLElement,
    options: Opts = {}
): number | null {
    const ch = container.clientHeight;
    const targetTop = Math.max(0, el.offsetTop - ch / 2 + el.offsetHeight / 2);
    return smoothScrollTo(container, targetTop, { easing: t => 1 - Math.pow(1 - t, 3), duration: 600, ...options });
}
