import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { initialState } from './state';
import { IChromosome, IGeneVariantMapping } from '../../../models/database';

// chromosome

const fetchChromosomeFromState = (state) => {
    return state.chromosome;
}

const fetchChromosomeFromStateById = (state, chromosomeId: string) => {
    return state.chromosome.find(chromosome => chromosome.id === chromosomeId)
}

const addChromosomeToState = (state, action: PayloadAction<IChromosome>) => {
    state.chromosome.push(action.payload)
};

const updateChromosomeInState = (state, action: PayloadAction<IChromosome>) => {
    state.chromosome.push(action.payload)
};

const fetchSelectedChromosomeFromState = (state) => {
    return state.selectedChromosome;
}

const fetchSelectedChromosomeFromStateById = (state, chromosomeId: string) => {
    return state.selectedChromosome.find(chromosome => chromosome.id === chromosomeId)
}
const addSelectedChromosomeToState = (state, action: PayloadAction<IChromosome>) => {
    state.selectedChromosome.push(action.payload)
};

const updateSelectedChromosomeInState = (state, action: PayloadAction<IChromosome>) => {
    state.chromosome.push(action.payload)
};

// geneMapping

const fetchGeneMappingFromState = (state) => {
    return state.geneVariantMapping;
}

const fetchGeneMappingFromStateById = (state, geneMappingId: string) => {
    return state.geneVariantMapping.find(geneMapping => geneMapping.id === geneMappingId)
}

const addGeneMappingToState = (state, action: PayloadAction<IGeneVariantMapping>) => {
    state.geneVariantMapping.push(action.payload)
};

const updateGeneMappingInState = (state, action: PayloadAction<IGeneVariantMapping>) => {
    state.geneVariantMapping.push(action.payload)
};

const chromosomeSlice = createSlice({
    name: 'geneDefinition',
    initialState: initialState,  
    reducers: {
        // chromosome
        chromosomeAdded: addChromosomeToState,
        chromosomeUpdated: updateChromosomeInState,
        selectedChromosomeAdded: addSelectedChromosomeToState,
        selectedChromosomeUpdated: updateSelectedChromosomeInState,
        // geneMapping
        geneMappingAdded: addGeneMappingToState,
        geneMappingUpdated: updateGeneMappingInState,
    }, 
    selectors: {
        // Selectors are given just the `ChromosomeState` as a parameter, not the entire `RootState`
        // chromosome
        selectAllChromosomes: fetchChromosomeFromState,
        selectChromosomeById: fetchChromosomeFromStateById,
        selectSelectedChromosome: fetchSelectedChromosomeFromState,
        selectSelectedChromosomeById: fetchSelectedChromosomeFromStateById,
        // geneMapping
        selectAllGeneMapping: fetchGeneMappingFromState,
        selectGeneMappingById: fetchGeneMappingFromStateById,
    }
})

export const { chromosomeAdded, chromosomeUpdated, selectedChromosomeAdded, selectedChromosomeUpdated, geneMappingAdded, geneMappingUpdated } = chromosomeSlice.actions;
export const { selectAllChromosomes, selectChromosomeById, selectAllGeneMapping, selectSelectedChromosome, selectSelectedChromosomeById, selectGeneMappingById } = chromosomeSlice.selectors
export default chromosomeSlice.reducer;