import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'

import { reducer as UsersRedux } from './UsersRedux'
import { reducer as PostsRedux } from './PostsRedux'
import rootSaga from '../Sagas'


const reducers = history => combineReducers({
    router: connectRouter(history),
    usersData: UsersRedux,
    postsData: PostsRedux
})

const configureStore = (history, rootReducer, rootSaga) => {

    const sagaMiddleware = createSagaMiddleware()
    const historyMiddleware = routerMiddleware(history)
    const composeEnchancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
    const enchancer = composeEnchancers(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(historyMiddleware)
    )

    const store = createStore(rootReducer(history), enchancer)
    sagaMiddleware.run(rootSaga)
    
    return store
}

export default history => configureStore(history, reducers, rootSaga)
