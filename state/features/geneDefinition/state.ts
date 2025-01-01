import { IChromosome, IGeneVariantMapping } from '../../../models/database';

export interface IGenomeDefinitionState {
    chromosomes: IChromosome[]|IChromosome,
    selectedChromosome: IChromosome,
    geneVariantMapping: IGeneVariantMapping[]|IGeneVariantMapping,
    selectedGeneVariantMapping: IGeneVariantMapping
}

export const initialState: IGenomeDefinitionState[] = [
    {  
        chromosomes: [{
            chromosomeName: 'Default chromosome',
            species: 'Homo sapiens',
        }],
        selectedChromosome: {
            chromosomeName: 'Default chromosome',
            species: 'Homo sapiens',
        },
        geneVariantMapping: [{
            geneVariant: '',
            geneName: '',
        }],
        selectedGeneVariantMapping: {
            geneVariant: '',
            geneName: '',
        }
    }, 
]