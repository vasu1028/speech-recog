import * as React from 'react';
import AppRouter from '../Router';
import './sidebar.css';

class Sidebar extends React.Component<any, any> {
    public render() {
        return (
            <aside className="main-sidebar">
                <AppRouter />
            </aside>
        )
    }
}

export default Sidebar;