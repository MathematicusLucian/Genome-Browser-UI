'use client'
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from 'next/router';
import { ModalContext, DrawerContext } from '../../../context';
import Layout from '../../../components/Layout';
import Select from '../../../components/Select'; 
import UploadForm from '../../../components/UploadForm'; 
import TableGrid from '../../../components/TableGrid'; 

const GenericPage: React.FC<any> = (props) => { 
    const { modelContent, modalVisible, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerContent, drawerVisible, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [error, setError] = useState(null);
    const [patientProfiles, setPatientProfiles] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
    const [selectedPatientName, setSelectedPatientName] = useState<string | null>(null);
    const rowDataValue = useMemo(() => ({
        rowData,
        setRowData, 
    }), [rowData]);

    const GENOME_BROWSER_API_PATH = process.env.NEXT_PUBLIC_GENOME_BROWSER_API_PATH;

    const columns = [
        {"headerName":"rsid","field":"rsid", flex: 2, maxWidth: 120},
        {"headerName":"risk","field":"risk", flex: 1, maxWidth: 50},
        {"headerName":"notes","field":"notes", flex: 4, minWidth: 200, maxWidth: 650, suppressSizeToFit: false},
        {"headerName":"allele1","field":"allele1", flex: 1, maxWidth: 100},
        {"headerName":"allele2","field":"allele2", flex: 1, maxWidth: 100},
        {"headerName":"chromosome","field":"chromosome", flex: 1, maxWidth: 100},
        {"headerName":"position","field":"position", flex: 2, maxWidth: 120},
        {"headerName":"magnitude","field":"magnitude", flex: 1, maxWidth: 100},
        // The following are not displayed:
        // {"headerName":"patient_id","field":"patient_id"},
        // {"headerName":"patient_name","field":"patient_name"},
        // {"headerName":"genotype_match","field":"genotype_match"},
        // {"headerName":"genotype","field":"genotype"},
        // {"headerName":"rsid_genotypes","field":"rsid_genotypes"},
    ];

    const router = useRouter();

    const fetchPatientProfiles = async () => {
        try {
            const api_url = `${GENOME_BROWSER_API_PATH}/patient_genome/patient_profile`;
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
            const api_url = `${GENOME_BROWSER_API_PATH}/patient_genome/full_report/?patient_id=${patient_id}`;
            const response = await fetch(api_url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result.length > 0) {
                setRowData(result);
            }
        } catch (error) {
            console.error('Error fetching full report:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchPatientProfiles();
        setColumnDefs(columns);
    }, []);  

    useEffect(() => {
        if (router.isReady) {  
            const patient_id = Array.isArray(router.query.patient_id) ? router.query.patient_id[0] : router.query.patient_id;
            patient_id && setSelectedPatient(patient_id);
        }
    }, [router.isReady, router.asPath]);   
    
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
        updateDrawerContent(dataRow);
        toggleDrawerVisible();
    };  

    const uploadDNAFile = () => {
        console.log("clicked upload button")
        updateModalContent(<div><h2 className="text-2xl font-bold text-gray-900">Upload Patient File</h2><div className="mt-2 px-7 py-3"><UploadForm /></div></div>);
        toggleModalVisible(true);
    }

    return (
        <Layout>
            <div>
                <button
                className="rounded bg-gray-200 px-3 py-1 mt-3 text-xs"
                onClick={uploadDNAFile}
                >
                    Upload DNA File
                </button>
                <Select patientProfiles={patientProfiles} error={error} handlePatientChange={handlePatientChange} />
            </div>
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
                p, label, select {
                    font-size: 0.8em;
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