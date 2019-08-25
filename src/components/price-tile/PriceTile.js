import React from 'react';
import {CurrencyPairSelector} from '../ccy-pair-picker/CurrencyPairSelector';
import { Notional } from '../notional/Notional';
import { StatusBarNew } from '../statusbar/StatusBarNew';
import { PriceQuote } from '../price-quote/PriceQuote';

import { subscribeForLivePrices } from '../../services/pricing.service';
import { postTransaction } from '../../services/transaction.service';
import notificationService from '../../services/notification.service';

// import NumberFormat from 'react-number-format';

import './PriceTileComponents.css';

const Buy = 'Buy';
const Sell = 'Sell';

export default function PriceTile() {
    let [symbol, setSymbol] = React.useState('');
    let [side, setSide] = React.useState('');
    let [notional, setNotional] = React.useState('');
    let [bidRate, setBidRate] = React.useState('');
    let [termRate, setTermRate] = React.useState('');
    let [bidRateFull, setBidRateFull] = React.useState('');
    let [termRateFull, setTermRateFull] = React.useState('');
    let [prevBidRate, setPrevBidRate] = React.useState('');
    let [prevTermRate, setPrevTermRate] = React.useState('');
    let [directionBidRate, setDirectionBidRate] = React.useState('');
    let [directionTermRate, setDirectionTermRate] = React.useState('');
  
    let priceSubscription;

    const unsubscribePriceSubscription = () => {
        if (priceSubscription) {
          priceSubscription.unsubscribe();
        }
    }

    const setPrevPrice = () => {
        if (bidRate) {
          setPrevBidRate(bidRate);
        }
     
        if (termRate) {
            setPrevTermRate(termRate);
        }
      }
    
    const setDirection = (prev, curr) => {
      return prev < curr ? 'up' : 'down';  
    }

    const getLivePrices = symbol => {
        unsubscribePriceSubscription();
        priceSubscription = subscribeForLivePrices(symbol)
            .subscribe((x) => {
                console.log(`price {JSON.stringify(x)}`);
                setPrevPrice();
                setBidRate(x.bidRate.toFixed(5));
                setBidRateFull(x.bidRate.toFixed(12));
                setTermRate(x.termRate.toFixed(5));
                setTermRateFull(x.termRate.toFixed(12));
                setDirectionBidRate(setDirection(prevBidRate, bidRate));
                setDirectionTermRate(setDirection(prevTermRate, termRate));
        });
      }

      const formatSym = symbol => {
        getLivePrices(symbol);
        return symbol;
      }

      const subcribeToNotifications = () => {
        notificationService.getMessage().subscribe(message => {
            console.log(JSON.stringify(message));  
        });
      }

     const onSymbolChange = newValue => {
        setSymbol(newValue);
      }

      const onNotionalChange = newValue => {
          setNotional(newValue);
      }
    
      const renderSide = side => {
          return `${side} ${symbol ?symbol.substr(0, 3) : ''}`;
      }

      const onSendQuote = newValue => {
          setSide(newValue);
          postTransaction(symbol, newValue === 'Sell'? 'SELL' : 'BUY', notional); 
      }  
  
      React.useEffect(() => {
          const $symbol = 'EURJPY';
          setSymbol($symbol);
          setNotional(25000);
          setBidRate(10.1750032);
          setTermRate(10.1750032);
          setDirectionBidRate('up');
          setDirectionTermRate('down');
          subcribeToNotifications();
      }, []);   

      return (
          <div className="navbar-header">
              <div className="price-tile">        
                  <CurrencyPairSelector 
                      symbol={symbol}
                      onChange={onSymbolChange} >                        
                  </CurrencyPairSelector>
                  <Notional notional={notional}
                      onChange={onNotionalChange} />
                        <div className="price-quotes">
                <PriceQuote price={bidRate}
                                    subTitle={renderSide(Buy)}
                                    side={Buy} 
                                    direction={directionBidRate}
                                    onClick={onSendQuote}/>
                <PriceQuote price={termRate}
                                    subTitle={renderSide(Sell)}
                                    side={Sell} 
                                    direction={directionTermRate}
                                    onClick={onSendQuote}/>
            </div>
              </div>
              <div className="statusBar">
                  <StatusBarNew status={formatSym(symbol)}/>
                  <span>&nbsp;</span> 
                  <StatusBarNew status={notional}/>
                  <span>&nbsp;</span> 
                  <StatusBarNew status={side} />
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <span className={directionBidRate}><StatusBarNew status={bidRateFull}/></span>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <span className={directionTermRate}><StatusBarNew status={termRateFull}/></span>        
              </div>
          </div>
      )
  }
