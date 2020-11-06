import axios from 'axios'

import * as Endpoints from '../Entities/Endpoints'

export const API = url => axios.create({
    baseURL: url,
    headers: {
        'Accept-Language': 'en-US'
    }
})

export const fetchPosts = () =>
    API(Endpoints.API_ENDPOINT)
        .get(Endpoints.GET_POSTS)
        .then(response => response)
        .catch(err => ({ err }))

export const fetchPostDetails = ({ postId }) =>
API(Endpoints.API_ENDPOINT)
    .get(Endpoints.GET_POST_DETAILS + postId)
    .then(response => response)
    .catch(err => ({ err }))