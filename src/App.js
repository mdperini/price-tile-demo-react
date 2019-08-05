import React from 'react';
import './App.css';


function App() {
  const ccyPairs = [
    {  
      "symbol": "EURUSD",  
      "bid": "EUR",  
      "term": "USD",  
      "totalFractionalDigits": 5,  
      "pipStartIdx": 4,  
      "pipLength": 2,  
      "basePrice": 1.1423  
    },
    {  
      "symbol": "EURGBP",  
      "bid": "EUR",  
      "term": "GBP",  
      "totalFractionalDigits": 5,  
      "pipStartIdx": 3,  
      "pipLength": 2,  
      "basePrice": 1.1423  
    },
    {  
      "symbol": "USDJPY",  
      "bid": "USD",  
      "term": "JPY",  
      "totalFractionalDigits": 5,  
      "pipStartIdx": 3,  
      "pipLength": 2,  
      "basePrice": 107.7556  
    },
    {  
      "symbol": "USDCAD",  
      "bid": "USD",  
      "term": "CAD",  
      "totalFractionalDigits": 5,  
      "pipStartIdx": 3,  
      "pipLength": 2,  
      "basePrice": 107.7556  
    },
    {  
      "symbol": "USDMXN",  
      "bid": "USD",  
      "term": "CAD",  
      "totalFractionalDigits": 5,  
      "pipStartIdx": 3,  
      "pipLength": 2,  
      "basePrice": 107.7556  
    },
    {  
      "symbol": "EURJPY",  
      "bid": "EUR",  
      "term": "JPY",  
      "totalFractionalDigits": 5,  
      "pipStartIdx": 3,  
      "pipLength": 2,  
      "basePrice": 107.7556  
    }  
  ]
 
  const options = ccyPairs.map(({  
    symbol,
    index  
  }) => {
    const desc = symbol ? symbol : 'symbol';
    return ( 
      <option key={desc}  value="desc">{desc}</option>
    );
  });
 
  return (
    <div className="price-tile">
    <div className="velocity-icon vi-chevron">
      <select className="ccypair-select" id="ccypair-select">{options}
      </select>
    </div>
    </div>
  );
}

function jumpTo(ccyPair) {
  alert(ccyPair);
  // this.setState({
  //   stepNumber: step,
  //   xIsNext: (step % 2) === 0
  // });
}

export default App;
