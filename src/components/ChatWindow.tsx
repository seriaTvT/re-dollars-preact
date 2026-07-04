import { useRef, useEffect, useState } from 'preact/hooks';
import { isChatOpen } from '@/stores/chatState';
import { isMobileViewport, isMaximized, isSearchActive, isNarrowLayout, mobileChatViewActive } from '@/stores/ui';
import { ChatHeader } from './ChatHeader';
import { ChatBody } from './ChatBody';
import { ChatInput } from './ChatInput';
import { SearchPanel } from './SearchPanel';
import { UserProfilePanel } from './UserProfilePanel';
import { FloatingUI } from './FloatingUI';
import { Sidebar } from './Sidebar';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useChatWindowInteractions } from '@/hooks/useChatWindowInteractions';
import { useChatWindowLayout } from '@/hooks/useChatWindowLayout';
import { useBmoRenderer } from '@/hooks/useBmoRenderer';
import { activeConversationId } from '@/stores/conversations';
import { BangumiPmChat } from './BangumiPmChat';

interface ChatWindowProps {
    skipEntryAnimation?: boolean;
}

export function ChatWindow({ skipEntryAnimation = false }: ChatWindowProps) {
    const windowRef = useRef<HTMLDivElement>(null);
    useWebSocket();
    useChatWindowLayout(windowRef);
    useBmoRenderer(windowRef);
    const { handleDragStart, handleResizeStart } = useChatWindowInteractions(windowRef);

    // 入场动画控制
    const [animateIn, setAnimateIn] = useState(skipEntryAnimation);

    useEffect(() => {
        if (!skipEntryAnimation) {
            // 需要入场动画：下一帧添加 visible 类
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimateIn(true);
                });
            });
        }
    }, []);

    const className = `dollars-chat-window${animateIn && isChatOpen.value ? ' visible' : ''}${isMobileViewport.value ? ' mobile' : ''}${isMaximized.value ? ' maximized' : ''}${isSearchActive.value ? ' search-active' : ''}${isNarrowLayout.value ? ' is-narrow' : ''}${mobileChatViewActive.value ? ' mobile-chat-active' : ''}`;
    const isPmActive = activeConversationId.value.startsWith('pm:');

    return (
        <div
            id="dollars-chat-window"
            ref={windowRef}
            class={className}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
        >
            <div
                id="dollars-resize-handle"
                title="调整窗口大小"
                onMouseDown={handleResizeStart}
                onTouchStart={handleResizeStart}
            ></div>
            <ChatHeader />
            <div id="dollars-content-panes">
                <Sidebar />
                <div id="dollars-main-chat">
                    <UserProfilePanel />
                    {isPmActive ? (
                        <BangumiPmChat />
                    ) : (
                        <>
                            <SearchPanel />
                            <ChatBody />
                            <FloatingUI />
                            <ChatInput />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
