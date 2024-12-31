'use client'
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from 'next/router';
import { ModalContext, DrawerContext } from '../../../context';
import PrivateLayout from '@/pages/PrivateLayout';
import Select from '@/components/Select'; 
import CreatePatientForm from "@/components/CreatePatientForm";
import UploadForm from '@/components/UploadForm'; 
import GeneVariantList from "@/components/GeneVariantList"; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { patientsIndexedDb, IPatientProfile, IPatientGenome } from "@/database/database";
import { useLiveQuery } from "dexie-react-hooks"; 
import { IPatientGenomeVariant } from "@/models/database"; 

interface GenomePageProps {
}

const GenomePage: React.FC<GenomePageProps> = (props) => {  
    const { modalTitle, modelContent, modalVisible, updateModalTitle, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerTitle, drawerContent, drawerVisible, updateDrawerTitle, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);
    const [patientId, setPatientId] = useState<string>('');
    const [error, setError] = useState(null); 
    // Router
    const router = useRouter();  

    const createNewPatient = () => {
        updateModalTitle("Create New Patient");
        updateModalContent(<div className="mt-2 px-7 py-3"><CreatePatientForm /></div>);
        toggleModalVisible(true);
    }
  
    const uploadDNAFile = () => {
        updateModalTitle("Upload Patient File");
        updateModalContent(<div className="mt-2 px-7 py-3"><UploadForm patientIdFromParentComponent={patientId} /></div>);
        toggleModalVisible(true);
    }  

    // --------------
    // Drawer Content
    // --------------
    
    const genomeDetailsDrawerContent = (content) => {
        return (
            <>
                <Separator className="my-4" /> 
                {content && (
                    <div>
                        {Object.entries(content).map(([key, value]: any): any => (
                            <p key={key} className='drawer-item'><strong>{key}:</strong> {value}</p>
                        ))}
                    </div>
                )} 
            </>
        );
    };

              
    const handleSelectedDataRowChange = (e) => {
        updateDrawerTitle("Gene Variant Details");
        updateDrawerContent(genomeDetailsDrawerContent(e)); 
        toggleDrawerVisible(true);
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

    // --------------
    // Patient Genome
    // --------------

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
        <PrivateLayout isSidebar={true}>  
            <div className="text-xl">Patient Genome (Gene Variants) Viewer</div> 

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
                            <Select selectData={selectedPatientGenomes} selectDataKey={'patientGenomeId'} displayField={'datetimestamp'} selectTitle={"Select a Genome:"} placeholder={"Please choose a DNA file"} error={error} selectedOption={selectedPatientGenome} handleSelectChange={handleSelectedPatientGenomeChange} />

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
        </PrivateLayout>
    );
};

export default GenomePage;