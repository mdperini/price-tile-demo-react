import React from "react";
import uuid from 'uuid'
import Loading from "../../sandbox/hooks/Loading";
import PriceTile from '../price-tile/PriceTile';
import { TransactionGrid } from '../transaction-grid/transaction.grid';
import { restorePreferences, savePreferences } from '../../services/preferences.service'; 

import './WorkspaceComponent.css';

export const Workspace = () => {
  const [layoutConfig, setLayoutConfig] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getUserPerferences = () => {
    restorePreferences( (layout) => {
      setLayoutConfig(layout);
      setLoading(false);
     });
  }

  const saveUserPreferences = layoutConfig => {
    savePreferences(layoutConfig, (result) => {
        getUserPerferences();
    }) 
  }

  React.useEffect(() => {
    setLoading(true);
    getUserPerferences();
  }, []);

 

  if (loading === true) {

    return <Loading />;

  }

 

    const onAdd  = event => {

      const v1 = uuid.v1();

 

      layoutConfig.push(

        {

          key: v1,

          id: v1,

          symbol: 'EURUSD'

        });

 

        saveUserPreferences(layoutConfig);

    }

 

    const removeLayout = (layouts, id) => {

      for( var i = 0; i < layouts.length; i++){

        if ( layouts[i].key === id) {

          layouts.splice(i, 1);

        }

      }

 

      return layouts;

    }

 

    const onSave  = params => {

      const matchingLayout = layoutConfig.filter((x) => x.key === params.id);    

      if (!matchingLayout) {

        return;

      }

 

      const layouts = removeLayout(layoutConfig, params.id );

 

      layouts.push({'symbol': params.symbol, 'key': params.id  });

      saveUserPreferences(layouts);

    }

 

    const onRemoved  = id => {

      const tmp = layoutConfig.filter((x) => x.key !== id);

      saveUserPreferences(tmp);     

    }

 

    const renderPriceTiles = layoutConfig => {

        if (!layoutConfig) {

            return;

        }

 

        const priceTiles = layoutConfig.map((priceTile) => {

          return (

              <PriceTile

                  key={priceTile.key}

                  id={priceTile.key}

                  symbol={priceTile.symbol}

                  onClick={onRemoved}

                  onChange={onSave}

                  notional={2500} />

          );

        });     

  

        return priceTiles;

    }

 

    return (

      <div>

        <div className="price-tiles">

          {renderPriceTiles(layoutConfig)}

          <span className="add" onClick={onAdd}>

                <i className="fa fa-plus-circle fa-5x add-inner"></i>

          </span>

        </div>

        <hr></hr>

        <TransactionGrid></TransactionGrid>

      </div>                    

    );

}

 