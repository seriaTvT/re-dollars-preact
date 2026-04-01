import { typingUsers } from '@/stores/chat';
import { useRef, useEffect } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import { STRINGS } from '@/utils/strings';

export function TypingIndicator() {
    const users = Array.from(typingUsers.value.values());
    const lastText = useRef('');
    const isVisible = useSignal(false);

    useEffect(() => {
        if (users.length > 0) {
            let text = '';
            if (users.length === 1) {
                text = `${users[0]} ${STRINGS.typingSingle}`;
            } else if (users.length === 2) {
                text = `${users[0]}${STRINGS.typingAnd}${users[1]} ${STRINGS.typingSingle}`;
            } else {
                text = `${users[0]}${STRINGS.typingMultiple(users.length - 1)}`;
            }
            lastText.current = text;
            isVisible.value = true;
        } else {
            isVisible.value = false;
        }
    }, [users.length]);

    return (
        <div id="dollars-typing-indicator" class={isVisible.value ? 'visible' : ''}>
            {lastText.current || '\u00A0'}
        </div>
    );
}
