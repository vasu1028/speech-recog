import * as React from 'react';
import './App.css';

export class App extends React.Component {

  public static url = 'http://127.0.0.1:5000/';
  public static uploadUrl = App.url + 'upload';
  
  public render() {
    return (
      <span>App Data</span>
    );
  }
}

export default App;
