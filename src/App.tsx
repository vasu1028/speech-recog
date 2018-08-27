import * as React from 'react';

import './App.css';

import Content from './content/content';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import Login from './content/login/login';
import routes from "./Routes/Router";

import image from "./assets/img/sidebar-2.jpg";
import logo from "./assets/img/reactlogo.png";

interface IState {
    mobileOpen: boolean;
}

export class App extends React.Component<any, IState> {

  public static url = 'http://127.0.0.1:5000/';
  public static apis = {
    upload: App.url + 'upload',
    login: App.url + 'login',
    register: App.url + 'register'
  }
  public state: IState;

  constructor(props: any) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }

  public resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  
  public handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  public render() {
    return (
      <Login>
        
      </Login>

      // <div className="wrapper">
      //   <Sidebar
      //     routes={routes}
      //     logoText={"Voice Analyzer"}
      //     logo={logo}
      //     image={image}
      //     handleDrawerToggle={this.handleDrawerToggle}
      //     open={this.state.mobileOpen}
      //     color="blue"
      //    />
      //   <div className="mainPanel">
      //     <Header 
      //       routes={routes}
      //       handleDrawerToggle={this.handleDrawerToggle}
      //     />
      //     <Content 
      //       routes={routes}
      //     />
      //   </div>
      // </div>
    );
  }
}

export default App;
