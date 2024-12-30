'use server'; 
import type { NextApiRequest, NextApiResponse } from 'next'
import type { FileHandle } from 'fs/promises';
import { open } from 'fs/promises';
import { join } from 'path';
import type { ChunkUploadHandler } from 'nextjs-chunk-upload-action';
import { useState } from 'react';
import { IPatientGenome, patientsIndexedDb } from '@/database/database';
import { v4 as uuidv4 } from 'uuid';
// patient_id: uuidv4(),

type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Uploading file chunk . . .'});
  chunkUploadAction(req.body, {name: 'file.txt'});
} 

export const savePatientGeneVariantToIndexedDB = async (patientGenome) => { 
  const patientGeneVariant = await patientsIndexedDb.patientGenomeVariant.add(patientGenome);
} 

export const chunkUploadAction: ChunkUploadHandler<{ name: string }> = async (
  chunkFormDataBuffer,
  metadata
) => {
  // const [dbOperationStatus, setDbOperationStatus] = useState(<></>);
  // const [validateImport, setValidateImport] = useState('');
  // const [importableBlob, setImportableBlob] = useState<Blob | undefined>();
  // const [loadedDocs, setLoadedDocs] = useState(0);
  // const [totalDocs, setTotalDocs] = useState(0);
  // const [mostRecentVersions, setMostRecentVersions] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [fileBuffer, setFileBuffer] = useState(null);

  if(chunkFormDataBuffer) { 
    const vcfDataRows = String(chunkFormDataBuffer).split(/\r\n|\n/);
    const vcfDataRowsWithoutHeadingText = vcfDataRows.filter((x) => String(x).startsWith('rs') || String(x).startsWith('i'));
    const vcfDelimitedRow = vcfDataRowsWithoutHeadingText.map((x: any) => x.split('\t')); 
    // for(let vcfRow in vcfDelimitedRow) {
    //   console.log(vcfRow)
    // }
    console.log(vcfDelimitedRow[0])
    const patientId = '1';
    const rsid = vcfDelimitedRow[0];
    // const patientGenome: IPatientGenome = { 
    //   patient_id: patientId,
    //   rsid: rsid,
    //   chromosome: vcfDelimitedRow[1],
    //   position: vcfDelimitedRow[2],
    //   genotype: vcfDelimitedRow[3],
    // }
    // savePatientGeneVariantToIndexedDB(patientGenome).catch(console.error);
  }
}