import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import notificationService from '../../services/notification.service';
import { renderColumnDefinitions, retrieveTransactions, agDefaultColDef } from '../../services/transaction.service';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './transaction-grid.component.css';

export default class TransactionGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
     } 
  
    componentDidMount() {
        this.setState({columnDefs: renderColumnDefinitions()});
        this.setState({ defaultColDef: agDefaultColDef});

        // this.renderColumnDefinitions();
        this.refresh();
        // subscribe to notification service
        this.subscription = notificationService.getMessage().subscribe(message => {
            this.refresh();          
        });

    }

    refresh() {
        retrieveTransactions( (rowData) => {
            this.setState({ rowData });
        })
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
