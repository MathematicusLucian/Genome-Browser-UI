// 'use client';
import { ChangeEvent, useEffect, useRef, useState } from "react"; 
import { ImportOptions, peakImportFile } from "dexie-export-import";
// import { uploadFile } from "../utils/upload-action"; 
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
import { IPatientGenome, patientGenomeTable } from "@/database/db";

export default function UploadForm() {
  const [status, setStatus] = useState(''); 
  const [importProgress, setImportProgress] = useState(0); 
  const [file, setFile] = useState<File>(null); 
  const [patientName, setPatientName] = useState('');
  const patientId = '1'; 
  const fileTypes = ["TXT"]; 
  const chunkSize = 900000; // 0.9MB  
  let totalChunks = 0;
  let chunkProgress;
  let chunkNumber = 0;
  let start = 0;
  let end = 0;

  const handleError = (file) => {
    console.log(handleError);
  };

  const handleFileUpload = async(file: File) => { 
    setFile(file);
    totalChunks = Math.ceil(file.size / chunkSize);
    console.log('totalChunks', totalChunks);
    chunkProgress = 100 / totalChunks;
    console.log('chunkProgress', chunkProgress);
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setImportProgress(0);
    uploadNextChunksRecursively(file); 
  }

  const uploadNextChunksRecursively = async (file: File) => {
    end = start + chunkSize; 
    if (end <= file.size) {
      const chunkBlob = file.slice(start, end); // Blob
      await addGeneVariants(chunkBlob);
      const temp = `Chunk ${ chunkNumber + 1 }/${totalChunks} uploaded successfully`;
      setStatus(temp); 
      updateImportProgress({ totalRows: chunkProgress, completedRows: Number(chunkNumber + 1)});
      chunkNumber++;
      start = end;
      uploadNextChunksRecursively(file);
    } else {
      setImportProgress(0);
      setStatus("File upload completed");
    }
  }; 

  const updateImportProgress = ({ totalRows, completedRows }: { totalRows: any, completedRows: number }): boolean => {
    setImportProgress(100 * completedRows / totalRows); 
    return true;
  }

  const handleFile = (chunkFormDataBuffer) => { 
    const vcfDataRows = chunkFormDataBuffer.split(/\r\n|\n/); 
    const vcfDataRowsWithoutHeadingText = vcfDataRows.filter((x) => String(x).startsWith('rs') || String(x).startsWith('i'));
    const vcfDelimitedRow = vcfDataRowsWithoutHeadingText.map((x: any) => x.split('\t')); 
    vcfDelimitedRow.map((vcfRow) => {
      // Database
      try {
        console.log(vcfRow);
        const patientGenome: IPatientGenome = { 
          patient_id: patientId, 
          rsid: vcfRow[0], 
          chromosome: vcfRow[1], 
          position: vcfRow[2], 
          genotype: vcfRow[3], 
        }
        patientGenomeTable.add(patientGenome);
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
        {importProgress==0 && (<FileUploader
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

// const httpRequestOptions = {
//   method: "POST",
//   body: formData,   
// };
// console.log('httpRequestOptions', httpRequestOptions);
// let response = fetch("/api/upload", httpRequestOptions)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log({ data });
// })
// .catch((error) => {
//   console.error("Error uploading chunk:", error);
// }); 