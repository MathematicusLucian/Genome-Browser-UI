import React, { useState, useEffect } from "react";
import type {FC} from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import PatientList from "@/components/PatientList";
import TableGrid from '../../../components/TableGrid';
import { useLiveQuery } from "dexie-react-hooks"; 
import { patientsIndexedDb, patientProfileTable } from "@/database/db"; 
import type { IPatientProfile } from "@/database/db";

interface GenericPageProps {
    opensidedrawer: (content: React.ReactNode) => void;
}

// const PatientList: FC = () => {   
const GenericPage: React.FC<GenericPageProps> = ({ opensidedrawer }) => { 
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]); 
    const [error, setError] = useState(null);
    const [selectedDataRow, setSelectedDataRow] = useState<string | null>(null);

    const router = useRouter();
    const { patient_id } = router.query;

    const fetchData = async () => {
        try {
            // const api_url = patient_id = ? `http://127.0.0.1:8000/patient_genome/patient_profile/${patient_id}` : `http://127.0.0.1:8000/patient_genome/patient_profile`);
            const api_url = `http://127.0.0.1:8000/patient_genome/patient_profile`;
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

    const handleSelectedDataRowChange = (selectedDataRow: string) => {
        setSelectedDataRow(selectedDataRow); 
        // opensidedrawer(<div>Details for Patient ID: {selectedDataRow?.patient_id}</div>);
    };

    return (
        <Layout>
            {patient_id || error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <PatientList />
                    {/* {selectedDataRow && <div>Selected Patient ID: {selectedDataRow.patient_id}</div>}
                    <TableGrid rowData={rowData} columnDefs={columnDefs} error={error} onSelectedDataRowChange={handleSelectedDataRowChange} /> */}
                </div>
            )}
            <style jsx>{`
            `}
            </style>
        </Layout>
    );
};

export default GenericPage;