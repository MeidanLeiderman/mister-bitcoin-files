import React, { Component } from "react";
import { Link } from "react-router-dom";
import ContactService from "../../../../services/ContactService";
import ContactsList from '../../cmps/ContactList/ContactsList'
import ContactFilter from "../../cmps/ContactFilter/ContactFilter";

import './ContactPage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ContactPage extends Component {
  state = {
    contacts: [],
    selectedContactId: null,
    filter: ""
  };
  async componentDidMount() {
    const contacts = await ContactService.getContacts();
    if (contacts) this.setState({ contacts });
  }
  setSelectedContactId = (id = null) => {
    this.setState({ selectedContactId: id });
  };
  handleFilter = value => {
    this.setState({ filter: value });
  };
  render() {
    const { contacts, filter } = this.state;
    let contactsToShow;
    if (!filter) contactsToShow = contacts;
    else
      contactsToShow = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    return (
      <>
        <ContactFilter handleFilter={this.handleFilter} />
        <section className="contact-page-container container2">
          <Link to={`/contact/edit/`} className="add-btn"><FontAwesomeIcon icon="plus-circle" color="white" size="2x" onClick={this.deleteContact} />
          </Link>
          <ContactsList selectedContactId={this.setSelectedContactId} contacts={contactsToShow} />
        </section>
      </>
    );
  }
}

export default ContactPage;
