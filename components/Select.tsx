// import Button from 'antd/es/button';
import React from 'react';

interface SelectProps {
    patientProfiles: any;
    error: any;
    handlePatientChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ patientProfiles, error, handlePatientChange }) => {
    return  !patientProfiles || error ? (
            <div>Error: {error}</div>
        ) : (
            <div className="dropdown">
                <label htmlFor="patient-select">Select a Patient Profile:</label>
                <select id="patient-select" onChange={handlePatientChange}>
                    <option value="">--Please choose a patient--</option>
                    {patientProfiles.map((profile: any) => (
                        <option key={profile.patient_id} value={profile.patient_id}>
                            {profile.patient_name}
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