import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React from 'react';

// import { ColDef } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

// import uuid from 'uuid'
import './transaction-grid.component.css';

export default class TransactonGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      } 

  columnDefinitions = [
        {
          header: 'Symbol',
          name: 'symbol',
        },
        {
          header: 'Type',
          name: 'priceType'
        },
        {
          header: 'Side',
          name: 'side',
          cellClassRules: {
                           'rag-green': 'x == "BUY"',
                           'rag-red': 'x == "SELL"'
                          }
        },
        {
          header: 'Notional',
          name: 'amount',
          type: 'currency',
          valueFormatter: (data) => this.numericFormatter.transform(data.value)
        },
        {
          header: 'Rate',
          name: 'rate',
          type: 'price',
          valueFormatter: (data) => this.decimalPipe.transform(data.value, '1.2-5')
        },
        {
          header: 'Transaction',
          name: 'date',
          type: 'date',
          sort: 'desc'
    
        }];

      fetchTransactions(url = '') {
        // Default options are marked with *
          fetch(url, {
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
          .then(result => result.json())
          .then(rowData =>{
            console.log(`fetchTransactions rowData ${JSON.stringify(rowData)}`);
            this.setState({rowData: 
                // [{"symbol":"USDJPY","priceType":"SPOT","side":"BUY","amount":100000,"date":"2019-08-13T05:15:41.329Z","rate":107.77891930642828,"total":10777891.930642828}]
                rowData.map(row => {
                        row['make'] = row.symbol;
                        row['model'] = row.side;
                        row['price'] = row.rate;
                    return row;
                  })})
         
          }
          );      
      }

      renderColumnDefinitions(columnDefinitions) {
        this.setState({ columnDefs: [{
            headerName: "Symbol", field: "symbol"
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
            headerName: "Notional", field: "amount"
          },
          {
            headerName: "Trade Date", field: "date"
          },
          {
            headerName: "Rate", field: "rate"
          },
          {
            headerName: "Total", field: "total"
          }
        ]});
      
      
        // let columnDefs = []
        // columnDefinitions.forEach((columnDefinition) => {
        //   const definition = {};
        //   definition.headerName = columnDefinition.header;
        //   definition.field = columnDefinition.name;
    
        //   if (columnDefinition.valueFormatter) {
        //     definition.valueFormatter = columnDefinition.valueFormatter;
        //   }
    
        //   if (columnDefinition.cellClassRules) {
        //     definition.cellClassRules = columnDefinition.cellClassRules;
        //   }
    
        //   if (columnDefinition.sort) {
        //     definition.sort = columnDefinition.sort;
        //   }
    
        //   columnDefs.push(definition);
        // });
        // this.setState({columnDefs: columnDefs} );
        // this.setState({defaultColDef:  {
        //                     // all columns sortable
        //                     sortable: true,
        //                     // all columns resizable
        //                     resizable: true,
                    
        //                     rowSelection: 'single',
                    
        //                     minWidth: 120
        //                 }
        // });
      
        // this.setState({gridOptions:  {
        //                 /* Label columns */
        //                 headerHeight: 20
        //               }
        //            });
       
    
     }
  

    componentDidMount() {
        this.renderColumnDefinitions(this.columnDefinitions);
        this.renderTransactions();
        // fetch('https://api.myjson.com/bins/15psn9')
        // .then(result => result.json())
        // .then(rowData => this.setState({rowData}))
    }
   
    renderTransactions() {
        console.log(`renderTransactions`);
        this.fetchTransactions('http://localhost:3333/transactions');
        // this.setState({rowData: 
        //     [{"symbol":"USDJPY","priceType":"SPOT","side":"BUY","amount":100000,"date":"2019-08-13T05:15:41.329Z","rate":107.77891930642828,"total":10777891.930642828}]
        //         .map(row => {
        //             row['make'] = row.symbol;
        //             row['model'] = row.side;
        //             row['price'] = row.rate;
        //         return row;
        //       })})
         
    }

    render() {
        return (
        <div className="blotter">
            <div className="ag-grid-react">
                <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        </div>
        );
    }
}
