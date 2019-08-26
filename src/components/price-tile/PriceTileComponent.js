import React from 'react';
import { subscribeForLivePrices } from '../../services/pricing.service';
import NumberFormat from 'react-number-format';

import CurrencyPickerComponent from '../ccy-pair-picker/CurrencyPickerComponent';
import NotionalInputComponent from '../notional/NotionalInputComponent';
import PriceQuoteComponent from '../price-quote/PriceQuoteComponent';

import StatusBar from '../statusbar/StatusBar';
import './PriceTileComponents.css';
import { postTransaction } from '../../services/transaction.service';

const Buy = 'Buy';
const Sell = 'Sell';

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

  onSendQuote(side) { 
    this.setState({ side });
    postTransaction(this.state.symbol, side, this.state.notional, (result) => {
      console.log(result);
    });
  }

  getLivePrices(symbol) {
    this.unsubscribePriceSubscription();
    this.priceSubscription = subscribeForLivePrices(symbol)
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
          <div className="bars">
            <ul id="nav">
              <li>
                <i className="fa fa-bars"></i>           
                <ul>
                  <li className="close">  
                    <div onClick={this.click.bind(this)}>
                      <i className="fa fa-close"></i>
                    </div>
                  </li>
                </ul>
              </li>                      
            </ul>
          </div>
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
