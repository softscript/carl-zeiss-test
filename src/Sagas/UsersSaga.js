import { all, put, call } from 'redux-saga/effects'

import * as UsersAPI from '../API/UsersAPI'
import * as RequestStatus from '../Entities/RequestStatus'
import ProfileInfoActions from '../Redux/UsersRedux'

export function * fetchUsers () {
    const response = yield call(UsersAPI.fetchUsers)

    if (response.err) {
        yield put(ProfileInfoActions.setFetchUsersRequestStatus(RequestStatus.ERROR))
    } else {
        yield all([
            put(ProfileInfoActions.storeUsers(response.data)),
            put(ProfileInfoActions.setFetchUsersRequestStatus(RequestStatus.OK))
        ])
    }
}