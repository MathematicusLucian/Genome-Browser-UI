'use client'
import React, { useState, useEffect, useMemo } from 'react'
import type { FC, ReactNode } from 'react'
import TableGrid from '@/components/TableGrid'
import { IFullReport } from '@/models/database'
import Dashboard from './Dashboard'

interface ReportGridWrapperProps {
  children?: ReactNode
  dashboardTitle: string
  dashboardComponents: any
  dashboardNavDropdowns: any
  dashboardNavButtons: any
  reportRowsData: any
  columns: any
  handleSelectedDataRowChange: (e: any) => void
}

const ReportGridWrapper: FC<ReportGridWrapperProps> = ({
  children,
  dashboardTitle,
  dashboardComponents,
  dashboardNavDropdowns,
  dashboardNavButtons,
  reportRowsData,
  columns,
  handleSelectedDataRowChange,
}) => {
  const error = () => {}

  return (
    <Dashboard
      dashboardTitle={dashboardTitle}
      dashboardComponents={dashboardComponents}
      dashboardNavDropdowns={dashboardNavDropdowns}
      dashboardNavButtons={dashboardNavButtons}
      error={error}
    >
      {/* <div className="text-sm">
        Profile: {selectedPatientSelectedProfile?.id} ({patientProfiles?.length}) | Genome:{' '}
        {selectedPatientSelectedGenome?.id} ({selectedPatientGenomes?.length}) | Chromosome:{' '}
        {selectedPatientSelectedChromosome?.id} ({chromosomesList?.length}) | GeneVariants:{' '}
        {selectedPatientSelectedGeneVariant?.id} ({selectedPatientGeneVariants?.length})
      </div> */}

      {reportRowsData ? (
        <TableGrid
          rowData={reportRowsData}
          columnDefs={columns}
          error={error}
          onSelectedDataRowChange={handleSelectedDataRowChange}
        />
      ) : (
        <div>Please provide risk report data. The patient profile, or genome may not exist.</div>
      )}

      {children}
    </Dashboard>
  )
}

export default ReportGridWrapper
