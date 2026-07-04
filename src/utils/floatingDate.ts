import { formatDate } from '@/utils/format';

const FLOATING_DATE_TOP_OFFSET = 50;
const FLOATING_DATE_BOTTOM_THRESHOLD = 150;

export function isNearScrollBottom(container: HTMLElement, threshold = FLOATING_DATE_BOTTOM_THRESHOLD) {
    return container.scrollHeight - container.scrollTop - container.clientHeight <= threshold;
}

export function getFloatingDateLabel(
    container: HTMLElement,
    messages: Iterable<HTMLElement>,
    topOffset = FLOATING_DATE_TOP_OFFSET
) {
    const containerRect = container.getBoundingClientRect();
    const topThreshold = containerRect.top + topOffset;
    const bottomThreshold = containerRect.bottom;

    for (const message of messages) {
        const timestamp = Number(message.dataset.timestamp);
        if (!Number.isFinite(timestamp) || timestamp <= 0) continue;

        const rect = message.getBoundingClientRect();
        if (rect.bottom > topThreshold && rect.top < bottomThreshold) {
            return formatDate(timestamp, 'label');
        }
    }

    return '';
}
