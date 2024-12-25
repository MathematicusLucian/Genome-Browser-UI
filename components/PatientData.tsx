import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact'
import { AllCommunityModules, ModuleRegistry } from 'ag-grid-community'; 
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// Register all Community features
// ModuleRegistry.registerModules(AllCommunityModules);

const PatientData = ({ rowData, columnDefs, error }) => {

    const [rowData2, setRowData2] = useState([]);
    const [columnDefs2] = useState([
        { headerName: 'First Name', field: 'first_name' },
        { headerName: 'Last Name', field: 'last_name' },
        { headerName: 'Job Title', field: 'job_title' },
        { field: 'office' },
        { field: 'email' }, 
    ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        id="staff_grid"
        rowData={rowData2}
        columnDefs={columnDefs2}
        style={{ height: '100%', width: '100%' }}
      ></AgGridReact>
    </div>
  );
};

export default PatientData;