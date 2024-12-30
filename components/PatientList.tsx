'use client'
import React, { useEffect, useState } from "react";
import type {FC} from 'react';
import TableGrid from './TableGrid';
import reducer, { selectAllPatients } from '@/state/features/patientProfile/patientProfileSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/state-hooks';
import type { IPatientProfile } from "@/database/database";
import { useLiveQuery } from "dexie-react-hooks"; 
import { patientsIndexedDb } from "@/database/database"; 
import { usePostSnpDataByRsidQuery } from "@/services/ResearchData";
import { demoMultipleGeneVariants } from "@/state/demoState";

const PatientList: FC = () => {  
  // const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]); 
  const [selectedDataRow, setSelectedDataRow] = useState<string | null>(null); 
  const isIndexedDatabase = true;

  const fetchData = async () => {
      try {
          // const api_url = patient_id = ? `http://127.0.0.1:8000/patient_genome/patient_profile/${patient_id}` : `http://127.0.0.1:8000/patient_genome/patient_profile`);
          const api_url = `http://127.0.0.1:8000/patient_genome/patient_profile`;
          // `${GENOME_BROWSER_API_PATH}/patient_genome/patient_profile`;
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
          // setError(error.message);
      }
  }; 

  // useLiveQuery(
  //   async () => {
  //     if(isIndexedDatabase) {
  //       const patientProfilesCount = await patientsIndexedDb.patientGenome.toCollection().count(function (count) {
  //         setPatientProfilesCount(String(count));
  //       });
  //       let result = await patientsIndexedDb.patientGenome.toArray(); 
  //       if (result.length > 0) {   
  //         setRowData(result); 
  //         return result;
  //       }
  //     }
  //   }, 
  // );

  const patientProfiles = useLiveQuery( 
    () => patientsIndexedDb.patientProfile.toArray()
  ); 
    
  useEffect(() => { 
    const columns = [
      {"headerName":"patientId","field":"patientId", flex: 2, maxWidth: 280},
      {"headerName":"patientName","field":"patientName", flex: 2, maxWidth: 180},
      {"headerName":"datetimestamp","field":"datetimestamp", flex: 2, maxWidth: 120},
    ];
    setColumnDefs(columns);
    !isIndexedDatabase && fetchData();
  }, [isIndexedDatabase]); 

  const handleSelectedDataRowChange = (dataRow: string) => {
      setSelectedDataRow(dataRow);  
  }; 

  const dispatch = useAppDispatch()
  const patients: any = useAppSelector(selectAllPatients)
  
  const patientsList = patients ? patients.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  )) : [];

  const enrichedData = () => {
    const rsids = ["rs1000113","rs10156191", "rs10306114"];
    let patientGeneVariants: any =  demoMultipleGeneVariants;
    const { data, error, isLoading }: any = usePostSnpDataByRsidQuery(rsids); 
    const enrichmentResult = patientGeneVariants.map((patientVariant) => {
        for(let snp in data) {
          console.log('d', patientVariant);
          console.log('d2', data[snp]);
          if(data[snp]['rsid'] == patientVariant.rsid) {
            console.log('banana');
              patientVariant['notes'] = data[snp]['notes'];
          } 
          return patientVariant;
        }
    });
    return enrichmentResult;
  }

  return (
    <> 
      {/* {patientProfiles && (<div className="profile-count">{patientProfiles.length} patient profiles in total</div>)} */}

      {/* {patientsList} */}

      {JSON.stringify(enrichedData())}

      {/* {error ? (
        <>SNP data load error</>
      ) : isLoading ? (
        <>Loading SNP data...</>
      ) : data ? (
        <>
          <h3>{JSON.stringify(data)}</h3> 
        </>
      ) : null} */}

      {/* <TableGrid rowData={patientProfiles} columnDefs={columnDefs} error={error} onSelectedDataRowChange={handleSelectedDataRowChange} /> */}

      <style jsx>{`
        p, div, li, input, label, select, button {
          font-size: 0.8em;
        }
        .table-header { 
          font-size: 1em;
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