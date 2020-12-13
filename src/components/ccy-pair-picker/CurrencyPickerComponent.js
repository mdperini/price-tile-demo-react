import React from 'react';

import Loading from "../../common/Loading";
import uuid from 'uuid'
import getCCYPairs from '../../services/ccypair.service';

export default class CurrencyPickerComponent extends React.Component {
  symbol = this.props.symbol;
  constructor(props) {
    super(props);
    this.state = {
        ccyPairs: [],
        loading: true
    };    
  }

  componentDidMount() {
    console.log(`this.props.symbol ${this.props.symbol}`);
    this.setState({ loading: true });
    getCCYPairs( (ccyPairs) => {

      this.setState({ ccyPairs });
      this.setState({ loading: false });
    })
  }

  onChange(event) {
    this.props.onChange(event.target.value);
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
      this.state.loading ? <Loading /> :
      <div className="ccypair-picker__div">        
        <select className="ccypair-picker__select" 
                value={this.props.symbol} 
                name="ccypairs" 
                onChange={this.onChange.bind(this)}>{options}</select>
      </div>           
    )
  }
}
