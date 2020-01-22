const INITIAL_STATE = {
    loggedInUser: null
}

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: action.user
            }
        case 'UPDATE_USER':
            return {
                ...state,
                loggedInUser: action.user
            }
        case 'UNSET_USER':
            return {
                ...state,
                loggedInUser: null
            }
        default:
            return state;
    }
}