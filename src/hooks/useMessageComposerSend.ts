import { useState, useRef } from 'preact/hooks';
import { submitComposerMessage, type SubmitComposerMessageOptions } from '@/services/composer/sendMessage';

export function useMessageComposerSend() {
    const [isSending, setIsSending] = useState(false);
    const isSendingRef = useRef(false);

    async function send(options: SubmitComposerMessageOptions) {
        if ((!options.content.trim() && !options.voiceDraft) || isSendingRef.current) return;

        isSendingRef.current = true;
        setIsSending(true);

        try {
            await submitComposerMessage(options);
        } catch (error: any) {
            alert(error.message || '发送失败，请重试');
        } finally {
            isSendingRef.current = false;
            setIsSending(false);
        }
    }

    return {
        isSending,
        send,
    };
}
