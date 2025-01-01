'use client'
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from 'next/router';
import PrivateLayout from '@/pages/PrivateLayout';
import { Separator } from "@radix-ui/react-separator";
import { DrawerContext, ModalContext } from "@/context";
import ReportView from "@/components/ReportView";
import ReportGridWrapper from "@/components/ReportGridWrapper";
import { IPatientProfile, IPatientGenome, IPatientGenomeVariant, IFullReport, IChromosome } from "@/models/database";
import { useLiveQuery } from "dexie-react-hooks";
import { patientsIndexedDb } from "@/database/database";
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { setSelectedPatientProfile, addPatientProfile, setSelectedPatientGenome, setSelectedPatientGeneVariant } from "@/state/features/patient/patientSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/state-hooks";
import { date } from "yup";
import { selectSelectedChromosome, selectedChromosomeUpdated } from "@/state/features/geneDefinition/geneDefinitionSlice";
import { usePostSnpDataByRsidQuery } from "@/state/features/research/researchApi";

// --------------------------------------------------------------------------------------------
// Risk Report 
// (Comparing Patient Gene Variants with Published Literature, e.g. SNP data, such as ClinVar.)
// ---------------------------------------------------------------------------------------------

interface RiskReportPageProps {
}

const RiskReportPage: React.FC<RiskReportPageProps> = (props) => {  
    const { modalTitle, modelContent, modalVisible, updateModalTitle, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerTiitle, drawerContent, drawerVisible, updateDrawerTitle, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);

    // ------
    // Router
    // ------

    const router = useRouter();  

    // -----
    // Redux
    // -----

    const dispatch = useAppDispatch(); 

    // ----------------------
    // Data: Patient Profiles
    // ----------------------

    // Filter #1

    // Fetch patient profiles from IndexedDB
    const patientProfiles = useLiveQuery(
        () => patientsIndexedDb.patientProfile
            .toArray()
    ); 
    // const patientProfilesX = useSelector((state: RootState) => state.patient.patientProfile); 

    // Fetch selected patient profile from Redux store
    const selectedPatientSelectedProfile = useSelector((state: RootState) => state.patient.selectedPatientProfile);
    // const yy = useAppSelector((state) => selectSelectedPatientProfile(state));

    // Dispatch actions for patient profiles
    const handleSelectPatient = (patientProfile) => { //  (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedPatientProfile(patientProfile));  
    };
    const handleAddPatient = async (patientProfile) => {  //  (event: React.ChangeEvent<HTMLSelectElement>) => {
        await patientsIndexedDb.patientProfile.add(patientProfile);
    };
    // End: Filter #1
    
    // Effect: Retrieve patient profile ID from URL
    useEffect(() => {
        if (router.isReady) {
            if(patientProfiles) { 
                const patientIdFromRouter = String(router.query.patient_id); 
                const patientProfileMatchingPatientIdFromRouter = patientProfiles.find((x) => {
                    return x.patientId == patientIdFromRouter;
                });
                console.log('patientProfileMatchingPatientIdFromRouter', patientProfileMatchingPatientIdFromRouter);
                if(patientProfileMatchingPatientIdFromRouter) {
                    dispatch(setSelectedPatientProfile(patientProfileMatchingPatientIdFromRouter));  
                    // http://127.0.0.1:3000/patient/genome?patientId=[x]
                    selectedPatientSelectedProfile && router.push(`/patient/report/${selectedPatientSelectedProfile.patientId}`); 
                }
            }   
        }
    }, [router.isReady, router.asPath, patientProfiles, selectedPatientSelectedProfile]); 

    // --------------------
    // Data: Patient Genome
    // --------------------

    // Filter #2

    // Fetch selected patient's genome from IndexedDB
    const patientGenome = useLiveQuery(
        () => selectedPatientSelectedProfile?.patientId && 
            patientsIndexedDb.patientGenome
            .where('patientId').equalsIgnoreCase(String(selectedPatientSelectedProfile.patientId)).toArray()[0]
    );

    const selectedPatientSelectedGenome = useSelector((state: RootState) => state.patient.selectedPatientGenome); // dashboard attribute 

    // Dispatch actions for patient profiles
    const handleSelectedPatientGenomeChange = (patientGenome: any) => { // (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedPatientGenome(patientGenome));  
    };
    // End Filter #2
    
    // -----------
    // Chromosomes
    // ----------- 

    // Filter #3

    const chromosomesList: IChromosome[] = useLiveQuery(// IChromosome[]
        async () => patientsIndexedDb.chromosome.toArray()
    ); 

    const selectedPatientSelectedChromosome: IChromosome = useSelector((state: RootState) => state.geneDefinition[0].selectedChromosome); // dashboard attribute 

    const handleSelectedChromosomeChange =  (chromosome: any) => { // (event: React.ChangeEvent<HTMLSelectElement>) => {
        // const targetChromosome = chromosomesList.find((x) => x['chromosomeName'] == chromosome); 
        dispatch(selectedChromosomeUpdated(chromosome));   
    };
    // End Filter #3

    // -----------------------------
    // Data: Patient Genome Variants
    // -----------------------------

    // Fetch selected patient's genome variants from IndexedDB
    const selectedPatientGeneVariants = useLiveQuery(
        () => selectedPatientSelectedGenome?.patientGenomeId && selectedPatientSelectedChromosome?.chromsomeName &&
            patientsIndexedDb.patientGenomeVariant
            .where({
            'patientGenomeId': String(selectedPatientSelectedGenome.patientGenomeId), 
            'chromosome': selectedPatientSelectedChromosome.chromsomeName
        }).toArray()
    ); 
    const selectedPatientSelectedGeneVariant: IPatientGenomeVariant = useSelector((state: RootState) => state.patient.selectedPatientGeneVariant); // dashboard attribute 

    const handleSelectedPatientGeneVariantChange =  (chromosome: any) => { // (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedPatientGeneVariant(chromosome));   
    };

    // // ------------------------------------------
    // // Data Enrichment: SNP Pairs (ClinVar, etc.)
    // // ------------------------------------------

    const { data, error, isLoading }: any = usePostSnpDataByRsidQuery(['rs429358']);

    // const enrichedData = (rsids: string[], patientGeneVariants: any) => {
    //     const { data, error, isLoading }: any = usePostSnpDataByRsidQuery(rsids); // ClinVar data

    //     const enrichmentResult = patientGeneVariants && patientGeneVariants.map((patientVariant) => {

    //         data && data.map((clinVar) => { 

    //             if(clinVar.rsid == patientVariant.rsid) {
                    
    //                 const clinVarGenotype = String(clinVar.allele1 + clinVar.allele2); 
    //                 const clinVarGenotypeReversed = String(clinVar.allele2 + clinVar.allele1);
    //                 const isAlleleMatch = clinVarGenotype == String(patientVariant.genotype);
    //                 const isAlleleMatchReversed = clinVarGenotypeReversed == String(patientVariant.genotype);
    //                 const alleleMatchBidirectional = isAlleleMatch || isAlleleMatchReversed;

    //                 if(alleleMatchBidirectional) {
    //                     patientVariant.notes = clinVar.notes;  
    //                 }

    //             }

    //         })
    
    //         return patientVariant;
    //     });
    //     return enrichmentResult;
    // }

    // // const enrichPatientVariantsDataWithClinVarNotes = async (dexieResponse) => {
    // //     const mockClinVarNotesData = fetchClinVarNotes();

    // //     const enrichmentResult = await dexieResponse.map((patientVariant) => {
    // //         for(let snp in clinVarData) {
    // //             if(mockClinVarNotesData[snp]['rsid'] == patientVariant.rsid) {
    // //                 patientVariant['notes'] = mockClinVarNotesData[snp]['notes'];
    // //             }
    // //         }
    // //         return patientVariant;
    // //     })

    // //     return enrichmentResult;
    // // };

    // const enrichedDataRows: any = [];

    // --------------
    // Drawer Content
    // --------------
    
    const handleSelectedDataRowChange = (e) => {
        updateDrawerTitle("Risk/SNP (Gene Variant) Details");
        updateDrawerContent(genomeDetailsDrawerContent(e)); 
        toggleDrawerVisible(true);
    }
    
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

    // ---------------
    // Dashboard Setup
    // ---------------
    
    const dashboardTitle = 'Patient Risk Report';

    // Grid Setup
        
    const riskReportColumns = [
        {"headerName":"rsid","field":"rsid", flex: 2, maxWidth: 100},
        {"headerName":"genotype","field":"genotype", flex: 1, maxWidth: 80},
        {"headerName":"notes","field":"notes", flex: 4, maxWidth: 500},
        {"headerName":"magnitude","field":"magnitude", flex: 1, maxWidth: 100},
        {"headerName":"chromosome","field":"chromosome", flex: 1, maxWidth: 140},
        {"headerName":"position","field":"position", flex: 1, maxWidth: 120},
        {"headerName":"datetimestamp","field":"datetimestamp", flex: 2, maxWidth: 120}, 
        {"headerName":"patientId","field":"patientId", flex: 2, maxWidth: 120}, 
        {"headerName":"patientGenomeId","field":"patientGenomeId", flex: 2, maxWidth: 120},
    ]; 

    return (
        <PrivateLayout isSidebar={true}>

            {/* <ul>
                {patientProfiles && patientProfiles.map((profile) => (
                    <li key={profile.patientId} onClick={() => handleSelectPatient(profile)}>
                        {profile.patientName}
                    </li>
                ))}
            </ul> */}
            {/* <button className="my-5" onClick={handleAddPatient}>Add Patient</button> */}
            
            {selectedPatientSelectedProfile && <p>Selected: {selectedPatientSelectedProfile.patientName} | {selectedPatientSelectedProfile.patientId}</p>}

            <ReportView dashboardTitle={dashboardTitle} updateRoute={handleSelectPatient}>  a
                {/* <ReportGridWrapper riskReportRowsData={enrichedDataRows} columns={riskReportColumns} handleSelectedDataRowChange={handleSelectedDataRowChange} /> */}
            </ReportView>

        </PrivateLayout>
    );
};

export default RiskReportPage;

function fetchClinVarNotes() {
    throw new Error("Function not implemented.");
}
