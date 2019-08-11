import React from 'react';
import * as nes from '@hapi/nes/lib/client';
import { Subject } from 'rxjs';

import CurrencyPickerComponent from './components/ccy-pair-picker/CurrencyPickerComponent';
import NotionalInputComponent from './components/notional/NotionalInputComponent';
import PriceQuoteComponent from './components/price-quote/PriceQuoteComponent';

import C2 from './components/test/C2';
import './App.css';

export default class PriceTile extends React.Component {
  constructor (props) {
    super(props)
    this.state =  { symbol: 'USD/MXN',
                    notional: 100000 ,
                    side: 'Pay Offer',
                    bidRate: 0.87508,
                    termRate: 0.87508
                  }
  }

  priceSubscription;
  
  onCCYUpdate (symbol) {this.setState({symbol: symbol }); }  
  onNotionalUpdate (notional) { this.setState({ notional }) }
  onSendQuote(side) { this.setState({ side }) }

  async connect() {
    if (!this.client) {
      this.client = new nes.Client('ws://localhost:3333');
      await this.client.connect();
    }
    return this.client;
  }

  getLivePrices(symbol) {
    const subject = new Subject();
    console.log('getLivePrices', symbol);
   
    this.connect().then(() => {
      const handler = (update, flags) => {
       // console.log('getLivePrices', JSON.stringify(update));
        subject.next(update);
      };
     // console.log('/price/' + symbol);
      this.client.subscribe('/price/' + symbol, handler);
    });

    return subject;
  }

  componentDidMount() {
    const symbol = this.state.symbol.replace('/', '');  
 //   console.log('componentDidMount', symbol);
    // this.getLivePrices(symbol);
    this.priceSubscription = this.getLivePrices(symbol)
    .subscribe((x) => {
      this.setState({bidRate: x.bidRate.toFixed(5) });
      this.setState({termRate: x.termRate.toFixed(5) });
      console.log(`quote ${x.symbol} ${this.state.bidRate} ${this.state.termRate} `);
    });
  }

  componentWillUnmount() {
    if (this.priceSubscription) {
      this.priceSubscription.unsubscribe();
    }
  }

  render () {
    return (
      <div>
      <div className="price-tile">
        <CurrencyPickerComponent symbol={this.state.symbol} 
                                 onUpdate={this.onCCYUpdate.bind(this)}/>
        <NotionalInputComponent notional={this.state.notional} 
                                onUpdate={this.onNotionalUpdate.bind(this)}/>
        <div className="price-quotes">
          <PriceQuoteComponent price={this.state.bidRate}
                               side={'Join Bid'} 
                               direction={'up'}
                               onUpdate={this.onSendQuote.bind(this)}></PriceQuoteComponent>
          <PriceQuoteComponent price={this.state.termRate}
                               side={'Pay Offer'} 
                               direction={'down'}
                               onUpdate={this.onSendQuote.bind(this)}></PriceQuoteComponent>
        </div>
       </div>
       <div> 
        <C2 data={(this.state.symbol ? this.state.symbol : '')}/>
        <C2 data={(this.state.notional ? this.state.notional : '')}/>
        <C2 data={(this.state.side ? this.state.side : '')}/>
      </div>
      </div>
    )
  }
}
