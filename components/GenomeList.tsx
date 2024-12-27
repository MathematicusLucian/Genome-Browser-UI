'use client'
import React, { useState, useEffect, useMemo } from "react";
import type {FC} from 'react'; 
import { useLiveQuery } from 'dexie-react-hooks'; 
import { patientsIndexedDb } from '@/database/db'; 
import TableGrid from "@/components/TableGrid";
import { useRouter } from "next/router";

interface GenomeListProps {
  patient_id: string;
}

const GenomeList: FC<GenomeListProps> = (props) => {  
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);  
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);   
  const [patientProfiles, setPatientProfiles] = useState(null);
  const [patientProfilesCount, setPatientProfilesCount] = useState<string>(null);
  const GENOME_BROWSER_API_PATH = process.env.NEXT_PUBLIC_GENOME_BROWSER_API_PATH;
  const columns = [
      {"headerName":"rsid","field":"rsid", flex: 2, maxWidth: 100},
      {"headerName":"genotype","field":"genotype", flex: 1, maxWidth: 80},
      {"headerName":"chromosome","field":"chromosome", flex: 1, maxWidth: 100},
      {"headerName":"position","field":"position", flex: 2, maxWidth: 120},
      {"headerName":"datetimestamp","field":"datetimestamp", flex: 1, maxWidth: 120}, 
      {"headerName":"patientId","field":"patientId", flex: 1, maxWidth: 280}, 
      {"headerName":"patientGenomeId","field":"patientGenomeId", flex: 1, maxWidth: 280},
  ];
  // const columns = [
  //     {"headerName":"rsid","field":"rsid", flex: 2, maxWidth: 120},
  //     {"headerName":"risk","field":"risk", flex: 1, maxWidth: 50},
  //     {"headerName":"notes","field":"notes", flex: 4, minWidth: 200, maxWidth: 650, suppressSizeToFit: false},
  //     {"headerName":"allele1","field":"allele1", flex: 1, maxWidth: 100},
  //     {"headerName":"allele2","field":"allele2", flex: 1, maxWidth: 100},
  //     {"headerName":"chromosome","field":"chromosome", flex: 1, maxWidth: 100},
  //     {"headerName":"position","field":"position", flex: 2, maxWidth: 120},
  //     {"headerName":"magnitude","field":"magnitude", flex: 1, maxWidth: 100},
  //     // The following are not displayed:
  //     // {"headerName":"patient_id","field":"patient_id"},
  //     // {"headerName":"patient_name","field":"patient_name"},
  //     // {"headerName":"genotype_match","field":"genotype_match"},
  //     // {"headerName":"genotype","field":"genotype"},
  //     // {"headerName":"rsid_genotypes","field":"rsid_genotypes"},
  // ];
  // const rowDataValue = useMemo(() => ({
  //     rowData,
  //     setRowData, 
  // }), [rowData]);
  const isIndexedDatabase = true;

  const router = useRouter();
  
  const patientGenomes = useLiveQuery( 
    () => patientsIndexedDb.patientGenome.toArray()
  );

  const fetchFullReport = async (patient_id: string) => {
      try { 
          const api_url = `${GENOME_BROWSER_API_PATH}/patient_genome/patient_genome_data/?patient_id=${patient_id}`; 
          // const api_url = `${GENOME_BROWSER_API_PATH}/patient_genome/patient_genome_data/expanded/?patient_id=${patient_id}`; 
          const response = await fetch(api_url);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          if (result.length > 0) {
              setRowData(result);
          } 
      } catch (error) {
          console.error('Error fetching full report:', error);
          setError(error.message);
      }
  };
  
  const handleSelectedDataRowChange = (dataRow: string) => {
  //     updateDrawerContent(dataRow);
  //     toggleDrawerVisible();
  };  

  // const selectedPatientGenome = useLiveQuery(() => patientGenomeTable.toArray(), [selectedPatient]);
  // if (selectedPatientGenome !== undefined) return [];

  // const selectedPatientVariantsCount = useLiveQuery(() => patientProfileTable.count());
  // if (selectedPatientVariantsCount !== undefined) return '0'; 

  useEffect(() => { 
      setColumnDefs(columns);
  }, []);   

  // useEffect(() => {
  //     if (!isIndexedDatabase && selectedPatient) {
  //         fetchFullReport(selectedPatient);
  //         const selectedProfile = patientProfiles.find(profile => profile.patient_id === selectedPatient);
  //         setSelectedPatientName(selectedProfile ? selectedProfile.patient_name : null);
  //     }
  // }, [selectedPatient, patientProfiles]); 

  return (
    <>
      {!patientGenomes || error ? (
        <div>Error: {error} No genome data in database.</div>
      ) : (
        <>
          {/* <ul> 
            {patientGenomes?.map((patientGenome) => (
              <li key={patientGenome.patientGenomeId}>
                {patientGenome.rsid} |
                {patientGenome.genotype}, 
                {patientGenome.chromosome}, 
                {patientGenome.position}
                {patientGenome.datetimestamp},
                {patientGenome.patientId}, 
                {patientGenome.patientGenomeId}, 
              </li>
            ))}
          </ul> */}
          <TableGrid rowData={patientGenomes} columnDefs={columnDefs} error={error} onSelectedDataRowChange={handleSelectedDataRowChange} />
          {/* <TableGrid rowData={rowData} columnDefs={columnDefs} error={error} onSelectedDataRowChange={handleSelectedDataRowChange} /> */}
        </>
      )}
      <style jsx>{`
          p, label, select {
              font-size: 0.8em;
          }
          .table-header { 
              padding: 1.3rem 0 0 0; 
          }
          .table-sub-header span {
              font-weight: 900;
              padding: 0 0.4em;
          }
      `}
      </style>
    </>
  );
};

export default GenomeList;