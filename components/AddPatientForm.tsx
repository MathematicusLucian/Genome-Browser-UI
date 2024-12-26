import React, { useState } from "react";
import type {FC} from 'react';
import { patientsIndexedDb, patientProfileTable } from "@/database/db"; 
import type { IPatientProfile } from "@/database/db";

const AddPatientForm: FC = () => {  // { defaultAge } = { defaultAge: 21 }
  const [patientName, setPatientName] = useState('');
  const [status, setStatus] = useState(''); 

  const addPatientProfile = async (event) => {
    event.preventDefault()

    const patientProfile: IPatientProfile = { 
      patient_id: event.target.name.id,
      patient_name: event.target.name.value, 
    }
   
    try {
      const patientId = await patientProfileTable.add(patientProfile);
      event.target.reset()
      setStatus(`Patient ${patientName} successfully added: patientId ${patientId}`);
      setPatientName('');
    } catch (error) {
      setStatus(`Failed to add ${patientName}: ${error}`);
      console.error(`Failed to add ${patientName}: ${error}`);
    } 
  }

  return (
    <>
      <p>Status: {status}</p>
      <form onSubmit={addPatientProfile}>
          <label htmlFor="name">Patient File Name:</label>
          <input
            id="name" name="name"
            type="text"
            value={patientName}
            onChange={(ev) => setPatientName(ev.target.value)}
          /> 
          <button type="submit">Add</button> 
      </form>
      <style jsx>{`
          p, input, label, select, button {
              font-size: 0.8em;
          }
          form {
            padding: 0.5em;
            border: 1px rgb(236, 232, 232) solid;
          }
          label {
            padding: 0 0.5em; 
          }
          input {
            padding: 0 0.5em; 
            border: 1px rgb(222, 221, 221) solid;
          }
          button {
            padding: 0 0.5em; 
          }
      `}</style>
    </>
  );
}

export default AddPatientForm;