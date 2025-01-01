import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { initialState } from './state';
import { IPatientProfile, IPatientGenome, IPatientGenomeVariant } from '../../../models/database';

// patientProfile

const fetchPatientProfilesFromState = (state) => {
    return state.patientProfile;
};

const fetchPatientProfileFromStateById = (state, patientProfileId: string) => {
    return state.patientProfile.find(patientProfile => patientProfile.patientProfileId === patientProfileId)
};

const addPatientProfileToState = (state, action: PayloadAction<IPatientProfile>) => {
    state.patientProfile.push(action.payload)
};

const updatePatientProfileInState = (state, action: PayloadAction<IPatientProfile>) => {
    state.patientProfile.push(action.payload)
};

// selectedPatientProfile

const fetchSelectedPatientProfileFromState = (state) => { 
    console.log("FETCH esdfadsgdsfg", state);
    return state.selectedPatientProfile;
};

// const addSelectedPatientProfileToState = (state, action: PayloadAction<IPatientProfile>) => {
const addSelectedPatientProfileToState = (state, action: PayloadAction<IPatientProfile>) => {
    console.log("ADD esdfadsgdsfg");
    return state.selectedPatientProfile.push(action.payload)
};

const updateSelectedPatientProfileInState = (state, action: PayloadAction<any>) => {
    console.log("UPDATE esdfadsgdsfg");
    return state.push(action.payload)
};

// patientGenomeState

const fetchPatientGenomesFromState = (state) => {
    return state.patientGenome;
};

const fetchPatientGenomeFromStateById = (state, patientGenome: string) => {
    return state.patientGenome.find(patientGenome => patientGenome.patientGenomeId === patientGenome)
};

const addPatientGenomeToState = (state, action: PayloadAction<IPatientGenome>) => {
    state.patientGenome.push(action.payload)
};

const updatePatientGenomeInState = (state, action: PayloadAction<IPatientGenome>) => {
    state.patientGenome.push(action.payload)
};

// selectedPatientGenome

const fetchSelectedPatientGenomeFromState = (state) => {
    return state.selectedPatientGenome;
};

const addSelectedPatientGenomeToState = (state, action: PayloadAction<IPatientGenome>) => {
    state.selectedPatientGenome.push(action.payload)
};

const updateSelectedPatientGenomeInState = (state, action: PayloadAction<IPatientGenome>) => {
    state.selectedPatientGenome.push(action.payload)
};

// patientGeneVariant

const fetchPatientGeneVariantsFromState = (state) => {
    return state.patientGeneVariant;
};

const fetchPatientGeneVariantFromStateById = (state, patientGeneVariantId: string) => {
    return state.patientGeneVariant.find(patientGeneVariant => patientGeneVariant.patientGeneVariantId === patientGeneVariantId)
};

const addPatientGeneVariantToState = (state, action: PayloadAction<IPatientGenomeVariant>) => {
    state.patientGeneVariant.push(action.payload)
};

const updatePatientGeneVariantInState = (state, action: PayloadAction<IPatientGenomeVariant>) => {
    state.patientGeneVariant.push(action.payload)
};

// selectedPatientGeneVariant

const fetchSelectedPatientGeneVariantFromState = (state) => {
    return state.selectedPatientGeneVariant;
};

const addSelectedPatientGeneVariantToState = (state, action: PayloadAction<IPatientGenomeVariant>) => {
    state.selectedPatientGeneVariant.push(action.payload)
};

const updateSelectedPatientGeneVariantInState = (state, action: PayloadAction<IPatientGenomeVariant>) => {
    state.selectedPatientGeneVariant.push(action.payload)
};

const patientsSlice = createSlice({
    name: 'patient',
    initialState: initialState,  
    reducers: {
        // Patient Patients
        patientProfileAdded: addPatientProfileToState,
        patientProfileUpdated: updatePatientProfileInState,
        selectedPatientProfileAdded: addSelectedPatientProfileToState, 
        selectedPatientProfileUpdated: updateSelectedPatientProfileInState,
        // Patient Genomes
        patientGenomeAdded: addPatientGenomeToState,
        patientGenomeUpdated: updatePatientGenomeInState,
        selectedPatientGenomeAdded: addSelectedPatientGenomeToState,
        selectedPatientGenomeUpdated: updateSelectedPatientGenomeInState,
        // Patient Gene Variants
        patientGeneVariantAdded: addPatientGeneVariantToState,
        patientGeneVariantUpdated: updatePatientGeneVariantInState,
        selectedPatientGeneVariantAdded: addSelectedPatientGeneVariantToState,
        selectedPatientGeneVariantUpdated: updateSelectedPatientGeneVariantInState,
    }, 
    selectors: {
        // Selectors are given just the `PatientState` as a parameter, not the entire `RootState`
        // Patient Patients
        selectAllPatientProfiles: fetchPatientProfilesFromState,
        selectPatientProfilesById: fetchPatientProfileFromStateById,
        selectSelectedPatientProfile: fetchSelectedPatientProfileFromState,
        // Patient Genomes
        selectAllPatientGenomes: fetchPatientGenomesFromState,
        selectPatientGenomesById: fetchPatientGenomeFromStateById,
        selectedPatientGenome: fetchSelectedPatientGenomeFromState,
        // Patient Gene Variants
        selectAllPatientGeneVariants: fetchPatientGeneVariantsFromState,
        selectPatientGeneVariantsById: fetchPatientGeneVariantFromStateById,
        selectedPatientGeneVariant: fetchSelectedPatientGeneVariantFromState,
    }
})

export const { 
    // Patient Profiles
    patientProfileAdded, 
    patientProfileUpdated, 
    selectedPatientProfileAdded,
    selectedPatientProfileUpdated,
    // Patient Genomes
    patientGenomeAdded, 
    patientGenomeUpdated,
    selectedPatientGenomeAdded,
    selectedPatientGenomeUpdated,
    // Patient Gene Variants
    patientGeneVariantAdded, 
    patientGeneVariantUpdated,
    selectedPatientGeneVariantAdded,
    selectedPatientGeneVariantUpdated,
 } = patientsSlice.actions;
export const { 
    // Patient Profiles
    selectAllPatientProfiles, 
    selectPatientProfilesById, 
    selectSelectedPatientProfile,
    // Patient Genomes
    selectAllPatientGenomes, 
    selectPatientGenomesById,
    selectedPatientGenome,
    // Patient Gene Variants
    selectAllPatientGeneVariants, 
    selectPatientGeneVariantsById,
    selectedPatientGeneVariant,
} = patientsSlice.selectors
export default patientsSlice.reducer;  