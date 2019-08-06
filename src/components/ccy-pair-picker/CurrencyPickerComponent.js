import React from 'react';
import ReactDOM from 'react-dom';

export default class CurrencyPickerComponent extends React.Component {
  render () {
    return (
      <div className="ccypair-picker">
        <div className="velocity-icon vi-chevron"></div>
        <input className="ccypair-input"
                ref='ccypairInput' 
                type='text' 
                onChange={this.update.bind(this)} />
      </div>           
    )
  }

  update () {
    var ccypairInput = ReactDOM.findDOMNode(this.refs.ccypairInput)
    this.props.onUpdate(ccypairInput.value);
  }
 }

