import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import indexRoutes from "./Routes/indexRoutes";
// import App from "./App";

// import AudioRecorder from './AudioRecorder';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop: any, key: any) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
