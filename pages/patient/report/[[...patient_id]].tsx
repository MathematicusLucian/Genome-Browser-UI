import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import { DrawerContext } from '../../../context';
import Layout from '../../../components/Layout';
import TableGrid from '../../../components/TableGrid'; 

const GenericPage: React.FC<any> = (props) => { 
    const { content, visible, updateContent, toggleVisible } = useContext(DrawerContext);
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [error, setError] = useState(null);
    const [patientProfiles, setPatientProfiles] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

    const router = useRouter();

    const fetchPatientProfiles = async () => {
        try {
            const api_url = `http://127.0.0.1:8000/patient_genome/patient_profile`;
            const response = await fetch(api_url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setPatientProfiles(result);
        } catch (error) {
            console.error('Error fetching patient profiles:', error);
            setError(error.message);
        }
    };

    const fetchFullReport = async (patient_id: string) => {
        console.log('patient_id', patient_id);
        try {
            const api_url = `http://127.0.0.1:8000/patient_genome/full_report/?patient_id=${patient_id}`;
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
                setColumnDefs(columns);
            }
            setRowData(result);
        } catch (error) {
            console.error('Error fetching full report:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchPatientProfiles();
    }, []);  

    useEffect(() => {
        if (router.isReady) {  
            const patient_id = Array.isArray(router.query.patient_id) ? router.query.patient_id[0] : router.query.patient_id;
            patient_id && setSelectedPatient(patient_id);
        }
    }, [router.isReady]);  

    useEffect(() => {
        if (selectedPatient) {
            fetchFullReport(selectedPatient);
        }
    }, [selectedPatient]);

    const handlePatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(`/patient/report/${event.target.value}`);
    };

    const handleSelectedDataRowChange = (dataRow: string) => {
        toggleVisible();
        updateContent(dataRow) 
    };  

    return (
        <Layout>
            {!patientProfiles || error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <label htmlFor="patient-select">Select Patient:</label>
                    <select id="patient-select" onChange={handlePatientChange}>
                        <option value="">--Please choose a patient--</option>
                        {patientProfiles.map((profile: any) => (
                            <option key={profile.patient_id} value={profile.patient_id}>
                                {profile.patient_name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {!selectedPatient || error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <div className="table-header">Patient Data (Patient ID: {selectedPatient})</div>
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