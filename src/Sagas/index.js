import { takeLatest, all } from 'redux-saga/effects'

import { UsersTypes } from '../Redux/UsersRedux'
import { PostsTypes } from '../Redux/PostsRedux'
import { fetchUsers } from './UsersSaga'
import { fetchPosts, fetchPostDetails } from './PostsSaga'

export default function * root () {
    yield all([
        takeLatest(UsersTypes.FETCH_USERS, fetchUsers),
        takeLatest(PostsTypes.FETCH_POSTS, fetchPosts),
        takeLatest(PostsTypes.FETCH_POST_DETAILS, fetchPostDetails)
    ])
}
