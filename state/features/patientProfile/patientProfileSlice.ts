import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { PatientProfile, initialState } from './state';

const fetchPatientsFromState = (patientState) => {
    console.log('patientState', patientState);
    return patientState;
}

const fetchPatientFromStateById = (patientState, patientId: string) => {
    return patientState.find(patient => patient.id === patientId)
}

const addPatientToState = (state, action: PayloadAction<PatientProfile>) => {
    state.push(action.payload)
};

const updatePatientInState = (state, action: PayloadAction<PatientProfile>) => {
    state.push(action.payload)
};

const patientsSlice = createSlice({
    name: 'patient',
    initialState: initialState,  
    reducers: {
        patientAdded: addPatientToState,
        patientUpdated: updatePatientInState,
    }, 
    selectors: {
        // Selectors are given just the `PatientState` as a parameter, not the entire `RootState`
        selectAllPatients: fetchPatientsFromState,
        selectPatientsById: fetchPatientFromStateById
    }
})

export const { patientAdded, patientUpdated } = patientsSlice.actions;
export const { selectAllPatients, selectPatientsById } = patientsSlice.selectors
export default patientsSlice.reducer;