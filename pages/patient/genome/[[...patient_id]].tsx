'use client'
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from 'next/router';
import { ModalContext, DrawerContext } from '../../../context';
import Layout from '@/components/Layout';
import Select from '@/components/Select'; 
import UploadForm from '@/components/UploadForm'; 
import GeneVariantList from "@/components/GeneVariantList";
import TableGrid from '@/components/TableGrid'; 
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
    const [patientId, setPatientId] = useState<string>('');
    const [error, setError] = useState(null); 
    // Router
    const router = useRouter();  

    const createNewPatient = () => {
        updateModalContent(<div><h2 className="text-2xl font-bold text-gray-900">Create New patient</h2><div className="mt-2 px-7 py-3">CreatePatientForm</div></div>);
        toggleModalVisible(true);
    }
  
    const uploadDNAFile = () => {
        updateModalContent(<div><h2 className="text-2xl font-bold text-gray-900">Upload Patient File</h2><div className="mt-2 px-7 py-3"><UploadForm patientIdFromParentComponent={patientId} /></div></div>);
        toggleModalVisible(true);
    }  

    const handleSelectedDataRowChange = () => {}

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
            const p = Array.isArray(router.query.patient_id) ? router.query.patient_id[0] : router.query.patient_id;  
            console.log('p', p);
            setPatientId(p);
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

    const columns = [
        {"headerName":"rsid","field":"rsid", flex: 2, maxWidth: 100},
        {"headerName":"genotype","field":"genotype", flex: 1, maxWidth: 80},
        {"headerName":"chromosome","field":"chromosome", flex: 1, maxWidth: 100},
        {"headerName":"position","field":"position", flex: 2, maxWidth: 120},
        {"headerName":"datetimestamp","field":"datetimestamp", flex: 1, maxWidth: 120}, 
        {"headerName":"patientId","field":"patientId", flex: 1, maxWidth: 280}, 
        {"headerName":"patientGenomeId","field":"patientGenomeId", flex: 1, maxWidth: 280},
    ];
    
    return (
        <Layout>
            <div className="page-header">Patient Genome (Gene Variants) Viewer</div>

            <div className="flex flex-row">

                <Button
                    className="flex-1 rounded px-3 py-1 mt-3 text-xs border-zinc-950 dark:border-zinc-200 bg-slate-100 dark:bg-gray-950 text-zinc-950 dark:text-white"
                    variant="outline"
                    onClick={createNewPatient}
                >
                    Create New Patient
                </Button> 

                {patientId && (<Button
                    className="flex-1 rounded px-3 py-1 mt-3 text-xs border-zinc-950 dark:border-zinc-200 bg-slate-100 dark:bg-gray-950 text-zinc-950 dark:text-white"
                    variant="outline"
                    onClick={uploadDNAFile}
                >
                    Upload DNA File
                </Button>)}

            </div>
            
            <Separator className="my-2" /> 

            <p><em>Patient Profile Count: {patientProfilesCount}</em></p>      

            <Select selectData={patientProfiles} selectDataKey={'patientId'} displayField={'patientName'} selectTitle={"Select a Patient Profile:"} placeholder={"Please choose a patient"} error={error} selectedOption={selectedPatientProfile} handleSelectChange={handleSelectedPatientChange} />
            
            <Separator className="my-4" /> 
            
            <p className="table-sub-header"><span>Patient Data</span></p>

            {!selectedPatientProfile || error ? (
                <div>Please provide a patient profile ID. If the table is empty, the profile may not exist. {error}</div>
            ) : (
                <div>
                    <p className="table-sub-header"><span>Patient Name: </span>{selectedPatientProfile.patientName} | <span>Patient ID: </span>{selectedPatientProfile.patientId}</p>

                    {!selectedPatientGenomes ? (
                        <div>No genomes. Perhaps no DNA file has been uploaded. {error}</div>
                    ) : (
                        <div>
                            <Separator className="my-4" /> 

                            <p><em>Patient DNA files Count: {selectedPatientGenomes.length}</em></p>
                            <Select selectData={selectedPatientGenomes} selectDataKey={'patientGenomeId'} displayField={'patientGenomeId'} selectTitle={"Select a Genome:"} placeholder={"Please choose a genome"} error={error} selectedOption={selectedPatientGenome} handleSelectChange={handleSelectedPatientGenomeChange} />

                            {!selectedPatientGenome ? (
                                <div>No gene variants. Perhaps no DNA file has been uploaded. {error}</div>
                            ) : (                  
                                <>                            
                                    <Separator className="my-4" /> 
                                    
                                    <p className="table-sub-header"><span>Patient Genome ID: </span>{selectedPatientGenome.patientGenomeId} | <span>Date:</span> {selectedPatientGenome.patientGenomeId}</p> 

                                    <GeneVariantList geneVariantList={selectedPatientGenomeVariants} columns={columns} handleSelectedDataRowChange={handleSelectedDataRowChange} />     
                                </>   
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