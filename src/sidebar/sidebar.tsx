import * as React from 'react';
import classNames from "classnames";
import { NavLink, HashRouter } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import MobileHeader from '../mobile-header/mobileHeader';
import './sidebar.css';

class Sidebar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public activeRoute(routeName: string) {
        return window.location.hash.indexOf(routeName) > -1 ? true : false;
    }

    public brand() {
        return (
            <div className="logo">
                <a href="/" className="logoLink">
                    <div className="logoImage">
                        <img src={this.props.logo} alt="logo" className="img" />
                    </div>
                    {this.props.logoText}
                </a>
            </div>
        );
    }

    public links() {
        const sideBarRoutes = this.props.routes.filter((route: any) => {
            return route.type === 'sideBar';
        });
        return (
            <HashRouter>
                <List className="list">
                    {sideBarRoutes.map((prop: any, key: any) => {
                        if (prop.redirect) {
                            return null;
                        }
                        const listItemClasses = classNames({
                            [" " + this.props.color]: this.activeRoute(prop.path)
                        });
                        const whiteFontClasses = classNames({
                            [" whiteFont"]: this.activeRoute(prop.path)
                        });
                        return (
                            <NavLink
                                to={prop.path}
                                className="item"
                                activeClassName="active"
                                key={key}
                                replace={false}
                                >
                                <ListItem button={true} className={"itemLink" + listItemClasses}>
                                    <ListItemIcon className={"itemIcon" + whiteFontClasses}>
                                        {typeof prop.icon === "string" ? (
                                            <Icon>{prop.icon}</Icon>
                                        ) : (
                                                <prop.icon />
                                            )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={prop.sidebarName}
                                        className={"itemText" + whiteFontClasses}
                                        disableTypography={true}
                                        />
                                </ListItem>
                            </NavLink>
                        );
                    })}
                </List>
            </HashRouter>
        );
    }

    public render() {
        return (
            <div>
                <Hidden mdUp={true} implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor="right"
                        open={this.props.open}
                        classes={{
                            paper: "drawerPaper"
                        }}
                        onClose={this.props.handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                        >
                        {this.brand()}
                        <div className="sidebarWrapper">
                            <MobileHeader
                            routes={this.props.routes}
                             />
                            {this.links()}
                        </div>
                        {this.props.image !== undefined ? (
                            <div
                                className="background"
                                style={{ backgroundImage: "url(" + this.props.image + ")" }}
                                />
                        ) : null}
                    </Drawer>
                </Hidden>
                <Hidden smDown={true} implementation="css">
                    <Drawer
                        anchor="left"
                        variant="permanent"
                        open={true}
                        classes={{
                            paper: "drawerPaper"
                        }}
                        >
                        {this.brand()}
                        <div className="sidebarWrapper">{this.links()}</div>
                        {this.props.image !== undefined ? (
                            <div
                                className="background"
                                style={{ backgroundImage: "url(" + this.props.image + ")" }}
                                />
                        ) : null}
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

export default Sidebar;