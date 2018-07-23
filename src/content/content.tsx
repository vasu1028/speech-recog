import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './content.css';
import Dashboard from './dashboard/dashboard';
import Profile from './profile/profile';
import VoiceAnalyzer from './voiceAnalyzer/voiceAnalyzer';
import Voices from './voices/voices';

class Content extends React.Component<any, any> {
    public render() {
        return (
            <HashRouter>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="row">
                            <div className="col-md-12">
                                <Switch>
                                    <Route exact={true} path='/' component={Dashboard} />
                                    <Route exact={true} path='/profile' component={Profile} />
                                    <Route exact={true} path='/voiceAnalyzer' component={VoiceAnalyzer} />
                                    <Route exact={true} path='/voices' component={Voices} />
                                </Switch>
                            </div>
                        </div>
                    </section>
                </div>
            </HashRouter>
        )
    }
}

export default Content;