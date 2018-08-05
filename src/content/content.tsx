import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './content.css';

class Content extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public switchRoutes() {
        return (
            <Switch>
            {
                this.props.routes.map((prop: any, key: any) => {
                    return <Route exact={true} path={prop.path} component={prop.component}  key={key} />;
                })
            }
            </Switch>
        );
    }

    public render() {
        return (
            <HashRouter>
                <div className="content">
                    <div className="container">{this.switchRoutes()}</div>
                </div>
            </HashRouter>
        )
    }
}

export default Content;