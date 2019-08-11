import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class CurrencyPickerComponent extends React.Component {
  symbol = this.props.symbol;

  // getCCY() {
  //   return new Promise((resolve) => {
  //     if (!this.ccyPairs) {
  //       this.http
  //         .get(this.serverUrl)
  //         .toPromise()
  //         .then((result: any) => {
  //           this.ccyPairs = result;
  //           resolve(this.ccyPairs);
  //         });
  //     } else {
  //       resolve(this.ccyPairs);
  //     }
  //   });
componentDidMount() {
    // axios.get('http://jsonplaceholder.typicode.com/posts')
    //axios.get('http://localhost:3333')
    //http://localhost:3333

    const instance = axios.create({
      baseURL: 'http://localhost:3333',
      timeout: 1000,
      headers: {'userid': 'michael'}
    })

    // setHeaders: {
    //   userid: 'michael'
    // }
    
    instance.get('http://localhost:3333/currencypairs')
        .then(res => {
            const faqs = res.data.slice(0,10);
            console.log(`ccy pairs ${JSON.stringify(faqs)}`)
            this.setState({ faqs });
        })
}


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

