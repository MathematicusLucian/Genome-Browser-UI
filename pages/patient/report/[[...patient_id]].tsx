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
import { setSelectedPatientProfile, addPatientProfile, setSelectedPatientGenome, setSelectedPatientGeneVariant } from "@/state/features/patient/patientSlice"; // setSelectedChromosome
import { useAppDispatch, useAppSelector } from "@/hooks/state-hooks";
import { date } from "yup";
import { selectSelectedChromosome, selectedChromosomeUpdated } from "@/state/features/geneDefinition/geneDefinitionSlice";
import { usePostSnpDataByRsidQuery } from "@/state/features/research/researchApi";
import _ from "lodash";

// --------------------------------------------------------------------------------------------
// Risk Report 
// (Comparing Patient Gene Variants with Published Literature, e.g. SNP data, such as ClinVar.)
// ---------------------------------------------------------------------------------------------

interface RiskReportPageProps {
}
// React.memo(() => {
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
    const state = useSelector((state: RootState) => state);
    console.log('Entire State:', state);

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
    const key = selectedPatientSelectedProfile ? selectedPatientSelectedProfile.patientId : 'default';

    useEffect(() => {
        console.log('Selected Patient Profile updated:', selectedPatientSelectedProfile);
    }, [selectedPatientSelectedProfile]);

    // Dispatch actions for patient profiles
    const handleSelectPatient = (patientProfile) => { //  (event: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log('click', JSON.stringify(patientProfile));
        // patientProfile = patientProfile || {patientId:"7ddc6c55-c520-4917-870c-111adefb1a14",patientName:"Eric Mombasa (demo profile)",datetimestamp:1735696526200};
        dispatch(setSelectedPatientProfile(patientProfile));   
        // dispatch(setSelectedPatientProfile({
        //     patientId: '123',
        //     patientName: 'John Doe',
        //     datetimestamp: Date.now(),
        // }));
    };
    const handleAddPatient = async (patientProfile) => {  //  (event: React.ChangeEvent<HTMLSelectElement>) => {
        // patientProfile = patientProfile || {"patientId":"7ddc6c55-c520-4917-870c-111adefb1a14","patientName":"Eric Mombasa (demo profile)","datetimestamp":1735696526200};
        await patientsIndexedDb.patientProfile.add(patientProfile);
    };
    // End: Filter #1
    
    // Effect: Retrieve patient profile ID from URL
    useEffect(() => {
        if (router.isReady) {

            if(patientProfiles) {
                const patientProfileMatchingPatientIdFromRouter = patientProfiles?.find((x) => x.patientId == router.query.patient_id);
                if(patientProfileMatchingPatientIdFromRouter) {
                    console.log('patientProfileMatchingPatientIdFromRouter', patientProfileMatchingPatientIdFromRouter);
                    selectedPatientSelectedProfile?.patientId && router.push(`/patient/report/${selectedPatientSelectedProfile?.patientId}`); 
                }
            }

            if(selectedPatientSelectedProfile != null && router.query.patient_id != selectedPatientSelectedProfile?.patientId) {
                // http://127.0.0.1:3000/patient/genome?patientId=[x]
                router.push(`/patient/report/${selectedPatientSelectedProfile?.patientId}`); 
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
            .where('patientId').equalsIgnoreCase(String(selectedPatientSelectedProfile.patientId)).toArray()[0],
        [selectedPatientSelectedProfile]
    ); 

    const selectedPatientSelectedGenome = useSelector((state: RootState) => state.patient.selectedPatientGenome); // dashboard attribute 

    // Dispatch actions for patient profiles
    const handleSelectedPatientGenomeChange = (patientGenome: any) => { // (event: React.ChangeEvent<HTMLSelectElement>) => {
        patientGenome = patientGenome || {patientGenomeId: "1"};
        dispatch(setSelectedPatientGenome(patientGenome));  
    };
    // End Filter #2
    
    // // -----------
    // // Chromosomes
    // // ----------- 

    // // Filter #3

    // const chromosomesList: IChromosome[] = useLiveQuery(// IChromosome[]
    //     async () => patientsIndexedDb.chromosome.toArray()
    // ); 

    // const selectedPatientSelectedChromosome: IChromosome = useSelector((state: RootState) => state.patient.selectedChromosome); // dashboard attribute 

    // const handleSelectedChromosomeChange =  (chromosome: any) => { // (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     // const targetChromosome = chromosomesList.find((x) => x['chromosomeName'] == chromosome); 
    //     chromosome = chromosome || {"chromosomeName":"Chromosome 1","species":"homo-sapiens"};
    //     console.log('chromosome', chromosome);
    //     dispatch(setSelectedChromosome(chromosome));   
    // };
    // // End Filter #3

    // // -----------------------------
    // // Data: Patient Genome Variants
    // // -----------------------------

    // // Fetch selected patient's genome variants from IndexedDB
    // const selectedPatientGeneVariants = useLiveQuery(
    //     () => selectedPatientSelectedGenome?.patientGenomeId && selectedPatientSelectedChromosome?.chromsomeName &&
    //         patientsIndexedDb.patientGenomeVariant
    //         .where({
    //             'patientGenomeId': String(selectedPatientSelectedGenome.patientGenomeId), 
    //             'chromosome': selectedPatientSelectedChromosome.chromsomeName
    //         }).toArray(),
    //     [selectedPatientSelectedGenome, selectedPatientSelectedChromosome]
    // );  

    // const selectedPatientSelectedGeneVariant: IPatientGenomeVariant = useSelector((state: RootState) => state.patient.selectedPatientGeneVariant); // dashboard attribute 

    // const handleSelectedPatientGeneVariantChange =  (geneVariant: any) => { // (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     dispatch(setSelectedPatientGeneVariant(geneVariant));   
    // };  

    // // // -----------------------------------------
    // // // ClinVar Data: SNP Pairs (Genotype/Allele)
    // // // -----------------------------------------

    // // Returns all genotypes/allele pairs for a given SNP :. API has no data (privacy) as to which genotype the patient has
    // // const { data, error, isLoading }: any = usePostSnpDataByRsidQuery(["rs429358", "rs1805007"]); 
    // // console.log(data);

    // // // ------------------------------------------
    // // // Data Enrichment: SNP Pairs (ClinVar, etc.)
    // // // ------------------------------------------

    // function merge_object_arrays (arr1, arr2, match) {
    //     return _.union(
    //     _.map(arr1, function (obj1) {
    //         var same = _.find(arr2, function (obj2) {
    //         return obj1[match] === obj2[match];
    //         });
    //         return same ? _.extend(obj1, same) : obj1;
    //     }),
    //     _.reject(arr2, function (obj2) {
    //         return _.find(arr1, function(obj1) {
    //         return obj2[match] === obj1[match];
    //         });
    //     })
    //     );
    // }

    // // Effect: Retrieve enrichedData
    // // useEffect(() => {
    //     // console.log(
    //     //     'enrichedData',
    //     //     merge_object_arrays(data, selectedPatientGeneVariants, 'rsid')
    //     //         .find((x) => x.rsid == 'rs429358')
    //     // ); 
    // // }, [data, selectedPatientGeneVariants]); 
    // // }, [selectedPatientGeneVariants]);


    // handleSelectPatient({});

    // // --------------
    // // Drawer Content
    // // --------------
    
    // const handleSelectedDataRowChange = (e) => {
    //     updateDrawerTitle("Risk/SNP (Gene Variant) Details");
    //     updateDrawerContent(genomeDetailsDrawerContent(e)); 
    //     toggleDrawerVisible(true);
    // }
    
    // const genomeDetailsDrawerContent = (contentSlot) => {
    //     return (
    //         <>
    //             <Separator className="my-4" /> 
    //             {contentSlot && ( 
    //                 <div>
    //                     {Object.entries(contentSlot).map(([key, value]: any): any => (
    //                         <p key={key} className='drawer-item'><strong>{key}:</strong> {value}</p>
    //                     ))}
    //                 </div>
    //             )} 
    //         </>
    //     );
    // };

    // // ---------------
    // // Dashboard Setup
    // // ---------------
    
    // const dashboardTitle = 'Patient Risk Report';

    // // Grid Setup
        
    // const riskReportColumns = [
    //     {"headerName":"rsid","field":"rsid", flex: 2, maxWidth: 100},
    //     {"headerName":"genotype","field":"genotype", flex: 1, maxWidth: 80},
    //     {"headerName":"notes","field":"notes", flex: 4, maxWidth: 500},
    //     {"headerName":"magnitude","field":"magnitude", flex: 1, maxWidth: 100},
    //     {"headerName":"chromosome","field":"chromosome", flex: 1, maxWidth: 140},
    //     {"headerName":"position","field":"position", flex: 1, maxWidth: 120},
    //     {"headerName":"datetimestamp","field":"datetimestamp", flex: 2, maxWidth: 120}, 
    //     {"headerName":"patientId","field":"patientId", flex: 2, maxWidth: 120}, 
    //     {"headerName":"patientGenomeId","field":"patientGenomeId", flex: 2, maxWidth: 120},
    // ]; 

    return (
        <PrivateLayout isSidebar={true}>
            Patients:  <hr />
            <ul>
                {patientProfiles && patientProfiles.map((profile) => (
                    <li key={profile.patientId} onClick={() => handleSelectPatient(profile)}>
                        {/* {JSON.stringify(profile)} */}
                        {profile.patientName}
                    </li>
                ))}
            </ul> 
            {/* <button className="bg-slate-500 px-3 py-1" onClick={handleAddPatient}>Add Pfl</button> */}
            {/* <button className="bg-slate-500 px-3 py-1" onClick={handleSelectPatient}>Pfl</button> */}
            <div key={key}>
                {selectedPatientSelectedProfile ? (
                    <p>Selected: {selectedPatientSelectedProfile.patientName}</p>
                ) : (
                    <p>No Patient Selected</p>
                )}
            </div>
            {console.log('Rendering:', selectedPatientSelectedProfile)}
            {JSON.stringify(selectedPatientSelectedProfile)} <br />
            {selectedPatientSelectedProfile && <p>Selected: {selectedPatientSelectedProfile.patientName} | {selectedPatientSelectedProfile.patientId}</p>} <br /><hr />

            {/* Chromosomes:  <hr />
            <ul>
                {chromosomesList && chromosomesList.map((c) => (
                    <li onClick={() => handleSelectedChromosomeChange(c)}>{JSON.stringify(c)}</li>
                ))}
            </ul>  */}
            {/* {JSON.stringify(chromosomesList)} <br /> */}
            {/* <button className="bg-slate-500 px-3 py-1" onClick={handleSelectedChromosomeChange}>Chr</button>
            {selectSelectedChromosome && <p>Selected: {JSON.stringify(selectSelectedChromosome)}</p>} <br /><hr />

            Genome: <hr />
            <ul>
                {patientGenome && patientGenome.map((c) => (
                    <li onClick={() => handleSelectedPatientGenomeChange(c)}>{JSON.stringify(c)}</li> 
                ))}
            </ul>  */}
            {/* {JSON.stringify(patientGenome)} <br /> */}
            {/* <button className="bg-slate-500 px-3 py-1" onClick={handleSelectedPatientGenomeChange}>Genome</button> 
            {selectedPatientSelectedGenome && <p>Selected: {selectedPatientSelectedGenome.patientGenomeId}</p>} <br /><hr /> */}
{/* 
            GeneVariants:  <hr />
            <ul>
                {patientGenome && patientGenome.map((c) => (
                    <li onClick={() => handleSelectedPatientGeneVariantChange(c)}>{JSON.stringify(c)}</li> 
                ))}
            </ul>  */}
            {/* {JSON.stringify(selectedPatientGeneVariants)} <br /> */}
            {/* <button className="bg-slate-500 px-3 py-1" onClick={handleSelectedPatientGeneVariantChange}>GeneVariants</button> 
            {selectedPatientSelectedGeneVariant && <p>Selected: {selectedPatientSelectedGeneVariant.rsid}</p>} <br /><hr /> */}
            
            {/*  <ReportView dashboardTitle={dashboardTitle} updateRoute={handleSelectPatient}>   */}
                {/* <ReportGridWrapper riskReportRowsData={enrichedDataRows} columns={riskReportColumns} handleSelectedDataRowChange={handleSelectedDataRowChange} /> */}
            {/* </ReportView> */}

        </PrivateLayout>
    );
};

export default RiskReportPage; 

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