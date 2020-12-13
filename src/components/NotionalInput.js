import React from 'react';

export default class NotionalInput extends React.Component {
  
 onChange = event => {
    this.props.onChange(event.target.value);
  }

  render () {
      return (
          <input className="notional" 
                 type='number'
                 onChange={this.onChange.bind(this)}
                 value={this.props.notional} />             
      )
    }
}

