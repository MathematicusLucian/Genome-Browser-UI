import reducer, { 
    // Patient Profiles
    selectAllPatientProfiles,
    selectPatientProfilesById,
    patientProfileUpdated,
    selectSelectedPatientProfile, 
    selectedPatientProfileAdded,
    selectedPatientProfileUpdated,
    // Patient Genomes
    selectAllPatientGenomes,
    patientGenomeUpdated,
    selectedPatientGenome, 
    selectedPatientGenomeAdded,
    selectedPatientGenomeUpdated,
    // Patient Gene Variants
    selectAllPatientGeneVariants,
    patientGeneVariantUpdated,
    selectedPatientGeneVariant,
    selectedPatientGeneVariantAdded,
    selectedPatientGeneVariantUpdated,
} from '@/state/features/patient/patientSlice';
import { colDefsUpdated, dashboardErrorUpdated, rowDataUpdated } from '@/state/features/dashboard/dashboardSlice';
import type { IPatientGenome, IPatientProfile, ISnpPairsResearch, IChromosome } from '@/models/database';
import { useLiveQuery } from "dexie-react-hooks"; 
import { patientsIndexedDb } from "@/database/database"; 
// import { usePostSnpDataByRsidQuery } from "@/services/ResearchData";
import { demoMultipleGeneVariants } from "@/state/demoState";
import { selectSelectedChromosome } from '@/state/features/geneDefinition/geneDefinitionSlice';

// -------
// Patient
// ------- 
export const selectedPatient: IPatientProfile = selectSelectedPatientProfile[0];
export const selectedPatientId: IPatientProfile = selectSelectedPatientProfile[0]; //.patientId;

export const updateSelectedPatientProfile = (selectedPatientProfile) => { 
    console.log(selectedPatientProfile);
    // const ret = selectedPatientProfileUpdated(selectedPatientProfile);
    const ret = selectedPatientGeneVariantAdded(selectedPatientProfile);  
    console.log('ret', ret);
    console.log('selectSelectedPatientProfile', selectSelectedPatientProfile[0]);
}
// // REDUX
// // This handler updates the patient state.
// // selectAllPatientProfiles()
// // const eventTarget = selectPatientProfilesById(event.target.value)[0];
// // selectedPatientProfileUpdated(eventTarget);
// // Patient State observed from patient route which prompts redirect.
// // updateRoute(event.target.value);
export const updatePatientProfile = (patientProfileId) => patientProfileUpdated(patientProfileId);
export const updatePatientProfileId = (patientProfileId) => patientProfileUpdated(patientProfileId);

// // --------------
// // Patient Genome
// // --------------

// export const handleSelectedPatientGenomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     // setSelectedPatientGenomeId(event.target.value) 
//     const targetPatientGenome: IPatientGenome = selectAllPatientGenomes[0].find((patientGenome) => patientGenome.patientGenomeId = event.target.value);
//     selectedPatientGenomeUpdated(targetPatientGenome); 
// }; 

// export const selectedPatientGenomes = useLiveQuery(// IPatientGenome[]
//     async () => { 
//         const dexieResponse = patientsIndexedDb.patientGenome.where('patientId').equalsIgnoreCase(String(selectedPatientId)).toArray();  
//         return dexieResponse;
//     },
//     [selectedPatientId] 
// ); 

// // --------------------
// // Patient Gene Variant
// // --------------------

// // REDUX
// export const selectedChromosome: IChromosome = selectSelectedChromosome[0];
// export const selectedPatientGenomeId: IPatientGenome = selectSelectedPatientProfile[0].patientGenomeId;
// export const searchTermEntered = "";

// export const selectedPatientGenomeVariants = useLiveQuery(// IPatientGeneVariant[]
//     async () => {
//         let dexieResponse: any = [];
//         // searchTermEntered("cancer");
//         if(selectedPatientGenome && selectedPatientGenome[0].patientGenomeId && searchTermEntered) {
//             dexieResponse = [];
//             // dexieResponse = await patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();  
//         } else if(selectedPatientGenome && selectedPatientGenome[0].patientGenomeId && !selectedChromosome) {
//             // REDUX
//             // setDataStatus('Please select a chromosome, or input a search term');
//             console.log('Please select a chromosome, or input a SNP ID to search for');
//             dexieResponse = [];
//         } else if(selectedPatientGenome && selectedPatientGenome[0].patientGenomeId && selectedChromosome) {
//             const chromosomeToQueryBy = selectedChromosome['chromosomeName'].replace('Chromosome','').replace(' ','');
//             dexieResponse = await patientsIndexedDb.patientGenomeVariant.where({'patientGenomeId': String(selectedPatientGenome[0].patientGenomeId ), 'chromosome': chromosomeToQueryBy}).toArray();  
//             // dexieResponse = await patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();   
//         } 
//         return dexieResponse;
//     },
//     [selectedPatientGenome, selectedChromosome]
// );  

// export const fetchData = async () => {
//     try {
//         // const api_url = patient_id = ? `http://127.0.0.1:8000/patient_genome/patient_profile/${patient_id}` : `http://127.0.0.1:8000/patient_genome/patient_profile`);
//         const api_url = `http://127.0.0.1:8000/patient_genome/patient_profile`;
//         // `${GENOME_BROWSER_API_PATH}/patient_genome/patient_profile`;
//         const response = await fetch(api_url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const result = await response.json();
//         if (result.length > 0) {
//             // Set column definitions based on the keys of the first object in the data array
//             const columns = Object.keys(result[0]).map(key => ({
//                 headerName: key,
//                 field: key,
//             }));
//             colDefsUpdated(columns);
//         }
//         rowDataUpdated(result); 

//     } catch (error) {
//         console.error('Error fetching data:', error);
//         dashboardErrorUpdated(error.message);
//     }
// }; 