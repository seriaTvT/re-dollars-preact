import { createElement } from 'preact';
import type { ComponentType } from 'preact';

function shallowDiffers(a: object, b: object): boolean {
    for (const i in a) if (i !== '__source' && !(i in b)) return true;
    for (const i in b) if (i !== '__source' && (a as Record<string, unknown>)[i] !== (b as Record<string, unknown>)[i]) return true;
    return false;
}

/**
 * 輕量 memo：僅在 props 未變時跳過重渲染，可選自定義比較函數。
 * 用於取代 preact/compat 的 memo 以減少 bundle 體積。
 */
export function memo<P extends object>(
    c: ComponentType<P>,
    comparer?: (prev: P, next: P) => boolean
): ComponentType<P> {
    function shouldUpdate(this: { props: P }, nextProps: P): boolean {
        const ref = (this.props as P & { ref?: unknown }).ref;
        const updateRef = ref === (nextProps as P & { ref?: unknown }).ref;
        if (!updateRef && ref) {
            const r = ref as { call?: (v: null) => void; current?: null };
            r.call ? r(null) : (r.current = null);
        }
        if (!comparer) return shallowDiffers(this.props as object, nextProps as object);
        return !comparer(this.props, nextProps) || !updateRef;
    }
    function Memoed(this: { shouldComponentUpdate?: (next: P) => boolean }, props: P) {
        this.shouldComponentUpdate = shouldUpdate as (next: P) => boolean;
        return createElement(c, props);
    }
    Memoed.displayName = `Memo(${c.displayName || (c as { name?: string }).name || 'Component'})`;
    (Memoed as { prototype?: { isReactComponent?: boolean }; _forwarded?: boolean; type?: ComponentType<P> }).prototype = { isReactComponent: true } as unknown as typeof Memoed.prototype;
    (Memoed as { _forwarded?: boolean })._forwarded = true;
    (Memoed as { type?: ComponentType<P> }).type = c;
    return Memoed as unknown as ComponentType<P>;
}
