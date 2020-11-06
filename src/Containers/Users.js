import React, { PureComponent, Fragment } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import UsersActions from '../Redux/UsersRedux'
import * as RequestStatus from '../Entities/RequestStatus'
import UsersTable from '../Components/UsersTable'

class Users extends PureComponent {

    state = {
        isToggleEditProfile: false
    }

    componentDidMount() {
        this.props.fetchUsers()
    }
    render() {
        const { users, disabledControls} = this.props
        return (
            <Fragment>
                {disabledControls ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                        <UsersTable users={users} />
                    )}
            </Fragment>
        )
    }
}

Users.propTypes = {
    history: propTypes.object,
    disabledControls: propTypes.bool.isRequired,
    users: propTypes.array.isRequired,
    fetchUsers: propTypes.func.isRequired
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
    fetchUsers: () => dispatch(UsersActions.fetchUsers())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users))