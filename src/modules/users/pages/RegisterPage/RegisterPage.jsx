import React, { Component } from "react";
import './RegisterPage.scss'

import UserService from "../../../../services/UserService";

class RegisterPage extends Component {
  state = {
    newUser: { name: '', coins: 100, moves: [] }
  };
  setUserName(ev) {
    const { value } = ev.target
    this.setState(prevState => {
      return {
        newUser: {
          ...prevState.newUser,
          name: value
        }
      }
    })
  }
  register = async () => {
    await UserService.addNewUser(this.state.newUser)
    this.props.history.push('/')
  }
  render() {
    const { newUser } = this.state
    return (
      <section className="register-page container2 pad20">
        <div className="register-form flex row">
          <input type="text" placeholder="Enter Username" value={newUser.name} onChange={ev => this.setUserName(ev)} />
          <button className="flat-btn" onClick={this.register}>Register</button>
        </div>
      </section >
    )

  }
}

export default RegisterPage;
