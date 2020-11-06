import axios from 'axios'

import * as Endpoints from '../Entities/Endpoints'

export const API = url => axios.create({
    baseURL: url,
    headers: {
        'Accept-Language': 'en-US'
    }
})

export const fetchUsers = () =>
    API(Endpoints.API_ENDPOINT)
        .get(Endpoints.GET_USERS)
        .then(response => response)
        .catch(err => ({ err }))