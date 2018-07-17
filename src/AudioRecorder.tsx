import axios from 'axios';
import * as React from 'react';
import downloadBlob from './downloadBlob';
import WAVEInterface from './waveInterface';

/* interface IAudioRecorderChangeEvent {
  duration: number,
  audioData?: Blob,
} */
interface IAudioRecorderProps {
  initialAudio?: Blob,
  downloadable?: boolean,
  loop?: boolean,
  filename?: any,
  className?: string,
  style?: object,

  onAbort?: () => void,
  onChange?: (data: any) => void,
  onEnded?: () => void,
  onPause?: () => void,
  onPlay?: () => void,
  onRecordStart?: () => void,

  playLabel?: string,
  playingLabel?: string,
  recordLabel?: string,
  recordingLabel?: string,
  removeLabel?: string,
  downloadLabel?: string,
};

interface IAudioRecorderState {
  isRecording: boolean,
  isPlaying: boolean,
  audioData?: Blob | null
};

export default class AudioRecorder extends React.Component<IAudioRecorderProps, IAudioRecorderState> {

  public static defaultProps = {
    loop: false,
    downloadable: true,
    className: '',
    style: {},
    filename: 'output.wav',
    playLabel: '🔊 Play',
    playingLabel: '❚❚ Playing',
    recordLabel: '● Record',
    recordingLabel: '● Recording',
    removeLabel: '✖ Remove',
    downloadLabel: '\ud83d\udcbe Save' // unicode floppy disk
  };

  public waveInterface = new WAVEInterface();

  public state: any = {
    audioData: this.props.initialAudio,
    isPlaying: false,
    isRecording: false,
  };

  public componentWillReceiveProps(nextProps: any) {
    // handle new initialAudio being passed in
    if (
      nextProps.initialAudio &&
      nextProps.initialAudio !== this.props.initialAudio &&
      this.state.audioData &&
      nextProps.initialAudio !== this.state.audioData
    ) {
      this.waveInterface.reset();
      this.setState({
        audioData: nextProps.initialAudio,
        isPlaying: false,
        isRecording: false,
      });
    }
  }

  public componentWillMount() { this.waveInterface.reset(); }
  public componentWillUnmount() { this.waveInterface.reset(); }

  public startRecording() {
    if (!this.state.isRecording) {
      this.waveInterface.startRecording()
        .then(() => {
          this.setState({ isRecording: true });
          if (this.props.onRecordStart) { this.props.onRecordStart(); }
        })
        .catch((err) => { throw err; });
    }
  }

  public stopRecording() {
    this.waveInterface.stopRecording();

    this.setState({
      isRecording: false,
      audioData: this.waveInterface.audioData
    });

    if (this.props.onChange) {
      this.props.onChange({
        duration: this.waveInterface.audioDuration,
        audioData: this.waveInterface.audioData
      });
    }
    const formData = new FormData();
    formData.append('name', 'recordedAudio');
    formData.append('file', this.waveInterface.audioData);

    axios.post('http://localhost/speech/save_audio.php', formData,
    ).then((res) => {
      console.log(res);
    })
  }

  public startPlayback() {
    if (!this.state.isPlaying) {
      this.waveInterface.startPlayback(this.props.loop, this.onAudioEnded).then(() => {
        this.setState({ isPlaying: true });
        if (this.props.onPlay) { this.props.onPlay(); }
      });
    }
  }

  public stopPlayback() {
    this.waveInterface.stopPlayback();
    this.setState({ isPlaying: false });
    if (this.props.onAbort) { this.props.onAbort(); }
  }

  public onAudioEnded = () => {
    this.setState({ isPlaying: false });
    if (this.props.onEnded) { this.props.onEnded(); }
  };

  public onRemoveClick = () => {
    this.waveInterface.reset();
    if (this.state.audioData && this.props.onChange) { this.props.onChange({ duration: 0, audioData: null }); }
    this.setState({
      isPlaying: false,
      isRecording: false,
      audioData: null,
    });
  };

  public onDownloadClick = () => downloadBlob(this.state.audioData, this.props.filename);

  public onButtonClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    if (this.state.audioData) {
      if (this.state.isPlaying) {
        this.stopPlayback();
        event.preventDefault();
      } else {
        this.startPlayback();
      }
    } else {
      if (this.state.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    }
  };

  public render() {
    return (
      <div className="AudioRecorder">
        <button
          className={
            [
              'AudioRecorder-button',
              this.state.audioData ? 'hasAudio' : '',
              this.state.isPlaying ? 'isPlaying' : '',
              this.state.isRecording ? 'isRecording' : '',
            ].join(' ')
          }
          onClick={this.onButtonClick}
        >
          {this.state.audioData && !this.state.isPlaying && this.props.playLabel}
          {this.state.audioData && this.state.isPlaying && this.props.playingLabel}
          {!this.state.audioData && !this.state.isRecording && this.props.recordLabel}
          {!this.state.audioData && this.state.isRecording && this.props.recordingLabel}
        </button>
        {this.state.audioData &&
          <button
            className="AudioRecorder-remove"
            onClick={this.onRemoveClick}
          >
            {this.props.removeLabel}
          </button>
        }
        {this.state.audioData && this.props.downloadable &&
          <button
            className="AudioRecorder-download"
            onClick={this.onDownloadClick}
          >
            {this.props.downloadLabel}
          </button>
        }
      </div>
    );
  }
}
