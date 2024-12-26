import React, { useState } from "react";
import type {FC} from 'react';
import { useLiveQuery } from "dexie-react-hooks"; 
import { patientsIndexedDb, patientProfileTable } from "@/database/db"; 
import type { IPatientProfile } from "@/database/db";

const PatientList: FC = () => {  
  const [patientProfilesCount, setPatientProfilesCount] = useState('');

  const patientProfiles = useLiveQuery(
    async () => {
      const patientProfilesCount = await patientProfileTable.toCollection().count(function (count) {
        setPatientProfilesCount(String(count));
      });
      const patientProfilesCollection = await patientProfileTable.toArray(); 
      console.log(patientProfilesCollection); 
        return patientProfilesCollection;
    }, 
  );

  return (
    <>
      {patientProfilesCount && (<div>{patientProfilesCount} patient profiles in total</div>)}
      <hr />
      <ul> 
        {patientProfiles?.map((patientProfile) => (
          <li key={patientProfile.patient_id}>
            {patientProfile.patient_name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default PatientList;