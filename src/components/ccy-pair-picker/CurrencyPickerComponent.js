import React from 'react';
import ReactDOM from 'react-dom';

export default class CurrencyPickerComponent extends React.Component {
  symbol = this.props.symbol;

  render () {
    return (
      <div className="ccypair-picker">
        <div className="velocity-icon vi-chevron"></div>
        <input className="ccypair-input"
        ref='ccypairInput' 
        type='text'
        onChange={this.update.bind(this)}
        value={this.props.symbol} />
        <select name="ccypairs" 
                ref='ccypairs'
                onChange={this.update.bind(this)}>
          <option value="EUR/USD">EUR/USD</option>
          <option value="USD/CAD">USD/CAD</option>
          <option value="USD/MXN">USD/MXN</option>
        </select>
      </div>           
    )
  }

  update () {
    var ccypairs = ReactDOM.findDOMNode(this.refs.ccypairs)
    this.props.onUpdate(ccypairs.value);
  }
 }

