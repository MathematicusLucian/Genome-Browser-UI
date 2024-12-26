'use client'
import React, { useEffect, useState } from "react";
import type {FC} from 'react';
import TableGrid from './TableGrid';
import type { IPatientProfile } from "@/database/db";
import { useLiveQuery } from "dexie-react-hooks"; 
import { patientsIndexedDb, patientProfileTable } from "@/database/db"; 

const PatientList: FC = () => {  
  const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]); 
  const [selectedDataRow, setSelectedDataRow] = useState<string | null>(null);
  const [patientProfilesCount, setPatientProfilesCount] = useState('');
  const isLocalStorage = true;

  const fetchData = async () => {
      try {
          // const api_url = patient_id = ? `http://127.0.0.1:8000/patient_genome/patient_profile/${patient_id}` : `http://127.0.0.1:8000/patient_genome/patient_profile`);
          const api_url = `http://127.0.0.1:8000/patient_genome/patient_profile`;
          const response = await fetch(api_url);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          if (result.length > 0) {
              // Set column definitions based on the keys of the first object in the data array
              const columns = Object.keys(result[0]).map(key => ({
                  headerName: key,
                  field: key,
              }));
              setColumnDefs(columns);
          }
          setRowData(result); 
      } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.message);
      }
  };

  const patientProfiles = useLiveQuery(
    async () => {
      if(isLocalStorage) {
        const patientProfilesCount = await patientProfileTable.toCollection().count(function (count) {
          setPatientProfilesCount(String(count));
        });
        let result = await patientProfileTable.toArray(); 
        if (result.length > 0) {   
          setRowData(result); 
          return result;
        }
      }
    }, 
  );
    
  useEffect(() => { 
    const columns = [
      {"headerName":"patient_id","field":"patient_id", flex: 2, maxWidth: 120},
      {"headerName":"patient_name","field":"patient_name", flex: 2, maxWidth: 120},
    ];
    setColumnDefs(columns);
    
    !isLocalStorage && fetchData();
  }, [isLocalStorage]); 

  const handleSelectedDataRowChange = (selectedDataRow: string) => {
      setSelectedDataRow(selectedDataRow);  
  }; 

  return (
    <>
      <div className="table-header">List of Patients</div>
      {patientProfilesCount && (<div className="profile-count">{patientProfilesCount} patient profiles in total</div>)}
      <hr />
      {/* <ul> 
        {patientProfiles?.map((patientProfile) => (
          <li key={patientProfile.patient_id}>
            {patientProfile.patient_name}
          </li>
        ))}
      </ul> */}
        {selectedDataRow && <div>Selected Patient ID: {selectedDataRow.patient_id}</div>}
        <TableGrid rowData={rowData} columnDefs={columnDefs} error={error} onSelectedDataRowChange={handleSelectedDataRowChange} />
      <style jsx>{`
          p, li, input, label, select, button {
              font-size: 0.8em;
          }
          .table-header { 
            padding: 0.1rem 0 0 0;
            font-weight: 900;
          }
          .profile-count {
            font-size: 0.8em;
            font-weight: 600;
            padding: 0.5em;
          }
      `}</style>
    </>
  );
}

export default PatientList;