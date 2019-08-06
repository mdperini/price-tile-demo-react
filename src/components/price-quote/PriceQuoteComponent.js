import React from 'react';
import ReactDOM from 'react-dom';

export default class PriceQuoteComponent extends React.Component {
  part1 = 0.87;
  part2 = 50;
  part3 = 8;
  
  render () {
    return (
      <div className="price-quote">
        <div className="price-quote-inner">
          <div className="side">{this.props.side}</div>
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
    var ccypairInput = ReactDOM.findDOMNode(this.refs.ccypairInput)
    this.props.onUpdate(ccypairInput.value);
  }
 }

