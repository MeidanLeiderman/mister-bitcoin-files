import ContactService from '../../services/ContactService'

const setSelectedContact = (contact) => {
    return {type: 'SET_SELECTED_CONTACT', contact}
}

export const loadSelectedContact = (id) =>{
    return async (dispatch) => {
        const contact = await ContactService.getContactById(id)
        return dispatch(setSelectedContact(contact))
    }
}

const setContacts = (contacts) =>{
    return {type: 'SET_CONTACTS', contacts}
}

export const loadContacts = () => {

    return async (dispatch) => {
        const contacts = await ContactService.getContacts()
        return dispatch(setContacts(contacts))
    }
}

const updateContact = (contact) => {
    return {type: 'SAVE_CONTACT', contact}
}

export const saveContact = (contact) => {
    return async (dispatch) => {

       const editedContact = await ContactService.saveContact(contact)
       return dispatch(updateContact(editedContact))
    }
}

const deleteContact = (id) => {
    return {type: 'REMOVE_CONTACT', id}
}

export const removeContact = (id) => {
    return async (dispatch) => {
        await ContactService.deleteContact(id)
        return dispatch(deleteContact(id))
    }
}