import React, { PureComponent, Fragment } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import * as RequestStatus from '../Entities/RequestStatus'
import UsersActions from '../Redux/UsersRedux'
import * as RoutePaths from '../Entities/RoutePaths'

class Login extends PureComponent {

    state = {
        Authenticated: localStorage.getItem('loginData'),
        loginEmail: '',
        password: '',
        isValidEmail: true,
        validated: false,
        isInvalidCredentials: false
    }
    componentDidMount() {
        const { fetchUsers, navigateTo, match: { path, url }} = this.props
        if (path === RoutePaths.LOG_OUT.URI) {
            localStorage.clear()
            navigateTo(RoutePaths.LOGIN.URI)
            window.location.reload()
        }
        fetchUsers()
    }

    handleLoginData = (name, value) => {
        this.setState({
            [name]: value,
            isInvalidCredentials: false
        })
    }

    isValidEmailAddress = () => {
        return !!this.state.loginEmail.match(/.+@.+/);
    }

    handleSubmit = () => {
        const { loginEmail, password } = this.state
        if (this.state.loginEmail.match(/.+@.+/)  && password.trim() !== '') {
            const user = this.props.users.filter(user => user.email === loginEmail && user.username ===password )
            if(user.length > 0) {
                localStorage.setItem('loginData', JSON.stringify({email: loginEmail, password: password}))
                this.props.navigateTo(RoutePaths.HOME.URI)
                window.location.reload()
            } else {
                this.setState({
                    isInvalidCredentials: true
                })
            }
        } else {
            this.setState({
                isValidEmail: false
            })
        }
    };


    render() {
        const { disabledControls, users } = this.props
        const { loginEmail, password, isValidEmail, isInvalidCredentials } = this.state
        const [{ email, username }] = (users.length > 0 && users) || [{ email: '', username: '' }]
        return (
            <Fragment>
                {disabledControls ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                        <Fragment>
                            <Row className="mt-5">
                                <Col sm={4} md={4} xs={12} className="ct-login">
                                    <Card tyle={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Form noValidate validated onSubmit={this.submitLogin}>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="loginEmail"
                                                        value={loginEmail}
                                                        onChange={({ target: { name, value } }) => this.handleLoginData(name, value)}
                                                        onBlur={() => this.setState({
                                                            isValidEmail: this.isValidEmailAddress(this.state.email)
                                                        })}
                                                        required
                                                        placeholder="Enter email"
                                                    />
                                                    {!isValidEmail && (<Form.Control.Feedback type="invalid">
                                                        Please enter a valid email.
                                                    </Form.Control.Feedback>
                                                    )}
                                                </Form.Group>

                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Password (Username)</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="password"
                                                        value={password}
                                                        onChange={({ target: { name, value } }) => this.handleLoginData(name, value)}
                                                        placeholder="Password"
                                                        required
                                                    />
                                                    {password === '' && (
                                                    <Form.Control.Feedback type="invalid">
                                                        Please enter password.
                                                    </Form.Control.Feedback>
                                                    )}
                                                </Form.Group>
                                                <p>{isInvalidCredentials && (<small className="text-danger">Invalid credentials</small>)}</p>
                                                <Form.Text className="text-muted">
                                                    <b>Email</b>: {email} <br />
                                                    <b>Password</b>: {username}
                                                </Form.Text>
                                                <Button className="float-right" size="sm" variant="primary" onClick={this.handleSubmit}>
                                                    Submit
                                        </Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            </Row>
                        </Fragment>
                    )}
            </Fragment>
        )
    }
}

Login.propTypes = {
    history: propTypes.object,
    disabledControls: propTypes.bool,
    navigateTo: propTypes.func.isRequired,
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
    fetchUsers: () => dispatch(UsersActions.fetchUsers()),
    navigateTo: (path, params = {}) => dispatch(push(path, params))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))