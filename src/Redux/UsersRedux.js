import Immutable from 'seamless-immutable'
import { createReducer, createActions } from 'reduxsauce'

import * as RequestStatus from '../Entities/RequestStatus'

export const INITIAL_STATE = Immutable({
    users: [],
    fetchUsersRequestStatus: RequestStatus.INITIAL,
    fetchUsersErrorMessage: ''
})

const { Types, Creators } = createActions({
    fetchUsers: [],
    setFetchUsersRequestStatus: ['status'],
    storeUsers: ['users'],
    storeUsersErrorMessage: ['error']
})

export const UsersTypes = Types

export default Creators

/**
 * Listeners
 */

export const fetchUsers = state => state.merge({ fetchUsersRequestStatus: RequestStatus.INPROGRESS })

export const setFetchUsersRequestStatus = (state, { status }) => state.merge({ fetchUsersRequestStatus: status })
export const storeUsers = (state, { users }) => state.merge({ users })

export const storeUserInfoErrorMessage = (state, { error }) => state.merge({ userInfoErrorMessage: error })

/**
 * ACTIONS
 */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.FETCH_USERS]: fetchUsers,
    [Types.SET_FETCH_USERS_REQUEST_STATUS]: setFetchUsersRequestStatus,
    [Types.STORE_USERS]: storeUsers
})
