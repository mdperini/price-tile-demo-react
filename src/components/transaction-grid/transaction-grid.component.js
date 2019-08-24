import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment  from 'moment';
import notificationService from '../../services/notification.service';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './transaction-grid.component.css';

const userid = 'maria';
const HTTPGetConfig = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'userid': userid
    },
    redirect: 'follow',
    referrer: 'no-referrer'
}


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
        return moment.utc(x).format("DD-MMM-YYYY HH:mm:ss")
    }
        
    fetchTransactions(url = '') {
        fetch(url, HTTPGetConfig)
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
            headerName: "Rate", 
            field: "rate",
            type: 'price',     
            valueFormatter: (data) => data.value.toFixed(5)
        },
        {
            headerName: "Trade Date", 
            field: "date",
            type: 'date',
            valueFormatter: (data) => this.renderDate(data.value),
            sort: 'desc'
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
        // subscribe to notification service
        this.subscription = notificationService.getMessage().subscribe(message => {
            this.refresh();          
        });

    }

    refresh() {
        this.fetchTransactions('http://localhost:3383/transactions');
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
