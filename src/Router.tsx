import * as React from 'react';
import { HashRouter, Link } from 'react-router-dom';

class AppRouter extends React.Component<any, any> {
    public render() {
        return (
            <HashRouter>
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li><Link to={'/'} replace={true}><i className="fa fa-dashboard" /> <span>Dashboard</span></Link></li>
                        <li><Link to={'/profile'} replace={true}><i className="fa fa-user" /> <span>Profile</span></Link></li>
                        <li><Link to={'/voiceAnalyzer'} replace={true}><i className="fa fa-volume-up" /> <span>Voice Analyzer</span></Link></li>
                        <li><Link to={'/voices'} replace={true}><i className="fa fa-file-archive-o" /> <span>Voices</span></Link></li>
                    </ul>
                </section>
            </HashRouter>
        );
    }
}

export default AppRouter;
