import React from 'react';

export default class PriceQuoteComponent extends React.Component {
  part1 = 0.87;
  part2 = 50;
  part3 = 8;
  
  side=this.props.side;

  render () {
    return (
      <div className="price-quote" onClick={this.update.bind(this)}>
        <div className="price-quote-inner">
          <div ref='selectedSide'  
               className="side" 
               value={this.side}>{this.side}
          </div>
          <div className="pips">          
            <span className="price-tile-pips-sm">{this.part1}</span>
            <span className="price-tile-pips-lg">
                <span className={this.props.direction}>{this.part2}</span>
                </span>
            <span className="price-tile-pips-sm">{this.part3}</span>
          </div>
        </div>           
      </div>           
    )
  }

  update () {
    this.props.onUpdate(this.side);
  }
 }

