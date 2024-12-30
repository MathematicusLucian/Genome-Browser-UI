import { IPatientGenomeVariant, ISnpPairsResearch, IFullReport } from '../../../models/database';

export const initialPatientGenomeVariantState: IPatientGenomeVariant[] = [
    { 
        patientGeneVariantId: '1',
        rsid: '1',
        genotype: '1',
        chromosome: '1',
        position: '1',
        datetimestamp: Date.now(),
        patientGenomeId: 1
    }, 
]

export const ISnpPairsResearchState: ISnpPairsResearch[] = []

export const IFullReportState: IFullReport[] = []