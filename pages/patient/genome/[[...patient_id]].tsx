'use client'
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from 'next/router';
import { ModalContext, DrawerContext } from '../../../context';
import Layout from '../../../components/Layout';
import Select from '../../../components/Select'; 
import UploadForm from '../../../components/UploadForm'; 
import GeneVariantList from "@/components/GeneVariantList";
import TableGrid from '../../../components/TableGrid'; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
                if(patientProfileMatch) {
                    setSelectedPatientProfile(patientProfileMatch);
                    setSelectedPatientProfileId(patientProfileMatch.patientId);
                }
            } 
        }
    }, [router.isReady, router.asPath, patientProfiles, patientProfilesCount]);   

    // ------
    // Genome
    // ------

    const [selectedPatientGenome, setSelectedPatientGenome] = useState<IPatientGenome | null>(null);  
    const [selectedPatientGenomeId, setSelectedPatientGenomeId] = useState<string| null>(null);

    const handleSelectedPatientGenomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const targetPatientGenomeId = event.target.value;
        console.log(targetPatientGenomeId);
        setSelectedPatientGenomeId(targetPatientGenomeId); 
        const targetPatientGenome = selectedPatientGenomes.find((x) => x.patientGenomeId = targetPatientGenomeId);
        console.log(targetPatientGenome);
        setSelectedPatientGenome(targetPatientGenome); 
    }; 
    
    const selectedPatientGenomes = useLiveQuery(// IPatientGenome[]
        async () => { 
            const x = patientsIndexedDb.patientGenome.where('patientId').equalsIgnoreCase(String(selectedPatientProfileId)).toArray();  
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
            const x = patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();  
            return x;
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
                    <p className="table-sub-header"><span>Patient ID: </span>{selectedPatientProfile.patientId}, <span>Patient Name: </span>{selectedPatientProfile.patientName}</p>

                    <Separator className="my-4" />

                    <Button
                        className="rounded px-3 py-1 mt-3 text-xs border-zinc-950 dark:border-zinc-200"
                        variant="outline"
                        onClick={uploadDNAFile}
                    >
                        Upload DNA File
                    </Button> 

                    <Separator className="my-4" />
                    {/* {(JSON.stringify(selectedPatientGenomes))} */}
                    {!selectedPatientGenomes ? (
                        <div>No genomes. Perhaps no DNA file has been uploaded. {error}</div>
                    ) : (
                        <div>
                            selectedPatientGenomes: {( JSON.stringify(selectedPatientGenomes ))} 
                            <p>Patient DNA files Count: {selectedPatientGenomes.length}</p>
                            <Select selectData={selectedPatientGenomes} selectDataKey={'patientGenomeId'} displayField={'patientGenomeId'} selectTitle={"Select a Genome:"} placeholder={"Please choose a genome"} error={error} selectedOption={selectedPatientGenome} handleSelectChange={handleSelectedPatientGenomeChange} />

                            {!selectedPatientGenomes || !selectedPatientGenome? (
                                <div>No gene variants. Perhaps no DNA file has been uploaded. {error}</div>
                            ) : (                                                  
                                // <p className="table-sub-header"><span>Patient Genome ID: </span>{selectedPatientGenome.patientGenomeId}</p>
                                <hr />

                                // {!selectedPatientGenomeVariants ? (
                                //     <div>Please provide a patient genome ID. If the table is empty, the profile may not exist. {error}</div>
                                // ) : (
                                //     <div>       
                                //         <h2 className="table-header">Gene Variants</h2>  
                                //         {(JSON.stringify(selectedPatientGenomeVariants))}
                                //         {/* <GeneVariantList patient_id={String(selectedPatientGenomeVariants)} />   */}
                                //     </div>
                                // )} 
                            )} 
                            
                        </div>
                    )} 

                </div>
            )} 
            <style jsx>{`
                p, div, li, input, label, select, button {
                    font-size: 0.8rem;
                }
                .page-header { 
                    font-size: 1rem;
                    padding: 0.1rem 0 0 0;
                    font-weight: 900;
                }
                .table-header { 
                    font-size: 1rem;
                    padding: 0.1rem 0 0 0;
                    font-weight: 900;
                }
                .table-sub-header span {
                    font-weight: 900;
                }
                .profile-count {
                    font-size: 0.8rem;
                    font-weight: 600;
                    padding: 0.5rem;
                }
            `}</style> 
        </Layout>
    );
};

export default GenomePage;