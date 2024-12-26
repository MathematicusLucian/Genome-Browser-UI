import React, { useState } from "react";
import { db } from "@/database/db";

export function AddPatientForm() {
    // { defaultAge } = { defaultAge: 21 }
    const [patientName, setPatientName] = useState('');
    const [status, setStatus] = useState('');
  
    async function addPatientProfile() {
      try {
        const patientId = await db.patientprofile.add({
            patient_name
        });
  
        setStatus(`Patient ${patientName} successfully added. Got id ${patientId}`);
        setPatientName('');
        // setAge(defaultAge);
      } catch (error) {
        setStatus(`Failed to add ${patientName}: ${error}`);
      }
    }
  
    return (
      <>
        <p>{status}</p>
        Name:
        <input
          type="text"
          value={patientName}
          onChange={(ev) => setPatientName(ev.target.value)}
        /> 
        <button onClick={addPatientProfile}>Add</button>
      </>
    );
  }