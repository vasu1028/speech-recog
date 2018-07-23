import * as React from 'react';
import './header.css';

class Header extends React.Component<any, any> {
    public render() {
        return (
            <header className="main-header">
                <a href="#" className="logo">
                    <span className="logo-lg"><b>Voice</b> Analyzer</span>
                </a>
                <nav className="navbar navbar-static-top">
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown messages-menu">
                                <a href="#">
                                    <span className="label">Welcome!</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;