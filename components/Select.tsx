import React, { useEffect, useState } from 'react';
// import Button from 'antd/es/button';

interface SelectProps {
    selectData: any;
    selectTitle: string;
    selectDataKey: any;
    displayField: string;
    placeholder: string;
    selectedOption: any; // for Profile select, this item would match the model IPatientProfile,
    handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ selectData, selectDataKey, displayField, selectTitle, placeholder, selectedOption, handleSelectChange }) => {

    return (
        <div> 
            {!selectData || !selectDataKey ? (
                <div>Error</div>
            ) : (
                <div className="dropdown">
                    <label htmlFor={`${selectDataKey}-select`}>{selectTitle}</label> 
                    <select id={`${selectDataKey}-select`} onChange={handleSelectChange}
                        className='bg-gray-950 dark:bg-slate-100 text-xs text-white dark:text-zinc-900'
                        value={selectedOption}
                    >
                        <option value="">--{placeholder}--</option>
                        {selectData.map((profile: any) => (
                            <option key={profile[selectDataKey]} value={profile[selectDataKey]} 
                        > 
                                {displayField === 'datetimestamp' ? new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(profile[displayField]) : profile[displayField]}
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
            )}
        </div>
    )
};

export default Select;