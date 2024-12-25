import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import { DrawerContext } from '../../../context';
import Layout from '../../../components/Layout';
import TableGrid from '../../../components/TableGrid'; 

const GenericPage: React.FC<any> = (props) => { 
    const { content, visible, updateContent, toggleVisible } = useContext(
        DrawerContext
    );
    
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
    }, [patient_id]); 

    const handleSelectedDataRowChange = (dataRow: string) => {
        toggleVisible();
        updateContent(dataRow) 
    };  

    return (
        <Layout>
            {!patient_id || error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <div className="table-header">Patient Data (Patient ID: {patient_id})</div>
                    {content && <div>Selected RSID: {content.rsid}; visibility: {visible.toString()}</div>}
                    <TableGrid rowData={rowData} columnDefs={columnDefs} error={error} onSelectedDataRowChange={handleSelectedDataRowChange} />
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