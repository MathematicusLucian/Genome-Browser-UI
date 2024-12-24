import { useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

const PatientData = () => {
    // const [rowData, setRowData] = useState([]);
    // const [columnDefs, setColumnDefs] = useState([]);
    // const [error, setError] = useState(null);

    // Register all Community features
    ModuleRegistry.registerModules([AllCommunityModule]);
    // ModuleRegistry.registerModules([
    //     ClientSideRowModelModule,
    //     IntegratedChartsModule.with(AgChartsEnterpriseModule)
    // ]);

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try { 
    //       const response = await fetch('http://127.0.0.1:8000/patient_genome/full_report');
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
    //       const data = await response.json();
  
    //       if (data.length > 0) {
    //         // Set column definitions based on the keys of the first object in the data array
    //         const columns = Object.keys(data[0]).map(key => ({
    //           headerName: key,
    //           field: key,
    //         }));
    //         setColumnDefs(columns);
    //       }
  
    //       setRowData(data);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //       setError(error.message);
    //     }
    //   };
  
    //   fetchData();
    // }, []);

    return (
    //   <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
    //     {error ? (
    //       <div>Error: {error}</div>
    //     ) : (
    //       <AgGridReact
    //         modules={ClientSideRowModelModule}
    //         rowData={rowData}
    //         columnDefs={columnDefs}
    //         pagination={true}
    //         paginationPageSize={10}
    //       />
    //     )}
    //   </div>
    <div
        // define a height because the Data Grid will fill the size of the parent container
        style={{ height: 500 }}
    >
        <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
        />
    </div>
    );
};

export default PatientData;