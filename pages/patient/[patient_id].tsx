import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
// import Link from "next/link";
import Grid from '../../components/Grid';

const GenericPage = () => {
    const [rowData, setRowData] = useState([]);
    // const [rowData, setRowData] = useState<RowData[]>([]);
    // const [columnDefs, setColumnDefs] = useState([]); 
    // const [gridApi, setGridApi] = useState<agGrid.GridApi | null>(null);
    const [error, setError] = useState(null);

    const router = useRouter();
    const { patient_id } = router.query;

    // const fetchData = async () => {
    //     try {
    //         // const api_url = patient_id = ? `http://127.0.0.1:8000/patient_genome/full_report/${patient_id}` : `http://127.0.0.1:8000/patient_genome/full_report`);
    //         const api_url = `http://127.0.0.1:8000/patient_genome/full_report`;
    //         const response = await fetch(api_url);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const result = await response.json();
    //         if (result.length > 0) {
    //             // Set column definitions based on the keys of the first object in the data array
    //             const columns = Object.keys(result[0]).map(key => ({
    //                 headerName: key,
    //                 field: key,
    //             }));
    //             setColumnDefs(columns);
    //         }
    //         console.log(result);
    //         setRowData(result); 
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         setError(error.message);
    //     }
    // };
    
    useEffect(() => {
        fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
          .then((response) => response.json())
          .then((data) => setRowData(data));
    }, []);
    
    // const columnDefs: agGrid.ColDef[] = [
    const columnDefs = [
        { field: "athlete", filter: "agTextColumnFilter" },
        { field: "age", filter: "agNumberColumnFilter" },
        { field: "country", filter: "agSetColumnFilter" },
        { field: "year", filter: "agNumberColumnFilter" },
        { field: "date", filter: "agDateColumnFilter" },
        { field: "sport", filter: "agTextColumnFilter" },
        { field: "gold", filter: "agNumberColumnFilter" },
        { field: "silver", filter: "agNumberColumnFilter" },
        { field: "bronze", filter: "agNumberColumnFilter" },
        { field: "total", filter: "agNumberColumnFilter" },
    ];
    
    // useEffect(() => {
    //     if (patient_id) {
    //         fetchData();
    //     }
    // }, [patient_id]);

    return (
        <Layout>
            <div className="p-10">
                <Grid rowData={rowData} columnDefs={columnDefs} error={error} />
            </div>
            <p>A</p>
        </Layout>
    );
};

// {!patient_id || error ? (
//     <div>Error: {error}</div>
// ) : (
//     <div>
//         <h1>Patient Data (ID: {patient_id})</h1>
//         {/* <Grid /> */}
//     </div>
// )}
export async function getStaticPaths() { 
    const paths = [{
        params: { patient_id: "1"},
    }];
    return { paths: paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { patient_id } = params;
  try {
      const api_url = `http://127.0.0.1:8000/patient_genome/full_report`;
      const response = await fetch(api_url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.length > 0) {
          const columns = Object.keys(result[0]).map(key => ({
              headerName: key,
              field: key,
          }));
          return {
              props: {
                  rowData: result,
                  columnDefs: columns,
                  error: null,
              },
          };
      } else {
          return {
              props: {
                  rowData: [],
                  columnDefs: [],
                  error: "No data found",
              },
          };
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      return {
          props: {
              rowData: [],
              columnDefs: [],
              error: error.message,
          },
      };
  }
}

export default GenericPage;