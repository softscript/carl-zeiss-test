import React, { Fragment, useState } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import * as RoutePaths from '../Entities/RoutePaths'
import { cloneData } from '../Utils/util'

import { SEARCH_PLACEHOLDER, SEARCH_TEXT_LENGTH } from '../Entities/UsersTypes'

const PostsList = ({ posts }) => {

    const postsData = cloneData(posts)
    const [searchText, setSearchText] = useState('')

    const handlePostsFilter = (text = '') => {
        setSearchText(text)
    }

    let postList = postsData
    if (searchText.trim().length >= SEARCH_TEXT_LENGTH) {
        const searchPattern = new RegExp(`^${searchText}`, 'i')
        postList = postsData.filter(post => post.title && searchPattern.test(post.title))
    }

    return (
        <Fragment>
            <Row className="mb-2">
                <Col md={4} sm={4}>
                    <Form.Control
                        size="sm"
                        type="text"
                        value={searchText}
                        onChange={({ target: { value } }) => handlePostsFilter(value)}
                        placeholder={SEARCH_PLACEHOLDER}
                    />
                </Col>
            </Row>
            <Row>
                {postList.map((post, index) => (
                    <Col key={index} sm={4} md={4}>
                        <Card className="mb-2">
                            <Card.Body>
                                <Card.Title className="blog-title">{post.title}</Card.Title>

                                <Card.Text className="blog-body">
                                    {post.body}
                                </Card.Text>
                                    <Link
                                        title={post.id}
                                        className="pl-0 text-decoration-none"
                                        to={location => ({
                                            ...location,
                                            pathname: RoutePaths.POSTS.URI + `/${post.id}`
                                        })}
                                    >
                                        <Button variant="link">View Details</Button>
                                    </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Fragment>
    )
}

PostsList.propTypes = {
    posts: propTypes.array.isRequired
}

export default PostsList