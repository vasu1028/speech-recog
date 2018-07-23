import * as React from 'react';
import AudioRecorder from '../../AudioRecorder';

import './voiceAnalyzer.css';

class VoiceAnalyzer extends React.Component<any, any> {
    public render() {
        return (
            <AudioRecorder />
        )
    }
}

export default VoiceAnalyzer;