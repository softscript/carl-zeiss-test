import React, { Fragment, useState } from 'react'
import propTypes from 'prop-types'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { SEARCH_PLACEHOLDER, SEARCH_TEXT_LENGTH } from '../Entities/UsersTypes'
import { cloneData } from '../Utils/util'

const UsersTable = ({ users }) => {

    const usersData = cloneData(users)
    const [searchText, setSearchText] = useState('')

    const handleUserFilter = (text = '') => {
        setSearchText(text)
    }

    let usersList = usersData
    if (searchText.trim().length >= SEARCH_TEXT_LENGTH) {
        const searchPattern = new RegExp(`^${searchText}`, 'i')
        usersList = usersData.filter(user => user.name && searchPattern.test(user.name))
    }

    return (
        <Fragment>
            <Row className="mb-2">
                <Col md={4} sm={4}>
                    <Form.Control
                        size="sm"
                        type="text"
                        value={searchText}
                        onChange={({target: { value }}) => handleUserFilter(value)}
                        placeholder={SEARCH_PLACEHOLDER}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((user, index) => (<tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{(user.company && user.company.name) || '-'}</td>
                            </tr>)
                            )}

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Fragment>
    )
}

UsersTable.propTypes = {
    users: propTypes.array.isRequired
}

export default UsersTable