import React from "react";
import Loading from "../../sandbox/hooks/Loading";
import { HTTPGetConfig } from '../services/ccypair.config'

export default function CurrencyPairSelector() {
  let [symbol, setSymbol] = React.useState('');
  const [ccyPairs, setCCYPairs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setSymbol('EURJPY');
    setLoading(true);
    fetch(HTTPGetConfig.URL, HTTPGetConfig.GetConfig)
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
    <select className="ccypair-picker" 
            value={symbol}
            name="ccypairs" 
            onChange={(value) => setSymbol(value)}>
      {ccyPairs.map(({ symbol }) => (
        <option key={symbol} value={symbol}>{symbol}</option >
      ))}
    </select>
  );  
}

