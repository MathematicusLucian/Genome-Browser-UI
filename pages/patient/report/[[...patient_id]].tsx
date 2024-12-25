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
    const [selectedPatientName, setSelectedPatientName] = useState<string | null>(null);

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
        try {
            const api_url = `http://127.0.0.1:8000/patient_genome/full_report/?patient_id=${patient_id}`;
            const response = await fetch(api_url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result.length > 0) {
                const columns = [
                    // {"headerName":"patient_id","field":"patient_id"},
                    // {"headerName":"patient_name","field":"patient_name"},
                    {"headerName":"rsid","field":"rsid"},
                    {"headerName":"risk","field":"risk"},
                    // {"headerName":"genotype_match","field":"genotype_match"},
                    {"headerName":"notes","field":"notes"},
                    {"headerName":"allele1","field":"allele1"},
                    {"headerName":"allele2","field":"allele2"},
                    // {"headerName":"genotype","field":"genotype"},
                    // {"headerName":"rsid_genotypes","field":"rsid_genotypes"},
                    {"headerName":"chromosome","field":"chromosome"},
                    {"headerName":"position","field":"position"},
                    {"headerName":"magnitude","field":"magnitude"},

                ];
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
            const selectedProfile = patientProfiles.find(profile => profile.patient_id === selectedPatient);
            setSelectedPatientName(selectedProfile ? selectedProfile.patient_name : null);
        }
    }, [selectedPatient, patientProfiles]);

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
                <div className="dropdown">
                    <label htmlFor="patient-select">Select a Patient Profile:</label>
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
                    <h2 className="table-header">Patient Data</h2>
                    <p className="table-sub-header"><span>Patient ID: </span>{selectedPatient}</p>
                    <p>{selectedPatientName}</p>
                    <TableGrid rowData={rowData} columnDefs={columnDefs} error={error} onSelectedDataRowChange={handleSelectedDataRowChange} />
                </div>
            )}
            <style jsx>{`
                h2 {
                    font-size: 0.9em;
                    font-weight: 900;
                }
                p, label, select {
                    font-size: 0.8em;
                }
                .dropdown {
                    padding: 1.3rem 0 0 0;
                }
                .dropdown label {
                    font-weight: 900;
                }
                .table-header { 
                    padding: 1.3rem 0 0 0; 
                }
                .table-sub-header span {
                    font-weight: 900;
                    padding: 0 0.4em;
                }
            `}
            </style>
        </Layout>
    );
};

export default GenericPage;