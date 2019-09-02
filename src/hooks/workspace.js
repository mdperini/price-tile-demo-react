import React from "react";
import uuid from 'uuid'
import Loading from "../common/Loading";
import PriceTile from './PriceTile';
import { TransactionGrid } from './transaction.grid';
import { restorePreferences, savePreferences } from '../services/preferences.service'; 

import '../components/workspace/WorkspaceComponent.css';

export const Workspace = () => {
  const [layoutConfig, setLayoutConfig] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getUserPerferences = () => {
    restorePreferences( (layout) => {
      if (!layout || !Array.isArray(layout)) return;

      layout.map((tile) => {
        console.log(`${tile.id} ${tile.symbol}`);
        return tile;
      });
      
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
      
    layoutConfig.push({ key: v1, id: v1, symbol: 'EURUSD', notional: 10000 });
    saveUserPreferences(layoutConfig);  
  }

  const onSave  = params => {
    const matchingLayout = layoutConfig.filter((x) => x.key === params.id);    
    if (!matchingLayout) {
      return;
    }

    layoutConfig.map((tile) => {
      if (tile.id === params.id) {
        tile.symbol = params.symbol;
      }

      return tile;
    });
   
    saveUserPreferences(layoutConfig);
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
              notional={10000}
              onClick={onRemoved}
              onChange={onSave} />
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

 