import React from 'react';

import { CurrencyPairSelector } from '../ccy-pair-picker/CurrencyPairSelector';

import { Notional } from '../notional/Notional';

import { StatusBarNew } from '../statusbar/StatusBarNew';

import { PriceQuote } from '../price-quote/PriceQuote';

 

import { subscribeForLivePrices } from '../../services/pricing.service';

import { postTransaction } from '../../services/transaction.service';

 

import './PriceTileComponents.css';

 

const Buy = 'Buy';

const Sell = 'Sell';

 

export default function PriceTile(params) {

    let [needPrices, SetNeedPrices] = React.useState('true');

   

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

 

