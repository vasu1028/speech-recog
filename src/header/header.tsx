import * as React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/icons/Menu";
import MobileHeader from '../mobile-header/mobileHeader';
import './header.css';

class Header extends React.Component<any, any> {
    public makeBrand() {
        const name = this.props.routes.filter((prop: any) => {
            return prop.navbarName !== 'Redirect' && window.location.hash.indexOf(prop.path) > -1;
        });
        if (name && name.length) {
            return name[0].navbarName;
        } else {
            return '';
        }
    }
    public render() {
        return (
            <AppBar className="appBar">
                <Toolbar className="container">
                    <div className="flex">
                        <h3>{this.makeBrand()}</h3>
                    </div>
                    <Hidden smDown={true} implementation="css">
                        <MobileHeader
                            routes={this.props.routes}
                            />
                    </Hidden>
                    <Hidden mdUp={true} implementation="css">
                        <IconButton
                            className="appResponsive"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerToggle}
                            >
                            <Menu />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;