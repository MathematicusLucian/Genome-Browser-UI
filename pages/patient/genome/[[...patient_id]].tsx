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

interface GenonePageProps {
    // opensidedrawer: (content: React.ReactNode) => void;
}
const GenonePage: React.FC<GenonePageProps> = (props) => {  
    const [error, setError] = useState(null); 
    const [selectedPatientProfile, setSelectedPatientProfile] = useState<IPatientProfile | null>(null); 
    const { modelContent, modalVisible, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerContent, drawerVisible, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);
    const isIndexedDatabase = true;

    const router = useRouter(); 

    console.log(props);

    const handlePatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('handlePatientChange: event', event);
        // http://127.0.0.1:3000/patient/report?patientId=[x]
        router.push(`/patient/genome/${event.target.value}`);
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
                const patientProfileMatch = patientProfiles.find((x) => x.patientId == patientId);
                setSelectedPatientProfile(patientProfileMatch);
            } 
        }
    }, [router.isReady, router.asPath, patientProfiles, patientProfilesCount]);   
    
    return (
        <Layout>
            <div className="page-header">Patient Genome (Gene Variants)</div>
            <Select selectData={patientProfiles} selectDataKey={'patientId'} displayField={'patientName'} selectTitle={"Select a Patient Profile:"} placeholder={"Please choose a patient"} error={error} selectedOption={selectedPatientProfile} handleSelectChange={handlePatientChange} />
            <h2 className="table-header">Patient Data</h2>
            <p>Patient Profile Count: {patientProfilesCount}</p>
            {!selectedPatientProfile || error ? (
                <div>Please provide a patient profile ID. If the table is empty, the profile may not exist. {error}</div>
            ) : (
                <div>
                    <p className="table-sub-header"><span>Patient ID: </span>{selectedPatientProfile.patientId}</p>
                    <button
                        className="rounded bg-gray-200 px-3 py-1 mt-3 text-xs"
                        onClick={uploadDNAFile}
                    >
                        Upload DNA File
                    </button> 
                    {/* <Select selectData={genomeProfiles} selectTitle={"Select a DNA file to browse:"} placeholder={"Please choose a genome"} error={error} selectedOption={selectedGenomeProfile} handleSelectChange={handleGenomeChange} />
                    <p>Patient DNA files Count: {pgenomeProfilesCount}</p>
                    <h2 className="table-header">Genome Data</h2> */}
                    {/* <p className="table-sub-header"><span>Genome ID: </span>{selectedPatientGenome.patientGenomeId}</p>
                    <p>{selectedPatientGenome.patientGenomeId}</p>
                    <GeneVariantList patient_id={String(selectedPatientGenome.patientGenomeId)} />  */}
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
                .table-header { 
                font-size: 1em;
                padding: 0.1rem 0 0 0;
                font-weight: 900;
                }
                .profile-count {
                font-size: 0.8em;
                font-weight: 600;
                padding: 0.5em;
                }
            `}</style> 
        </Layout>
    );
};

export default GenonePage;