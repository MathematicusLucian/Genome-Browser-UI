import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import TableGrid from '../../../components/TableGrid';

const GenericPage = () => {
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]); 
    const [error, setError] = useState(null);

    const router = useRouter();
    const { patient_id } = router.query;

    const fetchData = async () => {
        try {
            // const api_url = patient_id = ? `http://127.0.0.1:8000/patient_genome/full_report/${patient_id}` : `http://127.0.0.1:8000/patient_genome/full_report`);
            const api_url = `http://127.0.0.1:8000/patient_genome/full_report`;
            const response = await fetch(api_url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result.length > 0) {
                // Set column definitions based on the keys of the first object in the data array
                const columns = Object.keys(result[0]).map(key => ({
                    headerName: key,
                    field: key,
                }));
                setColumnDefs(columns);
            }
            setRowData(result); 
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        }
    };
    
    useEffect(() => { 
        fetchData();
    }, []); 

    return (
        <Layout>
            {!patient_id || error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <div className="table-header">Patient Data (ID: {patient_id})</div>
                    <TableGrid rowData={rowData} columnDefs={columnDefs} error={error} />
                </div>
            )}
            <style jsx>{`
              .table-header { 
                padding: 1.3rem 0 0 0;
                font-weight: 900;
            `}
            </style>
        </Layout>
    );
};

export default GenericPage;