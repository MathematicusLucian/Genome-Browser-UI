import React, { useState } from "react";
import { db } from "@/database/db";
import { useLiveQuery } from "dexie-react-hooks"; 

export function PatientList({ minAge, maxAge }) {
    const patientProfiles = useLiveQuery(
      async () => {
        //
        // Query Dexie's API
        //
        // count
        db.patientprofile.toCollection().count(function (count) {
            console.log(count + " patientProfiles in total");
        });
        // const patientProfiles = await db.patientProfile
        //   .where('patient_name')
        //   .between(minAge, maxAge)
        //   .toArray();
  
        // Return result
        return patientProfiles;
      },
      // specify vars that affect query:
      [minAge, maxAge]
    );
  
    return (
      <ul>
        {patientProfiles?.map((patientProfile) => (
          <li key={patientProfile.patient_id}>
            {patientProfile.patient_name}
          </li>
        ))}
      </ul>
    );
  }