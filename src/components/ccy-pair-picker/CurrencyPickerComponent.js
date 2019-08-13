import React from 'react';
import ReactDOM from 'react-dom';

export default class CurrencyPickerComponent extends React.Component {
  symbol = this.props.symbol;
  constructor(props) {
    super(props);
    this.state = {
        ccyPairs: []
    };    
  }

  async fetchCCYPairs(url = '') {
    // Default options are marked with *
      await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'userid': 'maria'
        },
        redirect: 'follow',
        referrer: 'no-referrer'
      })
      .then(response =>  {
        return response.json();
      })
      .then(data => {
        const ccyPairs = data.slice();
        this.setState({ ccyPairs });
      });      
  }

  componentDidMount() {
    console.log(`this.props.symbol ${this.props.symbol}`);
    this.fetchCCYPairs('http://localhost:3333/currencypairs');
  }

  renderSymbol(symbol) {
    return `${symbol.substring(0, 3)}/${symbol.substring(3, 6)}`;
  }

  render () {
    const options = this.state.ccyPairs.map( (ccyPair) => {
      return (
        <option key={ccyPair.uuidv1} value={ccyPair.symbol}>{this.renderSymbol(ccyPair.symbol)}</option>
      );
    });

    return (
      <div>
        <div className="navbar-header">
          <div className="velocity-icon vi-chevron"></div>  
        </div>

          <select className="ccypair-picker" value={this.props.symbol} name="ccypairs" 
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

