import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
// import { initialState } from './state';
import { IPatientProfile, IPatientGenome, IPatientGenomeVariant, IChromosome } from '../../../models/database';

export interface IPatientState {
    patientProfile: IPatientProfile[];
    selectedPatientProfile:  any; // string | null;
    selectedChromosome: string | null;
    patientGenome: IPatientGenome[];
    selectedPatientGenome: string | null;
    patientGeneVariant: IPatientGenomeVariant[];
    selectedPatientGeneVariant: string | null;
}

export const initialState: IPatientState = {
    patientProfile: [
        {
            patientId: '0',
            patientName: 'Default patient profile',
            datetimestamp: Date.now(),
        },
    ],
    selectedPatientProfile: null,
    selectedChromosome: null,
    patientGenome: [
        {
            patientGenomeId: '0',
            source: 'ABC',
            datetimestamp: Date.now(),
            patientId: '0',
        },
    ],
    selectedPatientGenome: null,
    patientGeneVariant: [
        {
            patientGeneVariantId: '1',
            rsid: '1',
            genotype: '1',
            chromosome: '1',
            position: '1',
            datetimestamp: Date.now(),
            patientGenomeId: '0',
        },
    ],
    selectedPatientGeneVariant: null,
};

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        // Patient Profiles
        addPatientProfile: (state, action: PayloadAction<IPatientProfile>) => {
            state.patientProfile.push(action.payload);
        },
        updatePatientProfile: (state, action: PayloadAction<IPatientProfile>) => {
            const index = state.patientProfile.findIndex(
                (profile) => profile.patientId === action.payload.patientId
            );
            if (index !== -1) {
                state.patientProfile[index] = action.payload;
            }
        },
        setSelectedPatientProfile: (state, action: PayloadAction<any>) => { // IPatientProfile
            state.selectedPatientProfile = { ...action.payload }; // Ensure a new object is created 
        },
        // Chromosome
        setSelectedChromosome: (state, action: PayloadAction<IChromosome>) => {
            state.selectedChromosome = { ...action.payload }; // Ensure a new object is created
        }, 
        // Patient Genomes
        addPatientGenome: (state, action: PayloadAction<IPatientGenome>) => {
            state.patientGenome.push(action.payload);
        },
        updatePatientGenome: (state, action: PayloadAction<IPatientGenome>) => {
            const index = state.patientGenome.findIndex(
                (genome) => genome.patientGenomeId === action.payload.patientGenomeId
            );
            if (index !== -1) {
                state.patientGenome[index] = action.payload;
            }
        },
        setSelectedPatientGenome: (state, action: PayloadAction<IPatientGenome>) => {
            state.selectedPatientGenome = { ...action.payload }; // Ensure a new object is created
        },
        // Patient Gene Variants
        addPatientGeneVariant: (state, action: PayloadAction<IPatientGenomeVariant>) => {
            state.patientGeneVariant.push(action.payload);
        },
        updatePatientGeneVariant: (state, action: PayloadAction<IPatientGenomeVariant>) => {
            const index = state.patientGeneVariant.findIndex(
                (variant) => variant.patientGeneVariantId === action.payload.patientGeneVariantId
            );
            if (index !== -1) {
                state.patientGeneVariant[index] = action.payload;
            }
        },
        setSelectedPatientGeneVariant: (state, action: PayloadAction<IPatientGenomeVariant>) => {
            state.selectedPatientGeneVariant = { ...action.payload }; // Ensure a new object is created
        },
    },
});

// Export Actions
export const {
    addPatientProfile,
    updatePatientProfile,
    setSelectedPatientProfile,
    setSelectedChromosome,
    addPatientGenome,
    updatePatientGenome,
    setSelectedPatientGenome,
    addPatientGeneVariant,
    updatePatientGeneVariant,
    setSelectedPatientGeneVariant,
} = patientsSlice.actions;

// Export Reducer
export default patientsSlice.reducer;