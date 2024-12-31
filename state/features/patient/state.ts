import { IPatientProfile, IPatientGenome, IPatientGenomeVariant } from '../../../models/database'; 

export interface IPatientState {
    patientProfile: IPatientProfile[],
    selectedPatientProfile: IPatientProfile,
    patientGenome: IPatientGenome[],
    selectedPatientGenome: IPatientGenome,
    patientGeneVariant: IPatientGenomeVariant[],
    selectedPatientGeneVariant: IPatientGenomeVariant
}

export const initialState: IPatientState = {
    patientProfile: [{
        patientId: '0', 
        patientName: 'Default patient profile',
        datetimestamp: Date.now() 
    }],
    selectedPatientProfile: {
        patientId: '0', 
        patientName: 'Default patient profile',
        datetimestamp: Date.now() 
    }, 
    patientGenome: [{  
        patientGenomeId: '0',
        source: 'ABC',
        datetimestamp: Date.now(),
        patientId: 0
    }],
    selectedPatientGenome: {
        patientGenomeId: '0',
        source: 'ABC',
        datetimestamp: Date.now(),
        patientId: 0
    },
    patientGeneVariant: [{ 
        patientGeneVariantId: '1',
        rsid: '1',
        genotype: '1',
        chromosome: '1',
        position: '1',
        datetimestamp: Date.now(),
        patientGenomeId: 1
    }],
    selectedPatientGeneVariant: {
        patientGeneVariantId: '1',
        rsid: '1',
        genotype: '1',
        chromosome: '1',
        position: '1',
        datetimestamp: Date.now(),
        patientGenomeId: 1
    }, 
}