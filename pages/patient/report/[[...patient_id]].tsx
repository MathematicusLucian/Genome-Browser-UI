'use client'
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from 'next/router';
import PrivateLayout from '@/pages/PrivateLayout';
import { Separator } from "@radix-ui/react-separator";
import { DrawerContext, ModalContext } from "@/context";
import ReportView from "@/components/ReportView";
import { IFullReport } from "@/models/database";
import ReportGridWrapper from "@/components/ReportGridWrapper";
import { enrichedData } from "@/services/PatientData";
import { demoMultipleGeneVariants } from "@/state/demoState";

interface GenomePageProps {
}

const GenomePage: React.FC<GenomePageProps> = (props) => {  
    const { modalTitle, modelContent, modalVisible, updateModalTitle, updateModalContent, toggleModalVisible } = useContext(ModalContext);
    const { drawerTiitle, drawerContent, drawerVisible, updateDrawerTitle, updateDrawerContent, toggleDrawerVisible } = useContext(DrawerContext);


    // REDUX
    // Pull actual data in via Redux / patient data service

    
    const [patientId, setPatientId] = useState<string>('');
    const rsids: string[] = ["rs1000113","rs10156191", "rs10306114"];
    let selectedPatientGenomeVariants: any =  demoMultipleGeneVariants;
    const enrichedDataRows: any = enrichedData(rsids, selectedPatientGenomeVariants); 
    const [selectedPatientGeneVariantId, setSelectedPatientGeneVariantId] = useState<string| null>(null);  


    // ------
    // Router
    // ------
    
    const router = useRouter();  

    useEffect(() => {
        if (router.isReady) {

            // REDUX

            setPatientId(String(router.query.patient_id));

        }
    }, [router.isReady, router.asPath]);

    const handleSelectedPatientChange = (id) => {
        // http://127.0.0.1:3000/patient/genome?patientId=[x]
        router.push(`/patient/report/${id}`);
    };

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

    return (
        <PrivateLayout isSidebar={true}>  
            <ReportView dashboardTitle={dashboardTitle} updateRoute={handleSelectedPatientChange}>  
                <ReportGridWrapper riskReportRowsData={enrichedDataRows} columns={riskReportColumns} handleSelectedDataRowChange={handleSelectedDataRowChange} />
            </ReportView>
        </PrivateLayout>
    );
};

export default GenomePage;