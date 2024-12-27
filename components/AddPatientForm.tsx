'use client'
import React, { useState } from "react";
import type {FC} from 'react';
import Dexie from "dexie";
import { patientsIndexedDb, patientProfileTable } from "@/database/db"; 
import type { IPatientProfile } from "@/database/db"; 
import { ImportOptions, exportDB, importInto, peakImportFile } from "dexie-export-import";
import { DexieExportJsonStructure } from "dexie-export-import/dist/json-structure";
import { JsonStream } from "dexie-export-import/dist/json-stream";
import UploadForm from "./UploadForm";
// import { saveAs } from 'file-saver';
// import _ from 'lodash';
// import prettyBytes from 'pretty-bytes';
// import ReactTimeAgo from 'react-time-ago';
// import { useEffectOnce } from 'react-use';

const AddPatientForm: FC = () => {  // { defaultAge } = { defaultAge: 21 }
  const [patientName, setPatientName] = useState('');
  const [status, setStatus] = useState(''); 
  const [dbOperationStatus, setDbOperationStatus] = useState(<></>);
  const [validateImport, setValidateImport] = useState('');
  const [importProgress, setImportProgress] = useState(0); 
  const [importableBlob, setImportableBlob] = useState<Blob | undefined>();
  const [loadedDocs, setLoadedDocs] = useState(0);
  const [totalDocs, setTotalDocs] = useState(0);
  const [mostRecentVersions, setMostRecentVersions] = useState([]);
  const DEFAULT_KILOBYTES_PER_CHUNK = 1024; // When importing blob
  const DEFAULT_ROWS_PER_CHUNK = 2000; // When exporting db

  const addPatientProfile = async (event) => {
    event.preventDefault()
    // setDbOperationStatus(<Alert severity='info'>Importing...</Alert>)

    // Import from Blob or File to Dexie instance:
    // const patientsIndexedDb = await Dexie.import(blob, [options]);
    // const textData = "Hello, this is a Blob example.";
    // const blob: Blob | JsonStream<DexieExportJsonStructure> = new Blob([textData], { type: "text/plain" }); 

    try {
      const importOptions: ImportOptions = {
        progressCallback: updateImportProgress,
        clearTablesBeforeImport: true,
        acceptVersionDiff: true
      }
      
      const file = event.target.files?.[0];
      if (!file) {
          console.log("No file selected");
          setImportableBlob(undefined);
          return;
      }

      const blob = new Blob([file], { type: file.type });
      
      const importMeta = await peakImportFile(blob);
      if (!importMeta || importMeta?.formatName !== 'dexie' || importMeta.data.databaseName !== 'parseqDB') {
          console.error("Not a Parseq database", importMeta);
          // setDbOperationStatus(<Alert severity='warning'>Selected file seemed invalid. See console for details.</Alert>);
          setImportableBlob(undefined);
          return;
      }
      
      setImportableBlob(blob);
      setValidateImport('');
      
      // await importInto(patientsIndexedDb, importableBlob, importOptions);

      // const firstPart = blob.slice(0,100);  
      // function readBlob(blob: Blob): Promise<string> {
      //   return new Promise((resolve, reject) => {
      //     const reader = new FileReader();
      //     reader.onabort = ev => reject(new Error("file read aborted"));
      //     reader.onerror = ev => reject((ev.target as any).error);
      //     reader.onload = ev => resolve((ev.target as any).result);
      //     reader.readAsText(blob);
      //   });
      // }
    } catch (error) {
        // setDbOperationStatus(<Alert severity='error'>Import failed: {error?.toString()}</Alert>)
        console.error(error);
    } finally {
        setImportableBlob(undefined); 
    }

    // const patientProfile: IPatientProfile = { 
    //   patient_id: event.target.name.id,
    //   patient_name: event.target.name.value, 
    // }
   
    // try {
    //   const patientId = await patientProfileTable.add(patientProfile);
    //   event.target.reset()
    //   setStatus(`Patient ${patientName} successfully added: patientId ${patientId}`);
    //   setPatientName('');
    // } catch (error) {
    //   setStatus(`Failed to add ${patientName}: ${error}`);
    //   console.error(`Failed to add ${patientName}: ${error}`);
    // } 
  }

  // const onConfirmImportDialogClose = useCallback((event: any) => {
  //     setConfirmImportDialogOpen(false);
  //     if (event?.target?.id === "import") {
  //         doImport();
  //     }
  // }, [doImport]);

  return (
    <>
      <p>Status: {status}</p>
      {/* <form onSubmit={addPatientProfile}>
          <label htmlFor="name">Patient File Name:</label>
          <input
            id="name" name="name"
            type="text"
            value={patientName}
            onChange={(ev) => setPatientName(ev.target.value)}
          /> 
          <button type="submit">Add</button> 
      </form> */}

       <div><h2 className="text-2xl font-bold text-gray-900">Upload Patient File</h2><div className="mt-2 px-7 py-3"><UploadForm /></div></div>

      <div>
          {/* <button
          className="rounded bg-gray-200 px-3 py-1 mt-3 text-xs"
          onClick={uploadDNAFile}
          >
              Upload DNA File
          </button> */}
          {/* <Select patientProfiles={patientProfiles} error={error} handlePatientChange={handlePatientChange} /> */}
      </div>

      {/* {confirmImportDialog} 
      <button
          // component="label"
          // variant='outlined'
          // disabled={activity !== undefined}
        >
          {/* <FontAwesomeIcon icon={faUpload} /> 
          &nbsp;Import Parseq database
          <input hidden type="file" accept='.json'
            onClick={
              //@ts-ignore
              e => e.target.value = null // Ensures onChange fires even if same file is re-selected.
            }
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) {
                  console.log("No file selected");
                  setImportableBlob(undefined);
                  return;
              }
              const blob = new Blob([file], { type: file.type });
              const importMeta = await peakImportFile(blob);
              if (!importMeta || importMeta?.formatName !== 'dexie' || importMeta.data.databaseName !== 'parseqDB') {
                  console.error("Not a Parseq database", importMeta);
                  // setDbOperationStatus(<Alert severity='warning'>Selected file seemed invalid. See console for details.</Alert>);
                  setImportableBlob(undefined);
                  return;
              }
              setImportableBlob(blob);
              setValidateImport('');
              // setConfirmImportDialogOpen(true);
          }} />                                 
      </button>
      {activity === 'importing' &&
          <span>
              <Typography fontSize={'0.75em'}>Importing: </Typography>
              <LinearProgressWithLabel value={importProgress} />
          </span>
      } */}

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
//   <h2 className="table-header">Patient Gene Variants</h2>
//   <UploadForm /> 
//   <hr />
//   {status}
// const AddPatientForm = dynamic(() => import('@/components/AddPatientForm'), {
//   ssr: false,
// })
// const UploadForm = dynamic(() => import('@/components/UploadForm'), {
//   ssr: false,
// })
// const GenomeList = dynamic(() => import('@/components/GenomeList'), {
//   ssr: false,
// })

// async function addPatientGenome() {
//   console.log('addPatientGenome');
//   try {
//     const id = await patientsIndexedDb.patientGenome.add({
//       rsid: '1',
//       patient_id: '1',
//       chromosome: '1',
//       position: '1',
//       genotype: 'AA'
//     });
//     console.log('Added');
//     setStatus(`Gene variant successfully added. Got id ${id}`); 
//   } catch (error) {
//     console.log('Not added');
//     setStatus(`Failed to add patient gene variant: ${error}`);
//   }
// } 
// //   <button onClick={addPatientGenome}>Add Patient Gene Variant</button>
