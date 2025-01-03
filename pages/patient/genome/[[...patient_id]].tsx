'use client'
import React, { useState, useEffect, useContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import PrivateLayout from '@/pages/PrivateLayout'
import { Separator } from '@radix-ui/react-separator'
import { DrawerContext, ModalContext } from '@/context'
import ReportGridWrapper from '@/components/ReportGridWrapper'
import CreatePatientForm from '@/components/CreatePatientForm'
import UploadForm from '@/components/UploadForm'
import { useLiveQuery } from 'dexie-react-hooks'
import { patientsIndexedDb } from '@/database/database'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import {
  setSelectedPatientProfile,
  setSelectedPatientGenome,
  setSelectedPatientGeneVariant,
  setSelectedChromosome,
  ISelectedItem,
} from '@/state/features/patient/patientSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/state-hooks'
import { usePostSnpDataByRsidQuery } from '@/state/features/research/researchApi'
import _ from 'lodash'

// --------------------------------------------------------------------------------------------
// Risk Report
// (Comparing Patient Gene Variants with Published Literature, e.g. SNP data, such as ClinVar.)
// ---------------------------------------------------------------------------------------------

interface RiskReportPageProps {}
const RiskReportPage: React.FC<RiskReportPageProps> = (props) => {
  const {
    modalTitle,
    modelContent,
    modalVisible,
    updateModalTitle,
    updateModalContent,
    toggleModalVisible,
  } = useContext(ModalContext)
  const {
    drawerTiitle,
    drawerContent,
    drawerVisible,
    updateDrawerTitle,
    updateDrawerContent,
    toggleDrawerVisible,
  } = useContext(DrawerContext)
  const [searchTermEntered, setSearchTermEntered] = useState(null)
  const [enrichedData, setEnrichedData] = useState<any[]>([])
  const [dataStatus, setDataStatus] = useState<string>('')
  // const [error, setError] = useState(null);

  // ------
  // Router
  // ------

  const router = useRouter()

  // -----
  // Redux
  // -----

  const dispatch = useAppDispatch()

  // -----
  // Utils
  // -----

  const selectedSelectItemOrFallback = (selectData, selectDataKey, selectedOption) =>
    selectData && selectData[0] && selectDataKey in selectData[0]
      ? selectedOption || selectData[0][selectDataKey]
      : selectedOption

  // ----------------------
  // Data: Patient Profiles
  // ----------------------

  // Filter #1

  // Fetch patient profiles from IndexedDB
  const patientProfiles = useLiveQuery(() => patientsIndexedDb.patientProfile.toArray())

  // Fetch selected patient profile from Redux store
  const selectedPatientSelectedProfile: ISelectedItem | null = useSelector(
    (state: RootState) => state.patient.selectedPatientProfile,
  ) // dashboard attribute
  const key1 = selectedPatientSelectedProfile || 'default1'
  useEffect(() => {
    console.log('selectedPatientSelectedProfile', selectedPatientSelectedProfile)
    if (selectedPatientSelectedProfile == null) {
      patientProfiles && handleSelectedPatient(patientProfiles[0])
    }
  }, [selectedPatientSelectedProfile?.id])

  // Dispatch actions for patient profiles
  const handleSelectedPatient = (patientProfile: any) => {
    console.log('handleSelectedPatient', patientProfile)
    const id =
      'target' in patientProfile
        ? patientProfile?.target?.value
        : 'patientId' in patientProfile
          ? patientProfile?.patientId
          : null
    id && dispatch(setSelectedPatientProfile({ id: id })) // patientProfile
  }
  const handleAddPatient = async (patientProfile) => {
    await patientsIndexedDb.patientProfile.add(patientProfile)
  }
  // End: Filter #1

  // Effect: Retrieve patient profile ID from URL
  useEffect(() => {
    if (router?.isReady && patientProfiles) {
      // No patient IdD in route path
      if (router.query.patient_id == null) {
        router.push(`/patient/genome/${patientProfiles[0]?.patientId}`)
      }
      // Updated selectedPatientSelectedProfile :. update the route
      if (router.query.patient_id != selectedPatientSelectedProfile?.id) {
        selectedPatientSelectedProfile &&
          router.push(`/patient/genome/${selectedPatientSelectedProfile?.id}`)
      }
      // Load :. update selectedPatientSelectedProfile to match route param
      const patientProfileMatchingPatientIdFromRouter = patientProfiles?.find(
        (x) => x?.patientId == router?.query?.patient_id,
      )
      if (patientProfileMatchingPatientIdFromRouter && !selectedPatientSelectedProfile?.id) {
        handleSelectedPatient(patientProfileMatchingPatientIdFromRouter)
      } else {
        // Load nothing
      }
    }
  }, [router?.isReady, router?.asPath, patientProfiles, selectedPatientSelectedProfile])

  // --------------------
  // Data: Patient Genome
  // --------------------

  // Filter #2

  // Fetch selected patient's genome from IndexedDB
  const selectedPatientGenomes = useLiveQuery(
    () =>
      selectedPatientSelectedProfile &&
      patientsIndexedDb.patientGenome
        .where('patientId')
        .equalsIgnoreCase(String(selectedPatientSelectedProfile?.id))
        .toArray(),
    [selectedPatientSelectedProfile, selectedPatientSelectedProfile],
  )

  // Fetch selected patient's selected genome from Redux store
  const selectedPatientSelectedGenome: ISelectedItem | null = useSelector(
    (state: RootState) => state.patient.selectedPatientGenome,
  ) // dashboard attribute
  const key2 = selectedPatientSelectedGenome || 'default2'
  useEffect(() => {
    console.log('selectedPatientSelectedGenome', selectedPatientSelectedGenome)
    console.log('selectedPatientGenomes', selectedPatientGenomes)
    if (selectedPatientGenomes && selectedPatientSelectedGenome == null) {
      console.log('selectedPatientSelectedGenome: dispatch', selectedPatientGenomes[0])
      selectedPatientGenomes && handleSelectedPatientGenomeChange(selectedPatientGenomes[0])
    }
  }, [selectedPatientGenomes, selectedPatientSelectedGenome?.id])

  // Dispatch actions for patient genome
  const handleSelectedPatientGenomeChange = (patientGenome: any) => {
    const id =
      'target' in patientGenome
        ? patientGenome?.target?.value
        : 'patientGenomeId' in patientGenome
          ? patientGenome?.patientGenomeId
          : null
    id && dispatch(setSelectedPatientGenome({ id: id }))
  }
  // End Filter #2

  // -----------
  // Chromosomes
  // -----------

  // Filter #3

  // Fetch chromosomes from IndexedDB
  const chromosomesList = useLiveQuery(
    // IChromosome[]
    async () => patientsIndexedDb.chromosome.toArray(),
  )

  // Fetch selected patient's selected chromosome from Redux store
  const selectedPatientSelectedChromosome: ISelectedItem | null = useSelector(
    (state: RootState) => state.patient.selectedChromosome,
  ) // dashboard attribute
  const key3 = selectedPatientSelectedChromosome || 'default3'
  useEffect(() => {
    console.log('selectedPatientSelectedChromosome', selectedPatientSelectedChromosome)
    if (selectedPatientSelectedChromosome == null) {
      chromosomesList && handleSelectedChromosomeChange(chromosomesList[0])
    }
  }, [chromosomesList, selectedPatientSelectedChromosome?.id])

  // Dispatch actions for chromosomes
  const handleSelectedChromosomeChange = (chromosome: any) => {
    const id =
      'target' in chromosome
        ? chromosome?.target?.value
        : 'chromosomeName' in chromosome
          ? chromosome?.chromosomeName
          : null
    id && dispatch(setSelectedChromosome({ id: id }))
  }
  // End Filter #3

  // ----------------------------------
  // Data: Patient Gene Variants (SNPs)
  // ----------------------------------

  // Fetch selected patient's genome variants from IndexedDB
  const selectedPatientGeneVariants: any[] = useLiveQuery(() => {
    console.log('selectedPatientGeneVariants', selectedPatientGeneVariants)
    return patientsIndexedDb.patientGenomeVariant
      .where({
        patientGenomeId: String(selectedPatientSelectedGenome?.id),
        chromosome: String(selectedPatientSelectedChromosome?.id)
          .replace('Chromosome', '')
          .replace(' ', ''),
      })
      .toArray()
  }, [selectedPatientSelectedGenome?.id, selectedPatientSelectedChromosome?.id])

  const selectedPatientSelectedGeneVariant: ISelectedItem | string = useSelector(
    (state: RootState) => state.patient.selectedPatientGeneVariant,
  ) // dashboard attribute
  const key4 = selectedPatientSelectedGeneVariant || 'default4'
  useEffect(() => {}, [selectedPatientGeneVariants, selectedPatientSelectedGeneVariant?.id])

  const handleSelectedPatientGeneVariantChange = (geneVariant: any) => {
    const id =
      'target' in geneVariant
        ? geneVariant?.target?.value
        : 'patientGeneVariantId' in geneVariant
          ? geneVariant?.patientGeneVariantId
          : null
    id && dispatch(setSelectedPatientGeneVariant({ id: id }))
  }

  // --------------
  // Drawer Content
  // --------------

  const handleSelectedDataRowChange = (e) => {
    handleSelectedPatientGeneVariantChange(e)
    updateDrawerTitle('Gene Variant Details')
    updateDrawerContent(genomeDetailsDrawerContent(e))
    toggleDrawerVisible(true)
  }

  const genomeDetailsDrawerContent = (contentSlot) => {
    return (
      <>
        <Separator className="my-4" />
        {contentSlot && (
          <div>
            {Object.entries(contentSlot).map(([key, value]: any): any => (
              <p key={key} className="drawer-item">
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        )}
      </>
    )
  }

  // -------------
  // Modal Content
  // -------------

  const modalContent = (contentSlot: any) => <div className="mt-2 px-7 py-3">{contentSlot}</div>

  // ---------------
  // Dashboard Setup
  // ---------------

  const dashboardTitle = 'Patient Genome (DNA File) Report'

  const dashboardNavButtons = [
    {
      buttonTitle: 'Create New Patient',
      onClickMethod: () => {
        updateModalTitle('Create New Patient')
        updateModalContent(modalContent(<CreatePatientForm />))
        toggleModalVisible(true)
      },
      condtionVariable: true,
    },
    {
      buttonTitle: 'Upload DNA File',
      onClickMethod: () => {
        updateModalTitle('Upload Patient File')
        updateModalContent(
          modalContent(
            <UploadForm patientIdFromParentComponent={selectedPatientSelectedProfile.id} />,
          ),
        )
        toggleModalVisible(true)
      },
      condtionVariable: selectedPatientSelectedProfile,
    },
  ]

  const dashboardNavDropdowns = [
    {
      dataAsList: patientProfiles || [],
      error: null,
      selectedSelectItem: selectedSelectItemOrFallback(
        patientProfiles,
        'patientId',
        selectedPatientSelectedProfile?.id,
      ),
      handleSelectedItemChange: handleSelectedPatient,
      selectDataKey: 'patientId',
      displayField: 'patientName',
      selectTitle: 'Patient Profile:',
      placeholder: 'Please choose a patient',
      updateStatus: setDataStatus,
    },
    {
      dataAsList: selectedPatientGenomes || [],
      error: null,
      selectedSelectItem: selectedSelectItemOrFallback(
        selectedPatientGenomes,
        'patientGenomeId',
        selectedPatientSelectedGenome?.id,
      ),
      handleSelectedItemChange: handleSelectedPatientGenomeChange,
      selectDataKey: 'patientGenomeId',
      displayField: 'datetimestamp',
      selectTitle: 'Genome:',
      placeholder: 'Please choose a DNA file',
      updateStatus: setDataStatus,
    },
    {
      dataAsList: chromosomesList || [],
      error: null,
      selectedSelectItem: selectedSelectItemOrFallback(
        chromosomesList,
        'chromosomeName',
        selectedPatientSelectedChromosome?.id,
      ),
      handleSelectedItemChange: handleSelectedChromosomeChange,
      selectDataKey: 'chromosomeName',
      displayField: 'chromosomeName',
      selectTitle: 'Chromosome:',
      placeholder: 'Please choose a chromosome',
      updateStatus: setDataStatus,
    },
  ]

  const dashboardComponents = []

  // ----------
  // Grid Setup
  // ----------

  const columns = [
    { headerName: 'rsid', field: 'rsid', flex: 2, maxWidth: 100 },
    { headerName: 'genotype', field: 'genotype', flex: 1, maxWidth: 80 },
    { headerName: 'chromosome', field: 'chromosome', flex: 1, maxWidth: 100 },
    { headerName: 'position', field: 'position', flex: 2, maxWidth: 120 },
    { headerName: 'datetimestamp', field: 'datetimestamp', flex: 1, maxWidth: 120 },
    { headerName: 'patientId', field: 'patientId', flex: 1, maxWidth: 280 },
    { headerName: 'patientGenomeId', field: 'patientGenomeId', flex: 1, maxWidth: 280 },
  ]

  return (
    <PrivateLayout isSidebar={true}>
      <div>{selectedPatientGeneVariants?.length}</div>
      <ReportGridWrapper
        dashboardTitle={dashboardTitle}
        dashboardComponents={dashboardComponents}
        dashboardNavButtons={dashboardNavButtons}
        dashboardNavDropdowns={dashboardNavDropdowns}
        columns={columns}
        reportRowsData={selectedPatientGeneVariants}
        handleSelectedDataRowChange={handleSelectedDataRowChange}
      />
    </PrivateLayout>
  )
}

export default RiskReportPage
