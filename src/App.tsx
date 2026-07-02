import { ChatWindow } from './components/ChatWindow';
import { settings } from '@/stores/user';
import { ContextMenu } from './components/ContextMenu';
import { DockButton } from './components/DockButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LightboxViewer } from './components/LightboxViewer';
import { NotificationManager } from './components/NotificationManager';
import { useAppStartup, useChatWindowMountState, useDeferredChatStartup } from '@/app/chatStartup';

export function App() {
    useAppStartup();
    useDeferredChatStartup();
    const { hasEverOpened, skipEntryAnimation } = useChatWindowMountState();

    return (
        <div id="dollars-chat-root" data-bg-mode={settings.value.backgroundMode}>
            <DockButton />
            <NotificationManager />
            {hasEverOpened && (
                <ErrorBoundary>
                    <ChatWindow skipEntryAnimation={skipEntryAnimation} />
                    <ContextMenu />
                    <LightboxViewer />
                </ErrorBoundary>
            )}
        </div>
    );
}
