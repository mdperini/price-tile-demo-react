import notificationService from './notification.service';
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
          notificationService.sendMessage('Order was executed!');
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

//{"symbol":"USDCAD",
// "priceType":"SPOT",
// "side":"SELL",
// "amount":10000,
// "date":"2019-09-02T01:45:19.595Z",
// "rate":0.009276085679492126,
// "total":92.76085679492125}
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
        valueFormatter: (data) => numberWithCommas(data.value)
    },
    {
        headerName: "Rate", 
        field: "rate",
        valueFormatter: (data) => data.value.toFixed(5)
    },
    {
        headerName: "Trade Date", 
        field: "date",
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

