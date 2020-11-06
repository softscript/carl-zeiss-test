import React, { PureComponent, Fragment } from 'react'
import propTypes from 'prop-types'
import { Switch, Route, Router, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import App from './Containers/App'
import Login from './Containers/Login'
import Posts from './Containers/Posts'
import Home from './Containers/Home'
import Users from './Containers/Users'
import PostDetails from './Containers/PostDetails'
import * as RoutePaths from './Entities/RoutePaths'

class CarlTestRouter extends PureComponent {

    state = {
        loginClicked: false,
        Authenticated: localStorage.getItem('loginData')
    }

    getRouting = () => {
        const { history } = this.props

        return (
            <ConnectedRouter history={history}>
                <App>
                    <Switch>
                        <Route name={RoutePaths.LOGIN.LABEL} exact path={RoutePaths.LOGIN.URI}>
                            {this.state.Authenticated ? (
                                <Redirect to={RoutePaths.HOME.URI} />
                            ) : (
                                <Redirect to={RoutePaths.LOGIN.URI} />
                            )}
                        </Route>
                        <Route name={RoutePaths.HOME.LABEL} path={RoutePaths.HOME.URI} component={Home} />
                        <Route name={RoutePaths.USERS.LABEL} path={RoutePaths.USERS.URI} component={Users} />
                        <Route name={RoutePaths.POSTS.LABEL} exact path={RoutePaths.POSTS.URI} component={Posts} />
                        <Route name={RoutePaths.LOG_OUT.LABEL} path={RoutePaths.LOG_OUT.URI} component={Login} />
                        <Route
                            name={RoutePaths.POSTS.LABEL}
                            path={RoutePaths.POSTS.URI + '/:postId'}
                            component={PostDetails}
                        />
                    </Switch>
                </App>
            </ConnectedRouter>
        )
    }

    render() {

        return (
            <Fragment>
                {(this.state.Authenticated === null) ? (
                    <Router history={this.props.history}>
                        <Login history={this.props.history}/>
                    </Router>
                ) : (
                <Fragment>
                    {this.getRouting()}
                </Fragment>
                )}
            </Fragment>
        )
    }
}

CarlTestRouter.propTypes = {
    history: propTypes.object
}

const mapStateToProps = ({
    usersData: {
        users = []
    }
}) => ({
    users
})

export default connect(mapStateToProps)(CarlTestRouter)