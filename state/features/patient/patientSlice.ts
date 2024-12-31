import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { initialState } from './state';
import { IPatientProfile, IPatientGenome, IPatientGenomeVariant } from '../../../models/database';

const fetchPatientsFromState = (patientState) => {
    console.log('patientState', patientState);
    return patientState;
}

const fetchPatientFromStateById = (patientState, patientId: string) => {
    return patientState.find(patient => patient.id === patientId)
}

const addPatientToState = (state, action: PayloadAction<IPatientProfile>) => {
    state.push(action.payload)
};

const updatePatientInState = (state, action: PayloadAction<IPatientProfile>) => {
    state.push(action.payload)
};

const fetchPatientGenomesFromState = (patientGenomeState) => {
    console.log('patientGenomeState', patientGenomeState);
    return patientGenomeState;
}

const fetchPatientGenomeFromStateById = (patientGenomeState, patientgenomeId: string) => {
    return patientGenomeState.find(patientgenome => patientgenome.id === patientgenomeId)
}

const addPatientGenomeToState = (state, action: PayloadAction<IPatientGenome>) => {
    state.push(action.payload)
};

const updatePatientGenomeInState = (state, action: PayloadAction<IPatientGenome>) => {
    state.push(action.payload)
};

const fetchPatientGeneVariantsFromState = (patientGeneVariantsState) => {
    console.log('patientGeneVariantsState', patientGeneVariantsState);
    return patientGeneVariantsState;
}

const fetchPatientGeneVariantFromStateById = (patientGeneVariantsState, patientgenevariantId: string) => {
    return patientGeneVariantsState.find(patientgenevariant => patientgenevariant.id === patientgenevariantId)
}

const addPatientGeneVariantToState = (state, action: PayloadAction<IPatientGenomeVariant>) => {
    state.push(action.payload)
};

const updatePatientGeneVariantInState = (state, action: PayloadAction<IPatientGenomeVariant>) => {
    state.push(action.payload)
};

const patientsSlice = createSlice({
    name: 'patient',
    initialState: initialState,  
    reducers: {
        patientAdded: addPatientToState,
        patientUpdated: updatePatientInState,
        patientGenomeAdded: addPatientGenomeToState,
        patientGenomeUpdated: updatePatientGenomeInState,
        patientGenevariantAdded: addPatientGeneVariantToState,
        patientGenevariantUpdated: updatePatientGeneVariantInState,
    }, 
    selectors: {
        // Selectors are given just the `PatientState` as a parameter, not the entire `RootState`
        selectAllPatients: fetchPatientsFromState,
        selectPatientsById: fetchPatientFromStateById,
        selectAllPatientGenomes: fetchPatientGenomesFromState,
        selectPatientGenomesById: fetchPatientGenomeFromStateById,
        selectAllPatientGeneVariants: fetchPatientGeneVariantsFromState,
        selectPatientGeneVariantsById: fetchPatientGeneVariantFromStateById
    }
})

export const { 
    patientAdded, 
    patientUpdated, 
    patientGenomeAdded, 
    patientGenomeUpdated,
    patientGenevariantAdded, 
    patientGenevariantUpdated
 } = patientsSlice.actions;
export const { 
    selectAllPatients, 
    selectPatientsById, 
    selectAllPatientGenomes, 
    selectPatientGenomesById,
    selectAllPatientGeneVariants, 
    selectPatientGeneVariantsById 
} = patientsSlice.selectors
export default patientsSlice.reducer;  