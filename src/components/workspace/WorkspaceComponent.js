import React from 'react';
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
            if (data) {
              console.log(`No user preferences for maria`);
              return;
            }

            const layoutConfig = data.slice();
            console.log(`WorkspaceComponent ${layoutConfig}`);
            this.setState({ layoutConfig });
          });      
      }

    componentDidMount() {
        console.log(`WorkspaceComponent`);
      //  this.fetchUserPreferences('http://localhost:3333/preferences');
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
        console.log(response);
      }
      catch (response_1) {
        //handle error
        console.log(response_1);
      }      
    }

    savePreferences(tempLayout) {
      const payload = tempLayout.slice();
      console.log(`preferences ${payload}`);
//      this.postData('http://localhost:3333/preferences', payload);  
    }  
     
    componentWillUnmount() {
    }

    onAdd() {
      // let tempLayout = this.state.layoutConfig;
      // if (tempLayout === undefined) {
      //   tempLayout = [];
      // }

      // tempLayout.push(
      //   {
      //     symbol: 'EURUSD'
      //   });
     
      // this.setState({layoutConfig: tempLayout.slice()});
      // console.log(`preferences ${this.state.layoutConfig}`);

      //this.savePreferences(tempLayout);
    }

    render () {
      let priceTiles = '';
      const layoutConfig = [{'uuidv1': '1',
                             'symbol':'USDCAD'},
                            {'uuidv1': '2',
                             'symbol':'EURUSD'}];

          priceTiles = layoutConfig.map((priceTile) => {
            return (
              <PriceTileComponent 
                    key={priceTile.uuidv1}
                    symbol={priceTile.symbol} />
            );
          });      

            
        return (
          <div className="price-tiles"> 
            {priceTiles}
            <span className="add"
                  onClick={this.onAdd(this)}>
                  <i className="fa fa-plus-circle fa-5x add-inner"></i>
            </span>
          </div>
                     
        )
      }
}
