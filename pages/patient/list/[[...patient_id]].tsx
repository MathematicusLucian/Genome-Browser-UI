'use client'
import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useRouter } from 'next/router'
import PrivateLayout from '@/pages/PrivateLayout'
import PatientList from '@/components/PatientList'

interface PatientsListPageProps {
  // opensidedrawer: (content: React.ReactNode) => void;
}

const PatientsListPage: React.FC<PatientsListPageProps> = (props) => {
  const [error, setError] = useState(null)

  const router = useRouter()
  const { patient_id } = router.query

  return (
    <PrivateLayout isSidebar={true}>
      {patient_id || error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <div className="text-xl">List of Patient Profiles</div>
          <PatientList />
        </div>
      )}
    </PrivateLayout>
  )
}

export default PatientsListPage
