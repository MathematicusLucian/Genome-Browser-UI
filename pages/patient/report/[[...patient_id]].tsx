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
import { setSelectedPatientProfile, addPatientProfile, setSelectedPatientGenome, setSelectedPatientGeneVariant, setSelectedChromosome } from "@/state/features/patient/patientSlice"; // setSelectedChromosome
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

    // ----------------------
    // Data: Patient Profiles
    // ----------------------

    // Filter #1

    // Fetch patient profiles from IndexedDB
    const patientProfiles = useLiveQuery(
        () => patientsIndexedDb.patientProfile
            .toArray()
    ); 

    // Fetch selected patient profile from Redux store
    const selectedPatientSelectedProfile = useSelector((state: RootState) => state.patient.selectedPatientProfile); // dashboard attribute 
    const key1 = selectedPatientSelectedProfile ? selectedPatientSelectedProfile.patientId : 'default1';
    useEffect(() => {
        console.log('Selected Patient Profile updated:', selectedPatientSelectedProfile);
    }, [selectedPatientSelectedProfile?.patientId]);

    // Dispatch actions for patient profiles
    const handleSelectPatient = (patientProfile) => {  
        dispatch(setSelectedPatientProfile(patientProfile));
    };
    const handleAddPatient = async (patientProfile) => {   
        await patientsIndexedDb.patientProfile.add(patientProfile);
    };
    // End: Filter #1
    
    // Effect: Retrieve patient profile ID from URL
    useEffect(() => {
        if (router.isReady) {

            if(patientProfiles) {
                const patientProfileMatchingPatientIdFromRouter = patientProfiles?.find((x) => x.patientId == router.query.patient_id);
                if(patientProfileMatchingPatientIdFromRouter) {
                    selectedPatientSelectedProfile?.patientId && router.push(`/patient/report/${selectedPatientSelectedProfile?.patientId}`); 
                }
            }

            if(selectedPatientSelectedProfile != null && router.query.patient_id != selectedPatientSelectedProfile?.patientId) {
                // http://127.0.0.1:3000/patient/genome?patientId=[x]
                router.push(`/patient/report/${selectedPatientSelectedProfile?.patientId}`); 
            }  
        }
    }, [router.isReady, router.asPath, patientProfiles, selectedPatientSelectedProfile?.patientId]); 

    // --------------------
    // Data: Patient Genome
    // --------------------

    // Filter #2

    // Fetch selected patient's genome from IndexedDB
    const selectedPatientGenomes = useLiveQuery(
        () => selectedPatientSelectedProfile?.patientId && 
            patientsIndexedDb.patientGenome
            .where('patientId').equalsIgnoreCase(String(selectedPatientSelectedProfile.patientId)).toArray(),
        [selectedPatientSelectedProfile, selectedPatientSelectedProfile?.patientName]
    );

    // Fetch selected patient's selected genome from Redux store
    const selectedPatientSelectedGenome = useSelector((state: RootState) => state.patient.selectedPatientGenome); // dashboard attribute 
    const key2 = selectedPatientSelectedGenome ? selectedPatientSelectedGenome.patientId : 'default2';
    useEffect(() => {
        console.log('Selected Patient Genome updated:', selectedPatientSelectedGenome);
    }, [selectedPatientSelectedGenome?.patientGenomeId]);

    // Dispatch actions for patient genome
    const handleSelectedPatientGenomeChange = (patientGenome: any) => {  
        dispatch(setSelectedPatientGenome(patientGenome));   
    };
    // End Filter #2
    
    // -----------
    // Chromosomes
    // ----------- 

    // Filter #3

    // Fetch chromosomes from IndexedDB
    const chromosomesList = useLiveQuery(// IChromosome[]
        async () => patientsIndexedDb.chromosome.toArray()
    ); 

    // Fetch selected patient's selected chromosome from Redux store
    const selectedPatientSelectedChromosome: IChromosome = useSelector((state: RootState) => state.patient.selectedChromosome); // dashboard attribute 
    const key3 = selectedPatientSelectedChromosome ? selectedPatientSelectedChromosome.chromosomeName : 'default3';
    useEffect(() => {
        console.log('Selected Chromosome updated:', selectedPatientSelectedChromosome);
    }, [selectedPatientSelectedChromosome?.chromosomeName]);

    // Dispatch actions for chromosomes
    const handleSelectedChromosomeChange = (chromosome: any) => {  
        dispatch(setSelectedChromosome(chromosome));   
    };
    // End Filter #3

    // ----------------------------------
    // Data: Patient Gene Variants (SNPs)
    // ----------------------------------

    // Fetch selected patient's genome variants from IndexedDB
    const selectedPatientGeneVariants: any[] = useLiveQuery(
        () => { 
            console.log('String(selectedPatientSelectedChromosome?.chromosomeName)', String(selectedPatientSelectedChromosome?.chromosomeName));
            return patientsIndexedDb.patientGenomeVariant
                .where({
                    'patientGenomeId': String(selectedPatientSelectedGenome?.patientGenomeId), 
                    'chromosome': String(selectedPatientSelectedChromosome?.chromosomeName).replace('Chromosome', '').replace(' ', '')
                })
                .toArray(); 
        },
        [selectedPatientSelectedGenome?.patientGenomeId, selectedPatientSelectedChromosome?.chromosomeName]
    );  
    useEffect(() => {
        console.log('selectedPatientGeneVariants', selectedPatientGeneVariants);
    }, [selectedPatientGeneVariants]);

    const selectedPatientSelectedGeneVariant: IPatientGenomeVariant = useSelector((state: RootState) => state.patient.selectedPatientGeneVariant); // dashboard attribute 
    const key4 = selectedPatientSelectedGeneVariant ? selectedPatientSelectedGeneVariant.patientGeneVariantId : 'default4';
    useEffect(() => {
        console.log('Selected Gene Variant updated:', selectedPatientSelectedGeneVariant);
    }, [selectedPatientSelectedGeneVariant]);

    const handleSelectedPatientGeneVariantChange =  (geneVariant: any) => {  
        dispatch(setSelectedPatientGeneVariant(geneVariant));   
    };  

    // -----------------------------------------
    // ClinVar Data: SNP Pairs (Genotype/Allele)
    // -----------------------------------------

    // Returns all genotypes/allele pairs for a list of SNPs, e.g. ["rs10033464"] :. API has no data (privacy) as to which genotype the patient has
    const rsidsList = selectedPatientGeneVariants?.map((geneVariant) => geneVariant.rsid);
    console.log(rsidsList);
    const { data, error, isLoading }: any = usePostSnpDataByRsidQuery(rsidsList); 
    console.log(rsidsList,'clinVar fetched', data);

    // ------------------------------------------
    // Data Enrichment: SNP Pairs (ClinVar, etc.)
    // ------------------------------------------

    function merge_object_arrays (arr1, arr2, match) {
        return _.union(
        _.map(arr1, function (obj1) {
            var same = _.find(arr2, function (obj2) {
            return obj1[match] === obj2[match];
            });
            return same ? _.extend(obj1, same) : obj1;
        }),
        _.reject(arr2, function (obj2) {
            return _.find(arr1, function(obj1) {
            return obj2[match] === obj1[match];
            });
        })
        );
    }

    // Effect: Retrieve enrichedData
    useEffect(() => {
        console.log('clinVar', data);
        // console.log('selectedPatientGeneVariants', selectedPatientGeneVariants);
        // console.log(
        //     'enrichedData',
        //     merge_object_arrays(data, selectedPatientGeneVariants, 'rsid') 
        // );  
    }, [data, selectedPatientGeneVariants]);

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
            <h1 className="text-xl">Patients</h1>
            <ul>
                {patientProfiles?.map((profile) => (
                    <li className="text-xs" key={profile.patientId} onClick={() => handleSelectPatient(profile)}>
                        {profile.patientName}
                    </li>
                ))}
            </ul> 
            <div key={key1}>
                {selectedPatientSelectedProfile ? (
                    <p>Selected: {selectedPatientSelectedProfile.patientName}</p>
                ) : (
                    <p>No Patient Selected</p>
                )}
            </div>

            <hr />

            <h1 className="text-xl">Genome</h1>
            <ul>
                {selectedPatientGenomes?.map((c) => (
                    <li className="text-xs" onClick={() => handleSelectedPatientGenomeChange(c)}>
                        {c.patientGenomeId}
                    </li>
                ))}
            </ul> 
            <div key={key2}>
                {selectedPatientSelectedGenome ? (
                    <p>Selected: {selectedPatientSelectedGenome.patientGenomeId}</p>
                ) : (
                    <p>No Patient Genome Selected</p>
                )}
            </div>

            <hr />

            <h1 className="text-xl">Chromosomes</h1>
            <ul>
            {
                chromosomesList?.map(chromosome =>
                    <li key={chromosome.chromosomeName} className="text-xs" onClick={() => handleSelectedChromosomeChange(chromosome)}>
                        {String(chromosome.chromosomeName)}, {chromosome.species}
                    </li>
                )
            }
            </ul> 
            <div key={key3}>
                {selectedPatientSelectedChromosome ? (
                    <p>Selected: {selectedPatientSelectedChromosome.chromosomeName}</p>
                ) : (
                    <p>No Chromosome Selected</p>
                )}
            </div>

            <hr />

            <h1 className="text-xl">Gene Variants</h1> 
            <ul>
                {selectedPatientGeneVariants?.map((geneVariant) => (
                    <li className="text-xs" onClick={() => handleSelectedPatientGeneVariantChange(geneVariant)}>
                        {geneVariant.rsid} | {geneVariant.chromosome}
                    </li> 
                ))}
            </ul> 
            <div key={key4}>
                {selectedPatientSelectedGeneVariant ? (
                    <p>Selected: {selectedPatientSelectedGeneVariant.patientGeneVariantId}</p>
                ) : (
                    <p>No Patient Gene Variant Selected</p>
                )}
            </div> 
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