import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid'

import getCCYPairs from '../../services/ccypair.service';

export default class CurrencyPickerComponent extends React.Component {
  symbol = this.props.symbol;
  constructor(props) {
    super(props);
    this.state = {
        ccyPairs: []
    };    
  }

  componentDidMount() {
    console.log(`this.props.symbol ${this.props.symbol}`);
    getCCYPairs( (ccyPairs) => {
      this.setState({ ccyPairs });
    })
    
    // async function add (x, y) {
    //   return x + y
    // }
    
    // add(2,3).then((result) => {
    //   console.log(result) // 5
    // })
  }

  renderSymbol(symbol) {
    return `${symbol.substring(0, 3)}/${symbol.substring(3, 6)}`;
  }

  render () {
    const options = this.state.ccyPairs.map( (ccyPair) => {
      const key = ccyPair.key ? ccyPair.key : uuid.v1();
      return (
        <option key={key} value={ccyPair.symbol}>{this.renderSymbol(ccyPair.symbol)}</option>
      );
    });

    return (
      <div>
        <div className="navbar-header">
          <div className="velocity-icon vi-chevron"></div>  
        </div>

          <select className="ccypair-picker" 
                  value={this.props.symbol} 
                  name="ccypairs" 
                  ref='ccypairs'
                  onChange={this.update.bind(this)}>{options}</select>
      </div>           
    )
  }

  update () {
    var ccypairs = ReactDOM.findDOMNode(this.refs.ccypairs)
    this.props.onUpdate(ccypairs.value);
  }
}
