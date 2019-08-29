import React from "react";
import { renderPips } from '../../services/pricing.service';

export const PriceQuote = params => {
  const handleClick = event => {
    params.onClick(params.side);
  }

  return (
    <div className="price-quote" onClick={handleClick}>
      <div className="price-quote-inner">
        <div className="side">{params.subTitle}
        </div>
        <div className="pips">
          <span className="pips-sm">{renderPips(params.price, 1)}</span>
          <span className="pips-lg">
          <span className={params.direction}>{renderPips(params.price, 2)}</span>
          </span>
          <span className="pips-sm">{renderPips(params.price, 3)}</span>
        </div>
      </div>
    </div>
  )
}

 