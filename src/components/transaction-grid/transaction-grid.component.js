import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React from 'react';
import 'moment-timezone';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

// import uuid from 'uuid'
import './transaction-grid.component.css';
import moment  from 'moment';

export default class TransactionGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        } 

        renderSymbol(value) {
            return value ? `${value.substr(0,3)}/${value.substr(3,6)}`: value;
        }

        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        renderDate(x) {
            // return moment(x).format('DD-MMM-YYYY hh:mm:SS');
            return moment.utc(x).format("DD-MMM-YYYY HH:mm:ss")
        }
        
        fetchTransactions(url = '') {
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
                .then(rowData =>{ this.setState({ rowData })     
                }
            );      
        }

        renderColumnDefinitions() {
            this.setState({ columnDefs: [{
                headerName: "Symbol", 
                field: "symbol",
                valueFormatter: (data) => this.renderSymbol(data.value) 
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
                valueFormatter: (data) => this.numberWithCommas(data.value)
            },
            {
                headerName: "Trade Date", 
                field: "date",
                type: 'date',
                valueFormatter: (data) => this.renderDate(data.value),
                sort: 'desc'
            },
            {
                headerName: "Rate", 
                field: "rate",
                type: 'price',     
                valueFormatter: (data) => data.value.toFixed(5)
            },
            {
                headerName: "Total", 
                field: "total",
                valueFormatter: (data) => this.numberWithCommas(data.value)
            }
            ]});

            this.setState({ defaultColDef:  {
                                                // all columns sortable
                                                sortable: true,
                                                // all columns resizable
                                                resizable: true,
                                        
                                                rowSelection: 'single',
                                        
                                                minWidth: 120
                                            }
            })
          
        }  

        componentDidMount() {
            this.renderColumnDefinitions();
            this.refresh();
        }

        refresh() {
            this.fetchTransactions('http://localhost:3333/transactions');
        }
    
        render() {
            return (
            <div className="blotter">
                <div className="ag-grid-react">
                    <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    defaultColDef={this.state.defaultColDef} >
                    </AgGridReact>
                </div>
            </div>
            );
        }
}
