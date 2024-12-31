import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { initialState } from './state';
import { IChromosome } from '../../../models/database';

const fetchChromosomeFromState = (chromosomeState) => {
    console.log('chromosomeState', chromosomeState);
    return chromosomeState;
}

const fetchChromosomeFromStateById = (chromosomeState, chromosomeId: string) => {
    return chromosomeState.find(chromosome => chromosome.id === chromosomeId)
}

const addChromosomeToState = (state, action: PayloadAction<IChromosome>) => {
    state.push(action.payload)
};

const updateChromosomeInState = (state, action: PayloadAction<IChromosome>) => {
    state.push(action.payload)
};

const chromosomeSlice = createSlice({
    name: 'chromosome',
    initialState: initialState,  
    reducers: {
        chromosomeAdded: addChromosomeToState,
        chromosomeUpdated: updateChromosomeInState,
    }, 
    selectors: {
        // Selectors are given just the `ChromosomeState` as a parameter, not the entire `RootState`
        selectAllChromosome: fetchChromosomeFromState,
        selectChromosomeById: fetchChromosomeFromStateById
    }
})

export const { chromosomeAdded, chromosomeUpdated } = chromosomeSlice.actions;
export const { selectAllChromosome, selectChromosomeById } = chromosomeSlice.selectors
export default chromosomeSlice.reducer;