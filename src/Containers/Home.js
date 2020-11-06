import React, { PureComponent, Fragment } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import PostsActions from '../Redux/PostsRedux'
import UsersActions from '../Redux/UsersRedux'
import * as RequestStatus from '../Entities/RequestStatus'
import * as RoutePaths from '../Entities/RoutePaths'

class Home extends PureComponent {

    componentDidMount() {
        this.props.fetchUsers()
    }

    componentDidUpdate(prevProps) {
        const { fetchUsersRequestStatus: prevFetchUsersRequestStatus } = prevProps
        const { fetchUsersRequestStatus, fetchPosts } = this.props

        if (prevFetchUsersRequestStatus !== fetchUsersRequestStatus && fetchUsersRequestStatus === RequestStatus.OK) {
            fetchPosts()
        }
    }

    handlePageChange = page => {
        if (page === RoutePaths.USERS.LABEL) {
            this.props.navigateTo(RoutePaths.USERS.URI)
        } else {
            this.props.navigateTo(RoutePaths.POSTS.URI)
        }
    }

    render() {
        const { users, posts, fetchUsersRequestStatus, fetchPostsRequestStatus } = this.props
        return (

            <Fragment>
                <Row className="justify-content-md-center">
                    <Col className="link-div" sm={3} md={3} xs={3} onClick={() => this.handlePageChange(RoutePaths.USERS.LABEL)}>
                        <div className="card card-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-5">
                                    <div>
                                        <span className="d-block font-15 text-dark font-weight-500">Users</span>
                                    </div>
                                </div>
                                {fetchUsersRequestStatus === RequestStatus.INPROGRESS ? (
                                    <div className="text-center">
                                        <Spinner animation="border" variant="primary" />
                                    </div>
                                ) : (
                                        <div className="text-center">
                                            <span className="d-block display-4 text-dark mb-5">{users.length}</span>
                                            <small className="d-block">{users.length} Total Users</small>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </Col>
                    <Col className="link-div" sm={3} md={3} xs={3} onClick={() => this.handlePageChange(RoutePaths.POSTS.LABEL)}>
                        <div className="card card-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-5">
                                    <div>
                                        <span className="d-block font-15 text-dark font-weight-500">Posts</span>
                                    </div>
                                </div>
                                {fetchPostsRequestStatus === RequestStatus.INPROGRESS ? (
                                    <div className="d-flex align-self-center text-center">
                                        <Spinner animation="border" variant="primary" />
                                    </div>
                                ) : (
                                        <div className="text-center">
                                            <span className="d-block display-4 text-dark mb-5">{posts.length}</span>
                                            <small className="d-block">{posts.length} Total Posts</small>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

Home.propTypes = {
    history: propTypes.object,
    disabledControls: propTypes.bool,
    fetchUsersRequestStatus: propTypes.string.isRequired,
    fetchPostsRequestStatus: propTypes.string.isRequired,
    
    users: propTypes.array.isRequired,
    posts: propTypes.array.isRequired,
    fetchUsers: propTypes.func.isRequired,
    fetchPosts: propTypes.func.isRequired,
    navigateTo: propTypes.func.isRequired
}

const mapStateToProps = ({
    usersData: {
        users = [],
        fetchUsersRequestStatus,
        fetchUsersErrorMessage,
    },
    postsData: {
        posts = [],
        fetchPostsRequestStatus,
        fetchPostsErrorMessage,
    }
}) => {
    const { INPROGRESS } = RequestStatus
    return {
        disabledControls: fetchUsersRequestStatus === INPROGRESS || fetchPostsRequestStatus === INPROGRESS,
        users,
        fetchUsersRequestStatus,
        fetchUsersErrorMessage,
        posts,
        fetchPostsErrorMessage,
        fetchPostsRequestStatus
    }
}
const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(UsersActions.fetchUsers()),
    fetchPosts: () => dispatch(PostsActions.fetchPosts()),
    navigateTo: (path, params = {}) => dispatch(push(path, params))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))