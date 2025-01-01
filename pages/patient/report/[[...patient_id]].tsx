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
// import { selectedPatientProfileAdded, selectSelectedPatientProfile, selectedPatientProfileUpdated, selectPatientGeneVariantsById } from "@/state/features/patient/patientSlice";
import { setSelectedPatientProfile, addPatientProfile } from "@/state/features/patient/patientSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/state-hooks";
import { date } from "yup";
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

interface RiskReportPageProps {
}

const RiskReportPage: React.FC<RiskReportPageProps> = (props) => {  
    const { modalTitle, modelContent, modalVisible, updateModalTitle, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerTiitle, drawerContent, drawerVisible, updateDrawerTitle, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);

    // ------
    // Router
    // ------

    const router = useRouter();  

    // -------
    // Patient
    // -------     

    const patientProfiles = useLiveQuery(
        () => patientsIndexedDb.patientProfile.toArray()
    );

    // -----
    // Redux
    // -----

    const newPatientProfile1: IPatientProfile = {
        patientId: '1',
        patientName: 'ABC',
        datetimestamp: Date.now()
    };
    const newPatientProfile2: IPatientProfile = {
        patientId: '2',
        patientName: 'DEF',
        datetimestamp: Date.now()
    };

    const dispatch = useAppDispatch(); 

    // Read state
    const patientProfilesX = useSelector((state: RootState) => state.patient.patientProfile);
    const selectedPatientProfile = useSelector((state: RootState) => state.patient.selectedPatientProfile);
    // const yy = useAppSelector((state) => selectSelectedPatientProfile(state));

    // Dispatch actions
    const handleSelectPatient = (patientProfile) => {
        dispatch(setSelectedPatientProfile(patientProfile));  
    };
    const handleAddPatient = (patientProfile) => { 
        // Handle with Dexie

        // dispatch(addPatientProfile(newPatientProfile2));
        // dispatch(addPatientProfile(patientProfile)); 
    };
    
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
                    selectedPatientProfile && router.push(`/patient/report/${selectedPatientProfile.patientId}`); 
                }
            }   
        }
    }, [router.isReady, router.asPath, patientProfiles, selectedPatientProfile]); 

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
    
    const enrichedDataRows: any = []; // enrichedData(rsids, selectedPatientGenomeVariants); 

    return (
        <PrivateLayout isSidebar={true}>

            <h1>Patients</h1>
            <ul>
                {patientProfiles && patientProfiles.map((profile) => (
                    <li key={profile.patientId} onClick={() => handleSelectPatient(profile)}>
                        {profile.patientName}
                    </li>
                ))}
            </ul>
            <button className="my-5" onClick={handleAddPatient}>Add Patient</button>
            {selectedPatientProfile && <p>Selected: {selectedPatientProfile.patientName} | {selectedPatientProfile.patientId}</p>}

            <ReportView dashboardTitle={dashboardTitle} updateRoute={handleSelectPatient}>  
                <ReportGridWrapper riskReportRowsData={enrichedDataRows} columns={riskReportColumns} handleSelectedDataRowChange={handleSelectedDataRowChange} />
            </ReportView>

        </PrivateLayout>
    );
};

export default RiskReportPage;