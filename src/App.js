import React from 'react';
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
                    side: 'Pay Offer'
                  }
  }
  
  onCCYUpdate (symbol) {this.setState({symbol: symbol }); }
  
  onNotionalUpdate (notional) { this.setState({ notional }) }

  onSendQuote(side) { this.setState({ side }) }

  render () {
    return (
      <div>
      <div className="price-tile">
        <CurrencyPickerComponent symbol={this.state.symbol} 
                                 onUpdate={this.onCCYUpdate.bind(this)}/>
        <NotionalInputComponent notional={this.state.notional} 
                                onUpdate={this.onNotionalUpdate.bind(this)}/>
        <div className="price-quotes">
          <PriceQuoteComponent side={'Join Bid'} 
                               direction={'up'}
                               onUpdate={this.onSendQuote.bind(this)}></PriceQuoteComponent>
          <PriceQuoteComponent side={'Pay Offer'} 
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
