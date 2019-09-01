import React from 'react';
import { CurrencyPairSelector } from './CurrencyPairSelector';
import { Notional } from './Notional';
import { StatusBar } from '../components/statusbar/StatusBar';
import { PriceQuote } from './PriceQuote';
import { subscribeForLivePrices,
         unsubscribeForLivePrices 
       } from '../services/pricing.service';
import { postTransaction } from '../services/transaction.service';

import '../components/price-tile/PriceTileComponents.css';

const Buy = 'Buy';
const Sell = 'Sell';

export default function PriceTile(params) {
    let [isActive, setIsActive] = React.useState(false);
    let [symbol, setSymbol] = React.useState('');
    let [side, setSide] = React.useState('');
    let [notional, setNotional] = React.useState(0);
    let [bidRate, setBidRate] = React.useState(0);
    let [termRate, setTermRate] = React.useState(0);
    let [bidRateFull, setBidRateFull] = React.useState(0);
    let [termRateFull, setTermRateFull] = React.useState(0);
    let [prevBidRate, setPrevBidRate] = React.useState(0);
    let [prevTermRate, setPrevTermRate] = React.useState(0);
    let [directionBidRate, setDirectionBidRate] = React.useState('');
    let [directionTermRate, setDirectionTermRate] = React.useState('');
    let [priceSubscription, setPriceSubscription] = React.useState(undefined);

    const unsubscribePriceSubscription = () => {
      if (priceSubscription) {
        unsubscribeForLivePrices(symbol);
        priceSubscription.unsubscribe();
        setPriceSubscription(undefined);
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
      if (!symbol) {
        return;
      }

      unsubscribePriceSubscription();
      priceSubscription = subscribeForLivePrices(symbol)
          .subscribe((x) => {
              console.log(`price ${JSON.stringify(x)}`);
              setPrevPrice();
              setBidRate(x.bidRate.toFixed(5));
              setBidRateFull(x.bidRate.toFixed(12));
              setTermRate(x.termRate.toFixed(5));
              setTermRateFull(x.termRate.toFixed(12));
              setDirectionBidRate(setDirection(prevBidRate, bidRate));
              setDirectionTermRate(setDirection(prevTermRate, termRate));
        });

        setIsActive(true);
        setPriceSubscription(priceSubscription);
    }
    
    if (!isActive)
      getLivePrices(params.symbol);

    const onSymbolChange = newValue => {
      setSymbol(newValue);
      setIsActive(false);
      params.onChange({ id:  params.id, symbol: newValue });
      getLivePrices(newValue);
    }

    const onNotionalChange = newValue => {
      setNotional(newValue);
    }

    const renderSide = side => {
      return `${side} ${symbol ?symbol.substr(0, 3) : ''}`;
    }

    const onClickCloseHandler = event => {
      unsubscribePriceSubscription();
      params.onClick(params.id);
    }

    const onSendQuote = newValue => {
      setSide(newValue);
      postTransaction(symbol, newValue === 'Sell'? 'SELL' : 'BUY', notional, (result) => {
        console.log(result);
      });
    } 

    React.useEffect(() => {
      setSymbol(params.symbol);
      setNotional(params.notional);
    }, [params.notional, params.symbol]);

    return (
      <div className="navbar-header">
        <div className="price-tile">       
          <CurrencyPairSelector
             symbol={params.symbol}
             onChange={onSymbolChange} >                       
          </CurrencyPairSelector>
          <div className="close" onClick={onClickCloseHandler}>
                  <i className="fa fa-close"></i>
          </div>
          <Notional notional={params.notional}
                     onChange={onNotionalChange} />
          <div className="price-quotes">
            <PriceQuote price={bidRate}
                        subTitle={renderSide(Buy)}
                        side={Buy}
                        direction={directionBidRate}
                        onClick={onSendQuote} />
            <PriceQuote price={termRate}
                        subTitle={renderSide(Sell)}
                        side={Sell}
                        direction={directionTermRate}
                        onClick={onSendQuote}/>
            </div>
        </div>
        <div className="statusBar">
            <StatusBar status={symbol}/>
            <span>&nbsp;</span>
            <StatusBar status={notional}/>
            <span>&nbsp;</span>
            <StatusBar status={side} />
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span className={directionBidRate}><StatusBar status={bidRateFull}/></span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span className={directionTermRate}><StatusBar status={termRateFull}/></span>       
          </div>
        </div>
    )
  }

