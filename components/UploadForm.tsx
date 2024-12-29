// 'use client';
import { ChangeEvent, useEffect, useRef, useState } from "react"; 
import { ImportOptions, peakImportFile } from "dexie-export-import";
// import { uploadFile } from "../utils/upload-action"; 
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
import { v4 as uuidv4 } from 'uuid';
import { patientsIndexedDb } from "@/database/db";
import { IPatientGenome, IPatientGenomeVariant, IPatientProfile } from "@/models/db";

interface UploadFormProps {
  patientIdFromParentComponent: string;
}
const UploadForm: React.FC<UploadFormProps> = ({patientIdFromParentComponent}) => {  
  const [status, setStatus] = useState<any>(); 
  const [importProgress, setImportProgress] = useState<number>(0); 
  const [patientId, setPatientId] = useState<string>();
  const [patient, setPatient] = useState<string>();
  const [fileSelectedForUpload, setFileSelectedForUpload] = useState<File|null>(null); 
  const fileTypes = ["TXT"]; 
  const chunkSize = 900000; // 0.9MB  
  let totalChunks = 0;
  let chunkProgress;
  let chunkNumber = 0;
  let start = 0;
  let end = 0;

  useEffect(() => {
    setPatientId(patientIdFromParentComponent);
  }, [patientIdFromParentComponent]);

  const handleError = (file) => {
    console.log(handleError);
  }; 

  const handleFile = async (chunkFormDataBuffer) => { 
    const vcfDataRows = await chunkFormDataBuffer.split(/\r\n|\n/); 
    const vcfDataRowsWithoutHeadingText = await vcfDataRows.filter((x) => String(x).startsWith('rs') || String(x).startsWith('i'));
    const vcfDelimitedRow = await vcfDataRowsWithoutHeadingText.map((x: any) => x.split('\t')); 
    const patientGenomeId = uuidv4();
    try {
      // Database 
      if(!patientId) {
        const defaultProfile: IPatientProfile = await patientsIndexedDb.patientProfile.where('patientName').equals('Default Profile').toArray()[0];
        setPatientId(defaultProfile.patientId); 
      }
      const vcfSource = 'undefined';
      const patientGenome: IPatientGenome = {  
        patientGenomeId: patientGenomeId,
        source: vcfSource,
        datetimestamp: Date.now(),
        patientId: patientId,
      }
      await patientsIndexedDb.patientGenome.add(patientGenome);
    } catch (error) {
        console.error('Error adding genome to database:', error);
    }
    await vcfDelimitedRow.map(async (vcfRow) => {
      try {
        const patientGeneVariantId = uuidv4();
        const patientGenomeVariant: IPatientGenomeVariant = { 
          patientGeneVariantId: patientGeneVariantId,
          rsid: vcfRow[0],
          genotype: vcfRow[3],
          chromosome: vcfRow[1],
          position: vcfRow[2],
          datetimestamp: Date.now(),
          patientGenomeId: patientGenomeId,
        }
        await patientsIndexedDb.patientGenomeVariant.add(patientGenomeVariant);
      } catch (error) {
          console.error('Error adding gene varients to database:', error);
      }
    }); 
  }

  const addGeneVariants = async (chunkBlob: Blob) => {
    const reader = new FileReader();
    reader.onload = async () => await handleFile(reader.result);
    reader.readAsText(chunkBlob);
  }

  const uploadNextChunksRecursively = async (fileSelectedForUpload: File) => {
    if (end <= fileSelectedForUpload.size) {
      end = start + chunkSize; 
      const chunkBlob = fileSelectedForUpload.slice(start, end);
      await addGeneVariants(chunkBlob);
      const temp = `Chunk ${ chunkNumber + 1 }/${totalChunks} uploaded successfully`;
      setStatus(temp); 
      updateImportProgress({ totalRows: chunkProgress, completedRows: Number(chunkNumber + 1)});
      chunkNumber++;
      start = end;
      // await uploadNextChunksRecursively(fileSelectedForUpload);
    } else {
      setImportProgress(0);
      setStatus("File upload completed");
    }
  }; 

  const handleFileUpload = async(file: File) => { 
    setFileSelectedForUpload(file);
    if (!file) {
      // alert("Please select a file to upload.");
      console.log("Please select a file to upload.");
      return;
    }
    if(file) {
      totalChunks = Math.ceil(file.size / chunkSize);
      console.log('totalChunks', totalChunks);
      chunkProgress = 100 / totalChunks;
      console.log('chunkProgress', chunkProgress);
      setImportProgress(0);
      await uploadNextChunksRecursively(file);  
    }
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
    fetch("/api/upload", httpRequestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
    })
    .catch((error) => {
      console.error("Error uploading chunk:", error);
    }); 
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
          {fileSelectedForUpload ? `File name: ${fileSelectedForUpload.name}` : "no files uploaded yet"}
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