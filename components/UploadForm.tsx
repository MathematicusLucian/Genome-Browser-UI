// 'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ImportOptions, peakImportFile } from 'dexie-export-import'
// import { uploadFile } from "../utils/upload-action";
import axios from 'axios'
import { FileUploader } from 'react-drag-drop-files'
import { v4 as uuidv4 } from 'uuid'
import { patientsIndexedDb } from '@/database/database'
import { IPatientGenome, IPatientGenomeVariant, IPatientProfile } from '@/models/database'
import { useLiveQuery } from 'dexie-react-hooks'
import DataGridFilter from './DropdownFllter'

interface UploadFormProps {
  patientIdFromParentComponent: string
}
const UploadForm: React.FC<UploadFormProps> = ({ patientIdFromParentComponent }) => {
  const [status, setStatus] = useState<any>()
  const [importProgress, setImportProgress] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [progressData, setProgressData] = useState<Array<number>>([])
  const [patientId, setPatientId] = useState<string>()
  const [patient, setPatient] = useState<string>()
  const [fileSelectedForUpload, setFileSelectedForUpload] = useState<File | null>(null)
  const [abortControllers, setAbortControllers] = useState<Array<AbortController>>([])
  const fileTypes = ['TXT']
  const reader = new FileReader()

  useEffect(() => {
    console.log('patientIdFromParentComponent', patientIdFromParentComponent)
    setPatientId(patientIdFromParentComponent)
  }, [patientIdFromParentComponent])

  const handleError = (file) => {
    console.log(handleError)
  }

  const createGenomeReference = async () => {
    const patientGenomeId = uuidv4()
    try {
      const vcfSource = 'undefined'
      const patientGenome: IPatientGenome = {
        patientGenomeId: patientGenomeId,
        source: vcfSource,
        datetimestamp: Date.now(),
        patientId: patientId,
      }
      return await patientsIndexedDb.patientGenome.add(patientGenome)
    } catch (error) {
      console.error('Error adding genome to database:', error)
    }
  }

  // Store data in IndexedDB
  async function storeInIndexedDB(patientGenomeId, lines) {
    try {
      const validObjects = lines
        .map((line) => {
          if (line && line.length != 0) {
            const [rsid, chromosome, position, genotype] = line.split('\t')
            const patientGenomeVariant: IPatientGenomeVariant = {
              patientGeneVariantId: uuidv4(),
              rsid: rsid.trim(),
              chromosome: chromosome.trim(),
              position: position.trim(),
              genotype: genotype.trim(),
              datetimestamp: Date.now(),
              patientGenomeId: patientGenomeId,
            }
            return patientGenomeVariant // Skip invalid lines
          }
          return null // Remove null or undefined entries
        })
        .filter(Boolean)
      if (validObjects.length > 0) {
        const BATCH_SIZE = 1000 // Define a suitable batch size
        for (let i = 0; i < validObjects.length; i += BATCH_SIZE) {
          const batch = validObjects.slice(i, i + BATCH_SIZE)

          // Log the batch to debug data issues
          console.log('Storing batch:', batch)

          // Validate all objects in the batch
          const sanitizedBatch = batch.map((item) => ({
            ...item,
            patientGeneVariantId: String(item.patientGeneVariantId), // Ensure all values are serializable
            rsid: String(item.rsid),
            patientGenomeId: String(item.patientGenomeId),
            chromosome: String(item.chromosome),
            position: String(item.position),
            genotype: String(item.genotype),
            datetimestamp: Number(item.datetimestamp), // Ensure it's a number
          }))

          // Add batch to IndexedDB
          await patientsIndexedDb.patientGenomeVariant.bulkAdd(sanitizedBatch)
          console.log(`Stored batch ${i / BATCH_SIZE + 1} with ${sanitizedBatch.length} records.`)
        }
      } else {
        console.warn('No valid objects to store.')
      }
      console.log(`Stored ${lines.length} lines in the database.`)
    } catch (error) {
      console.error('Error storing data in Dexie.js:', error)
    }
  }

  const handleFile = async (patientGenomeId, chunkFormDataBuffer) => {
    const BATCH_SIZE = 10000 // Process 10,000 lines at a time
    let linesBuffer = []
    const lines = await chunkFormDataBuffer.split(/\r\n|\n/)
    for (const line of lines) {
      if (String(line).startsWith('rs') || String(line).startsWith('i')) {
        linesBuffer.push(line.trim())
        // Process in batches
        if (linesBuffer.length >= BATCH_SIZE) {
          await storeInIndexedDB(patientGenomeId, linesBuffer)
          linesBuffer = [] // Reset buffer
        }
      }
    }
  }
  const handleFileUpload = async (file: File, chunkSize = 6 * 1024 * 1024) => {
    setFileSelectedForUpload(file)
    if (!file) {
      console.log('Please select a file to upload.')
      return
    }
    if (file) {
      setImportProgress(0)
      setProgressData([])
      setAbortControllers([])
      const patientGenomeId = await createGenomeReference()
      reader.onload = async (e) => {
        const lines = await handleFile(patientGenomeId, reader.result)
      }
      reader.onerror = (e) => {
        console.error('Error reading file:', e)
      }
      reader.readAsText(file)
    }
  }

  // -----
  // Utils
  // -----

  const selectedSelectItemOrFallback = (selectData, selectDataKey, selectedOption) =>
    selectData && selectData[0] && selectDataKey in selectData[0]
      ? selectedOption || selectData[0][selectDataKey]
      : selectedOption

  // Filter #1

  // Fetch patient profiles from IndexedDB
  const patientProfiles = useLiveQuery(() => patientsIndexedDb.patientProfile.toArray())

  const handleSelectedPatient = (event) => {
    console.log(event.target.value)
    setPatientId(event.target.value)
  }

  const updateStatus = () => {}

  // Dashboards

  const navDropdowns = {
    dataAsList: patientProfiles || [],
    selectedSelectItem: selectedSelectItemOrFallback(
      patientProfiles,
      'patientId',
      patientIdFromParentComponent,
    ),
    handleSelectedItemChange: handleSelectedPatient,
    selectDataKey: 'patientId',
    displayField: 'patientName',
    selectTitle: 'Patient Profile:',
    placeholder: 'Please choose a patient',
    updateStatus: updateStatus,
  }

  return (
    <>
      <div className="file-uploader">
        {patientProfiles && (
          <DataGridFilter
            dataAsList={navDropdowns.dataAsList}
            selectedSelectItem={navDropdowns.selectedSelectItem}
            handleSelectedItemChange={navDropdowns.handleSelectedItemChange}
            selectDataKey={navDropdowns.selectDataKey}
            displayField={navDropdowns.displayField}
            selectTitle={navDropdowns.selectTitle}
            placeholder={navDropdowns.placeholder}
            updateStatus={navDropdowns.updateStatus}
          />
        )}
        <div>
          <label>New Patient Name: </label>
          <input name="newPatientName"></input>
          <hr />
          <span>Patient Id: </span>
          {patientId}
        </div>
        {importProgress == 0 && (
          <div className="m-4 rounded bg-white">
            <FileUploader
              multiple={false}
              uploadedLabel={false}
              handleChange={handleFileUpload} // Will be called when the user selects or drops file(s)
              maxSize="50" // The maximum size of the file (Number in MB)
              onSizeError={(file) => console.log('Size Error')}
              hoverTitle={'Drop here'}
              dropMessageStyle={{ backgroundColor: 'red' }}
              name="file"
              types={fileTypes}
              // error={handleError}
            />
          </div>
        )}
        <p>
          {fileSelectedForUpload
            ? `File name: ${fileSelectedForUpload.name}`
            : 'no files uploaded yet'}
        </p>
        <p>Uploading Progress: {importProgress}</p>
        {isLoading && <p>{isLoading}</p>}
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
        p,
        input,
        label,
        select,
        button {
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
  )
}

export default UploadForm
