import React from 'react';
export default class PriceQuoteComponent extends React.Component {
    
  getPriceSubString(price, part) {
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

  render () {
  
    return (
      <div className="price-quote" onClick={this.update.bind(this)}>
        <div className="price-quote-inner">
          <div ref='selectedSide'  
               className="side" 
               value={this.side}>{this.side}
          </div>
          <div className="pips">          
            <span className="price-tile-pips-sm">{this.getPriceSubString(this.props.price, 1)}</span>
            <span className="price-tile-pips-lg">
                <span className={this.props.direction}>{this.getPriceSubString(this.props.price, 2)}</span>
                </span>
            <span className="price-tile-pips-sm">{this.getPriceSubString(this.props.price, 3)}</span>
          </div>
        </div>           
      </div>           
    )
  }

  update () {
    this.props.onUpdate(this.side);
  }
 }

