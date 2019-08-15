import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

// import uuid from 'uuid'
import './transaction-grid.component.css';

export default class TransactonGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: ColDef,
            defaultColDef: [],
            gridOptions: undefined,
            rowData: []
          
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

      async fetchTransactions(url = '') {
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
              console.log(`No transactons`);
              return;
            }

            // const rowData = data.map(row => {
            //                     row['key'] = uuid.v1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
            //                     return row;
            //                   });

            console.log(JSON.stringify(data));

            // this.setState({ rowData: data });
          });      
      }

      renderColumnDefinitions(columnDefinitions) {
        let columnDefs = [];
        columnDefinitions.forEach((columnDefinition) => {
          const definition = {};
          definition.headerName = columnDefinition.header;
          definition.field = columnDefinition.name;
    
          if (columnDefinition.valueFormatter) {
            definition.valueFormatter = columnDefinition.valueFormatter;
          }
    
          if (columnDefinition.cellClassRules) {
            definition.cellClassRules = columnDefinition.cellClassRules;
          }
    
          if (columnDefinition.sort) {
            definition.sort = columnDefinition.sort;
          }
    
          columnDefs.push(definition);
        });
        this.setState({columnDefs: columnDefs} );
        this.setState({defaultColDef:  {
                            // all columns sortable
                            sortable: true,
                            // all columns resizable
                            resizable: true,
                    
                            rowSelection: 'single',
                    
                            minWidth: 120
                        }
        });
      
        this.setState({gridOptions:  {
                        /* Label columns */
                        headerHeight: 20
                      }
                   });
       
    
     }
  
    componentDidMount() {
        console.log(`fetchTransactions`);
        this.renderColumnDefinitions(this.columnDefinitions);
        this.fetchTransactions('http://localhost:3333/transactions');
    }

    
      render() {
        return (
            <div 
            className="ag-theme-balham"
            style={{ 
            height: '500px', 
            width: '600px' }} 
          >
          <div className="blotter">

            <AgGridReact className="ag-grid-react"
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
              defaultColDef={this.state.defaultColDef}
              gridOptions={this.state.gridOptions}>
            </AgGridReact>
          </div>
          </div>
          );
      }
}
