import encodeWAV from './waveEncoder';

export default class WAVEInterface {
  public static audioContext = new AudioContext();
  public static bufferSize = 2048;

  public playbackNode: AudioBufferSourceNode;
  public recordingNodes: AudioNode[] = [];
  public recordingStream: MediaStream;
  public buffers: Float32Array[][]; // one buffer for each channel L,R
  public encodingCache?: any;

  get bufferLength() { return this.buffers[0].length * WAVEInterface.bufferSize; }
  get audioDuration() { return this.bufferLength / WAVEInterface.audioContext.sampleRate; }
  get audioData() {
    return this.encodingCache || encodeWAV(this.buffers, this.bufferLength, WAVEInterface.audioContext.sampleRate);
  }

  public startRecording() {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia({ audio: true }, (stream) => {
        const { audioContext } = WAVEInterface;
        const recGainNode = audioContext.createGain();
        const recSourceNode = audioContext.createMediaStreamSource(stream);
        const recProcessingNode = audioContext.createScriptProcessor(WAVEInterface.bufferSize, 2, 2);
        if (this.encodingCache) { this.encodingCache = null; }

        recProcessingNode.onaudioprocess = (event) => {
          if (this.encodingCache) { this.encodingCache = null; }
          // save left and right buffers
          for (let i = 0; i < 2; i++) {
            const channel = event.inputBuffer.getChannelData(i);
            this.buffers[i].push(new Float32Array(channel));
          }
        };

        recSourceNode.connect(recGainNode);
        recGainNode.connect(recProcessingNode);
        recProcessingNode.connect(audioContext.destination);

        this.recordingStream = stream;
        this.recordingNodes.push(recSourceNode, recGainNode, recProcessingNode);
        resolve(stream);
      }, (err) => {
        reject(err);
      });
    });
  }

  public stopRecording() {
    if (this.recordingStream) {
      this.recordingStream.getTracks()[0].stop();
      delete this.recordingStream;
    }
    for (const i in this.recordingNodes) {
      if(true) {
        this.recordingNodes[i].disconnect();
        delete this.recordingNodes[i];
      }
    }
  }

  public startPlayback(loop: boolean = false, onended: () => void) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.audioData);
      reader.onloadend = () => {
        WAVEInterface.audioContext.decodeAudioData(reader.result, (buffer) => {
          const source = WAVEInterface.audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(WAVEInterface.audioContext.destination);
          source.loop = loop;
          source.start(0);
          source.onended = onended;
          this.playbackNode = source;
          resolve(source);
        });
      };
    });
  }

  public stopPlayback() {
    this.playbackNode.stop();
  }

  public reset() {
    if (this.playbackNode) {
      this.playbackNode.stop();
      this.playbackNode.disconnect(0);
      delete this.playbackNode;
    }
    this.stopRecording();
    this.buffers = [[], []];
  }
}
