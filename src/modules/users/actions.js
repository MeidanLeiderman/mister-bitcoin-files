import UserService from '../../services/UserService'

const setLoggedInUser = (user) => {
    return { type: 'SET_USER', user }
}

export const setActiveUser = () => {
    return async (dispatch) => {
        const user = UserService.getUser()
        dispatch(setLoggedInUser(user))
    }
}

const updateUser = (user) => {
    return {type: 'UPDATE_USER', user}
}

export const addMove = (contact, amountToTransfer) => {
    return async (dispatch) => {
        const user = UserService.addMove(contact, amountToTransfer)
        dispatch(updateUser(user))
    }
}

const logout = () => {
    return {type: 'UNSET_USER'}
}

export const logUserOut = () => {
    return async (dispatch) => {
        UserService.logout()
        dispatch(logout())
    }
}

