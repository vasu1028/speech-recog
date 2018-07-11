import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import AudioRecorder from './AudioRecorder';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AudioRecorder />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
