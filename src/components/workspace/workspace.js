import React from "react";
import Loading from "../../sandbox/hooks/Loading";
import { HTTPGetConfig } from '../services/ccypair.config'
import PriceTile from '../price-tile/PriceTile';

export const Workspace = () => {
  const [layoutConfig, setLayoutConfig] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetch(HTTPGetConfig.URL_PREFERENCES, HTTPGetConfig.GetConfig)
    .then(response =>  {
      return response.json();
    })
    .then(result => {
        setLayoutConfig(result);
        setLoading(false);
    });    
    
  }, []);

  if (loading === true) {
    return <Loading />;
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
            <span className="add">
                  <i className="fa fa-plus-circle fa-5x add-inner"></i>
            </span>
          </div>
          <hr></hr>
        </div>                     
      );

     
}

