import { useState } from 'preact/hooks';
import { ConversationList } from './ConversationList';
import { isBangumiLoggedIn, openPmCompose } from '@/stores/bangumiPm';

export function Sidebar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setSearchTerm(target.value);
    };

    return (
        <div id="dollars-sidebar">
            <div id="dollars-sidebar-search-container">
                <form
                    class="dollars-sidebar-search-row"
                    autoComplete="off"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="search"
                        id="dollars-sidebar-search-input"
                        placeholder="搜索对话..."
                        value={searchTerm}
                        onInput={handleSearchInput}
                    />
                    {isBangumiLoggedIn() && (
                        <button class="dollars-pm-compose-button" type="button" title="新建 Bangumi 短信" onClick={() => openPmCompose()}>
                            ＋
                        </button>
                    )}
                </form>
            </div>
            <ConversationList searchTerm={searchTerm} />
        </div>
    );
}
