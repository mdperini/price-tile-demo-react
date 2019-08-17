import React from 'react';
import * as nes from '@hapi/nes/lib/client';
import { Subject } from 'rxjs';
import NumberFormat from 'react-number-format';

import CurrencyPickerComponent from '../ccy-pair-picker/CurrencyPickerComponent';
import NotionalInputComponent from '../notional/NotionalInputComponent';
import PriceQuoteComponent from '../price-quote/PriceQuoteComponent';

import StatusBar from '../statusbar/StatusBar';
import './PriceTileComponents.css';

const Buy = 'Buy';
const Sell = 'Sell';
const userid = 'maria'
export default class PriceTileComponent extends React.Component { 
  
  constructor (props) {
    super(props)
    this.state =  { symbol: this.props.symbol,
                    id: this.props.id,
                    notional: this.props.notional,
                    side: undefined,
                    bidRate: undefined,
                    termRate: undefined,
                    bidRateFull: undefined,
                    termRateFull: undefined,
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
    this.setState({bidRateFull: undefined} );
    this.setState({termRateFull: undefined} );
    this.setState({prevBidRate: undefined} );
    this.setState({prevTermRate: undefined} );
    this.setState({directionBidRate: undefined} );
    this.setState({directionTermRate: undefined} );
  }
  
  onCCYUpdate (symbol) {
    this.setState({symbol: symbol });
    this.resetPrices(); 
    this.getLivePrices(symbol);
    this.props.onUpdate({'id': this.state.id, symbol});
 }  

  onNotionalUpdate (notional) { this.setState({ notional }) }

  renderHttpPostConfig(data) {
    return {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'userid': userid
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data),
    }
  }

  async postData(url = '', data = {}) {
    // Default options are marked with *
      try {
      const response = await fetch(url, this.renderHttpPostConfig(data));
      //handle success
      console.log(response);
      this.props.onSendQuote('trade was executed');
    }
    catch (errorResponse) {
      //handle error
      console.log(errorResponse);
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
      this.setState({bidRateFull: x.bidRate.toFixed(12) });
      this.setState({termRate: x.termRate.toFixed(5) });
      this.setState({termRateFull: x.termRate.toFixed(12) });
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

  renderSymbol(symbol) {
    return symbol ? `${this.state.symbol.substr(0, 3)}/${this.state.symbol.substr(3, 6)}` : '';
  }

  renderSide(side) {
    return `${side} ${this.state.symbol ?this.state.symbol.substr(0, 3) : ''}`;
  }

  render () {
    return (
      <div className="navbar-header">
        <div className="price-tile">
          <CurrencyPickerComponent symbol={this.state.symbol} 
                                  onUpdate={this.onCCYUpdate.bind(this)}/>
          <div className="close"
               onClick={this.click.bind(this)}>
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
       <div className="statusBar">
        <StatusBar data={(this.renderSymbol(this.state.symbol))}/>
        <span>&nbsp;</span>
        
        <StatusBar data={(<NumberFormat value={this.state.notional} 
                                 displayType={'text'}
                                 readOnly 
                                 thousandSeparator={true} />)}/>
        <span>&nbsp;</span>
        <StatusBar data={(this.state.side ? this.state.side : '')}/>
        <span>&nbsp;</span>
        <span className={this.state.directionBidRate}><StatusBar data={(this.state.bidRateFull ? this.state.bidRateFull : '--')}/></span>
        <span>&nbsp;</span>
        <span className={this.state.directionTermRate}><StatusBar data={(this.state.termRateFull ? this.state.termRateFull : '--')}/></span>        
      </div>
      </div>
    )
  }

  click() {
    console.log(`click ${this.state.id}`)
    this.props.onClick(this.state.id);
  }
}
