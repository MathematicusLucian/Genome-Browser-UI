import { ISnpPairsResearch, IPatientProfileAndGenome, IFullReport } from '../../../models/database';

export interface IResearchData {
    snpPairsResearch: ISnpPairsResearch[]|ISnpPairsResearch,
    patientProfileAndGenome: IPatientProfileAndGenome[]|IPatientProfileAndGenome, 
    riskReport: IFullReport
}

export const initialState: IResearchData[] = [
    { 
        snpPairsResearch: [{
            rsid_genotypes: '',
            rsid: '',
            allele1: '',
            allele2: '', 
            magnitude: '', 
            risk: '',
            notes: '',
        }], 
        patientProfileAndGenome: [{
            patientProfileAndGenome: '',
            rsid: '',
            genotype: '',
            chromosome: '',
            position: '',
            patientId: '',
            patientName: '',
        }],
        riskReport: {
            rsid_genotypes: '',
            rsid: '',
            allele1: '',
            allele2: '',
            chromosome: '',
            position: '',
            genotype: '',
            magnitude: '', 
            risk: '',
            notes: '',
            genotype_match: '',
            datetimestamp: '',
            patientId: '',
            patientName: '',
        }
    }, 
]