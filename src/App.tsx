import * as React from 'react';
import './App.css';
import Content from './content/content';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';

export class App extends React.Component<any,any> {

  public static url = 'http://127.0.0.1:5000/';
  public static apis = {
    upload: App.url + 'upload',
    login: App.url + 'login',
    register: App.url + 'register'
  }

  public render() {
    return (
      <div>        
        <Header />
        <Sidebar />
        <Content />
      </div>
    );
  }
}

export default App;
