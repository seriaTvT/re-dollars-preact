import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

export type VoiceRecorderState = 'idle' | 'recording' | 'preview';

export interface VoiceDraft {
    file: File;
    url: string;
    duration: number;
}

const AUDIO_TYPES = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
    'audio/ogg',
];

function supportedAudioType() {
    if (typeof MediaRecorder === 'undefined') return '';
    return AUDIO_TYPES.find(type => MediaRecorder.isTypeSupported(type)) || '';
}

function audioExtension(mimeType: string) {
    if (mimeType.includes('mp4')) return 'm4a';
    if (mimeType.includes('ogg')) return 'ogg';
    return 'webm';
}

function voiceFileName(mimeType: string) {
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').replace('T', '-');
    return `voice-${stamp}.${audioExtension(mimeType)}`;
}

function stopStream(stream: MediaStream | null) {
    stream?.getTracks().forEach(track => track.stop());
}

export function formatVoiceDuration(seconds: number) {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(safeSeconds / 60);
    const secs = safeSeconds % 60;
    return `${minutes}:${String(secs).padStart(2, '0')}`;
}

export function useVoiceRecorder() {
    const [state, setState] = useState<VoiceRecorderState>('idle');
    const [voiceDraft, setVoiceDraft] = useState<VoiceDraft | null>(null);
    const [duration, setDuration] = useState(0);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef(0);
    const cancelledRef = useRef(false);
    const objectUrlRef = useRef<string | null>(null);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const clearDraft = useCallback(() => {
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }
        setVoiceDraft(null);
        setDuration(0);
        if (state !== 'recording') {
            setState('idle');
        }
    }, [state]);

    const finishRecording = useCallback(() => {
        clearTimer();
        stopStream(streamRef.current);
        streamRef.current = null;
        recorderRef.current = null;

        if (cancelledRef.current) {
            cancelledRef.current = false;
            chunksRef.current = [];
            setDuration(0);
            setState('idle');
            return;
        }

        const chunks = chunksRef.current;
        chunksRef.current = [];
        const mimeType = supportedAudioType() || chunks[0]?.type || 'audio/webm';
        const blob = new Blob(chunks, { type: mimeType });
        if (!blob.size) {
            alert('录音为空，请重试');
            setDuration(0);
            setState('idle');
            return;
        }

        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
        }

        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;
        setVoiceDraft({
            file: new File([blob], voiceFileName(mimeType), { type: mimeType }),
            url,
            duration: Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000)),
        });
        setState('preview');
    }, [clearTimer]);

    const startRecording = useCallback(async () => {
        if (state === 'recording') return;
        if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
            alert('当前浏览器不支持录音');
            return;
        }

        clearDraft();
        cancelledRef.current = false;
        chunksRef.current = [];

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mimeType = supportedAudioType();
            const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

            streamRef.current = stream;
            recorderRef.current = recorder;
            recorder.ondataavailable = event => {
                if (event.data.size > 0) chunksRef.current.push(event.data);
            };
            recorder.onstop = finishRecording;
            recorder.onerror = () => {
                cancelledRef.current = true;
                alert('录音失败，请重试');
                recorder.stop();
            };

            startTimeRef.current = Date.now();
            setDuration(0);
            setState('recording');
            recorder.start();
            timerRef.current = setInterval(() => {
                setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
            }, 250);
        } catch (error: any) {
            stopStream(streamRef.current);
            streamRef.current = null;
            if (error?.name === 'NotAllowedError' || error?.name === 'SecurityError') {
                alert('麦克风权限被拒绝');
            } else {
                alert('无法启动录音，请检查麦克风');
            }
            setState('idle');
        }
    }, [clearDraft, finishRecording, state]);

    const stopRecording = useCallback(() => {
        const recorder = recorderRef.current;
        if (recorder?.state === 'recording') {
            recorder.stop();
        }
    }, []);

    const cancelVoice = useCallback(() => {
        const recorder = recorderRef.current;
        if (recorder?.state === 'recording') {
            cancelledRef.current = true;
            recorder.stop();
            return;
        }
        clearDraft();
    }, [clearDraft]);

    useEffect(() => () => {
        cancelledRef.current = true;
        clearTimer();
        stopStream(streamRef.current);
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
        }
    }, [clearTimer]);

    return {
        voiceState: state,
        voiceDraft,
        recordingDuration: duration,
        isRecording: state === 'recording',
        startRecording,
        stopRecording,
        cancelVoice,
        clearVoiceDraft: clearDraft,
    };
}
