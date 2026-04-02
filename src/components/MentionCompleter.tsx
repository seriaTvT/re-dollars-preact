import { useRef, useCallback, useEffect, useState } from 'preact/hooks';
import type { RefObject } from 'preact';
import { escapeHTML } from '@/utils/format';
import { MENTION_DEBOUNCE, MAX_MENTION_RESULTS } from '@/utils/constants';
import type { RichInputController } from '@/utils/richInput';

interface MentionUser {
    id: number;
    username: string;
    nickname: string;
    avatar_url?: string;
}

interface MentionCompleterProps {
    editorRef: RefObject<HTMLDivElement>;
    inputControllerRef: { current: RichInputController | null };
}

export function MentionCompleter({ editorRef, inputControllerRef }: MentionCompleterProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [users, setUsers] = useState<MentionUser[]>([]);
    const [matchStart, setMatchStart] = useState(-1);
    const queryRef = useRef<string | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Check for @mention pattern in input
    const checkInput = useCallback(() => {
        const controller = inputControllerRef.current;
        if (!controller) return;

        const cursor = controller.getSelection().end;
        const text = controller.getValue().slice(0, cursor);

        // Match @ followed by any characters (supports Chinese/Japanese)
        const match = text.match(/(?:^|\s)(@[^\s]*)$/);

        if (!match) {
            hide();
            return;
        }

        const newMatchStart = cursor - match[1].length;
        setMatchStart(newMatchStart);

        const currentQuery = match[1].slice(1); // Remove @

        if (currentQuery === queryRef.current && visible) return;
        queryRef.current = currentQuery;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (!currentQuery) {
            hide();
            return;
        }

        // Debounce API call
        timerRef.current = setTimeout(() => fetchUsers(currentQuery), MENTION_DEBOUNCE);
    }, [inputControllerRef, visible]);

    // Fetch users from API
    const fetchUsers = async (query: string) => {
        try {
            const res = await fetch(
                `https://bgm.ry.mk/search/users?q=${encodeURIComponent(query)}&exact=true&limit=${MAX_MENTION_RESULTS}`
            );

            // Check if query changed while fetching
            if (query !== queryRef.current) return;

            const json = await res.json();
            const data = json.data || [];

            if (data.length > 0) {
                setUsers(data);
                setVisible(true);
            } else {
                hide();
            }
        } catch (e) {
            hide();
        }
    };

    // Hide completer
    const hide = useCallback(() => {
        setVisible(false);
        queryRef.current = null;
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);

    // Replace mention in textarea
    const selectUser = useCallback((user: MentionUser) => {
        const controller = inputControllerRef.current;
        if (!controller) return;

        controller.replaceRange(`@${user.username} `, matchStart, controller.getSelection().end, {
            focus: true
        });

        hide();
    }, [inputControllerRef, matchStart, hide]);

    // Listen for input events
    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const handleInput = () => checkInput();
        const handleBlur = (e: FocusEvent) => {
            // Don't hide if clicking on the mention list
            if (containerRef.current?.contains(e.relatedTarget as Node)) return;
            setTimeout(hide, 150);
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && visible) {
                e.preventDefault();
                hide();
            }
        };

        editor.addEventListener('input', handleInput);
        editor.addEventListener('blur', handleBlur);
        editor.addEventListener('keydown', handleKeyDown);

        return () => {
            editor.removeEventListener('input', handleInput);
            editor.removeEventListener('blur', handleBlur);
            editor.removeEventListener('keydown', handleKeyDown);
        };
    }, [editorRef, checkInput, hide, visible]);

    if (!visible || users.length === 0) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            id="dollars-mention-list"
            class="visible"
        >
            {users.map((user) => (
                <div
                    key={user.id || user.username}
                    class="mention-item"
                    onClick={() => selectUser(user)}
                >
                    <img
                        src={user.avatar_url || '//lain.bgm.tv/pic/user/m/000/00/00/0.jpg'}
                        alt=""
                    />
                    <div class="mention-item-info">
                        <span class="mention-item-nick">
                            {escapeHTML(user.nickname || user.username)}
                        </span>
                        <span class="mention-item-user">
                            @{escapeHTML(user.username)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
