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
import DataGridFilter from './DataGridFllter'

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
  const chunkSize = 5 * 1024 * 1024 // 5 MB chunk size
  const chunks: any[] = []
  let fileSize
  const totalChunks = 0
  let chunkProgress
  const chunkNumber = 0
  let startPointer = 0
  let endPointer = chunkSize // 0
  const reader = new FileReader()
  const uniqueId = (Math.random() * 10000000000).toString(16)

  useEffect(() => {
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
        patientId: patientId || patientIdFromParentComponent || null,
      }
      await patientsIndexedDb.patientGenome.add(patientGenome)
      return patientGenomeId
    } catch (error) {
      console.error('Error adding genome to database:', error)
    }
  }

  // Open IndexedDB
  async function openIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('LargeFileDB', 1)

      request.onupgradeneeded = (e: any) => {
        const db = e.target.result
        if (!db.objectStoreNames.contains('lines')) {
          db.createObjectStore('lines', { keyPath: 'id', autoIncrement: true })
        }
      }

      request.onsuccess = (e: any) => {
        resolve(e.target.result)
      }

      request.onerror = (e) => {
        reject(e)
      }
    })
  }

  // Store data in IndexedDB
  async function storeInIndexedDB(db, patientGenomeId, lines) {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('lines', 'readwrite')
      const store = transaction.objectStore('lines')

      // try {
      lines.forEach((line) => {
        // // store.add({ line })
        if (line.length != 0) {
          // console.log(line)
          const lineDelimited = line.split('\t')
          console.log(lineDelimited)
          store.add({ lineDelimited })
          // console.log('lineDelimited', lineDelimited)
          // const patientGeneVariantId = uuidv4()
          // const patientGenomeVariant: IPatientGenomeVariant = {
          //   patientGeneVariantId: patientGeneVariantId,
          //   rsid: lineDelimited[0],
          //   genotype: lineDelimited[3],
          //   chromosome: lineDelimited[1],
          //   position: lineDelimited[2],
          //   datetimestamp: Date.now(),
          //   patientGenomeId: patientGenomeId,
          // }
          // console.log('patientGenomeVariant', patientGenomeVariant)
          // store.add({ patientGenomeVariant })
          // await patientsIndexedDb.patientGenomeVariant.add(patientGenomeVariant)
        }
      })
      // } catch (error) {
      //   console.error('Error adding gene varients to database:', error)
      // }

      transaction.oncomplete = () => resolve()
      transaction.onerror = (e) => reject(e)
    })
  }

  const handleFile = async (patientGenomeId, chunkFormDataBuffer) => {
    // Use IndexedDB for storing data
    const db = await openIndexedDB()
    // File processing
    // const fileSize = chunkFormDataBuffer.size
    // let lineCount = 0
    const BATCH_SIZE = 10000 // Process 10,000 lines at a time
    let linesBuffer = []
    const lines = await chunkFormDataBuffer.split(/\r\n|\n/)
    for (const line of lines) {
      if (String(line).startsWith('rs') || String(line).startsWith('i')) {
        // console.log(line)
        // console.log(line.length)
        linesBuffer.push(line.trim())
        // lineCount++
        // Process in batches
        if (linesBuffer.length >= BATCH_SIZE) {
          await storeInIndexedDB(db, patientGenomeId, linesBuffer)
          // console.log(line)
          linesBuffer = [] // Reset buffer
        }
        // Process any remaining lines
        // if (linesBuffer.length > 0) {
        //   await storeInIndexedDB(db, patientGenomeId, linesBuffer)
        // }
      }
    }
  }

  const addGeneVariants = async (patientGenomeId, chunkBlob: Blob) => {
    const fileReader = new FileReader()
    fileReader.onload = async () => await handleFile(patientGenomeId, fileReader.result)
    fileReader.readAsText(chunkBlob)
  }

  const cancelUpload = () => {
    abortControllers.forEach((item) => item.abort())
  }

  const progress = progressData?.length
    ? Math.round(progressData?.reduce((item1, item2) => item1 + item2) / (progressData.length || 1))
    : 0

  const createChunks = async (fileSelectedForUpload: File) => {
    fileSize = fileSelectedForUpload.size
    console.log(fileSelectedForUpload.size, fileSelectedForUpload.size / chunkSize)
    while (startPointer < fileSize) {
      console.log(startPointer, endPointer)
      chunks.push(fileSelectedForUpload.slice(startPointer, endPointer))
      console.log(chunks)
      startPointer = endPointer
      endPointer = startPointer + chunkSize
    }
    return chunks
  }

  const uploadChunk = async ({
    patientGenomeId,
    chunk,
    chunkIndex,
    chunksCount,
    chunkSize,
    fileSize,
    uniqueId,
    onUploadProgress,
  }: {
    patientGenomeId: any
    chunk: Blob
    chunkIndex: number
    chunksCount: number
    chunkSize: number
    fileSize: number
    uniqueId: string
    onUploadProgress?: (value: number) => void
  }) => {
    const isLast = chunkIndex + 1 === chunksCount
    const start = chunkIndex * chunkSize
    const end = isLast ? fileSize : start + chunk.size
    const controller = new AbortController()
    setAbortControllers((value) => value.concat(controller))
    setImportProgress(Math.round((100 * end) / fileSize))
    return await addGeneVariants(patientGenomeId, chunk)
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
      // const fileChunks = await createChunks(file)
      const patientGenomeId = createGenomeReference()
      console.log(patientGenomeId)

      reader.onload = async (e) => {
        const lines = await handleFile(patientGenomeId, reader.result)
      }

      reader.onerror = (e) => {
        console.error('Error reading file:', e)
      }

      reader.readAsText(file)
    }

    // const promises = fileChunks.map(
    //   async (chunk, chunkIndex) =>
    //     await uploadChunk({
    //       patientGenomeId,
    //       chunk,
    //       chunkIndex,
    //       chunksCount: fileChunks.length,
    //       chunkSize: chunkSize,
    //       fileSize,
    //       uniqueId,
    //     }),
    // )
    // try {
    //   setIsLoading(true)
    //   Promise.all(promises)
    //     .then((responses) => {
    //       console.log('All chunks uploaded successfully!')
    //     })
    //     .catch((error) => {
    //       console.log('Error uploading chunks:', error)
    //     })
    //   setIsLoading(false)
    // } catch (error) {
    //   console.error(error)
    //   throw error
    // } finally {
    //   setIsLoading(false)
    // }
    // }
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
