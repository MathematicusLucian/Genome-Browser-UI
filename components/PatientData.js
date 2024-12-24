import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PatientData = () => {
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/patient_genome/full_report');
          const data = await response.json();
  
          if (data.length > 0) {
            // Set column definitions based on the keys of the first object in the data array
            const columns = Object.keys(data[0]).map(key => ({
              headerName: key,
              field: key,
            }));
            setColumnDefs(columns);
          }
  
          setRowData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    );
};

export default PatientData;