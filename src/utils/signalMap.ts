import type { Signal } from '@preact/signals';

/**
 * Clone-mutate-assign helper for Signal<Map>.
 * Replaces the repetitive pattern:
 *   const map = new Map(sig.value); map.set(k, v); sig.value = map;
 */
export function updateSignalMap<K, V>(sig: Signal<Map<K, V>>, fn: (map: Map<K, V>) => void): void {
    const next = new Map(sig.value);
    fn(next);
    sig.value = next;
}

/**
 * Same helper for Signal<Set>.
 */
export function updateSignalSet<V>(sig: Signal<Set<V>>, fn: (set: Set<V>) => void): void {
    const next = new Set(sig.value);
    fn(next);
    sig.value = next;
}
