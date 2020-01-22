import React, { Component } from "react";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

import MoveList from '../../../contacts/cmps/ContactMoveList/MoveList'
import { connect } from 'react-redux'
import { setActiveUser } from '../../actions'

import BitcoinService from '../../../../services/BitcoinService';
import './HomePage.scss'

class HomePage extends Component {
  state = {
    user: null,
    marketValue: null,
    currentRate: null,
    pricesToShow: null,
    averagePrice: null
  };
  async componentDidMount() {
    await this.props.setActiveUser();

    if (this.props.user) {
      this.setState({ user: this.props.user });
      this.getMarketValue();
    }
    this.getAverageCoinPrice()
  }
  async getMarketValue() {
    const { coins } = this.props.user
    let rate = await BitcoinService.getRate(coins);
    this.setState({ currentRate: rate })
    let value = 1 / rate * coins
    let valueToDisplay = this.formatValue(value)
    this.setState({ marketValue: valueToDisplay })
  }

  formatValue = (value) => {
    return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value)
  }

  async getAverageCoinPrice() {
    let values = await BitcoinService.getAveragePrice()
    let valuesToShow = values.map(value => value.y)
    let averagePrice = this.formatValue(valuesToShow.reduce((acc, cur) => acc += cur) / (valuesToShow.length))

    this.setState({ pricesToShow: valuesToShow, averagePrice })
  }

  render() {
    const { marketValue, currentRate, pricesToShow, averagePrice } = this.state;
    const { user } = this.props;
    if (user) {
      let movesToShow = user.moves.slice(0, 5)

      return (
        <section className="home-page-container container2">
          <div className="home-container flex column justify-center pad20">
            <h1>Welcome {user.name},</h1>
            <h3>Current Balance: Coins: {user.coins} | USD: {marketValue}</h3>
          </div>
          <div className="graph-section flex column pad20">
            <span style={{ color: "#AD8350" }}>60 Day average prices (USD $) {averagePrice}</span>
            {pricesToShow && <Sparklines data={pricesToShow} width={100} height={30} style={{ background: "#AFA060", marginBottom: "20px", marginTop: "10px" }}>
              <h5>{averagePrice}</h5>
              <SparklinesLine style={{ stroke: "#764134", fill: "#0000009a", fillOpacity: ".6" }} />
              <SparklinesReferenceLine type="mean" style={{ stroke: 'black', strokeOpacity: 1, strokeDasharray: '4, 1' }} />
            </Sparklines>}
            {movesToShow && <MoveList moves={movesToShow} title="Your last 5 transfers:" currentRate={currentRate} showMoveBy={true}/>}
          </div>
        </section>
      )
    }
    else return (
      <section className="home-page-container container2 pad20">
        <h1 className="disconnected-message" style={{ color: "#AD8350" }}>Not Logged In. Please sign in or register.</h1>
        <h1 style={{ color: "#AD8350" }}>60 Day average prices (USD $) {averagePrice}</h1>
        {pricesToShow && <Sparklines data={pricesToShow} width={100} height={30} style={{ background: "#AFA060", marginBottom: "20px", marginTop: "10px" }}>
          <h5>{averagePrice}</h5>
          <SparklinesLine style={{ stroke: "#764134", fill: "#0000009a", fillOpacity: ".6" }} />
          <SparklinesReferenceLine type="mean" style={{ stroke: 'black', strokeOpacity: 1, strokeDasharray: '4, 1' }} />
        </Sparklines>}
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedInUser
  }
}

const mapDispatchToProps = {
  setActiveUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
