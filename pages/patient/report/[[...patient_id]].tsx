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
import _ from 'lodash'
import { fetchRsids } from '@/state/features/research/researchSlice'

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
  // const dispatch = useDispatch<AppDispatch>();

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
  const patientProfiles = useLiveQuery(() => {
    console.log('patientProfiles', patientProfiles)
    return patientsIndexedDb.patientProfile.toArray()
  })

  // Fetch selected patient profile from Redux store
  const selectedPatientSelectedProfile: ISelectedItem | null = useSelector(
    (state: RootState) => state.patient.selectedPatientProfile,
  ) // dashboard attribute
  const key1 = selectedPatientSelectedProfile || 'default1'
  useEffect(() => {
    console.log('selectedPatientSelectedProfile', selectedPatientSelectedProfile)
    if (selectedPatientSelectedProfile == null && patientProfiles) {
      handleSelectedPatient(patientProfiles[0])
    }
  }, [selectedPatientSelectedProfile?.id])

  // Dispatch actions for patient profiles
  const handleSelectedPatient = (patientProfile: any) => {
    if (!patientProfile) return

    const id =
      'target' in patientProfile
        ? patientProfile?.target?.value
        : 'patientId' in patientProfile
          ? patientProfile?.patientId
          : null

    console.log('ACTION: handleSelectedPatient', id)

    if (id) {
      console.log('id', id)
      dispatch(setSelectedPatientProfile({ id: id })) // patientProfile
    }
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
        router.push(`/patient/report/${patientProfiles[0]?.patientId}`)
      }
      // Updated selectedPatientSelectedProfile :. update the route
      if (
        router.query.patient_id != selectedPatientSelectedProfile?.id &&
        selectedPatientSelectedProfile
      ) {
        router.push(`/patient/report/${selectedPatientSelectedProfile?.id}`)
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
    if (selectedPatientGenomes && selectedPatientSelectedGenome == null) {
      handleSelectedPatientGenomeChange(selectedPatientGenomes[0])
    }
  }, [selectedPatientGenomes, selectedPatientSelectedGenome?.id])

  // Dispatch actions for patient genome
  const handleSelectedPatientGenomeChange = (patientGenome: any) => {
    if (!patientGenome) return
    const id =
      'target' in patientGenome
        ? patientGenome?.target?.value
        : 'patientGenomeId' in patientGenome
          ? patientGenome?.patientGenomeId
          : null
    if (id) dispatch(setSelectedPatientGenome({ id: id }))
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
    if (selectedPatientSelectedChromosome == null && chromosomesList) {
      handleSelectedChromosomeChange(chromosomesList[0])
    }
  }, [chromosomesList, selectedPatientSelectedChromosome?.id])

  // Dispatch actions for chromosomes
  const handleSelectedChromosomeChange = (chromosome: any) => {
    if (!chromosome) return
    const id =
      'target' in chromosome
        ? chromosome?.target?.value
        : 'chromosomeName' in chromosome
          ? chromosome?.chromosomeName
          : null
    if (id) dispatch(setSelectedChromosome({ id: id }))
  }
  // End Filter #3

  // ----------------------------------
  // Data: Patient Gene Variants (SNPs)
  // ----------------------------------

  // Fetch selected patient's genome variants from IndexedDB
  const selectedPatientGeneVariants: any[] = useLiveQuery(() => {
    const res = patientsIndexedDb.patientGenomeVariant
      .where({
        patientGenomeId: String(selectedPatientSelectedGenome?.id),
        chromosome: String(selectedPatientSelectedChromosome?.id)
          .replace('Chromosome', '')
          .replace(' ', ''),
      })
      // .limit(150)
      .toArray()
    return res
  }, [selectedPatientSelectedGenome?.id, selectedPatientSelectedChromosome?.id])

  const selectedPatientSelectedGeneVariant: ISelectedItem | string = useSelector(
    (state: RootState) => state.patient.selectedPatientGeneVariant,
  ) // dashboard attribute
  const key4 = selectedPatientSelectedGeneVariant || 'default4'
  useEffect(() => {}, [selectedPatientGeneVariants, selectedPatientSelectedGeneVariant?.id])

  const handleSelectedPatientGeneVariantChange = (geneVariant: any) => {
    if (!geneVariant) return
    const id =
      'target' in geneVariant
        ? geneVariant?.target?.value
        : 'patientGeneVariantId' in geneVariant
          ? geneVariant?.patientGeneVariantId
          : null
    if (id) dispatch(setSelectedPatientGeneVariant({ id: id }))
  }

  // -----------------------------------------
  // ClinVar Data: SNP Pairs (Genotype/Allele)
  // -----------------------------------------
  // Returns all genotypes/allele pairs for a list of SNPs, e.g. ["rs10033464"] :. API has no data (privacy) as to which genotype the patient has

  // Simulate rsidsList generation
  const [rsidsList, setRsidsList] = useState<string[]>([])

  // Selector for fetched data
  const { data, status, error } = useSelector((state: RootState) => state.rsid)

  // Simulate rsidsList update in useEffect
  useEffect(() => {
    // Create a list of RSIDs from local DNA file items selected
    const newRsids: string[] = selectedPatientGeneVariants?.map((geneVariant) => geneVariant.rsid)
    setRsidsList(newRsids)
  }, [selectedPatientGeneVariants])

  // When rsidsList updates, trigger API call to fetch clinVar data
  useEffect(() => {
    if (rsidsList?.length > 0) {
      dispatch(fetchRsids(rsidsList))
    }
  }, [rsidsList, dispatch])

  // ------------------------------------------
  // Data Enrichment: SNP Pairs (ClinVar, etc.)
  // ------------------------------------------

  // Function to merge notes from ListB into ListA based on rsid
  function mergeNotes(listA: any[], listB: any[]): any[] {
    if (!listB) {
      return listA
    }
    // Create a Map for fast lookup of rsid-to-notes
    const clinvarRsidsFeaturingNotes = new Map<string, string>()
    listB.forEach((item) => {
      clinvarRsidsFeaturingNotes.set(item.rsid, item.notes)
    })
    // Add notes to ListA where rsid matches
    listA.forEach((item) => {
      if (clinvarRsidsFeaturingNotes.has(item.rsid)) {
        item.notes = clinvarRsidsFeaturingNotes.get(item.rsid) || 'No notes found'
      } else {
        item.notes = 'No notes found'
      }
    })
    return listA
  }

  // Effect: Retrieve enrichedData
  useEffect(() => {
    if (selectedPatientGeneVariants?.length) {
      setEnrichedData(mergeNotes(selectedPatientGeneVariants, data))
    }
  }, [selectedPatientGeneVariants, data])

  // --------------
  // Drawer Content
  // --------------

  const handleSelectedDataRowChange = (e) => {
    handleSelectedPatientGeneVariantChange(e)
    updateDrawerTitle('Risk/SNP (Gene Variant) Details')
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

  const dashboardTitle = 'Patient Risk Report'

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
            <UploadForm patientIdFromParentComponent={selectedPatientSelectedProfile?.id} />,
          ),
        )
        toggleModalVisible(true)
      },
      condtionVariable: true, // selectedPatientSelectedProfile
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

  const riskReportColumns = [
    { headerName: 'rsid', field: 'rsid', flex: 2, maxWidth: 100 },
    { headerName: 'genotype', field: 'genotype', flex: 1, maxWidth: 80 },
    { headerName: 'notes', field: 'notes', flex: 4, maxWidth: 500 },
    { headerName: 'magnitude', field: 'magnitude', flex: 1, maxWidth: 100 },
    { headerName: 'chromosome', field: 'chromosome', flex: 1, maxWidth: 140 },
    { headerName: 'position', field: 'position', flex: 1, maxWidth: 120 },
    { headerName: 'datetimestamp', field: 'datetimestamp', flex: 2, maxWidth: 120 },
    { headerName: 'patientId', field: 'patientId', flex: 2, maxWidth: 120 },
    { headerName: 'patientGenomeId', field: 'patientGenomeId', flex: 2, maxWidth: 120 },
  ]

  return (
    <PrivateLayout isSidebar={true}>
      <div>
        <ReportGridWrapper
          dashboardTitle={dashboardTitle}
          dashboardComponents={dashboardComponents}
          dashboardNavButtons={dashboardNavButtons}
          dashboardNavDropdowns={dashboardNavDropdowns}
          columns={riskReportColumns}
          reportRowsData={selectedPatientGeneVariants}
          // enrichedData
          handleSelectedDataRowChange={handleSelectedDataRowChange}
        />
      </div>

      <div className="py-2 text-xs text-gray-500">
        Profile: {selectedPatientSelectedProfile?.id} ({patientProfiles?.length}) | Genome:{' '}
        {selectedPatientSelectedGenome?.id} ({selectedPatientGenomes?.length}) | Chromosome:
        {String(selectedPatientSelectedChromosome?.id).replace('Chromosome', '').replace(' ', '')} (
        {chromosomesList?.length}) | GeneVariants: {selectedPatientSelectedGeneVariant?.id} (
        {selectedPatientGeneVariants?.length})
      </div>
    </PrivateLayout>
  )
}

export default RiskReportPage
