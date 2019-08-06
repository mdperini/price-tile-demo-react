import React from 'react';
import ReactDOM from 'react-dom';

export default class NotionalInputComponent extends React.Component {

        render () {
          return (
            <div className="div-notional">
              <input className="notional" 
                     ref='notionalInput' 
                     type='number'
                     onChange={this.update.bind(this)} />             
            </div>            
          )
        }

        update () {
          var notionalInput = ReactDOM.findDOMNode(this.refs.notionalInput)
          this.props.onUpdate(notionalInput.value);
        }
    }

