import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logUserOut } from '../../../users/actions'

import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Header extends Component {
    state = {
        isMenuOpen: false
    }
    toggleMenu = () => {
        let menuState = this.state.isMenuOpen
        menuState = !menuState
        this.setState({ isMenuOpen: menuState })
    }

    async signout()  {
        await this.props.logUserOut()
        this.toggleMenu()
        this.props.history.push('/')
    }

    render() {
        let { isMenuOpen } = this.state
        return (
            <section className="header-container container2 pad20 flex align-center space-between">
                    <span>Mr. Bitcoin</span>
                    <span className="menu-btn" onClick={() => this.toggleMenu()}>☰</span>
                    <div className={`main-nav ${isMenuOpen ? "open-menu" : ""}`}>
                        <span className="exit-btn" onClick={() => this.toggleMenu()}>Close Menu</span>
                        <Link onClick={() => this.toggleMenu()} to="/"><FontAwesomeIcon icon="home" color="black" size="1x" />Home</Link>
                        <Link onClick={() => this.toggleMenu()} to="/contact"><FontAwesomeIcon icon="address-book" color="black" size="1x" />Contacts</Link>
                        <Link onClick={() => this.toggleMenu()} to="/register"><FontAwesomeIcon icon="user-plus" color="black" size="1x" />Register</Link>
                        <span onClick={() => this.signout()}><FontAwesomeIcon icon="sign-out-alt" color="black" size="1x" />Logout</span>
                    </div>
            </section>
        )
    }
}

const mapDispatchToProps = {
    logUserOut
}

export default withRouter(connect(
    null,
    mapDispatchToProps
)(Header));
