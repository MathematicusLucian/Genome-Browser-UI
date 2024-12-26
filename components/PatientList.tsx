import React, { useState } from "react";
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

  const patientProfiles = useLiveQuery(
    async () => {
      const columns = [
        {"headerName":"patient_id","field":"patient_id", flex: 2, maxWidth: 120},
        {"headerName":"patient_name","field":"patient_name", flex: 2, maxWidth: 120},
      ];
      setColumnDefs(columns);
      const patientProfilesCount = await patientProfileTable.toCollection().count(function (count) {
        setPatientProfilesCount(String(count));
      });
      let result = await patientProfileTable.toArray(); 
      if (result.length > 0) {   
        setRowData(result); 
        return result;
      }
    }, 
  );

  const handleSelectedDataRowChange = (selectedDataRow: string) => {
      setSelectedDataRow(selectedDataRow);  
  };

  return (
    <>
      <div className="table-header">List of Patients</div>
      {patientProfilesCount && (<div className="profile-count">{patientProfilesCount} patient profiles in total</div>)}
      <hr />
      <ul> 
        {patientProfiles?.map((patientProfile) => (
          <li key={patientProfile.patient_id}>
            {patientProfile.patient_name}
          </li>
        ))}
      </ul>
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