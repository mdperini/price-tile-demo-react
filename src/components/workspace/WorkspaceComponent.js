import React from 'react';
import uuid from 'uuid'
import PriceTileComponent from '../price-tile/PriceTileComponent';
import './WorkspaceComponent.css';

export default class WorkspaceComponent extends React.Component {
   constructor (props) {
        super(props)
        this.state =  {  
            layoutConfig: undefined  
        }
    }

    async fetchUserPreferences(url = '') {
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
            if (!data) {
              console.log(`No user preferences for maria`);
              return;
            }

            const layoutConfig = data.map(layout => {
                                layout['key'] = uuid.v1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
                                return layout;
                              });
          
            this.setState({ layoutConfig });
          });      
      }

    componentDidMount() {
        console.log(`WorkspaceComponent`);
        this.fetchUserPreferences('http://localhost:3333/preferences');
    }

    async postData(url = '', data = {}) {
      // Default options are marked with *
        try {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'userid': 'maria'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow',
          referrer: 'no-referrer',
          body: JSON.stringify(data),
        });
        //handle success
        this.fetchUserPreferences('http://localhost:3333/preferences');
        console.log(response);
      }
      catch (response_1) {
        //handle error
        console.log(response_1);
      }      
    }

    savePreferences(tempLayout) {
      const payload = tempLayout.slice();
      console.log(`preferences ${JSON.stringify(payload)}`);
      this.postData('http://localhost:3333/preferences', payload);  
    }  
     
    componentWillUnmount() {
    }

    onAdd() {
      let layoutConfig = this.state.layoutConfig;
      if (layoutConfig === undefined) {
        layoutConfig = [];
      }

      layoutConfig.push(
        {
          symbol: 'EURUSD'
        });

      this.savePreferences(layoutConfig);
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
        return (
          <PriceTileComponent 
                key={priceTile.key}
                id={priceTile.key}
                symbol={priceTile.symbol}
                onClick={this.onRemove.bind(this)}
                onUpdate={this.onSave.bind(this)} />
        );
      });      
    
      return priceTiles;
    }

    render () {
        return (
          <div className="price-tiles"> 
            {this.renderPriceTiles(this.state.layoutConfig)}
            <span className="add"
                  onClick={this.onAdd.bind(this)}>
                  <i className="fa fa-plus-circle fa-5x add-inner"></i>
            </span>
          </div>                     
        )
      }
}
