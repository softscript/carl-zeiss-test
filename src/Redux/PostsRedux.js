import Immutable from 'seamless-immutable'
import { createReducer, createActions } from 'reduxsauce'

import * as RequestStatus from '../Entities/RequestStatus'

export const INITIAL_STATE = Immutable({
    posts: [],
    fetchPostsRequestStatus: RequestStatus.INITIAL,
    fetchPostsErrorMessage: '',
    postId:'',
    postDetails: {},
    fetchPostDetailsRequestStatus: RequestStatus.INITIAL,
    fetchPostDetailsErrorMessage: ''
})

const { Types, Creators } = createActions({
    fetchPosts: [],
    setFetchPostsRequestStatus: ['status'],
    storePosts: ['posts'],
    storePostsErrorMessage: ['error'],

    setPostId: ['postId'],
    fetchPostDetails: ['postId'],
    setFetchPostDetailsRequestStatus: ['status'],
    storePostDetails: ['postDetails'],
    storePostDetailsErrorMessage: ['error']
})

export const PostsTypes = Types

export default Creators

/**
 * Listeners
 */

export const fetchPosts = state => state.merge({ fetchPostsRequestStatus: RequestStatus.INPROGRESS })
export const setFetchPostsRequestStatus = (state, { status }) => state.merge({ fetchPostsRequestStatus: status })
export const storePosts = (state, { posts }) => state.merge({ posts })
export const storePostsErrorMessage = (state, { error }) => state.merge({ fetchPostsErrorMessage: error })

export const setPostId = (state, { postId }) => state.merge({postId})
export const fetchPostDetails = state => state.merge({ fetchPostDetailsRequestStatus: RequestStatus.INPROGRESS })
export const setFetchPostDetailsRequestStatus = (state, { status }) => state.merge({ fetchPostDetailsRequestStatus: status })
export const storePostDetails = (state, { postDetails }) => state.merge({ postDetails })
export const storePostDetailsErrorMessage = (state, { error }) => state.merge({ fetchPostsErrorMessage: error })

/**
 * ACTIONS
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.FETCH_POSTS]: fetchPosts,
    [Types.SET_FETCH_POSTS_REQUEST_STATUS]: setFetchPostsRequestStatus,
    [Types.STORE_POSTS]: storePosts,
    [Types.SET_POST_ID]: setPostId,
    [Types.FETCH_POST_DETAILS]: fetchPostDetails,
    [Types.SET_FETCH_POST_DETAILS_REQUEST_STATUS]: setFetchPostDetailsRequestStatus,
    [Types.STORE_POST_DETAILS]: storePostDetails
})
