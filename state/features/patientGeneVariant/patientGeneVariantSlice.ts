import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialPatientGenomeVariantState } from './state';
import { IPatientGenomeVariant } from '../../../models/database';

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

const patientGeneVariantsSlice = createSlice({
    name: 'patientGeneVariant',
    initialState: initialPatientGenomeVariantState,  
    reducers: {
        patientgenevariantAdded: addPatientGeneVariantToState,
        patientgenevariantUpdated: updatePatientGeneVariantInState,
    }, 
    selectors: {
        // Selectors are given just the `PatientGeneVariantsState` as a parameter, not the entire `RootState`
        selectAllPatientGeneVariants: fetchPatientGeneVariantsFromState,
        selectPatientGeneVariantsById: fetchPatientGeneVariantFromStateById
    }
})

export const { patientgenevariantAdded, patientgenevariantUpdated } = patientGeneVariantsSlice.actions;
export const { selectAllPatientGeneVariants, selectPatientGeneVariantsById } = patientGeneVariantsSlice.selectors; 
export default patientGeneVariantsSlice.reducer;