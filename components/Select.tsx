import React, { useEffect, useState } from 'react';
// import Button from 'antd/es/button';
import { IPatientProfile } from '@/database/db';

interface SelectProps {
    patientProfiles: any;
    selectedOptionProfile: IPatientProfile,
    error: any;
    handlePatientChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ patientProfiles, selectedOptionProfile, error, handlePatientChange }) => {
    const [selectedOptionId, setSelectedOptionId] = useState<any>(null); 

    useEffect(() => {  
        setSelectedOptionId(selectedOptionProfile.patientId);
    }, [selectedOptionProfile]); 

    return  !patientProfiles || error ? (
            <div>Error: {error}</div>
        ) : (
            <div className="dropdown">
                <label htmlFor="patient-select">Select a Patient Profile:</label>
                <select id="patient-select" onChange={handlePatientChange}>
                    <option value="">--Please choose a patient--</option>
                    {patientProfiles.map((profile: IPatientProfile) => (
                        <option key={profile.patientId} value={profile.patientId}>
                             {/* selected={profile.patientId==selectedOptionId} */}
                            {profile.patientName} - {profile.patientId}
                        </option>
                    ))}
                </select>
                <style jsx>{`
                    p, label, select {
                        font-size: 0.8em;
                    }
                    label {
                        padding: 0 0.5em;
                    }
                    select {
                        border: 1px rgb(222, 221, 221) solid;
                    }
                    .dropdown {
                        padding: 1.3rem 0 0 0;
                    }
                    .dropdown label {
                        font-weight: 900;
                    }
                `}</style>
            </div>
        )
};

export default Select;