import React, { Fragment, PureComponent } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Col } from 'react-bootstrap'
import { push } from 'connected-react-router'

import Navbar from '../Components/Navbar'
import ProfileInfoAction from '../Redux/UsersRedux'
import * as RequestStatus from '../Entities/RequestStatus'

class App extends PureComponent {

    render() {
        return (
            <Container fluid >
                <div>
                    <Fragment>
                        <div className="ct-header">
                            <Navbar />
                        </div>
                    </Fragment>
                    {('test' === "test") && (
                        <Col as="main" className="main-container" sm={12} xs={12} md={12} xl={12}>
                            {this.props.children}
                        </Col>
                    )}
                </div>
            </Container>
        )
    }
}

App.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node
    ]).isRequired,
    users: propTypes.array.isRequired
}

const mapStateToProps = ({
    usersData: {
        users = [],
        fetchUsersRequestStatus,
        fetchUsersErrorMessage,
    }
}) => {
    const { INPROGRESS } = RequestStatus
    return {
        disabledControls: fetchUsersRequestStatus === INPROGRESS,
        users,
        fetchUsersErrorMessage
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProfile: () => dispatch(ProfileInfoAction.fetchProfile()),
    setFetchProfileRequestStatus: () => dispatch(ProfileInfoAction.setFetchProfileRequestStatus(RequestStatus.OK)),
    storeProfile: profile => dispatch(ProfileInfoAction.storeProfile(profile)),
    navigateTo: (path, params = {}) => dispatch(push(path, params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
