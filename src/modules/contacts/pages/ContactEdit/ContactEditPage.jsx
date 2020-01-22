import React, { Component } from "react";
import ContactService from "../../../../services/ContactService";

import { loadSelectedContact } from '../../Actions'
import { saveContact } from '../../Actions'
import { removeContact } from '../../Actions'
import { connect } from 'react-redux'

import "./ContactEdit.scss"

class ContactEdit extends Component {
  state = {
    contact: {}
  };
  async componentDidMount() {
    let contact;
    const { id } = this.props.match.params;
    if (id) {
      await this.props.loadSelectedContact(id)
      return this.setState({ contact: this.props.contact })
    }
    else contact = await ContactService.getEmptyContact()
    this.setState({ contact })
  }
  updateContactDetails(ev, field) {
    const { value } = ev.target;
    this.setState(prevState => {
      return {
        contact: {
          ...prevState.contact,
          [field]: value
        }
      };
    });
  }
  saveContact = async (ev) => {
    ev.preventDefault()
    await this.props.saveContact(this.state.contact)
    this.props.history.push('/contact')
  }
  removeContact = async (ev) => {
    ev.preventDefault()
    const id = this.state.contact._id
    if (id) {
      await this.props.removeContact(id)
    }
    this.props.history.push('/contact')
  }
  render() {
    const { contact } = this.state;
    if (contact) {
      return (
        <section className="contact-edit-page container2">
          <div className="secondary-nav">
            <div className="flex row space-between pad20">
              <span onClick={() => this.props.history.goBack()} className="flat-btn">Back</span>
              <span onClick={this.removeContact} className="flat-btn">Delete</span>
            </div>
          </div>

          <div className="contact-edit container">
            <img src={`https://robohash.org/${contact._id}.png?set=set3`} alt=""/>
            <form action="" onSubmit={this.saveContact}>
              <div className="field">
                <label> Name:</label>
                <input type="text" placeholder="Contact Name" value={`${contact.name}`} onChange={ev => this.updateContactDetails(ev, "name")} />
              </div>
              <div className="field">
                <label> Phone:</label>
                <input type="text" placeholder="Phone Number" value={`${contact.phone}`} onChange={ev => this.updateContactDetails(ev, "phone")} />
              </div>
              <div className="field">
                <label> Email:</label>
                <input type="text" placeholder="Email" value={`${contact.email}`} onChange={ev => this.updateContactDetails(ev, "email")} />
              </div>
              <button className="form-btn">Save</button>
            </form>
          </div>
        </section>
      );
    } else {
      return <h3>No Contact Found</h3>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    contact: state.contact.selectedContact
  }
}

const mapDispatchToProps = {
  loadSelectedContact,
  saveContact,
  removeContact
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactEdit)

