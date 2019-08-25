import React from 'react';
import { renderPips } from '../../services/pricing.service';

export default class PriceQuoteComponent extends React.Component {
  side = this.props.side;

  render () {
    return (
      <div className="price-quote" onClick={this.update.bind(this)}>
        <div className="price-quote-inner">
          <div ref='selectedSide'  
               className="side">{this.props.subTitle}
          </div>
          <div className="pips">          
            <span className="pips-sm">{renderPips(this.props.price, 1)}</span>
            <span className="pips-lg">
                <span className={this.props.direction}>{renderPips(this.props.price, 2)}</span>
                </span>
            <span className="pips-sm">{renderPips(this.props.price, 3)}</span>
          </div>
        </div>           
      </div>           
    )
  }

  update () {
    this.props.onUpdate(this.side === 'Sell'? 'SELL' : 'BUY');
  }
}

