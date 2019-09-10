import React, {useState, useEffect} from "react";
import { renderPips } from '../services/pricing.service';

export const PriceQuote = params => {
  let [priceFull, setPriceFull] = useState(0);
  let [prevPrice, setPrevPrice] = useState(0);
   
  const handleClick = event => {
    params.onClick(params.side);
  }
 
  const renderDirection= (prev, curr) => {
    if (!curr) {
      return '';
    }

    const direction = prev <= curr ? 'up' : 'down';
    console.log(`prev ${prev} curr ${curr} ${direction}`);
    return direction;
  }


  useEffect(() => {
    setPrevPrice(priceFull);
    setPriceFull(params.priceFull);
   
  }, [params.price, params.priceFull, priceFull]);

  return (
    <div className="price-quote" onClick={handleClick}>
      <div className="price-quote-inner">
        <div className="side">{params.subTitle}
        </div>
        <div className="pips">
          <span className="pips-sm">{renderPips(params.price, 1)}</span>
          <span className="pips-lg">
          <span className={renderDirection(prevPrice, priceFull)}>{renderPips(params.price, 2)}</span>
          </span>
          <span className="pips-sm">{renderPips(params.price, 3)}</span>
        </div>
      </div>
    </div>
  )
}

 