import React, { useEffect, useState } from 'react';
// import Button from 'antd/es/button';

interface SelectProps {
    selectData: any;
    selectTitle: string;
    selectDataKey: any;
    displayField: string;
    placeholder: string;
    selectedOption: any; // for Profile select, this item would match the model IPatientProfile,
    error: any;
    handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ selectData, selectDataKey, displayField, selectTitle, placeholder, selectedOption, error, handleSelectChange }) => {
    const [selectedOptionId, setSelectedOptionId] = useState<any>(null); 

    // useEffect(() => {  
    //     if(selectData) {
    //         if(!selectDataKey) selectDataKey = Object.keys(selectData[0])[0]; 
    //         if(!selectedOption) selectedOption = selectData[0][selectDataKey]; 
    //         if(selectedOption) setSelectedOptionId(selectedOption);
    //     }
    // }, [selectData, selectDataKey]);  

    return !selectData || !selectDataKey || error ? (
        <div>Error: {error}</div>
    ) : (
        <div className="dropdown"> 
            <label htmlFor={`${selectDataKey}-select`}>{selectTitle}</label> 
            <select id={`${selectDataKey}-select`} onChange={handleSelectChange}>
                 {/* value={selectedOptionId}>  */}
                <option value="">--{placeholder}--</option>
                {selectData.map((profile: any) => (
                    <option key={profile[selectDataKey]} value={profile[selectDataKey]}> 
                        {profile[displayField]}
                    </option>
                ))}
            </select>
            <style jsx>{`
                p, label, select {
                    font-size: 0.8rem;
                }
                label {
                    padding: 0 0.5rem;
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