import React from 'react';
import { renderPips } from '../services/pricing.service';

export default class PriceQuote extends React.Component {
  side = this.props.side;

  onClick = event => {
    this.props.onClick(this.props.side === 'Sell'? 'SELL' : 'BUY');
  }

  render () {
    return (
      <div className="price-quote" onClick={this.onClick.bind(this)}>
        <div className="price-quote-inner">
          <div ref='selectedSide'  
               className="side">{this.props.subTitle}
          </div>
          <div className="pips">          
            <span className="pips-sm">{renderPips(this.props.price, 1)}</span>
            <span className="pips-lg">
                <span className={this.props.direction}>{renderPips(this.props.price, 2)}</span>
                </span>
            <span className="pips-sm-r">{renderPips(this.props.price, 3)}</span>
          </div>
        </div>           
      </div>           
    )
  }
}

