import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { PatientGeneVariant, initialState } from './state';

const fetchPatientGeneVariantsFromState = (patientGeneVariantsState) => {
    console.log('patientGeneVariantsState', patientGeneVariantsState);
    return patientGeneVariantsState;
}

const fetchPatientGeneVariantFromStateById = (patientGeneVariantsState, patientgenevariantId: string) => {
    return patientGeneVariantsState.find(patientgenevariant => patientgenevariant.id === patientgenevariantId)
}

const addPatientGeneVariantToState = (state, action: PayloadAction<PatientGeneVariant>) => {
    state.push(action.payload)
};

const updatePatientGeneVariantInState = (state, action: PayloadAction<PatientGeneVariant>) => {
    state.push(action.payload)
};

const patientGeneVariantsSlice = createSlice({
    name: 'patientGeneVariant',
    initialState: initialState,  
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
export const { selectAllPatientGeneVariants, selectPatientGeneVariantsById } = patientGeneVariantsSlice.selectors
export default patientGeneVariantsSlice.reducer;