import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class C1 extends React.Component {
    //   componentDidMount() {
    //     var el1 = this.refs.myInput1;
    //     var el2 = ReactDOM.findDOMNode(this.refs.ref2);
    // }
    
        render () {
          return (
            <div>
              <input type='text' ref='myInput'/>
              <input type='button' onClick={this.update.bind(this)} value='Update C2'/>
            </div>
          )
        }
        update () {
          var el2 = ReactDOM.findDOMNode(this.refs.myInput)
          this.props.onUpdate(el2.value);
        }
    }

    export default C1;
    
    