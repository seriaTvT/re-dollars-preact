import { useState, useCallback, useRef, useEffect } from 'preact/hooks';
import type { JSX, RefObject } from 'preact';
import { isSmileyPanelOpen, isSmileyPanelClosing, toggleSmileyPanel } from '@/stores/ui';
import { UPLOAD_BASE_URL } from '@/utils/constants';
import { favorites, initFavorites, addFavorite, removeFavorite } from '@/stores/favorites';
import { smileyRanges, getSmileyUrl, generateSmileyCodes, getGroupedSmileyCodes } from '@/utils/smilies';
import { escapeHTML } from '@/utils/format';
import { iconBmoPanel, iconStar, iconUpload } from '@/utils/icons';
import { loadSavedBmoItems, type BmoItem } from '@/utils/bmo';

interface SmileyPanelProps {
    onSelect: (code: string) => void;
    textareaRef: RefObject<HTMLTextAreaElement>;
}

export function SmileyPanel({ onSelect, textareaRef }: SmileyPanelProps) {
    const [activeTab, setActiveTab] = useState('TV');
    const [bmoItems, setBmoItems] = useState<BmoItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // 加载 BMO 表情 - 使用官方 API
    useEffect(() => {
        if (activeTab === 'BMO') {
            setBmoItems(loadSavedBmoItems());
        }
    }, [activeTab]);

    // 点击外部关闭
    useEffect(() => {
        if (!isSmileyPanelOpen.value) return;

        const handleClickOutside = (e: MouseEvent) => {
            const panel = panelRef.current;
            const trigger = document.getElementById('dollars-emoji-btn');

            if (panel && !panel.contains(e.target as Node) && (!trigger || !trigger.contains(e.target as Node))) {
                toggleSmileyPanel(false);
            }
        };

        const timer = setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 50);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isSmileyPanelOpen.value]);

    // 加载收藏表情
    useEffect(() => {
        if (activeTab === '收藏') {
            initFavorites();
        }
    }, [activeTab]);

    // 对面板进行 Bmoji 渲染
    useEffect(() => {
        const bmoji = (window as any).Bmoji;
        if (!bmoji || !isSmileyPanelOpen.value) return;

        // 使用 requestAnimationFrame 确保 DOM 已更新
        requestAnimationFrame(() => {
            // 渲染内容区域
            if (activeTab === 'BMO' && contentRef.current) {
                bmoji.renderAll(contentRef.current, { width: 21, height: 21 });
            }
            // 渲染 tabs 区域
            const tabsContainer = document.getElementById('dollars-smiles-tabs');
            if (tabsContainer) {
                bmoji.renderAll(tabsContainer, { width: 21, height: 21 });
            }
        });
    }, [isSmileyPanelOpen.value, activeTab, bmoItems]);

    const handleSelect = useCallback((code: string) => {
        onSelect(code);
        toggleSmileyPanel(false);
    }, [onSelect]);

    const handleTabClick = useCallback((groupName: string) => {
        setActiveTab(groupName);
    }, []);

    // 打开 BMO 快速拼装面板
    const handleOpenBmoPanel = useCallback((e: Event) => {
        e.preventDefault();
        const apiObject = (window as any).BgmBmoQuickPanel;
        if (apiObject && typeof apiObject.open === 'function') {
            const textarea = textareaRef.current;
            if (!textarea) return;
            textarea.focus();
            apiObject.open(textarea);
            toggleSmileyPanel(false);
        } else {
            if (confirm('你需要先启用 \'BMO 快速拼装面板\'。\n\n是否前往启用页面？')) {
                window.location.href = '/dev/app/4853';
            }
        }
    }, [textareaRef]);

    // 上传收藏表情
    const handleUploadFavorite = useCallback(async (e: Event) => {
        e.preventDefault();
        const tempInput = document.createElement('input');
        tempInput.type = 'file';
        tempInput.accept = 'image/*';
        tempInput.style.display = 'none';

        tempInput.onchange = async (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('image', file);

            setIsUploading(true);

            try {
                const res = await fetch(`${UPLOAD_BASE_URL}/api/upload`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                });
                const result = await res.json();

                if (!res.ok || !result.status) throw new Error(result.message || '上传失败');

                const imageUrl = result.url || result.imageUrl;
                addFavorite(imageUrl);
            } catch (err: any) {
                alert(err.message || '上传失败');
            } finally {
                setIsUploading(false);
            }
        };
        tempInput.click();
    }, []);

    // 移除收藏
    const handleRemoveFavorite = useCallback((e: Event, url: string) => {
        e.preventDefault();
        e.stopPropagation();
        removeFavorite(url);
    }, []);

    if (!isSmileyPanelOpen.value) {
        return null;
    }

    // 根据当前 tab 生成表情列表
    let smileys: string[] = [];
    let groupedSmileySections: ReturnType<typeof getGroupedSmileyCodes> = [];
    let specialContent: JSX.Element | null = null;

    if (activeTab === 'BMO') {
        specialContent = (
            <div style={{ display: 'contents' }}>
                {/* BMO 快速拼装面板按钮 */}
                <li class="smiley-item">
                    <a
                        href="#"
                        id="dollars-open-bmo-panel"
                        title="打开 BMO 快速拼装面板"
                        onClick={handleOpenBmoPanel}
                        style={{ backgroundImage: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        dangerouslySetInnerHTML={{ __html: iconBmoPanel }}
                    />
                </li>
                {/* BMO 表情列表 */}
                {bmoItems.length > 0 ? (
                    bmoItems.map((item) => (
                        <li key={item.code} class="smiley-item">
                            <a
                                href="#"
                                data-smiley={item.code}
                                title={item.name || item.code}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelect(item.code);
                                }}
                            >
                                <span class="bmo" data-code={item.code}></span>
                            </a>
                        </li>
                    ))
                ) : (
                    <p style={{ width: '100%', textAlign: 'center', color: 'var(--dollars-text-secondary)', fontSize: '12px', marginTop: '20px', padding: '0 10px' }}>
                        暂无保存的 BMO 表情
                        <br />
                        <a href="/dev/app/4853" target="_blank" rel="noopener" style={{ color: 'var(--primary-color)' }}>
                            前往 BMO 快速拼装面板
                        </a>
                    </p>
                )}
            </div>
        );
    } else if (activeTab === '收藏') {
        const favoritesList = favorites.value;
        specialContent = (
            <div style={{ display: 'contents' }}>
                {/* 上传按钮 */}
                <li class="smiley-item favorite-item" style={{ border: '2px dashed var(--dollars-border)', borderRadius: '8px', boxSizing: 'border-box' }}>
                    <a
                        href="#"
                        title="上传新表情"
                        onClick={handleUploadFavorite}
                        style={{ backgroundImage: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dollars-text-secondary)' }}
                    >
                        {isUploading ? (
                            <span style={{ fontSize: '12px' }}>...</span>
                        ) : (
                            <span dangerouslySetInnerHTML={{ __html: iconUpload }} />
                        )}
                    </a>
                </li>
                {/* 收藏列表 */}
                {favoritesList.length > 0 ? (
                    favoritesList.map((url) => (
                        <li key={url} class="smiley-item favorite-item">
                            <a
                                href="#"
                                data-smiley={`[sticker]${escapeHTML(url)}[/sticker]`}
                                title={`[sticker]${url}[/sticker]`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelect(`[sticker]${url}[/sticker]`);
                                }}
                                style={{ backgroundImage: `url('${url}')` }}
                            />
                            <button
                                class="remove-favorite-btn"
                                title="移除收藏"
                                onClick={(e) => handleRemoveFavorite(e, url)}
                            >
                                &times;
                            </button>
                        </li>
                    ))
                ) : (
                    <p style={{ width: '100%', textAlign: 'center', color: 'var(--dollars-icon-color-secondary)', fontSize: '12px', marginTop: '20px', padding: '0 10px' }}>
                        上传或右键图片收藏
                        <br />
                        (存储于Chii云端)
                    </p>
                )}
            </div>
        );
    } else if (smileyRanges.find(r => r.name === activeTab)?.isLarge) {
        groupedSmileySections = getGroupedSmileyCodes(activeTab);
    } else {
        smileys = generateSmileyCodes(activeTab);
    }

    const activeRange = smileyRanges.find(r => r.name === activeTab);
    const isLargeTab = activeRange?.isLarge ?? false;

    return (
        <div ref={panelRef} id="dollars-smiles-floating" class={`open ${isSmileyPanelClosing.value ? 'closing' : ''} ${isLargeTab ? 'large-smiley-mode' : ''}`}>
            <div id="dollars-smiles-tabs">
                {smileyRanges.map((range) => {
                    let textContent: any = range.name;
                    if (range.name === '收藏') {
                        textContent = <span dangerouslySetInnerHTML={{ __html: iconStar }} style={{ display: 'flex' }} />;
                    } else if (range.name === 'BMO') {
                        textContent = <span class="bmo" data-code="(bmoCgASACIBLgCg)" style={{ verticalAlign: 'middle' }}></span>;
                    } else if (range.path) {
                        const iconId = range.tabIconId ?? range.ids?.[0] ?? range.start;
                        if (!iconId) return null;
                        textContent = <img src={range.path(iconId)} alt={range.name} style={{ width: '21px', height: '21px', verticalAlign: 'middle' }} />;
                    }

                    return (
                        <button
                            key={range.name}
                            class={`smiley-tab-btn ${activeTab === range.name ? 'active' : ''}`}
                            data-group={range.name}
                            onClick={() => handleTabClick(range.name)}
                            title={range.name}
                        >
                            {textContent}
                        </button>
                    );
                })}
            </div>

            <div id="dollars-smiles-content" ref={contentRef} class={groupedSmileySections.length > 0 ? 'grouped-content' : ''}>
                {specialContent}
                {groupedSmileySections.map((section) => (
                    <section key={section.name} class="smiley-group-section">
                        <div class="smiley-group-title">{section.name}</div>
                        <div class="smiley-group-grid">
                            {section.items.map(({ code }) => {
                                const url = getSmileyUrl(code);
                                return (
                                    <li key={code} class="smiley-item">
                                        <a
                                            href="#"
                                            data-smiley={code}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleSelect(code);
                                            }}
                                            style={url ? { backgroundImage: `url('${url}')` } : undefined}
                                            title={code}
                                        >
                                        </a>
                                    </li>
                                );
                            })}
                        </div>
                    </section>
                ))}
                {smileys.map((code) => {
                    const url = getSmileyUrl(code);
                    return (
                        <li key={code} class="smiley-item">
                            <a
                                href="#"
                                data-smiley={code}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelect(code);
                                }}
                                style={url ? { backgroundImage: `url('${url}')` } : undefined}
                                title={code}
                            >
                            </a>
                        </li>
                    );
                })}
            </div>
        </div>
    );
}
