import { all, put, call } from 'redux-saga/effects'

import * as PostsAPI from '../API/PostsAPI'
import * as RequestStatus from '../Entities/RequestStatus'
import PostsAction from '../Redux/PostsRedux'

export function * fetchPosts () {
    const response = yield call(PostsAPI.fetchPosts)

    if (response.err) {
        yield put(PostsAction.setFetchPostsRequestStatus(RequestStatus.ERROR))
    } else {
        yield all([
            put(PostsAction.storePosts(response.data)),
            put(PostsAction.setFetchPostsRequestStatus(RequestStatus.OK))
        ])
    }
}

export function * fetchPostDetails ({ postId }) {
    const response = yield call(PostsAPI.fetchPostDetails, {postId})
    if (response.err) {
        yield put(PostsAction.setFetchPostDetailsRequestStatus(RequestStatus.ERROR))
    } else {
        yield all([
            put(PostsAction.storePostDetails(response.data)),
            put(PostsAction.setFetchPostDetailsRequestStatus(RequestStatus.OK))
        ])
    }
}