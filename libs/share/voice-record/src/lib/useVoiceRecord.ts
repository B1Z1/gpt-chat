import { useState } from 'react';

export const useVoiceRecord = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [getRecordedChunks, setGetRecordedChunks] = useState<Promise<Blob[]>>(Promise.resolve([]));
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    const startRecording = async () => {
        setIsRecording(true);

        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder: MediaRecorder = new MediaRecorder(stream);
        const audioChunks: Blob[] = [];
        const audioChunksPromise: Promise<Blob[]> = new Promise((resolve) => {
            recorder.addEventListener('dataavailable', (event) => {
                audioChunks.push(event.data);
            });

            recorder.addEventListener('stop', () => {
                resolve(audioChunks);
            });
        });

        recorder.start();
        setGetRecordedChunks(audioChunksPromise);
        setMediaRecorder(recorder);
    };

    const stopRecording = async (): Promise<string> => {
        if (!mediaRecorder) return '';

        mediaRecorder.stop();

        const recordedChunks: Blob[] = await getRecordedChunks;
        const audioBlob = new Blob(recordedChunks);

        setMediaRecorder(null);
        setIsRecording(false);
        setGetRecordedChunks(Promise.resolve([]));

        return URL.createObjectURL(audioBlob);
    };

    return { isRecording, startRecording, stopRecording };
}



