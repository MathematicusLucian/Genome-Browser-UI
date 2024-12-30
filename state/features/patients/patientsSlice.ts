import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { Patient, initialState } from './state';

const fetchPatientsFromState = (patientsState) => {
    console.log('patientsState', patientsState);
    return patientsState;
}

const fetchPatientFromStateById = (patientsState, patientId: string) => {
    return patientsState.find(patient => patient.id === patientId)
}

const addPatientToState = (state, action: PayloadAction<Patient>) => {
    state.push(action.payload)
};

const updatePatientInState = (state, action: PayloadAction<Patient>) => {
    state.push(action.payload)
};

const patientsSlice = createSlice({
    name: 'patients',
    initialState: initialState,  
    reducers: {
        patientAdded: addPatientToState,
        patientUpdated: updatePatientInState,
    }, 
    selectors: {
    // Selectors are given just the `PatientsState` as a parameter, not the entire `RootState`
        selectAllPatients: patientsState => patientsState,
        // selectAllPatients: fetchPatientsFromState,
        selectPatientsById: fetchPatientFromStateById
    }
})

export const { patientAdded, patientUpdated } = patientsSlice.actions;
export const { selectAllPatients, selectPatientsById } = patientsSlice.selectors
export default patientsSlice.reducer;