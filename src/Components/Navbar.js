import React, { Fragment} from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import { withRouter } from 'react-router'
import * as RoutePaths from '../Entities/RoutePaths'
const AppNavbar = () => {
    return (
        <Fragment>
            <Nav fill defaultActiveKey={RoutePaths.HOME.URI} className="topNav">
                    <Nav.Item>
                        <NavLink to={RoutePaths.HOME.URI} title={RoutePaths.HOME.LABEL} className="nav-link" activeClassName="active">
                            <span className="nav-label">{RoutePaths.HOME.LABEL}</span>
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to={RoutePaths.USERS.URI} title={RoutePaths.USERS.LABEL} className="nav-link" activeClassName="active">
                            <span className="nav-label">{RoutePaths.USERS.LABEL}</span>
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to={RoutePaths.POSTS.URI} title={RoutePaths.POSTS.LABEL} className="nav-link" activeClassName="active">
                            <span className="nav-label">{RoutePaths.POSTS.LABEL}</span>
                        </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                        <NavLink to={RoutePaths.LOG_OUT.URI} title={RoutePaths.LOG_OUT.LABEL} className="nav-link" activeClassName="active">
                            <span className="nav-label">{RoutePaths.LOG_OUT.LABEL}</span>
                        </NavLink>
                    </Nav.Item>
                </Nav>
        </Fragment>
    )
}
export default withRouter(AppNavbar)