import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import notificationService from '../services/notification.service';
import { renderColumnDefinitions, retrieveTransactions, agDefaultColDef } from '../services/transaction.service';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import '../components/transaction-grid/transaction-grid.component.css';

export const TransactionGrid = params => {
  const [columnDefs, setColumnDefs] = React.useState([]);
  const [defaultColDef, setDefaultColDef] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);

  const refresh = () => {
    retrieveTransactions( (rowData) => {
        setRowData( rowData );
    });
  }

  const subcribeToNotifications = () => {
    notificationService.getMessage().subscribe(message => {
        refresh();  
    });
  }

  console.log('Michael D.');
  subcribeToNotifications();

  React.useEffect(() => {
    setColumnDefs(renderColumnDefinitions());
    setDefaultColDef( agDefaultColDef);
    refresh();
  }, []);

  return (
        <div className="blotter">
            <div className="ag-grid-react">
                <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef} >
                </AgGridReact>
            </div>
        </div>
  );  
}

