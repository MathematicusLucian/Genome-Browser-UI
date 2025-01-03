'use client'
import React, { useEffect, useState } from "react";
import Select from "./Select";

const DataGridFilter: React.FC<any> = ({dataAsList, selectedSelectItem, handleSelectedItemChange, updateStatus, selectDataKey, displayField, selectTitle, placeholder})  => {  

    const selectStatus = (!dataAsList)
        ? `Please provide a ${selectDataKey}. If the table is empty, the profile, or genome may not exist.`
        : `The ${selectDataKey} count: ${dataAsList.length}`;

    updateStatus(selectStatus);

    useEffect(() => {
    }, [selectedSelectItem]);

    // return (
    //     <div>{error}{JSON.stringify(dataAsList)}</div>
    // )

    return !dataAsList
        ? (<></>)
        : (
            <> 
                <Select 
                    selectData={dataAsList} 
                    selectDataKey={selectDataKey} 
                    displayField={displayField} 
                    selectTitle={selectTitle} 
                    placeholder={placeholder} 
                    selectedOption={selectedSelectItem} 
                    handleSelectChange={handleSelectedItemChange} 
                /> 
            </>
    )
}

export default DataGridFilter;