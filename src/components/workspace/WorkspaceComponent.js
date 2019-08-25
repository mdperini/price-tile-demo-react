import React from 'react';
import uuid from 'uuid'
import PriceTileComponent from '../price-tile/PriceTileComponent';
import TransactionGridComponent from '../transaction-grid/transaction-grid.component';
import notificationService from '../../services/notification.service';
import './WorkspaceComponent.css';

const preferences = 'http://localhost:3383/preferences';
const userid = 'maria';

const httpGetConfig =  {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'userid': userid
  },
  redirect: 'follow',
  referrer: 'no-referrer'
}

export default class WorkspaceComponent extends React.Component {
   constructor (props) {
        super(props)
        this.state =  {  
            layoutConfig: undefined  
        }
    }

    async fetchUserPreferences(url = '') {
        // Default options are marked with *
          await fetch(url,httpGetConfig)
          .then(response =>  {
            return response.json();
          })
          .then(data => {
            if (!data) {
              console.log(`No user preferences for maria`);
              return;
            }

            const layoutConfig = data;
            this.setState({ layoutConfig });
          });      
      }

    componentDidMount() {
        console.log(`WorkspaceComponent`);
        this.fetchUserPreferences(preferences);
    }

    renderHTTPPostConfig(data) {
      return  {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'userid': userid
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
      };      
    }

    async postData(url = '', data = {}) {
        try {
        const response = await fetch(url, this.renderHTTPPostConfig(data));
        // handle success
        this.fetchUserPreferences(preferences);
        console.log(response);
      }
      catch (response_1) {
        // handle error
        console.log(response_1);
      }      
    }

    savePreferences(layoutConfig) {
      this.postData('http://localhost:3383/preferences', layoutConfig);  
    }  
     
    componentWillUnmount() {
    }

    onAdd() {
      let layoutConfig = this.state.layoutConfig;
      if (layoutConfig === undefined) {
        layoutConfig = [];
      }

      const v1 = uuid.v1();

      layoutConfig.push(
        {
          key: v1,
          id: v1,
          symbol: 'EURUSD'
        });

     
      this.savePreferences(layoutConfig);
    }

    onSendQuote(result) {
      notificationService.sendMessage('Order was executed!');
    }

    onRemove(priceTile) {
      const layoutConfig = this.state.layoutConfig.filter((x) => x.key !== priceTile);
      this.savePreferences(layoutConfig);      
    }

    onSave(pricetile) {
      const layoutConfig = this.state.layoutConfig.filter((x) => x.key === pricetile.id);     
      if (layoutConfig) {
        let layouts = this.state.layoutConfig;
         
        for( var i = 0; i < layouts.length; i++){ 
          if ( layouts[i].key === pricetile.id) {
            layouts.splice(i, 1); 
          }
        }
    
        layouts.push({
                        'symbol': pricetile.symbol,
                        'key': pricetile.id
                     });

        this.savePreferences(layouts);
      }      
    }    
    
    renderPriceTiles(layoutConfig) {
      if (!layoutConfig) {
        return;
      }

      const priceTiles = layoutConfig.map((priceTile) => {
        console.log(`priceTile ${JSON.stringify(priceTile)}`)
        return (
          <PriceTileComponent 
                key={priceTile.key}
                id={priceTile.key}
                symbol={priceTile.symbol}
                notional={25000}
                onSendQuote={this.onSendQuote.bind(this)}
                onClick={this.onRemove.bind(this)}
                onUpdate={this.onSave.bind(this)} />
        );
      });      
    
      return priceTiles;
    }

    render () {
        return (
          <div>
            <div className="price-tiles"> 
              {this.renderPriceTiles(this.state.layoutConfig)}
              <span className="add"
                    onClick={this.onAdd.bind(this)}>
                    <i className="fa fa-plus-circle fa-5x add-inner"></i>
              </span>
            </div>
            <hr></hr>
            <TransactionGridComponent></TransactionGridComponent>
          </div>                     
        )
      }
}
