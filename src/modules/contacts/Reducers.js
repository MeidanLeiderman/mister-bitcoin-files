const INITIAL_STATE = {
    selectedContact: null,
    contacts: [],
}

export default function contactReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_SELECTED_CONTACT':
            return {
                ...state,
                selectedContact: action.contact
            }
        case 'SET_CONTACTS':
            return {
                ...state,
                contacts: action.contacts
            }
        case 'SAVE_CONTACT':
            const idx = state.contacts.findIndex(contact => contact._id === action.contact._id)
            return {
                ...state,
                contacts: [
                    ...state.contacts.slice(0, idx),
                    action.contact,
                    ...state.contacts.slice(idx + 1)
                ]
            }
        case 'DELETE_CONTACT':
            const index = state.contacts.findIndex(contact=>contact._id===action._id)
            return {
                ...state,
                contacts:[
                    ...state.contacts.slice(0, index),
                    ...state.contacts.slice(index+1)
                ]
            }
            
        default:
            return state;
    }
}