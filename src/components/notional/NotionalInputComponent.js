import React from 'react';

export default class NotionalInputComponent extends React.Component {
  
 onChange = event => {
    this.props.onChange(event.target.value);
  }

  render () {
      return (
        <div className="div-notional">
          <input className="notional" 
                 type='number'
                 onChange={this.onChange.bind(this)}
                 value={this.props.notional} />             
        </div>            
      )
    }
}

