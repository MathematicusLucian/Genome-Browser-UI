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
import { IPatientGenomeVariant } from "@/models/db";

interface GenomePageProps {
    // opensidedrawer: (content: React.ReactNode) => void;
}
const GenomePage: React.FC<GenomePageProps> = (props) => {  
    const { modelContent, modalVisible, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerContent, drawerVisible, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);
    const [error, setError] = useState(null); 
    // Router
    const router = useRouter();  
  
    const uploadDNAFile = () => {
        updateModalContent(<div><h2 className="text-2xl font-bold text-gray-900">Upload Patient File</h2><div className="mt-2 px-7 py-3"><UploadForm /></div></div>);
        toggleModalVisible(true);
    }  

    // -------
    // Patient
    // -------
    const [selectedPatientProfile, setSelectedPatientProfile] = useState<IPatientProfile | null>(null); 
    const [selectedPatientProfileId, setSelectedPatientProfileId] = useState<string | null>(null); 

    const handleSelectedPatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log('handlePatientChange: event', event);
        // http://127.0.0.1:3000/patient/genome?patientId=[x]
        router.push(`/patient/genome/${event.target.value}`);
    };
 
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
                const patientProfileMatch = patientProfiles.find((x) => x.patientId == patientId);
                setSelectedPatientProfile(patientProfileMatch);
                console.log('patientProfileMatch', patientProfileMatch.patientId);
                setSelectedPatientProfileId(patientProfileMatch.patientId);
            } 
        }
    }, [router.isReady, router.asPath, patientProfiles, patientProfilesCount]);   

    // ------
    // Genome
    // ------

    const [selectedPatientGenome, setSelectedPatientGenome] = useState<IPatientGenome | null>(null);  
    const [selectedPatientGenomeId, setSelectedPatientGenomeId] = useState<string| null>(null);

    const handleSelectedPatientGenomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('handleGenomeChange: event', event.target.value); 
        // if(patientProfiles) { 
        //     const patientGenomeMatch = selectedPatientGenomes.find((x) => x.patientGenomeId == event.target.value);
            // setSelectedPatientGenome(patientGenomeMatch);
            // setSelectedPatientGenomeId(event.target.value); 
        // }
    }; 
    
    const selectedPatientGenomes = useLiveQuery(// IPatientGenome[]
        async () => {
            // console.log('selectedPatientProfileId', selectedPatientProfileId);
            const x = patientsIndexedDb.patientGenome.where('patientId').equalsIgnoreCase(String(selectedPatientProfileId)).toArray(); 
            // console.log(x);
            x.then((xx) => {
                // console.log(xx);
            }); 
            return x;
        },
        [selectedPatientProfileId]
    );  

    // useEffect(() => { 
    //     if(selectedPatientGenomes) {
    //         // console.log(JSON.stringify(selectedPatientGenomes));
    //         const patientProfileMatch = selectedPatientGenomes.find((x) => x.patientId == patientId);
    //         setSelectedPatientProfile(patientProfileMatch);
    //     }  
    // }, [patientProfiles, patientProfilesCount]);   

    // ------------------
    // Gene Variants List
    // ------------------

    const [selectedPatientGeneVariant, setSelectedPatientGeneVariant] = useState<IPatientGenomeVariant | null>(null); 
    const [selectedPatientGeneVariantId, setSelectedPatientGeneVariantId] = useState<string| null>(null); 
    
    const selectedPatientGenomeVariants = useLiveQuery(// IPatientGeneVariant[]
        async () => {
            // console.log('selectedPatientProfileId', selectedPatientProfileId);
            const x = patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray(); 
            console.log(x);
            x.then((xx) => {
                console.log(xx);
            }); 
            return [];
        },
        [selectedPatientGenomeId]
    );  
    
    return (
        <Layout>
            <div className="page-header">Patient Genome (Gene Variants) Viewer</div>

            <p>Patient Profile Count: {patientProfilesCount}</p>            
            <Select selectData={patientProfiles} selectDataKey={'patientId'} displayField={'patientName'} selectTitle={"Select a Patient Profile:"} placeholder={"Please choose a patient"} error={error} selectedOption={selectedPatientProfile} handleSelectChange={handleSelectedPatientChange} />
            
            <br />
            <h2 className="table-header">Patient Data</h2>

            {!selectedPatientProfile || error ? (
                <div>Please provide a patient profile ID. If the table is empty, the profile may not exist. {error}</div>
            ) : (
                <div>
                    <p className="table-sub-header"><span>Patient ID: </span>{selectedPatientProfile.patientId}</p>
                    {(JSON.stringify(selectedPatientProfile))} 
                    <br />
                    <hr />

                    <button
                        className="rounded bg-gray-200 px-3 py-1 mt-3 text-xs"
                        onClick={uploadDNAFile}
                    >
                        Upload DNA File
                    </button> 
                    <br /><br />
                    <hr /> 

                    {!selectedPatientGenomes ? (
                        <div>No genomes. Perhaps no DNA file has been uploaded. {error}</div>
                    ) : (
                        <div>
                            selectedPatientGenomes: {( JSON.stringify(selectedPatientGenomes ))} 
                            <p>Patient DNA files Count: {selectedPatientGenomes.length}</p>
                            <Select selectData={selectedPatientGenomes} selectDataKey={'patientGenomeId'} displayField={'patientGenomeId'} selectTitle={"Select a Genome:"} placeholder={"Please choose a genome"} error={error} selectedOption={selectedPatientGenome} handleSelectChange={handleSelectedPatientGenomeChange} />
                            {/* 
                            {!selectedPatientGenomeId ? (
                                <div>Please provide a patient genome ID. If the table is empty, the profile may not exist. {error}</div>
                            ) : (
                                <div>                            
                                    <p className="table-sub-header"><span>Patient Genome ID: </span>{selectedPatientGenome.patientGenomeId}</p>
                                    <hr />
                                    <strong>Gene Variants:</strong><br />
                                    {/* <h2 className="table-header">Genome Data</h2>
                                    <p className="table-sub-header"><span>Genome ID: </span>{selectedPatientSelectedGenome.patientGenomeId}</p> */}
                                    {/* <p>{selectedPatientSelectedGenome.patientGenomeId}</p> */}
                                    {/* <GeneVariantList patient_id={String(selectedPatientSelectedGenome.patientGenomeId)} />  */} 
                            {/*}    </div>
                            )}  */}
                        </div>
                    )} 
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