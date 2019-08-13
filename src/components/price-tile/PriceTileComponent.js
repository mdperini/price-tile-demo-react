import React from 'react';
import * as nes from '@hapi/nes/lib/client';
import { Subject } from 'rxjs';

import CurrencyPickerComponent from '../ccy-pair-picker/CurrencyPickerComponent';
import NotionalInputComponent from '../notional/NotionalInputComponent';
import PriceQuoteComponent from '../price-quote/PriceQuoteComponent';

import C2 from '../test/C2';
import './PriceTileComponents.css';

const Buy = 'Buy';
const Sell = 'Sell';
export default class PriceTile extends React.Component {
  

  constructor (props) {
    super(props)
    this.state =  { symbol: 'USDMXN',
                    notional: 100000 ,
                    side: undefined,
                    bidRate: undefined,
                    termRate: undefined,
                    prevBidRate: undefined,
                    prevTermRate: undefined,
                    directionBidRate: undefined,
                    directionTermRate: undefined
                  }
  }

  priceSubscription;
 
  resetPrices() {
    this.setState({bidRate: undefined} );
    this.setState({termRate: undefined} );
    this.setState({prevBidRate: undefined} );
    this.setState({prevTermRate: undefined} );
    this.setState({directionBidRate: undefined} );
    this.setState({directionTermRate: undefined} );
  }
  
  onCCYUpdate (symbol) {
    this.setState({symbol: symbol });
    this.resetPrices(); 
    this.getLivePrices(symbol);
  }  

  onNotionalUpdate (notional) { this.setState({ notional }) }

  async postData(url = '', data = {}) {
    // Default options are marked with *
      try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'userid': 'maria'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
      });
      //handle success
      console.log(response);
    }
    catch (response_1) {
      //handle error
      console.log(response_1);
    }      
  }

  postTransaction(symbol, side, amount) {
    const payload = {
      symbol: symbol,
      priceType: 'SPOT',
      side: side,
      amount
    };

    this.postData('http://localhost:3333/transactions', payload);  
  }

  onSendQuote(side) { 
    this.setState({ side });
    this.postTransaction(this.state.symbol, side, this.state.notional);
  }

  async connect() {
    if (!this.client) {
      this.client = new nes.Client('ws://localhost:3333');
      await this.client.connect();
    }
    return this.client;
  }

  subscribeForLivePrices(symbol) {
    const subject = new Subject();
    console.log('getLivePrices', symbol);
   
    this.connect().then(() => {
      const handler = (update, flags) => {
        subject.next(update);
      };
      this.client.subscribe('/price/' + symbol, handler);
    });

    return subject;
  }

  getLivePrices(symbol) {
    this.unsubscribePriceSubscription();
    this.priceSubscription = this.subscribeForLivePrices(symbol)
    .subscribe((x) => {
      this.setPrevPrice();
      this.setState({bidRate: x.bidRate.toFixed(5) });
      this.setState({termRate: x.termRate.toFixed(5) });
      this.setState({directionBidRate: 
        this.setDirection(this.state.prevBidRate, this.state.bidRate) });
      this.setState({directionTermRate: 
        this.setDirection(this.state.prevTermRate, this.state.termRate) });
    });
  }

  setPrevPrice() {
    if (this.state.bidRate) {
      this.setState({prevBidRate: this.state.bidRate});
    }
 
    if (this.state.termRate) {
      this.setState({prevTermRate: this.state.termRate});
    }
  }

  setDirection(prev, curr) {
    return prev < curr ? 'up' : 'down';  
  }

  unsubscribePriceSubscription() {
    if (this.priceSubscription) {
      this.priceSubscription.unsubscribe();
    }
  }

  componentDidMount() {
   this.getLivePrices(this.state.symbol);
  }

  componentWillUnmount() {
    this.unsubscribePriceSubscription();
  }

  handleClick(symbol) {
    alert(symbol);
  }

  renderSide(side) {
    return `${side} ${this.state.symbol.substr(0, 3)}`;
  }

  render () {
    return (
      <div className="navbar-header">
        <div className="price-tile">
          <CurrencyPickerComponent symbol={this.state.symbol} 
                                  onUpdate={this.onCCYUpdate.bind(this)}/>
          <div className="close"
                onClick={() => this.handleClick(this.state.symbol)}>
            <i className="fa fa-close"></i></div>
          <NotionalInputComponent notional={this.state.notional} 
                                  onUpdate={this.onNotionalUpdate.bind(this)}/>
          <div className="price-quotes">
              <PriceQuoteComponent price={this.state.bidRate}
                                   subTitle={this.renderSide(Buy)}
                                   side={Buy} 
                                   direction={this.state.directionBidRate}
                                   onUpdate={this.onSendQuote.bind(this)}/>
              <PriceQuoteComponent price={this.state.termRate}
                                   subTitle={this.renderSide(Sell)}
                                   side={Sell} 
                                   direction={this.state.directionTermRate}
                                   onUpdate={this.onSendQuote.bind(this)}/>
          </div>
       </div>
       <div>
        <C2 data={(this.state.symbol ? this.state.symbol : '')}/>
        <span>&nbsp;</span>
        <C2 data={(this.state.notional ? this.state.notional : '')}/>
        <span>&nbsp;</span>
        <C2 data={(this.state.side ? this.state.side : '')}/>
        <span>&nbsp;</span>
        <C2 data={(this.state.bidRate ? this.state.bidRate : '')}/>
        <span>&nbsp;</span>
        <C2 data={(this.state.termRate ? this.state.termRate : '')}/>
      </div>
      </div>
    )
  }
}
