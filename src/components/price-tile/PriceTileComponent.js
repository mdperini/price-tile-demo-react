import React from 'react';
import { subscribeForLivePrices, unsubscribeForLivePrices } from '../../services/pricing.service';
// import NumberFormat from 'react-number-format';

import CurrencyPickerComponent from '../ccy-pair-picker/CurrencyPickerComponent';
import NotionalInputComponent from '../notional/NotionalInputComponent';
import PriceQuoteComponent from '../price-quote/PriceQuoteComponent';

// import { StatusBar } from '../statusbar/StatusBar';
import './PriceTileComponents.scss';
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

  onChangeNotional (notional) { this.setState({ notional }) }

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
      unsubscribeForLivePrices(this.state.symbol);
      this.priceSubscription.unsubscribe();
      this.priceSubscription = undefined;
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
      <div className="price-tile">
          <CurrencyPickerComponent symbol={this.state.symbol} 
                                   onChange={this.onCCYUpdate.bind(this)}/>
          <div className="close" onClick={this.click.bind(this)}>
            <i className="fa fa-bars"></i>
          </div>
          <div class="price-tile__liquidity">
            <span class="price-tile__liquidity-txt">131M</span>
            <span class="price-tile__liquidity-txt">131M</span>
          </div>
          <div className="price-quotes">
              <PriceQuoteComponent price={this.state.bidRate}
                                   subTitle={this.renderSide(Buy)}
                                   side={Buy} 
                                   direction={this.state.directionBidRate}
                                   onClick={this.onSendQuote.bind(this)}/>
              <PriceQuoteComponent price={this.state.termRate}
                                   subTitle={this.renderSide(Sell)}
                                   side={Sell} 
                                   direction={this.state.directionTermRate}
                                   onClick={this.onSendQuote.bind(this)}/>
          </div>
            <div class="price-tile__row1 price-tile__flex-sp">              
              <div>
                <span>SW</span>
                <span class="price-tile__spot">SPOT</span>
              </div>              
              <div>23 Nov 20</div>
            </div>
            <div class="price-tile__row2 price-tile__flex-sp">
              <div>BID</div>
              <div class="price-tile__base">EUR</div>
                <NotionalInputComponent notional={this.state.notional} 
                                    onChange={this.onChangeNotional.bind(this)}/>
              
              <div class="price-tile__ask">ASK</div>
          </div>        
          
          
     </div>
    )
  }

  click() {
    console.log(`click ${this.state.id}`)
    this.unsubscribePriceSubscription();
    this.props.onClick(this.state.id);
  }
}
