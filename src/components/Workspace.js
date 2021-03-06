import React from 'react';
import uuid from 'uuid'
import PriceTile from './PriceTile';
import TransactionGrid from './Transaction-Grid';
import { restorePreferences, savePreferences } from '../services/preferences.service';

import './workspace.scss';

export default class Workspace extends React.Component {
   constructor (props) {
        super(props)
        this.state =  {  
            layoutConfig: []  
        }
    }

    getUserPerferences () {
      restorePreferences((data) => {
        this.setState({ layoutConfig: data });
      })
    }

    saveUserPreferences(layoutConfig) {
      savePreferences(layoutConfig, (result) => {
        this.getUserPerferences();
      })  
    }  
    
    componentDidMount() {
      this.getUserPerferences();
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
          symbol: 'EURUSD',
          account:  {  
            "name": "Account 1",  
            "id": "Account 1 Id",  
            "basenumber": 800002001,  
            "vehicle": "Account 1 Id"
        }
        });

        this.saveUserPreferences(layoutConfig);
    }

    onRemove(priceTile) {
      const layoutConfig = this.state.layoutConfig.filter((x) => x.key !== priceTile);
      this.saveUserPreferences(layoutConfig);      
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
                        'account': pricetile.account,
                        'symbol': pricetile.symbol,
                        'key': pricetile.id
                     });

        this.saveUserPreferences(layouts);
      }      
    }    
    
    renderPriceTiles(layoutConfig) {
      if (!layoutConfig) {
        return;
      }

      const priceTiles = layoutConfig.map((priceTile) => {
        console.log(`priceTile ${JSON.stringify(priceTile)}`)
        return (
          <PriceTile 
                key={priceTile.key}
                id={priceTile.key}
                symbol={priceTile.symbol}
                account={priceTile.account}
                notional={1000000}
                onClick={this.onRemove.bind(this)}
                onUpdate={this.onSave.bind(this)} />
        );
      });      
    
      return priceTiles;
    }

    render () {
        return (
          <div>
            <div className="tiles"> 
              {this.renderPriceTiles(this.state.layoutConfig)}
              <span className="tiles__add"
                    onClick={this.onAdd.bind(this)}>
                    <i className="fa fa-plus-circle fa-5x tiles__add-inner"></i>
              </span>
            </div>
            <hr></hr>
            <TransactionGrid></TransactionGrid>
          </div>                     
        )
      }
}
