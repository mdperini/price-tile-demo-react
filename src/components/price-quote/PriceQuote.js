import React from "react";

export const PriceQuote = params => {

const getPriceSubString = (price, part) => {
        if (!price) {
          // display dashes until data is received
          return '--';
        }
    
        const strPrice = price.toString();
    
        if (part === 1) {
          return strPrice.substring(0, 4);
    
         } else if (part === 2) {
          return strPrice.substring(4, 4 + 2);
         }
    
        return strPrice.substring(4 + 2, strPrice.length);
      }  
    
  const handleClick = event => {
    // Here, we invoke the callback with the new value
    params.onClick(event.target.value);
  }

  return (
    <div className="price-quote" onClick={handleClick}>
      <div className="price-quote-inner">
        <div className="side">{params.subTitle}
        </div>
        <div className="pips">          
          <span className="price-tile-pips-sm">{getPriceSubString(params.price, 1)}</span>
          <span className="price-tile-pips-lg">
              <span className={params.direction}>{getPriceSubString(params.price, 2)}</span>
              </span>
          <span className="price-tile-pips-sm">{getPriceSubString(params.price, 3)}</span>
        </div>
      </div>           
    </div>           
  )

}
