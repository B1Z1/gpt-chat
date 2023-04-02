import { useVoiceRecord } from '@gpt-chat/share/voice-record';
import { useState } from 'react';

export function App() {
    const { startRecording, stopRecording } = useVoiceRecord();
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const handleStartRecord = () => {
        startRecording();
    }

    const handleStopRecord = async () => {
        const url = await stopRecording();

        if (!url) {
            return;
        }

        setAudioUrl(url);
    }

    const handlePlay = () => {
        if (!audioUrl) {
            return;
        }

        const audio = new Audio(audioUrl);
        audio.play();
    }

    return (
        <div>
            Hello

            <button onClick={handleStartRecord}>
                Start Record
            </button>

            <button onClick={handleStopRecord}>
                Stop Record
            </button>

            <button onClick={handlePlay}>
                Play
            </button>
        </div>
    );
}

export default App;
