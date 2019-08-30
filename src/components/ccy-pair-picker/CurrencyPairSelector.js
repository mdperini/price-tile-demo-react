import React from "react";

import Loading from "../../common/Loading";
import getCCYPairs from '../../services/ccypair.service';
import { formatCCYPairSymbol } from '../../services/formatter.util';

export const CurrencyPairSelector = params => {
  const [ccyPairs, setCCYPairs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    getCCYPairs( (ccyPairs) => {
      setCCYPairs(ccyPairs);
      setLoading(false);
    })
  }, []);

  if (loading === true) {
   return <Loading />;
  }

  const handleChange = event => {
    params.onChange(event.target.value);
  }

  return (
      <div>
       <div className="navbar-header">
          <div className="velocity-icon vi-chevron"></div> 
        </div>
        <select className="ccypair-picker"
            value={params.symbol}
            name="ccypairs"
            onChange={handleChange}>
            {ccyPairs.map(({ symbol }) => (
              <option key={symbol} value={symbol}>{formatCCYPairSymbol(symbol)}</option >
          ))}
        </select>
      </div>
  ); 
}

 