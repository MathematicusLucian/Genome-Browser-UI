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
            chromsomeName: 'Default chromosome',
            species: 'Homo sapiens',
        }],
        selectedChromosome: {
            chromsomeName: 'Default chromosome',
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