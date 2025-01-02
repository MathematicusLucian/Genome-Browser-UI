'use client'
import React, { useEffect, useState } from "react";
import Select from "./Select";

const DataGridFilter: React.FC<any> = ({dataAsList, error, selectedSelectItem, handleSelectedItemChange, updateStatus, selectDataKey, displayField, selectTitle, placeholder})  => {  

    const selectStatus = (!dataAsList || error)
        ? `Please provide a ${selectDataKey}. If the table is empty, the profile, or genome may not exist. ${error}`
        : `The ${selectDataKey} count: ${dataAsList.length}`;

    updateStatus(selectStatus);

    useEffect(() => {
    }, [selectedSelectItem]);

    return dataAsList && error.length!=0
        ? (<></>)
        : (
        <> 
            <Select 
                selectData={dataAsList} 
                selectDataKey={selectDataKey} 
                displayField={displayField} 
                selectTitle={selectTitle} 
                placeholder={placeholder} 
                error={error} 
                selectedOption={selectedSelectItem} 
                handleSelectChange={handleSelectedItemChange} 
            /> 
        </>
    )}

export default DataGridFilter;