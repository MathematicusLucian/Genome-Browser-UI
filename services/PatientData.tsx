import reducer, { selectAllPatients } from '@/state/features/patientProfile/patientProfileSlice'
import type { IPatientGenome, IPatientProfile, ISnpPairsResearch } from "@/database/database";
import { useLiveQuery } from "dexie-react-hooks"; 
import { patientsIndexedDb } from "@/database/database"; 
import { usePostSnpDataByRsidQuery } from "@/services/ResearchData";
import { demoMultipleGeneVariants } from "@/state/demoState";
import { IChromosome } from '@/models/database';

// -------
// Patient
// -------

// REDUX 
const [selectedPatientProfile, setSelectedPatientProfile] = useState<IPatientProfile | null>(null);  
const patientId = '0';

const patientProfiles = useLiveQuery( 
    async () => patientsIndexedDb.patientProfile.toArray()
); 

// REDUX -> call Actopn to update patient when app loads
const routerReady = () => {
    const patientIdFromRouter = Array.isArray(patientId) ? patientId[0] : patientId;   
    // REDUX
    // setPatientId(patientIdFromRouter);
    if(patientProfiles) { 
        const patientProfileMatch = patientProfiles.find((x) => x.patientId == patientId);
        if(patientProfileMatch) {
            setSelectedPatientProfile(patientProfileMatch);
        }
    } 
}

const handleSelectedPatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value != patientId) {           // move db callsto database/ folder
        // REDUX
        // This handler updates the patient state.
        // Patient State observed from patient route which prompts redirect.
        // updateRoute(event.target.value);
    }
};

// --------------
// Patient Genome
// --------------

// REDUX 
const [selectedPatientGenome, setSelectedPatientGenome] = useState<IPatientGenome | null>(null);  
const [selectedPatientGenomeId, setSelectedPatientGenomeId] = useState<string| null>(null);

const handleSelectedPatientGenomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const targetPatientGenomeId = event.target.value;
    setSelectedPatientGenomeId(targetPatientGenomeId); 
    const targetPatientGenome = selectedPatientGenomes.find((x) => x.patientGenomeId = targetPatientGenomeId);
    setSelectedPatientGenome(targetPatientGenome); 
}; 

const selectedPatientGenomes = useLiveQuery(// IPatientGenome[]
    async () => { 
        const dexieResponse = patientsIndexedDb.patientGenome.where('patientId').equalsIgnoreCase(String(patientId)).toArray();  
        return dexieResponse;
    },
    [patientId] 
); 

// --------------------
// Patient Gene Variant
// --------------------

// REDUX
const searchTermEntered = "";
const selectedChromosome: any = [];

const selectedPatientGenomeVariants = useLiveQuery(// IPatientGeneVariant[]
    async () => {
        let dexieResponse: any = [];
        // searchTermEntered("cancer");
        if(selectedPatientGenomeId && searchTermEntered) {
            dexieResponse = [];
            // dexieResponse = await patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();  
        } else if(selectedPatientGenomeId && !selectedChromosome) {
            // REDUX
            // setDataStatus('Please select a chromosome, or input a search term');
            console.log('Please select a chromosome, or input a SNP ID to search for');
            dexieResponse = [];
        } else if(selectedPatientGenomeId && selectedChromosome) {
            const chromosomeToQueryBy = selectedChromosome['chromosomeName'].replace('Chromosome','').replace(' ','');
            dexieResponse = await patientsIndexedDb.patientGenomeVariant.where({'patientGenomeId': String(selectedPatientGenomeId), 'chromosome': chromosomeToQueryBy}).toArray();  
            // dexieResponse = await patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();   
        } 
        return dexieResponse;
    },
    [selectedPatientGenomeId, selectedChromosome]
);  

export const fetchData = async () => {
    try {
        // const api_url = patient_id = ? `http://127.0.0.1:8000/patient_genome/patient_profile/${patient_id}` : `http://127.0.0.1:8000/patient_genome/patient_profile`);
        const api_url = `http://127.0.0.1:8000/patient_genome/patient_profile`;
        // `${GENOME_BROWSER_API_PATH}/patient_genome/patient_profile`;
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.length > 0) {
            // Set column definitions based on the keys of the first object in the data array
            const columns = Object.keys(result[0]).map(key => ({
                headerName: key,
                field: key,
            }));


            // REDUX

            // setColumnDefs(columns);
        }

        // REDUX

        // setRowData(result); 

    } catch (error) {
        console.error('Error fetching data:', error);

        // REDUX

        // setError(error.message);

    }
}; 