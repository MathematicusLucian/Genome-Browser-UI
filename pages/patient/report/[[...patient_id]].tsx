'use client'
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from 'next/router';
import { ModalContext, DrawerContext } from '../../../context';
import Layout from '@/components/Layout';
import Select from '@/components/Select'; 
import CreatePatientForm from "@/components/CreatePatientForm";
import UploadForm from '@/components/UploadForm';  
import RiskReport from "@/components/RiskReport"; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { patientsIndexedDb} from "@/database/db";
import { useLiveQuery } from "dexie-react-hooks"; 
import { IChromosome, IPatientProfile, IPatientGenome, IPatientGenomeVariant } from "@/models/db"; 
import DataGridFilter from "@/components/DataGridFllter";

interface GenomePageProps {
}

const GenomePage: React.FC<GenomePageProps> = (props) => {  
    const { modalTitle, modelContent, modalVisible, updateModalTitle, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerTiitle, drawerContent, drawerVisible, updateDrawerTitle, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);
    const [patientId, setPatientId] = useState<string>('');
    const [searchTermEntered, setSearchTermEntered] = useState(null); 
    const [dataStatus, setDataStatus] = useState<string>('');
    const [error, setError] = useState(null); 
    const dashboardTitle = 'Patient Risk Report';

    // ------
    // Router
    // ------

    const router = useRouter();  

    // ------
    // Status
    // ------

    const updateDataStatus = (e: any) => {
        setDataStatus(e);
    }  

    // -------------
    // Modal Content
    // -------------

    const modalContent = (contentSlot: any) => (
        <div className="mt-2 px-7 py-3">{contentSlot}</div>
    );

    const createNewPatient = () => {
        updateModalTitle("Create New Patient");
        updateModalContent(modalContent(<CreatePatientForm />));
        toggleModalVisible(true);
    }
  
    const uploadDNAFile = () => {
        updateModalTitle("Upload Patient File");
        updateModalContent(modalContent(<UploadForm patientIdFromParentComponent={patientId} />));
        toggleModalVisible(true);
    }  
    
    // --------------
    // Drawer Content
    // --------------
    
    const genomeDetailsDrawerContent = (contentSlot) => {
        return (
            <>
                <Separator className="my-4" /> 
                {contentSlot && (
                    <div>
                        {Object.entries(contentSlot).map(([key, value]: any): any => (
                            <p key={key} className='drawer-item'><strong>{key}:</strong> {value}</p>
                        ))}
                    </div>
                )} 
            </>
        );
    };

    const handleSelectedDataRowChange = (e) => {
        updateDrawerTitle("Risk/SNP (Gene Variant) Details");
        updateDrawerContent(genomeDetailsDrawerContent(e)); 
        toggleDrawerVisible(true);
    }

    // --------------------
    // Published Literature
    // -------------------- 

    // Chromosomes

    const [selectedChromosome, setSelectedChromosome] = useState<IChromosome | null>(null);  

    const handleSelectedChromosomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const targeChromosomeId = event.target.value;
        const targetChromosome = chromosomesList.find((x) => x['chromosomeName'] == targeChromosomeId);
        setSelectedChromosome(targetChromosome);
    };
 
    const chromosomesList = useLiveQuery(// IChromosome[]
        async () => patientsIndexedDb.chromosome.toArray()
    ); 

    // Data Enrichment: SNP Pairs (ClinVar, etc.)

    const fetchClinVarNotes = () => {

    };
    const enrichPatientVariantsDataWithClinVarNotes = () => {

    };

    // -------
    // Patient
    // -------

    const [selectedPatientProfile, setSelectedPatientProfile] = useState<IPatientProfile | null>(null);  

    const handleSelectedPatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.value != patientId) { 
            // http://127.0.0.1:3000/patient/genome?patientId=[x]
            router.push(`/patient/report/${event.target.value}`);
        }
    };
 
    const patientProfiles = useLiveQuery( 
        async () => patientsIndexedDb.patientProfile.toArray()
    ); 

    useEffect(() => {

        if (router.isReady) {
            const patientIdFromRouter = Array.isArray(router.query.patient_id) ? router.query.patient_id[0] : router.query.patient_id;   
            setPatientId(patientIdFromRouter);
            if(patientProfiles) { 
                const patientProfileMatch = patientProfiles.find((x) => x.patientId == patientId);
                if(patientProfileMatch) {
                    setSelectedPatientProfile(patientProfileMatch);
                }
            } 
        }
    }, [router.isReady, router.asPath, patientProfiles]);   

    // --------------
    // Patient Genome
    // --------------

    const [selectedPatientGenome, setSelectedPatientGenome] = useState<IPatientGenome | null>(null);  
    const [selectedPatientGenomeId, setSelectedPatientGenomeId] = useState<string| null>(null);

    const handleSelectedPatientGenomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
         const targetPatientGenomeId = event.target.value;
        setSelectedPatientGenomeId(targetPatientGenomeId); 
        const targetPatientGenome = selectedPatientGenomes.find((x) => x.patientGenomeId = targetPatientGenomeId);
        setSelectedPatientGenome(targetPatientGenome); 
    }; 
    
    const selectedPatientGenomes = useLiveQuery(// IPatientGenome[]
        async () => { 
             const dexieResponse = patientsIndexedDb.patientGenome.where('patientId').equalsIgnoreCase(String(patientId)).toArray();  
             return dexieResponse;
        },
        [patientId] 
    );

    // --------------------------------------------------------------------------------------------
    // Risk Report 
    // (Comparing Patient Gene Variants with Published Literature, e.g. SNP data, such as ClinVar.)
    // --------------------------------------------------------------------------------------------
    
    const selectedPatientGenomeVariants = useLiveQuery(// IPatientGeneVariant[]
        async () => {
            let dexieResponse: any = [];
            // searchTermEntered("cancer");
            if(selectedPatientGenomeId && searchTermEntered) {
                dexieResponse = patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();  
            } else if(selectedPatientGenomeId && !selectedChromosome) {
                dexieResponse = patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();  
            } else if(selectedPatientGenomeId && selectedChromosome) {
                const chromosomeToQueryBy = selectedChromosome['chromosomeName'].replace('Chromosome','').replace(' ','');
                 dexieResponse = patientsIndexedDb.patientGenomeVariant.where({'patientGenomeId': String(selectedPatientGenomeId), 'chromosome': chromosomeToQueryBy}).toArray();  
            } 
            return dexieResponse;
        },
        [selectedPatientGenomeId, selectedChromosome]
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
            <div className="text-xl">{dashboardTitle}</div>

            <div className="flex flex-row">

                <Button
                    className="flex-0.5 rounded px-3 py-1 mt-3 text-xs border-zinc-950 dark:border-zinc-200 bg-slate-100 dark:bg-gray-950 text-zinc-950 dark:text-white"
                    variant="outline"
                    onClick={createNewPatient}
                >
                    Create New Patient
                </Button> 

                {patientId && (<Button
                    className="flex-0.5 rounded px-3 py-1 mt-3 text-xs border-zinc-950 dark:border-zinc-200 bg-slate-100 dark:bg-gray-950 text-zinc-950 dark:text-white"
                    variant="outline"
                    onClick={uploadDNAFile}
                >
                    Upload DNA File
                </Button>)}

            </div>
            
            <Separator className="my-2" /> 

            <div className="text-xs">{dataStatus}</div>

            <div className="flex flex-row">

                <DataGridFilter 
                    dataAsList={patientProfiles} 
                    error={error}
                    selectedSelectItem={selectedPatientProfile} 
                    handleSelectedItemChange={handleSelectedPatientChange} 
                    selectDataKey={'patientId'} 
                    displayField={'patientName'} 
                    selectTitle={"Patient Profile:"} 
                    placeholder={"Please choose a patient"}
                    updateStatus={updateDataStatus} 
                />
                <DataGridFilter 
                    dataAsList={selectedPatientGenomes} 
                    error={error}
                    selectedSelectItem={selectedPatientGenome} 
                    handleSelectedItemChange={handleSelectedPatientGenomeChange} 
                    selectDataKey={'patientGenomeId'} 
                    displayField={'datetimestamp'} 
                    selectTitle={"Genome:"} 
                    placeholder={"Please choose a DNA file"}
                    updateStatus={updateDataStatus} 
                />

                <DataGridFilter 
                    dataAsList={chromosomesList} 
                    error={error}
                    selectedSelectItem={selectedPatientGenome} 
                    handleSelectedItemChange={handleSelectedChromosomeChange} 
                    selectDataKey={'chromosomeName'} 
                    displayField={'chromosomeName'} 
                    selectTitle={"Chromosome:"} 
                    placeholder={"Please choose a chromosome"}
                    updateStatus={updateDataStatus} 
                />

            </div>

            <Separator className="my-4" /> 

            <RiskReport riskReportRowsData={selectedPatientGenomeVariants} columns={columns} handleSelectedDataRowChange={handleSelectedDataRowChange} />
    
        </Layout>
    );
};

export default GenomePage;