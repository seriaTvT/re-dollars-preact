// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest';
import { activeConversationId, restoreActiveConversation, setActiveConversation } from './conversations';
import { toggleChat } from './chatState';

describe('active conversation persistence', () => {
    beforeEach(() => {
        localStorage.clear();
        activeConversationId.value = 'dollars';
    });

    it('persists real conversations and restores them', () => {
        setActiveConversation('pm:42');
        activeConversationId.value = 'dollars';

        restoreActiveConversation();

        expect(activeConversationId.value).toBe('pm:42');
    });

    it('does not let the compose screen replace the last real conversation', () => {
        setActiveConversation('pm:42');
        setActiveConversation('pm:new');
        activeConversationId.value = 'dollars';

        restoreActiveConversation();

        expect(activeConversationId.value).toBe('pm:42');
    });

    it('restores the last real conversation when reopening the chat window', () => {
        setActiveConversation('pm:42');
        activeConversationId.value = 'pm:new';

        toggleChat(true, true);

        expect(activeConversationId.value).toBe('pm:42');
    });
});
