// 'use client';
import { ChangeEvent, useEffect, useRef, useState } from "react"; 
import { ImportOptions, peakImportFile } from "dexie-export-import";
// import { uploadFile } from "../utils/upload-action"; 
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
import { v4 as uuidv4 } from 'uuid';
import { patientsIndexedDb } from "@/database/db";
import { IPatientGenome, IPatientGenomeVariant } from "@/models/db";

interface UploadFormProps {
    patientId: string;
}
const UploadForm: React.FC<UploadFormProps> = (props) => {  
  const [status, setStatus] = useState<any>(); 
  const [importProgress, setImportProgress] = useState<number>(0); 
  const [patientName, setPatientName] = useState<string>();
  const [file, setFile] = useState<File|null>(null); 
  const fileTypes = ["TXT"]; 
  const chunkSize = 900000; // 0.9MB  
  let totalChunks = 0;
  let chunkProgress;
  let chunkNumber = 0;
  let start = 0;
  let end = 0;

  const patientId = props.patientId; 

  const uploadNextChunksRecursively = async (file: File) => {
    console.log('end', end);
    if (end <= file.size) {
      console.log('end <= file.size');
      const chunkBlob = file.slice(start, end); // Blob
      console.log('chunkBlob', chunkBlob);
    //   await addGeneVariants(chunkBlob);
    //   const temp = `Chunk ${ chunkNumber + 1 }/${totalChunks} uploaded successfully`;
    //   setStatus(temp); 
    //   updateImportProgress({ totalRows: chunkProgress, completedRows: Number(chunkNumber + 1)});
    //   chunkNumber++;
    //   start = end;
    //   uploadNextChunksRecursively(file);
    // } else {
    //   setImportProgress(0);
    //   setStatus("File upload completed");
      end = start + chunkSize; 
    }
  }; 

  const handleError = (file) => {
    console.log(handleError);
  }; 

  const handleFileUpload = async(file: File) => { 
    setFile(file);
    console.log(file);
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    totalChunks = Math.ceil(file.size / chunkSize);
    console.log('totalChunks', totalChunks);

    chunkProgress = 100 / totalChunks;
    console.log('chunkProgress', chunkProgress);

    setImportProgress(0);
    
    uploadNextChunksRecursively(file); 
  }

  const updateImportProgress = ({ totalRows, completedRows }: { totalRows: any, completedRows: number }): boolean => {
    setImportProgress(100 * completedRows / totalRows); 
    return true;
  }

  const serverSideUploadAlternative = () => {
    const formData: FormData = new FormData();
    const httpRequestOptions = {
      method: "POST",
      body: formData,   
    };
    console.log('httpRequestOptions', httpRequestOptions);
    let response = fetch("/api/upload", httpRequestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
    })
    .catch((error) => {
      console.error("Error uploading chunk:", error);
    }); 
  }

  const handleFile = (chunkFormDataBuffer) => { 
    const vcfDataRows = chunkFormDataBuffer.split(/\r\n|\n/); 
    const vcfDataRowsWithoutHeadingText = vcfDataRows.filter((x) => String(x).startsWith('rs') || String(x).startsWith('i'));
    const vcfDelimitedRow = vcfDataRowsWithoutHeadingText.map((x: any) => x.split('\t')); 
    vcfDelimitedRow.map((vcfRow) => {
      try {
        // Database 
        if(!patientId) {
          patientsIndexedDb.patientProfile.where('patientName').equals('Default Profile');
        }
        const patientGenomeId = uuidv4();
        const patientGeneVariantId = uuidv4();
        const vcfSource = 'undefined';
        const patientGenome: IPatientGenome = {  
          patientGenomeId: patientGenomeId,
          source: vcfSource,
          datetimestamp: Date.now(),
          patientId: patientId,
        }
        patientsIndexedDb.patientGenome.add(patientGenome);
        console.log(vcfRow);
        const patientGenomeVariant: IPatientGenomeVariant = { 
          patientGeneVariantId: patientGeneVariantId,
          rsid: vcfRow[0],
          genotype: vcfRow[3],
          chromosome: vcfRow[1],
          position: vcfRow[2],
          datetimestamp: Date.now(),
          patientGenomeId: patientGenomeId,
        }
        patientsIndexedDb.patientGenomeVariant.add(patientGenomeVariant);
      } catch (error) {
          console.error('Error addind gene varients to database:', error);
      }
    }); 
  }

  const addGeneVariants = async (chunkBlob: Blob) => {
    const reader = new FileReader();
    reader.onload = () => handleFile(reader.result);
    reader.readAsText(chunkBlob);
  }

  return (
    <> 
      <div className="file-uploader">
        <h2>Upload a DNA file</h2>
        <div><span>Patient Id: </span>{patientId}</div>
        {importProgress==0 && (
          <div className="m-4 rounded bg-white">
            <FileUploader
              multiple={false}
              uploadedLabel={false}
              handleChange={handleFileUpload} // Will be called when the user selects or drops file(s)
              maxSize="50" // The maximum size of the file (Number in MB)
              onSizeError={(file) => console.log("Size Error")}
              hoverTitle={"Drop here"}
              dropMessageStyle={{backgroundColor: 'red'}}
              name="file"
              types={fileTypes}
              // error={handleError}
            />
          </div>
        )}
        <p>
          {file ? `File name: ${file.name}` : "no files uploaded yet"}
        </p>
        {importProgress!=0 && (
          <p>
            Uploading Progress: {importProgress}
          </p>
        )}
      </div>
      <style jsx>{`
        .file-uploader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        FileUploader {
        }
        h2 {
          font-size: 1rem;
        }
        p, input, label, select, button {
          font-size: 0.8em;
        }
        div span {
          font-weight: 500;
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

export default UploadForm;