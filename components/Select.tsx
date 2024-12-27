import React, { useEffect, useState } from 'react';
// import Button from 'antd/es/button';
import { IPatientProfile } from '@/database/db';

interface SelectProps {
    selectData: any;
    selectTitle: string;
    key: any;
    displayField: string;
    placeholder: string;
    selectedOptionProfile: any; // IPatientProfile,
    error: any;
    handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ selectData, key, displayField, selectTitle, placeholder, selectedOptionProfile, error, handleSelectChange }) => {
    const [selectedOptionId, setSelectedOptionId] = useState<any>(null); 

    useEffect(() => {  
        if(key) {
            setSelectedOptionId(selectedOptionProfile[key]);
        }
    }, [selectedOptionProfile, key]);  

    return !selectData || !key || error ? (
            <div>Error: {error}</div>
        ) : (
            <div className="dropdown"> 
                <label htmlFor={`${key}-select`}>{selectTitle}</label>
                <select id={`${key}-select`} onChange={handleSelectChange}>
                    <option value="">--{placeholder}--</option>
                    {selectData.map((profile: any) => (
                        <option key={profile[key]} value={profile[key]} selected={profile[key]==selectedOptionId}>
                            {profile[displayField]}
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