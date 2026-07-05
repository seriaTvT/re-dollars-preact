import { typingUsers } from '@/stores/chatState';
import { useRef } from 'preact/hooks';

export function TypingIndicator() {
    const users = Array.from(typingUsers.value.values());
    const lastText = useRef('');

    if (users.length) {
        if (users.length === 1) {
            lastText.current = `${users[0]} 正在输入...`;
        } else if (users.length === 2) {
            lastText.current = `${users[0]} 和 ${users[1]} 正在输入...`;
        } else {
            lastText.current = `${users[0]} 和其他 ${users.length - 1} 人正在输入...`;
        }
    }

    return (
        <div id="dollars-typing-indicator" class={users.length ? 'visible' : ''}>
            {lastText.current || '\u00A0'}
        </div>
    );
}
