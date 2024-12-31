import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 
import { IChromosome, IPatientGenomeVariant, ISnpPairsResearch } from '../models/database'; 
import { axiosBaseQuery } from '@/state/base/baseQuery';
import { useLiveQuery } from 'dexie-react-hooks';
import { patientsIndexedDb } from '@/database/database'; 

// -----------
// Chromosomes
// -----------

// REDUX 
const [selectedChromosome, setSelectedChromosome] = useState<IChromosome|null>(null);  

const handleSelectedChromosomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const targeChromosomeId = event.target.value;
    const targetChromosome = chromosomesList.find((x) => x['chromosomeName'] == targeChromosomeId);
    setSelectedChromosome(targetChromosome);
};

const chromosomesList = useLiveQuery(// IChromosome[]
    async () => patientsIndexedDb.chromosome.toArray()
); 

// --------------------------------------------------------------------------------------------
// Risk Report 
// (Comparing Patient Gene Variants with Published Literature, e.g. SNP data, such as ClinVar.)
// --------------------------------------------------------------------------------------------

// MOVE TO REDUX FEATURE FILE
export const snpResearchaApi = createApi({
    reducerPath: 'snpResearchaApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/',
    }),
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
    endpoints: (builder: any) => ({
    //   getSnpDataByRsid: builder.query({
    //     query: (rsids: any) => `snp_research/${rsids}`,
    //   }),
        postSnpDataByRsid: builder.query({ // mutation
            query: (rsids: string[]) =>  ({
                url: "snp_research",
                method: "post",
                data: rsids,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
        }),
    }),
})

// export const {useGetSnpDataByRsidQuery} = snpResearchaApi;
export const {usePostSnpDataByRsidQuery} = snpResearchaApi;

// ------------------------------------------
// Data Enrichment: SNP Pairs (ClinVar, etc.)
// ------------------------------------------

export const enrichedData = (rsids: string[], patientGeneVariants: any) => {
    const { data, error, isLoading }: any = usePostSnpDataByRsidQuery(rsids); 

    const enrichmentResult = patientGeneVariants && patientGeneVariants.map((patientVariant) => {

        data && data.map((clinVar) => { 

            if(clinVar.rsid == patientVariant.rsid) {
                
                const clinVarGenotype = String(clinVar.allele1 + clinVar.allele2); 
                const clinVarGenotypeReversed = String(clinVar.allele2 + clinVar.allele1);
                const isAlleleMatch = clinVarGenotype == String(patientVariant.genotype);
                const isAlleleMatchReversed = clinVarGenotypeReversed == String(patientVariant.genotype);
                const alleleMatchBidirectional = isAlleleMatch || isAlleleMatchReversed;

                if(alleleMatchBidirectional) {
                    patientVariant.notes = clinVar.notes;  
                }

            }

        })
 
        return patientVariant;
    });
    return enrichmentResult;
}

// MOOCK DATA

// REDUX
const selectedPatientGenomeId = "";
const searchTermEntered = ""; 

const fetchClinVarNotes = () => { 
    // Not actual ClinVar notes; not actual correlatons.
    const mockClinVarNotesData: ISnpPairsResearch[] = [
        // `risk` would now be locally determined
        {rsid_genotypes: "", rsid: "rs28415373", allele1: "C", allele2: "C", magnitude: "4,0", risk: "", notes: "cystic fibrosis carrier"},
        {rsid_genotypes: "", rsid: "rs3131972", allele1: "G", allele2: "G", magnitude: "4,0", risk: "", notes: "Fanconi Anemia carrier"},
        {rsid_genotypes: "", rsid: "rs4477212", allele1: "A", allele2: "A", magnitude: "5,0", risk: "", notes: "Familial Hypercholesterolemia Type B"},
        {rsid_genotypes: "", rsid: "rs2340592", allele1: "A", allele2: "G", magnitude: "3.5,0", risk: "", notes: "carrier for Gaucher's disease; increased risk for Parkinsons"},
        {rsid_genotypes: "", rsid: "rs4970383", allele1: "C", allele2: "C", magnitude: "5,0", risk: "", notes: "Gaucher's disease"},
        {rsid_genotypes: "", rsid: "rs3128117", allele1: "C", allele2: "C", magnitude: "5,0", risk: "", notes: "familial mediterranean fever"},
        {rsid_genotypes: "", rsid: "rs28391282", allele1: "G", allele2: "G", magnitude: "5,0", risk: "", notes: "Fanconi Anemia (FANCC-related)"},
        {rsid_genotypes: "", rsid: "rs6665000", allele1: "A", allele2: "A", magnitude: "5,0", risk: "", notes: "Maple Syrup Urine Disease Type 1B"},
        {rsid_genotypes: "", rsid: "rs13303106", allele1: "A", allele2: "G", magnitude: "4,0", risk: "", notes: "Maple Syrup Urine Disease Type 1B carrier"},
    ];
    return mockClinVarNotesData;
};

const enrichPatientVariantsDataWithClinVarNotes = async (dexieResponse) => {
    const mockClinVarNotesData = fetchClinVarNotes();

    const enrichmentResult = await dexieResponse.map((patientVariant) => {
        for(let snp in mockClinVarNotesData) {
            if(mockClinVarNotesData[snp]['rsid'] == patientVariant.rsid) {
                patientVariant['notes'] = mockClinVarNotesData[snp]['notes'];
            }
        }
        return patientVariant;
    })

    return enrichmentResult;
};

const selectedPatientGenomeVariantsEnriched = useLiveQuery(// IPatientGeneVariant[]
    async () => {
        let dexieResponse: any = [];
        // searchTermEntered("cancer");
        if(selectedPatientGenomeId && searchTermEntered) {
            dexieResponse = [];
            // dexieResponse = await patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();  
        } else if(selectedPatientGenomeId && !selectedChromosome) {
            // REDUX
            // setDataStatus('Please select a chromosome, or input a search term');
            console.log('Please select a chromosome, or input a search term');
            dexieResponse = [];
        } else if(selectedPatientGenomeId && selectedChromosome) {
            const chromosomeToQueryBy = selectedChromosome['chromosomeName'].replace('Chromosome','').replace(' ','');
            dexieResponse = await patientsIndexedDb.patientGenomeVariant.where({'patientGenomeId': String(selectedPatientGenomeId), 'chromosome': chromosomeToQueryBy}).toArray();  
            dexieResponse = await enrichPatientVariantsDataWithClinVarNotes(dexieResponse);
            // dexieResponse = await patientsIndexedDb.patientGenomeVariant.where('patientGenomeId').equalsIgnoreCase(String(selectedPatientGenomeId)).toArray();  
            // setEnrichedData(dexieResponse);
        } 
        return dexieResponse;
    },
    [selectedPatientGenomeId, selectedChromosome]
);  