import {createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import ContactReducer from './modules/contacts/Reducers'
import UserReducer from './modules/users/reducers'

const rootReducer = combineReducers({
    contact: ContactReducer,
    user: UserReducer
})

const store  = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default store