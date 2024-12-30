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

export const enrichedData = () => {
    const rsids = ["rs1000113","rs10156191", "rs10306114"];
    let patientGeneVariants: any =  demoMultipleGeneVariants;
    const { data, error, isLoading }: any = usePostSnpDataByRsidQuery(rsids); 
    const enrichmentResult = patientGeneVariants.map((patientVariant) => {
        for(let snp in data) {
          console.log('d', patientVariant);
          console.log('d2', data[snp]);
          if(data[snp]['rsid'] == patientVariant.rsid) {
            console.log('banana');
              patientVariant['notes'] = data[snp]['notes'];
          } 
          return patientVariant;
        }
    });
    return enrichmentResult;
}