import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { initialState, IResearchData } from './state'; 

// ClinVar

const fetchResearchDatasFromState = (researchDataState) => {
    return researchDataState;
}

const fetchResearchDataFromStateById = (researchDataState, researchDataId: string) => {
    return researchDataState.find(researchData => researchData.id === researchDataId)
}

const addResearchDataToState = (state, action: PayloadAction<IResearchData>) => {
    state.push(action.payload)
};

const updateResearchDataInState = (state, action: PayloadAction<IResearchData>) => {
    state.push(action.payload)
};

const researchDatasSlice = createSlice({
    name: 'researchData',
    initialState: initialState,  
    reducers: {
        // ClinVar
        researchDataAdded: addResearchDataToState,
        researchDataUpdated: updateResearchDataInState,
    }, 
    selectors: {
        // Selectors are given just the `ResearchDataState` as a parameter, not the entire `RootState`
        // ClinVar
        selectAllResearchDatas: fetchResearchDatasFromState,
        selectResearchDatasById: fetchResearchDataFromStateById
    }
})

export const { researchDataAdded, researchDataUpdated } = researchDatasSlice.actions;
export const { selectAllResearchDatas, selectResearchDatasById } = researchDatasSlice.selectors
export default researchDatasSlice.reducer;


