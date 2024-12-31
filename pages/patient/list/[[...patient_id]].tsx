'use client'
import React, { useState, useEffect } from "react";
import type {FC} from 'react';
import { useRouter } from 'next/router';
import PrivateLayout from '@/pages/PrivateLayout';
import PatientList from "@/components/PatientList"; 

interface PatientsListPageProps {
    // opensidedrawer: (content: React.ReactNode) => void;
}

 const PatientsListPage: React.FC<PatientsListPageProps> = (props) => {  
    const [error, setError] = useState(null); 

    const router = useRouter();
    const { patient_id } = router.query;

    return (
        <PrivateLayout isSidebar={true}>  
            {patient_id || error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <div className="page-header">List of Patient Profiles</div>
                    <PatientList /> 
                    <style jsx>{`
                        p, div, li, input, label, select, button {
                            font-size: 0.8em;
                        }
                        .page-header { 
                            font-size: 1.3em;
                            padding: 0.1rem 0 0 0;
                            font-weight: 900;
                        }
                    `}</style>
                </div>
            )}  
        </PrivateLayout>
    );
};

export default PatientsListPage;