import React, { useState } from 'react'; 
import { render } from 'react-dom';
import type {NextPage} from 'next'
import Layout from '../components/Layout';   
import dynamic from "next/dynamic"; 
import Dexie, { type EntityTable } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks'; 
import { patientsIndexedDb, patientGenomeTable, patientProfileTable } from '@/database/db';

const Home: NextPage = () => { 
  const [status, setStatus] = useState('');
  // const AddPatientForm = dynamic(() => import('@/components/AddPatientForm'), {
  const UploadForm = dynamic(() => import('@/components/UploadForm'), {
    ssr: false,
  })

  async function addPatientGenome() {
    console.log('addPatientGenome');
    try {
      const id = await patientsIndexedDb.patientGenome.add({
      // const id = await patientGenomeTable.add({
        rsid: '1',
        patient_id: '1',
        chromosome: '1',
        position: '1',
        genotype: 'AA'
      });
      console.log('Added');
      setStatus(`Gene variant successfully added. Got id ${id}`); 
    } catch (error) {
      console.log('Not added');
      setStatus(`Failed to add patient gene variant: ${error}`);
    }
  } 

  const patientProfiles = useLiveQuery( 
    () => patientsIndexedDb.patientProfile.toArray()
  );

  const patientGenomes = useLiveQuery( 
    () => patientsIndexedDb.patientGenome.toArray()
  );

  return (
    <Layout>   
    <p>{status}</p>
      <h2 className="table-header">Patient Gene Variants</h2>
      <UploadForm /> 
      <hr />
      {status}
      <button onClick={addPatientGenome}>Add Patient Gene Variant</button>
      <ul> 
        {patientProfiles?.map((patientProfile) => (
          <li key={patientProfile.patient_id}>
            {patientProfile.patient_id}, 
            {patientProfile.patient_name}
          </li>
        ))}
      </ul>
      <ul> 
        {patientGenomes?.map((patientGenome) => (
          <li key={patientGenome.rsid}>
            {patientGenome.rsid}, 
            {patientGenome.genotype}, 
            {patientGenome.chromosome}, 
            {patientGenome.position}
            {patientGenome.patient_id}, 
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Home;