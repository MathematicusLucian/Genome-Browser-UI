import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { PatientGenome, initialState } from './state';

const fetchPatientGenomesFromState = (patientGenomeState) => {
    console.log('patientGenomeState', patientGenomeState);
    return patientGenomeState;
}

const fetchPatientGenomeFromStateById = (patientGenomeState, patientgenomeId: string) => {
    return patientGenomeState.find(patientgenome => patientgenome.id === patientgenomeId)
}

const addPatientGenomeToState = (state, action: PayloadAction<PatientGenome>) => {
    state.push(action.payload)
};

const updatePatientGenomeInState = (state, action: PayloadAction<PatientGenome>) => {
    state.push(action.payload)
};

const patientGenomesSlice = createSlice({
    name: 'patientGenome',
    initialState: initialState,  
    reducers: {
        patientGenomeAdded: addPatientGenomeToState,
        patientGenomeUpdated: updatePatientGenomeInState,
    }, 
    selectors: {
        // Selectors are given just the `PatientGenomeState` as a parameter, not the entire `RootState`
        selectAllPatientGenomes: fetchPatientGenomesFromState,
        selectPatientGenomesById: fetchPatientGenomeFromStateById
    }
})

export const { patientGenomeAdded, patientGenomeUpdated } = patientGenomesSlice.actions;
export const { selectAllPatientGenomes, selectPatientGenomesById } = patientGenomesSlice.selectors
export default patientGenomesSlice.reducer;