import { httpGetConfig, renderHTTPPostConfig } from './http.config';
import moment  from 'moment';

const url = 'http://localhost:3383/transactions';

async function postData(url = '', data = {}, callbackFunc) {
    // Default options are marked with *
      try {
        console.log(JSON.stringify(renderHTTPPostConfig(data)));
      await fetch(url, renderHTTPPostConfig(data))
      .then(response =>  {
          return response.json();
        })
        .then(result => {
          callbackFunc(result);
        });    
    }
    catch (errorResponse) {
      callbackFunc(errorResponse);
    }      
  }

  export function postTransaction(symbol, side, amount, callbackFunc) {
    const payload = {
      symbol: symbol,
      priceType: 'SPOT',
      side: side,
      amount
    };

    // console.log(JSON.stringify(payload));
    postData(url, payload, callbackFunc);  
  }

  async function fetchTransactions(url = '', callbackFunc) {
    await fetch(url, httpGetConfig)
         .then(result => result.json())
         .then(data =>{ 
           callbackFunc(data);      
         }
     );      
  }

  export function retrieveTransactions(callbackFunc) {
    fetchTransactions(url, callbackFunc);
  }

const renderSymbol = value => {
    return value ? `${value.substr(0,3)}/${value.substr(3,6)}`: value;
}

const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const renderDate = x => {
    return moment.utc(x).format("DD-MMM-YYYY HH:mm:ss")
}

export function renderColumnDefinitions() {
    return [{
        headerName: "Symbol", 
        field: "symbol",
        valueFormatter: (data) => renderSymbol(data.value) 
    },
    {
        headerName: "Type", field: "priceType"
    },
    {
        headerName: "Side", field: "side",       
            cellClassRules: {
                'rag-green': 'x == "BUY"',
                'rag-red': 'x == "SELL"'
            }
    },
    {
        headerName: "Notional", 
        field: "amount",             
        type: 'currency',                
        valueFormatter: (data) => numberWithCommas(data.value)
    },
    {
        headerName: "Rate", 
        field: "rate",
        type: 'price',     
        valueFormatter: (data) => data.value.toFixed(5)
    },
    {
        headerName: "Trade Date", 
        field: "date",
        type: 'date',
        valueFormatter: (data) => renderDate(data.value),
        sort: 'desc'
    }
    ];
  }

  export const agDefaultColDef = {
                  // all columns sortable
                  sortable: true,
                  // all columns resizable
                  resizable: true,

                  rowSelection: 'single',

                  minWidth: 120
  }

