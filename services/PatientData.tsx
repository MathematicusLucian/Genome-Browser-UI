import reducer, { selectAllPatients } from '@/state/features/patientProfile/patientProfileSlice'
import type { IPatientProfile } from "@/database/database";
import { useLiveQuery } from "dexie-react-hooks"; 
import { patientsIndexedDb } from "@/database/database"; 
import { usePostSnpDataByRsidQuery } from "@/services/ResearchData";
import { demoMultipleGeneVariants } from "@/state/demoState";

// Data
// export const patientProfiles = useLiveQuery( 
//     () => patientsIndexedDb.patientProfile.toArray()
// ); 
export const patientProfiles = [{}];

// useLiveQuery(
//   async () => {
//     if(isIndexedDatabase) {
//       const patientProfilesCount = await patientsIndexedDb.patientGenome.toCollection().count(function (count) {
//         setPatientProfilesCount(String(count));
//       });
//       let result = await patientsIndexedDb.patientGenome.toArray(); 
//       if (result.length > 0) {   
//         setRowData(result); 
//         return result;
//       }
//     }
//   }, 
// );

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