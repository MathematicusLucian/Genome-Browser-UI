'use client'
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from 'next/router';
import PrivateLayout from '@/pages/PrivateLayout';
import { Separator } from "@radix-ui/react-separator";
import { DrawerContext, ModalContext } from "@/context";
import ReportView from "@/components/ReportView";
import { IFullReport, IPatientProfile } from "@/models/database";
import ReportGridWrapper from "@/components/ReportGridWrapper";
import { demoMultipleGeneVariants } from "@/state/demoState"; 
import { useLiveQuery } from "dexie-react-hooks";
import { patientsIndexedDb } from "@/database/database";
import { selectedPatientProfileAdded, selectSelectedPatientProfile, selectedPatientProfileUpdated, selectPatientGeneVariantsById } from "@/state/features/patient/patientSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/state-hooks";
import { date } from "yup";

interface GenomePageProps {
}

const GenomePage: React.FC<GenomePageProps> = (props) => {  
    const { modalTitle, modelContent, modalVisible, updateModalTitle, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerTiitle, drawerContent, drawerVisible, updateDrawerTitle, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);

    // -------
    // Patient
    // -------     

    const patientProfiles = useLiveQuery(
        () => patientsIndexedDb.patientProfile.toArray()
    );
    // console.log('patientProfiles', patientProfiles);
    // const selectedPatient: IPatientProfile = selectSelectedPatientProfile[0];
    // const selectedPatientId: IPatientProfile = selectSelectedPatientProfile[0]; //.patientId;
    // // REDUX
    // // This handler updates the patient state.
    // // selectAllPatientProfiles()
    // // const eventTarget = selectPatientProfilesById(event.target.value)[0];
    // // selectedPatientProfileUpdated(eventTarget);
    // // Patient State observed from patient route which prompts redirect.
    // // updateRoute(event.target.value);
    // const updatePatientProfile = (patientProfileId) => patientProfileUpdated(patientProfileId);
    // const updatePatientProfileId = (patientProfileId) => patientProfileUpdated(patientProfileId);

    // ------
    // Router
    // ------

    const router = useRouter();  

    // -----
    // Redux
    // -----

    const dispatch = useAppDispatch(); 
    const y = useAppSelector((state) => selectSelectedPatientProfile(state));
    // console.log('1. page -> state', JSON.stringify(y));
    dispatch((state) => selectedPatientProfileUpdated({patientId: 1, patientName: 'ABC', datetimestamp: Date.now()}))
    const yy = useAppSelector((state) => selectSelectedPatientProfile(state));
    console.log('2. page -> state', JSON.stringify(yy));
    
    useEffect(() => {
        // if (router.isReady) {
        //     // console.log('router');
        //     if(patientProfiles) { 
        //         // console.log(JSON.stringify(router.query));
        //         // console.log(JSON.stringify(router.query.patient_id));
        //         const patientIdFromRouter = String(router.query.patient_id);
        //         // console.log('patientIdFromRouter', patientIdFromRouter);
        //         // console.log('p', p);
        //         const patientProfileMatch = patientProfiles.find((x) => {
        //             // console.log('x', JSON.stringify(x)); 
        //             return x.patientId == patientIdFromRouter;
        //         });
        //         if(patientProfileMatch) {
        //             // console.log('patientProfileMatch', patientProfileMatch); 

        //             // selectedPatientProfileUpdated(patientProfileMatch);
        //             // const x = selectSelectedPatientProfile;
        //             // selectSelectedPatientProfile.find((x) => x.patientId != '1');
        //             // console.log('selectSelectedPatientProfile', x);
        //         }
        //     }   
        // }
    }, [router.isReady, router.asPath, patientProfiles]);

    // useEffect(() => {
    //     console.log('selectedPatient', selectedPatient);
        // if(selectedPatientId != String(router.query.patient_id))
        // if(selectedPatient.patientId != String(router.query.patient_id)) {
        //     // http://127.0.0.1:3000/patient/genome?patientId=[x]
        //     router.push(`/patient/report/${selectedPatientId}`);
        // }
    // }, [router.isReady, router.asPath, selectedPatientId]); 

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

    // const rsids: string[] = ["rs1000113","rs10156191", "rs10306114"];
    // let selectedPatientGenomeVariants: any =  demoMultipleGeneVariants;
    
    // // const enrichedDataRows: any = enrichedData(rsids, selectedPatientGenomeVariants); 

    const handleSelectedPatientChange: any = (e) => {

    }

    return (
        <PrivateLayout isSidebar={true}>
            Grid  
            {/* <ReportView dashboardTitle={dashboardTitle} updateRoute={handleSelectedPatientChange}>  
                <ReportGridWrapper riskReportRowsData={enrichedDataRows} columns={riskReportColumns} handleSelectedDataRowChange={handleSelectedDataRowChange} />
            </ReportView> */}
        </PrivateLayout>
    );
};

export default GenomePage;