'use client'
import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import TableGrid from './TableGrid'
import { enrichedData, fetchData } from '../services/PatientData'
import { useAppDispatch, useAppSelector } from '@/hooks/state-hooks'
import { selectAllPatients } from '@/state/features/patient/patientSlice'
import error from 'next/error'

const PatientList: FC = () => {
  const [columnDefs, setColumnDefs] = useState([])
  const [selectedDataRow, setSelectedDataRow] = useState<string | null>(null)

  // State
  const dispatch = useAppDispatch()
  const patients: any = useAppSelector(selectAllPatients)

  // Data
  const patientsList = patients
    ? patients.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))
    : []

  useEffect(() => {
    const columns = [
      { headerName: 'patientId', field: 'patientId', flex: 2, maxWidth: 280 },
      { headerName: 'patientName', field: 'patientName', flex: 2, maxWidth: 180 },
      { headerName: 'datetimestamp', field: 'datetimestamp', flex: 2, maxWidth: 120 },
    ]
    setColumnDefs(columns)
    fetchData()
  }, [])

  const handleSelectedDataRowChange = (dataRow: string) => {
    setSelectedDataRow(dataRow)
  }

  return (
    <>
      {/* {patientProfiles && (
        <div className="profile-count">{patientProfiles.length} patient profiles in total</div>
      )} */}

      <TableGrid
        rowData={patients}
        columnDefs={columnDefs}
        error={error}
        onSelectedDataRowChange={handleSelectedDataRowChange}
      />

      <style jsx>{`
        p,
        div,
        li,
        input,
        label,
        select,
        button {
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
  )
}

export default PatientList
