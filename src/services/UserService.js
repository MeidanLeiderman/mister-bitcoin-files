import { storageService } from '../services/StorageService.js'

function getUser() {
    let user = storageService.load('loggedUser')
    return user
}

function login(name) {
    let users = storageService.load('users')
    if (!users) users = [{ name: 'muki', coins: 100, moves: [] }]
    const user = users.find(user => user.name === name)
    if (user){
        storageService.store('loggedUser', user)
        return user
    }
}

function logout(){
    storageService.store('loggedUser', null)
}

function addNewUser(newUser) {
    let users = storageService.load('users')
    if (!users || users.length === 0) users = []
    users.unshift(newUser)
    storageService.store('users', users)
    storageService.store('loggedUser', newUser)
}

function addMove(contact, amount){
    let currentUser = storageService.load('loggedUser')
    let move = {toId: contact._id, to: contact.name, at: Date.now(), amount}
    currentUser.moves.unshift(move)
    currentUser.coins -= amount
    storageService.store('loggedUser', currentUser)
    return currentUser
}

export default {
    getUser,
    addNewUser,
    login,
    logout,
    addMove
}