import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
    const httpClient = axios.create({
      headers: {'userid': 'michael'}
    })

    httpClient.get('http://localhost:3333/currencypairs')
        .then(res => {
            const ccyPairs = res.data.slice();
            this.setState({ ccyPairs });
    })
  }

  renderSymbol(symbol) {
    return `${symbol.substring(0, 3)}/${symbol.substring(3, 6)}`;
  }

  render () {
    const options = this.state.ccyPairs.map( (ccyPair) => {
      return (
        <option key={ccyPair.uuidv1} value={ccyPair.symbol}
        >{this.renderSymbol(ccyPair.symbol)}</option>
      );
    });

    return (
      <div className="ccypair-picker">
        <select value={this.props.symbol} name="ccypairs" 
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

