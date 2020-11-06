import React, { PureComponent, Fragment } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import PostsActions from '../Redux/PostsRedux'
import * as RequestStatus from '../Entities/RequestStatus'
import * as RoutePaths from '../Entities/RoutePaths'
import { isObjectWithKey } from '../Utils/util'

class PostDetails extends PureComponent {

    state = {
        isToggleEditProfile: false
    }

    componentDidMount() {
        const { fetchPostDetails, match: { params: { postId } }, navigateTo } = this.props
        if (postId) {
            fetchPostDetails(postId)
        } else {
            navigateTo(RoutePaths.POSTS.URI)
        }
    }


    render() {
        const { disabledControls, postDetails } = this.props
        return (
            <Fragment>
                {disabledControls ? (
                    <div className="d-flex align-self-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                        <Fragment>
                            <Row className="mx-auto">
                            <Col sm={12} md={12} xs={12}> 
                            <Link
                                        title="Post"
                                        className="pl-0 text-decoration-none"
                                        to={location => ({
                                            ...location,
                                            pathname: RoutePaths.POSTS.URI
                                        })}
                                    >
                                        <Button className="float-right" size="sm" variant="link"> Go Back</Button> 
                                    </Link>
                             
                            </Col>
                                {isObjectWithKey(postDetails) && (<Col sm={12} md={12} xs={12}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{postDetails.title}</Card.Subtitle>
                                            <Card.Text>{postDetails.body}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                )}
                            </Row>
                        </Fragment>
                    )}
            </Fragment>
        )
    }
}

PostDetails.propTypes = {
    history: propTypes.object,
    disabledControls: propTypes.bool,
    postDetails: propTypes.object.isRequired,
    navigateTo: propTypes.func.isRequired,
    fetchPostDetails: propTypes.func.isRequired
}

const mapStateToProps = ({
    postsData: {
        postDetails = {},
        fetchPostDetailsRequestStatus,
        fetchPostDetailsErrorMessage,
    }
}) => {
    const { INPROGRESS } = RequestStatus
    return {
        disabledControls: fetchPostDetailsRequestStatus === INPROGRESS,
        postDetails,
        fetchPostDetailsRequestStatus,
        fetchPostDetailsErrorMessage
    }
}
const mapDispatchToProps = dispatch => ({
    fetchPostDetails: postId => dispatch(PostsActions.fetchPostDetails(postId)),
    navigateTo: (path, params = {}) => dispatch(push(path, params))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))