import React, { Component } from "react";
import MoveList from '../../cmps/ContactMoveList/MoveList'
import SecondaryNav from '../../cmps/secondary-nav/SecondaryNav'
import BitcoinService from '../../../../services/BitcoinService';

import './ContactDetails.scss'


import { connect } from 'react-redux'
import { loadSelectedContact } from '../../Actions'
import { addMove } from '../../../users/actions'
import { setActiveUser } from '../../../users/actions'

class ContactDetails extends Component {
  state = {
    user: null,
    contact: null,
    contactMoves: [],
    amountToTransfer: '',
    currentRate: null
  };

  async componentDidMount() {
    await this.props.setActiveUser()
    this.setState({ user: this.props.user });

    const { id } = this.props.match.params;
    if (id) {
      await this.props.loadSelectedContact(id)
      this.setState({ contact: this.props.contact })
      this.setContactTransfers()
      this.getCurrentRate()
    }
  }
  setTransferAmount(ev) {
    const { value } = ev.target
    this.setState({ amountToTransfer: +value })
  }
  transfer = async () => {
    const { amountToTransfer, contact } = this.state
    if (amountToTransfer > 0) await this.props.addMove(contact, amountToTransfer)
    this.setState({ amountToTransfer: 0 })
    this.setContactTransfers()
  }
  setContactTransfers = () => {
    const { user, contact } = this.props
    let contactMoves = user.moves.filter(move => move.toId === contact._id)
    this.setState({ contactMoves })
  }
  async getCurrentRate() {
    const { coins } = this.props.user
    let rate = await BitcoinService.getRate(coins);
    this.setState({ currentRate: rate })
  }

  render() {
    const { amountToTransfer, contactMoves, currentRate } = this.state;
    const { contact } = this.state
    if (contact) {
      return (
        <section className="contact-details-page container2">
          <SecondaryNav id={contact._id} history={this.props.history} />
          <section className="contact-details-container flex column pad20">
            <div>
              <li className="contact-details flex column space-between">
                <img src={`https://robohash.org/${contact._id}.png?set=set3`} alt="" />
                <span>{contact.name}</span>
                <span>{contact.phone}</span>
                <span>{contact.email}</span>
              </li>
              <div className="transfer-section">
                <input type="text" placeholder="enter amount" onChange={ev => this.setTransferAmount(ev)} value={amountToTransfer} />
                <button onClick={() => this.transfer()} className="form-btn">Transfer</button>
              </div>
            </div>
            <MoveList moves={contactMoves} title="Transfers History" currentRate={currentRate} />
          </section>
        </section>
      );
    } else {
      return <h3>No Contact Found</h3>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    contact: state.contact.selectedContact,
    user: state.user.loggedInUser
  }
}

const mapDispatchToProps = {
  loadSelectedContact,
  addMove,
  setActiveUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetails)
