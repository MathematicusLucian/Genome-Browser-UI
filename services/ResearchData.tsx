// import { selectSelectedChromosome, selectedChromosomeUpdated } from '@/state/features/geneDefinition/geneDefinitionSlice';
// import { selectAllResearchDatas } from '@/state/features/research/researchSlice';
// import { IChromosome, IPatientGenome, IPatientGenomeVariant, ISnpPairsResearch } from '../models/database'; 
// import { useLiveQuery } from 'dexie-react-hooks';
// import { patientsIndexedDb } from '@/database/database'; 
// import { selectSelectedPatientProfile } from '@/state/features/patient/patientSlice';

// // MOOCK DATA
// export const searchTermEntered = ""; 

// export const fetchClinVarNotes = () => { 
//     // Not actual ClinVar notes; not actual correlatons.
//     const mockClinVarNotesData: ISnpPairsResearch[] = [
//         // `risk` would now be locally determined
//         {rsid_genotypes: "", rsid: "rs28415373", allele1: "C", allele2: "C", magnitude: "4,0", risk: "", notes: "cystic fibrosis carrier"},
//         {rsid_genotypes: "", rsid: "rs3131972", allele1: "G", allele2: "G", magnitude: "4,0", risk: "", notes: "Fanconi Anemia carrier"},
//         {rsid_genotypes: "", rsid: "rs4477212", allele1: "A", allele2: "A", magnitude: "5,0", risk: "", notes: "Familial Hypercholesterolemia Type B"},
//         {rsid_genotypes: "", rsid: "rs2340592", allele1: "A", allele2: "G", magnitude: "3.5,0", risk: "", notes: "carrier for Gaucher's disease; increased risk for Parkinsons"},
//         {rsid_genotypes: "", rsid: "rs4970383", allele1: "C", allele2: "C", magnitude: "5,0", risk: "", notes: "Gaucher's disease"},
//         {rsid_genotypes: "", rsid: "rs3128117", allele1: "C", allele2: "C", magnitude: "5,0", risk: "", notes: "familial mediterranean fever"},
//         {rsid_genotypes: "", rsid: "rs28391282", allele1: "G", allele2: "G", magnitude: "5,0", risk: "", notes: "Fanconi Anemia (FANCC-related)"},
//         {rsid_genotypes: "", rsid: "rs6665000", allele1: "A", allele2: "A", magnitude: "5,0", risk: "", notes: "Maple Syrup Urine Disease Type 1B"},
//         {rsid_genotypes: "", rsid: "rs13303106", allele1: "A", allele2: "G", magnitude: "4,0", risk: "", notes: "Maple Syrup Urine Disease Type 1B carrier"},
//     ];
//     return mockClinVarNotesData;
// };

// export const enrichPatientVariantsDataWithClinVarNotes = async (dexieResponse) => {
//     const mockClinVarNotesData = fetchClinVarNotes();

//     const enrichmentResult = await dexieResponse.map((patientVariant) => {
//         for(let snp in mockClinVarNotesData) {
//             if(mockClinVarNotesData[snp]['rsid'] == patientVariant.rsid) {
//                 patientVariant['notes'] = mockClinVarNotesData[snp]['notes'];
//             }
//         }
//         return patientVariant;
//     })

//     return enrichmentResult;
// };

// export const selectedPatientGenomeId: IPatientGenome = selectSelectedPatientProfile[0].patientGenomeId;

// export const selectedPatientGenomeVariantsEnriched = useLiveQuery(// IPatientGeneVariant[]
//     async () => {
//         let dexieResponse: any = [];
//         // searchTermEntered("cancer");
//         if(selectedPatientGenomeId && searchTermEntered) {
//             dexieResponse = [];
//             // dexieResponse = await patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();  
//         } else if(selectedPatientGenomeId && !selectSelectedChromosome) {
//             // REDUX
//             // setDataStatus('Please select a chromosome, or input a search term');
//             console.log('Please select a chromosome, or input a search term');
//             dexieResponse = [];
//         } else if(selectedPatientGenomeId && selectSelectedChromosome) {
//             const chromosomeToQueryBy = selectSelectedChromosome['chromosomeName'].replace('Chromosome','').replace(' ','');
//             dexieResponse = await patientsIndexedDb.patientGenomeVariant.where({'patientGenomeId': String(selectedPatientGenomeId), 'chromosome': chromosomeToQueryBy}).toArray();  
//             dexieResponse = await enrichPatientVariantsDataWithClinVarNotes(dexieResponse);
//             // dexieResponse = await patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();  
//             // setEnrichedData(dexieResponse);
//         } 
//         return dexieResponse;
//     },
//     [selectedPatientGenomeId, selectSelectedChromosome]
// );  