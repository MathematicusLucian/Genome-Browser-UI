'use client'
import React, { useState, useEffect } from "react";
import type {FC} from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import PatientList from "@/components/PatientList"; 

interface PatientsListPageProps {
    // opensidedrawer: (content: React.ReactNode) => void;
}

 const PatientsListPage: React.FC<PatientsListPageProps> = (props) => {  
    const [error, setError] = useState(null); 

    const router = useRouter();
    const { patient_id } = router.query;

    return (
        <Layout>
            {patient_id || error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <PatientList /> 
                </div>
            )}  
        </Layout>
    );
};

export default PatientsListPage;