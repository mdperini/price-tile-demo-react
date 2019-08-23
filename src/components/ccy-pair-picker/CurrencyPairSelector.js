

import React from "react";
import Loading from "../../sandbox/hooks/Loading";

const URL = 'http://localhost:3383/currencypairs';
const HTTPGetConfig =  {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'userid': 'maria'
  },
  redirect: 'follow',
  referrer: 'no-referrer'
}

export default function CurrencyPairSelector() {
  let [symbol, setSymbol] = React.useState('');
  const [ccyPairs, setCCYPairs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setSymbol('EURJPY');
    setLoading(true);
    fetch(URL, HTTPGetConfig)
    .then(response =>  {
      return response.json();
    })
    .then(result => {
      setCCYPairs(result);
      setLoading(false);
    });    
    
  }, []);

  if (loading === true) {
    return <Loading />;
  }

  return (
    <select value={symbol}>
      {ccyPairs.map(({ symbol }) => (
        <option key={symbol} value={symbol}>{symbol}</option >
      ))}
    </select>
  );
}
