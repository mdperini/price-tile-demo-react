import React from "react";
import Loading from "../../sandbox/hooks/Loading";
import { HTTPGetConfig } from '../services/ccypair.config'

export const CurrencyPairSelector = params => {
  const [ccyPairs, setCCYPairs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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

  const handleChange = event => {
    // Here, we invoke the callback with the new value
    params.onChange(event.target.value);
  }

  return (
    <select className="ccypair-picker" 
            value={params.symbol}
            name="ccypairs" 
            onChange={handleChange}>
        {ccyPairs.map(({ symbol }) => (
          <option key={symbol} value={symbol}>{symbol}</option >
        ))}
    </select>
  );  
}

