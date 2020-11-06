import React, { PureComponent, Fragment } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import Spinner from 'react-bootstrap/Spinner'

import PostsActions from '../Redux/PostsRedux'
import * as RequestStatus from '../Entities/RequestStatus'
import PostsList from '../Components/PostsList'
import * as RoutePaths from '../Entities/RoutePaths'

class Posts extends PureComponent {

    state = {
        isToggleEditProfile: false
    }

    componentDidMount() {
        this.props.fetchPosts()
    }

    handlePostViewDetail = postId => {
        const {navigateTo, setPostId} = this.props
        setPostId(setPostId)
        navigateTo(RoutePaths.POSTS.URI + '/' + postId)
    }

    render() {
        const { disabledControls, posts } = this.props
        return (
            <Fragment>
                {disabledControls ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                        <PostsList posts={posts} onPostClick={this.handlePostViewDetail} />
                    )}
            </Fragment>
        )
    }
}

Posts.propTypes = {
    history: propTypes.object,
    disabledControls: propTypes.bool,
    posts: propTypes.array.isRequired,
    fetchPosts: propTypes.func.isRequired,
    navigateTo: propTypes.func.isRequired
}

const mapStateToProps = ({
    postsData: {
        posts = [],
        fetchPostsRequestStatus,
        fetchPostsErrorMessage,
    }
}) => {
    const { INPROGRESS } = RequestStatus
    return {
        disabledControls: fetchPostsRequestStatus === INPROGRESS,
        posts,
        fetchPostsErrorMessage,
        fetchPostsRequestStatus
    }
}
const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(PostsActions.fetchPosts()),
    fetchPostDetails: postId => dispatch(PostsActions.fetchPostDetails(postId)),
    setPostId: postId => dispatch(PostsActions.setPostId(postId)),
    navigateTo: (path, params = {}) => dispatch(push(path, params))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))