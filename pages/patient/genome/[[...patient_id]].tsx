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

interface GenomePageProps {
    // opensidedrawer: (content: React.ReactNode) => void;
}
const GenomePage: React.FC<GenomePageProps> = (props) => {  
    const [error, setError] = useState(null); 
    const [selectedPatientProfile, setSelectedPatientProfile] = useState<IPatientProfile | null>(null); 
    const { modelContent, modalVisible, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerContent, drawerVisible, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);
    const isIndexedDatabase = true;

    const router = useRouter();  

    const handlePatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('handlePatientChange: event', event);
        // http://127.0.0.1:3000/patient/genome?patientId=[x]
        router.push(`/patient/genome/${event.target.value}`);
    };
  
    const uploadDNAFile = () => {
        updateModalContent(<div><h2 className="text-2xl font-bold text-gray-900">Upload Patient File</h2><div className="mt-2 px-7 py-3"><UploadForm /></div></div>);
        toggleModalVisible(true);
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
                // console.log(JSON.stringify(patientProfiles));
                const patientProfileMatch = patientProfiles.find((x) => x.patientId == patientId);
                setSelectedPatientProfile(patientProfileMatch);
            } 
        }
    }, [router.isReady, router.asPath, patientProfiles, patientProfilesCount]);   

    // Gene Variants List

    const [selectedGenomeId, setSelectedGenomeId] = useState<string| null>(null);
    // const [selectedPatientGenome, setsSelectedPatientGenome] = useState<IPatientGenome | null>(null);
    
    const selectedPatientGenomes = useLiveQuery(// IPatientGenome[]
        // async () => patientsIndexedDb.patientGenome.toArray()
        async () => patientsIndexedDb.patientGenome.where('patientId').equals("aa1205b7-504b-4b3e-a9dc-d9b67e4f08b3").toArray()
        // async () => patientsIndexedDb.patientGenome.where('patientId').anyOf().toArray()
        //.toArray(),
        // .equals(selectedPatientProfile.patientId)
        // [selectedPatientProfile]
    );
    console.log(JSON.stringify(selectedPatientGenomes));
    // const selectedPatientGenomesCount = useLiveQuery(
    //     async() => patientsIndexedDb.patientGenome.count()
    // ); 
    // const selectedPatientSelectedGenome = useLiveQuery(// IPatientGenome[]
    //     async () => patientsIndexedDb.patientGenome.where('patientGenomeId').equals(selectedGenomeId).toArray(),
    //     [selectedGenomeId]
    // );

    const handleGenomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('handleGenomeChange: event', event);
        // http://127.0.0.1:3000/patient/genome?patientId=[x]
        // router.push(`/patient/genome/${event.target.value}`);

        setSelectedGenomeId(event.target.value); 
    };
    
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
                    {/* <Select selectData={selectedPatientGenomes} selectDataKey={'patientGenomeId'} displayField={'datetimestamp'} selectTitle={"Select a DNA file to browse:"} placeholder={"Please choose a genome"} error={error} selectedOption={selectedPatientGenomes} handleSelectChange={handleGenomeChange} />
                    <p>Patient DNA files Count: {selectedPatientGenomesCount}</p>
                    <h2 className="table-header">Genome Data</h2>
                    <p className="table-sub-header"><span>Genome ID: </span>{selectedPatientSelectedGenome.patientGenomeId}</p>
                    <p>{selectedPatientSelectedGenome.patientGenomeId}</p>
                    <GeneVariantList patient_id={String(selectedPatientSelectedGenome.patientGenomeId)} />  */}
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

export default GenomePage;