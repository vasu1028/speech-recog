import * as React from "react";
import { NavLink, HashRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import './mobileHeader.css';

class MobileHeader extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const headerRoutes = this.props.routes.filter((route: any) => {
            return route.type === 'header';
        });

        return (
            <HashRouter>
                <List className="list">
                    {headerRoutes.map((prop: any, key: any) => {
                        return (
                            <NavLink
                                to={prop.path}
                                className="header-item"
                                activeClassName="active"
                                key={key}
                                replace={false}
                                >
                                <ListItem button={true} className="header-item-link">
                                    <ListItemText
                                        primary={prop.sidebarName}
                                        className="header-item-text"
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
}

export default MobileHeader;
