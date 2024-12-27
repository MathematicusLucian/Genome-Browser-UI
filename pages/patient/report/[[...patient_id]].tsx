'use client'
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from 'next/router';
import { ModalContext, DrawerContext } from '../../../context';
import Layout from '../../../components/Layout';
import Select from '../../../components/Select'; 
import UploadForm from '../../../components/UploadForm'; 
import GeneVariantList from "@/components/GeneVariantList";
import TableGrid from '../../../components/TableGrid'; 
import { patientsIndexedDb, IPatientProfile, IPatientGenome } from "@/database/db";
import { useLiveQuery } from "dexie-react-hooks"; 

interface GeneVariantRisksReportPageProps {
    // opensidedrawer: (content: React.ReactNode) => void;
}
const GeneVariantRisksReportPage: React.FC<GeneVariantRisksReportPageProps> = (props) => {  
    const [error, setError] = useState(null); 
    const [selectedPatientProfile, setSelectedPatientProfile] = useState<IPatientProfile | null>(null); 
    const { modelContent, modalVisible, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerContent, drawerVisible, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);
    const isIndexedDatabase = true;

    const router = useRouter(); 

    const handlePatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('handlePatientChange: event', event);
        // http://127.0.0.1:3000/patient/report?patientId=[x]
        router.push(`/patient/report/${event.target.value}`);
    };
  
    const uploadDNAFile = () => {
        console.log("clicked upload button")
        // updateModalContent(<div><h2 className="text-2xl font-bold text-gray-900">Upload Patient File</h2><div className="mt-2 px-7 py-3"><UploadForm /></div></div>);
        // toggleModalVisible(true);
    }  
 
    const patientProfiles = useLiveQuery( 
        async () => patientsIndexedDb.patientProfile.toArray()
    );
    const patientProfilesCount = useLiveQuery(
        async() => patientsIndexedDb.patientProfile.count()
    ); 
    useEffect(() => {
        if (router.isReady) {  
            const patientId = Array.isArray(router.query.patient_id) ? router.query.patient_id[0] : router.query.patient_id; 

            if(patientProfiles) {
                console.log(JSON.stringify(patientProfiles));
                const s = patientProfiles.find((x) => x.patientId == patientId);
                console.log('s', s);
                setSelectedPatientProfile(s);
            } 
        }
    }, [router.isReady, router.asPath, patientProfiles, patientProfilesCount]);   
    
    return (
        <Layout>
            <button
            className="rounded bg-gray-200 px-3 py-1 mt-3 text-xs"
            onClick={uploadDNAFile}
            >
                Upload DNA File
            </button> 

            {!selectedPatientProfile || error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <div className="page-header">Patient Genome (Gene Variants)</div>
                    {/* <Select selectData={patientProfiles} selectDataKey={'patientId'} displayField={'patientName'} selectTitle={"Select a Patient Profile:"} placeholder={"Please choose a patient"} error={error} selectedOption={selectedPatientProfile} handleSelectChange={handlePatientChange} /> */}
                    <p>Patient Profile Count: {patientProfilesCount}</p>
                    <h2 className="table-header">Patient Data</h2>
                    <p className="table-sub-header"><span>Patient ID: </span>{selectedPatientProfile.patientId}</p>
                    <p>{selectedPatientProfile.patientName}</p>
                    <GeneVariantList patient_id={String(selectedPatientProfile.patientId)} /> 
                </div>
            )}
            <style jsx>{`
                p, div, li, input, label, select, button {
                    font-size: 0.8em;
                }
                .page-header { 
                    font-size: 1em;
                    padding: 0.1rem 0 0 0;
                    font-weight: 900;
                }
            `}</style>
        </Layout>
    );
};

export default GeneVariantRisksReportPage;