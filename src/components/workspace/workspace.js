import React from "react";
import uuid from 'uuid'
import Loading from "../../sandbox/hooks/Loading";
import PriceTile from '../price-tile/PriceTile';
import { restorePreferences, savePreferences } from '../../services/preferences.service';

import './WorkspaceComponent.css';

export const Workspace = () => {
  const [layoutConfig, setLayoutConfig] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getUserPerferences = () => {
    restorePreferences( (data) => {
      setLayoutConfig(data);
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

    const renderPriceTiles = layoutConfig => {
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
                notional={25000} />
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
        </div>                     
      );

     
}

