export interface IChromosome {
    chromsomeName: string;
    species: string;
}

export interface IHumanGene {
    geneName: string;
    chromosomeName: string;
}

export interface IGeneVariantMapping {
    geneVariant: string;
    geneName: string;
}

export interface IPatientProfile {
    patientId: any;
    patientName: string;
    datetimestamp: number;
} 

export interface IPatientGenome {
    patientGenomeId: string;
    source: string; 
    datetimestamp: number;
    patientId: any;
}

export interface IPatientGenomeVariant {
    patientGeneVariantId: string;
    rsid: string;
    genotype: string;
    chromosome: string;
    position: string;
    datetimestamp: number;
    patientGenomeId: any;
}

export interface IPatientProfileAndGenome {
    patientProfileAndGenome: string;
    rsid: string;
    genotype: string;
    chromosome: string;
    position: string;
    patientId: string;
    patientName: string;
}

export interface ISnpPairsResearch {
    rsid_genotypes: string;
    rsid: string;
    allele1: string;
    allele2: string; 
    magnitude: string; 
    risk: string;
    notes: string;
}

export interface IFullReport {
    rsid_genotypes: string;
    rsid: string;
    allele1: string;
    allele2: string;
    chromosome: string;
    position: string;
    genotype: string;
    magnitude: string; 
    risk: string;
    notes: string;
    genotype_match: string;
    datetimestamp: string;
    patientId: string;
    patientName: string;
}