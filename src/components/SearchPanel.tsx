import { useRef, useEffect } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import { isSearchActive, toggleSearch, searchGalleryMode } from '@/stores/ui';
import { searchQuery } from '@/stores/chatState';
import { getFirstMessageIdByDate, searchMessages } from '@/utils/api/messages';
import { formatDate, getAvatarUrl } from '@/utils/format';
import { iconCalendar, iconClose, iconPhoto, iconSearch } from '@/utils/icons';
import { navigateToMessage } from '@/utils/navigation';
import { GalleryPanel } from './GalleryPanel';
import type { Message } from '@/types';

export function SearchPanel() {
    const inputRef = useRef<HTMLInputElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);

    const results = useSignal<Message[]>([]);
    const loading = useSignal(false);
    const hasMore = useSignal(false);
    const hasSearched = useSignal(false);
    const offset = useRef(0);

    const reset = () => {
        results.value = [];
        hasMore.value = false;
        hasSearched.value = false;
        offset.current = 0;
    };

    const close = () => {
        toggleSearch(false);
        searchQuery.value = '';
        searchGalleryMode.value = false;
        reset();
    };

    const search = async (q: string, append = false) => {
        const query = q.trim();
        if (!query) {
            reset();
            return;
        }

        if (!append) {
            results.value = [];
            offset.current = 0;
            hasMore.value = true;
            hasSearched.value = true;
        }
        loading.value = true;
        try {
            const data = await searchMessages(query, offset.current);
            results.value = append ? [...results.value, ...data.messages] : data.messages;
            hasMore.value = data.hasMore;
            offset.current += data.messages.length;
        } finally {
            loading.value = false;
        }
    };

    const handleQueryInput = (value: string) => {
        searchQuery.value = value;
        reset();
    };

    const submitSearch = () => {
        void search(searchQuery.value);
    };

    // 面板打开时聚焦输入框
    useEffect(() => {
        if (isSearchActive.value) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isSearchActive.value]);

    const handleScroll = (e: Event) => {
        const el = e.target as HTMLDivElement;
        if (!loading.value && hasMore.value && el.scrollHeight - el.scrollTop - el.clientHeight < 50) {
            search(searchQuery.value, true);
        }
    };

    const handleResultClick = (msg: Message) => {
        close();
        navigateToMessage(msg.id);
    };

    const openDatePicker = () => {
        const input = dateInputRef.current;
        if (!input) return;
        if ('showPicker' in HTMLInputElement.prototype) {
            try { (input as any).showPicker(); } catch { input.click(); }
        } else {
            input.click();
        }
    };

    const handleDateChange = async (e: Event) => {
        const date = (e.target as HTMLInputElement).value;
        if (!date) return;

        const msgId = await getFirstMessageIdByDate(date);
        (e.target as HTMLInputElement).value = '';

        if (msgId) {
            close();
            navigateToMessage(msgId);
        } else {
            alert(`日期 ${date} 没有找到消息`);
        }
    };

    if (!isSearchActive.value) return null;

    return (
        <div id="dollars-search-ui">
            <div class="search-panel-row">
                <div class="search-bar" style={{ flex: 1, marginBottom: 0 }}>
                    <div
                        class="search-icon"
                        style={{ opacity: 0.5, cursor: 'pointer' }}
                        title="搜索"
                        role="button"
                        onClick={submitSearch}
                        dangerouslySetInnerHTML={{ __html: iconSearch }}
                    />
                    <input
                        ref={inputRef}
                        type="search"
                        placeholder="搜索消息..."
                        value={searchQuery.value}
                        onInput={(e) => handleQueryInput((e.target as HTMLInputElement).value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                submitSearch();
                            }
                        }}
                        autoFocus
                    />
                    <div
                        class="search-close-btn"
                        onClick={close}
                        dangerouslySetInnerHTML={{ __html: iconClose }}
                    />
                </div>

                <div
                    class="search-calendar-btn"
                    onClick={openDatePicker}
                    title="按日期跳转"
                    dangerouslySetInnerHTML={{ __html: iconCalendar }}
                />

                <div
                    class={`search-gallery-btn ${searchGalleryMode.value ? 'active' : ''}`}
                    onClick={() => { searchGalleryMode.value = !searchGalleryMode.value; }}
                    title="相册模式"
                    dangerouslySetInnerHTML={{ __html: iconPhoto }}
                />
            </div>

            <input
                type="date"
                ref={dateInputRef}
                onChange={handleDateChange}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
            />

            {searchGalleryMode.value ? (
                <GalleryPanel onClose={() => { searchGalleryMode.value = false; }} />
            ) : (
                <div id="dollars-search-results" onScroll={handleScroll}>
                    {results.value.map(msg => (
                        <div
                            key={msg.id}
                            class="search-result-item"
                            onClick={() => handleResultClick(msg)}
                        >
                            <img src={getAvatarUrl(msg.avatar, 's')} alt={msg.nickname} />
                            <div class="dollars-search-content">
                                <div class="dollars-search-header">
                                    <span class="dollars-search-nickname">{msg.nickname}</span>
                                    <span class="dollars-search-timestamp">
                                        {formatDate(msg.timestamp, 'full')}
                                    </span>
                                </div>
                                <div class="dollars-search-message">
                                    {msg.message.replace(/\[.*?\]/g, ' ')}
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading.value && (
                        <div class="search-status-msg">搜索中...</div>
                    )}

                    {!loading.value && hasSearched.value && results.value.length === 0 && (
                        <div class="search-status-msg">未找到相关消息</div>
                    )}
                </div>
            )}
        </div>
    );
}
