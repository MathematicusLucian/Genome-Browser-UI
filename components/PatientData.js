import { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

const PatientData = () => {
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [error, setError] = useState(null);

    // Register all Community features
    ModuleRegistry.registerModules([AllCommunityModule]); 

    useEffect(() => {
      const fetchData = async () => {
        try { 
          const response = await fetch('http://127.0.0.1:8000/patient_genome/full_report');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
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
          setError(error.message);
        }
      };
  
      fetchData();
    }, []);

    return (
        <div 
            // Define a height because the Data Grid will fill the size of the parent container
            className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            )}
        </div>
    );
};

export default PatientData;