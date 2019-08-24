import React from 'react';
import {CurrencyPairSelector} from '../ccy-pair-picker/CurrencyPairSelector';
import { Notional } from '../notional/Notional';
import { StatusBarNew } from '../statusbar/StatusBarNew';
import { PriceQuote } from '../price-quote/PriceQuote';

import './PriceTileComponents.css';
// import { from } from 'rxjs';

const Buy = 'Buy';
const Sell = 'Sell';
// const userid = 'maria'

export default function PriceTile() {
    let [symbol, setSymbol] = React.useState('');
    let [notional, setNotional] = React.useState('');
    let [bidRate, setBidRate] = React.useState('');
    let [termRate, setTermRate] = React.useState('');
    let [directionBidRate, setDirectionBidRate] = React.useState('');
    let [directionTermRate, setDirectionTermRate] = React.useState('');
  
    React.useEffect(() => {
      setSymbol('EURJPY');
      setNotional(25000);
      setBidRate(10.1750032);
      setTermRate(10.1750032);
      setDirectionBidRate('up');
      setDirectionTermRate('down');
    }, []);   

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
    }
  
    
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
                                   onUpdate={onSendQuote}/>
          </div>
            </div>
            <div className="statusBar">
                <StatusBarNew status={symbol}/>
                <span>&nbsp;</span> 
                <StatusBarNew status={notional}/>
                <span>&nbsp;</span> 
            </div>
        </div>
    )
  }
