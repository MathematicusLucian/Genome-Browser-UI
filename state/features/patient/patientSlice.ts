import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
// import { initialState } from './state';
import { IPatientProfile, IPatientGenome, IPatientGenomeVariant } from '../../../models/database';

export interface IPatientState {
    patientProfile: IPatientProfile[];
    selectedPatientProfile: IPatientProfile | null;
    patientGenome: IPatientGenome[];
    selectedPatientGenome: IPatientGenome | null;
    patientGeneVariant: IPatientGenomeVariant[];
    selectedPatientGeneVariant: IPatientGenomeVariant | null;
}

export const initialState: IPatientState = {
    patientProfile: [
        {
            patientId: '0',
            patientName: 'Default patient profile',
            datetimestamp: Date.now(),
        },
    ],
    selectedPatientProfile: null,
    patientGenome: [
        {
            patientGenomeId: '0',
            source: 'ABC',
            datetimestamp: Date.now(),
            patientId: '0',
        },
    ],
    selectedPatientGenome: null,
    patientGeneVariant: [
        {
            patientGeneVariantId: '1',
            rsid: '1',
            genotype: '1',
            chromosome: '1',
            position: '1',
            datetimestamp: Date.now(),
            patientGenomeId: '0',
        },
    ],
    selectedPatientGeneVariant: null,
};

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        // Patient Profiles
        addPatientProfile: (state, action: PayloadAction<IPatientProfile>) => {
            state.patientProfile.push(action.payload);
        },
        updatePatientProfile: (state, action: PayloadAction<IPatientProfile>) => {
            const index = state.patientProfile.findIndex(
                (profile) => profile.patientId === action.payload.patientId
            );
            if (index !== -1) {
                state.patientProfile[index] = action.payload;
            }
        },
        setSelectedPatientProfile: (state, action: PayloadAction<IPatientProfile>) => {
            state.selectedPatientProfile = action.payload;
        },

        // Patient Genomes
        addPatientGenome: (state, action: PayloadAction<IPatientGenome>) => {
            state.patientGenome.push(action.payload);
        },
        updatePatientGenome: (state, action: PayloadAction<IPatientGenome>) => {
            const index = state.patientGenome.findIndex(
                (genome) => genome.patientGenomeId === action.payload.patientGenomeId
            );
            if (index !== -1) {
                state.patientGenome[index] = action.payload;
            }
        },
        setSelectedPatientGenome: (state, action: PayloadAction<IPatientGenome>) => {
            state.selectedPatientGenome = action.payload;
        },

        // Patient Gene Variants
        addPatientGeneVariant: (state, action: PayloadAction<IPatientGenomeVariant>) => {
            state.patientGeneVariant.push(action.payload);
        },
        updatePatientGeneVariant: (state, action: PayloadAction<IPatientGenomeVariant>) => {
            const index = state.patientGeneVariant.findIndex(
                (variant) => variant.patientGeneVariantId === action.payload.patientGeneVariantId
            );
            if (index !== -1) {
                state.patientGeneVariant[index] = action.payload;
            }
        },
        setSelectedPatientGeneVariant: (state, action: PayloadAction<IPatientGenomeVariant>) => {
            state.selectedPatientGeneVariant = action.payload;
        },
    },
});

// Export Actions
export const {
    addPatientProfile,
    updatePatientProfile,
    setSelectedPatientProfile,
    addPatientGenome,
    updatePatientGenome,
    setSelectedPatientGenome,
    addPatientGeneVariant,
    updatePatientGeneVariant,
    setSelectedPatientGeneVariant,
} = patientsSlice.actions;

// Export Reducer
export default patientsSlice.reducer;

// // patientProfile

// const fetchPatientProfilesFromState = (state) => {
//     return state.patientProfile;
// };

// const fetchPatientProfileFromStateById = (state, patientProfileId: string) => {
//     return state.patientProfile.find(patientProfile => patientProfile.patientProfileId === patientProfileId)
// };

// const addPatientProfileToState = (state, action: PayloadAction<IPatientProfile>) => {
//     state.patientProfile.push(action.payload)
// };

// const updatePatientProfileInState = (state, action: PayloadAction<IPatientProfile>) => {
//     state.patientProfile.push(action.payload)
// };

// // selectedPatientProfile

// const fetchSelectedPatientProfileFromState = (state) => {  
//     return state.selectedPatientProfile;
// };

// const addSelectedPatientProfileToState = (state, action: PayloadAction<IPatientProfile>) => {    
//     state.selectedPatientProfile = action.payload;
// };

// const updateSelectedPatientProfileInState = (state, action: PayloadAction<IPatientProfile>) => {
//     return {
//         ...state,
//         selectedPatientProfile: {
//             ...state.selectedPatientProfile,
//             ...action.payload
//         }
//     }
// };

// // patientGenomeState

// const fetchPatientGenomesFromState = (state) => {
//     return state.patientGenome;
// };

// const fetchPatientGenomeFromStateById = (state, patientGenome: string) => {
//     return state.patientGenome.find(patientGenome => patientGenome.patientGenomeId === patientGenome)
// };

// const addPatientGenomeToState = (state, action: PayloadAction<IPatientGenome>) => {
//     state.patientGenome.push(action.payload)
// };

// const updatePatientGenomeInState = (state, action: PayloadAction<IPatientGenome>) => {
//     state.patientGenome.push(action.payload)
// };

// // selectedPatientGenome

// const fetchSelectedPatientGenomeFromState = (state) => {
//     return state.selectedPatientGenome;
// };

// const addSelectedPatientGenomeToState = (state, action: PayloadAction<IPatientGenome>) => {
//     state.selectedPatientGenome.push(action.payload)
// };

// const updateSelectedPatientGenomeInState = (state, action: PayloadAction<IPatientGenome>) => {
//     state.selectedPatientGenome.push(action.payload)
// };

// // patientGeneVariant

// const fetchPatientGeneVariantsFromState = (state) => {
//     return state.patientGeneVariant;
// };

// const fetchPatientGeneVariantFromStateById = (state, patientGeneVariantId: string) => {
//     return state.patientGeneVariant.find(patientGeneVariant => patientGeneVariant.patientGeneVariantId === patientGeneVariantId)
// };

// const addPatientGeneVariantToState = (state, action: PayloadAction<IPatientGenomeVariant>) => {
//     state.patientGeneVariant.push(action.payload)
// };

// const updatePatientGeneVariantInState = (state, action: PayloadAction<IPatientGenomeVariant>) => {
//     state.patientGeneVariant.push(action.payload)
// };

// // selectedPatientGeneVariant

// const fetchSelectedPatientGeneVariantFromState = (state) => {
//     return state.selectedPatientGeneVariant;
// };

// const addSelectedPatientGeneVariantToState = (state, action: PayloadAction<IPatientGenomeVariant>) => {
//     state.selectedPatientGeneVariant.push(action.payload)
// };

// const updateSelectedPatientGeneVariantInState = (state, action: PayloadAction<IPatientGenomeVariant>) => {
//     state.selectedPatientGeneVariant.push(action.payload)
// };

// const patientsSlice = createSlice({
//     name: 'patient',
//     initialState: initialState,  
//     reducers: {
//         // Patient Patients
//         patientProfileAdded: addPatientProfileToState,
//         patientProfileUpdated: updatePatientProfileInState,
//         selectedPatientProfileAdded: addSelectedPatientProfileToState, 
//         selectedPatientProfileUpdated: updateSelectedPatientProfileInState,
//         // Patient Genomes
//         patientGenomeAdded: addPatientGenomeToState,
//         patientGenomeUpdated: updatePatientGenomeInState,
//         selectedPatientGenomeAdded: addSelectedPatientGenomeToState,
//         selectedPatientGenomeUpdated: updateSelectedPatientGenomeInState,
//         // Patient Gene Variants
//         patientGeneVariantAdded: addPatientGeneVariantToState,
//         patientGeneVariantUpdated: updatePatientGeneVariantInState,
//         selectedPatientGeneVariantAdded: addSelectedPatientGeneVariantToState,
//         selectedPatientGeneVariantUpdated: updateSelectedPatientGeneVariantInState,
//     }, 
//     selectors: {
//         // Selectors are given just the `PatientState` as a parameter, not the entire `RootState`
//         // Patient Patients
//         selectAllPatientProfiles: fetchPatientProfilesFromState,
//         selectPatientProfilesById: fetchPatientProfileFromStateById,
//         selectSelectedPatientProfile: fetchSelectedPatientProfileFromState,
//         // Patient Genomes
//         selectAllPatientGenomes: fetchPatientGenomesFromState,
//         selectPatientGenomesById: fetchPatientGenomeFromStateById,
//         selectedPatientGenome: fetchSelectedPatientGenomeFromState,
//         // Patient Gene Variants
//         selectAllPatientGeneVariants: fetchPatientGeneVariantsFromState,
//         selectPatientGeneVariantsById: fetchPatientGeneVariantFromStateById,
//         selectedPatientGeneVariant: fetchSelectedPatientGeneVariantFromState,
//     }
// })

// export const { 
//     // Patient Profiles
//     patientProfileAdded, 
//     patientProfileUpdated, 
//     selectedPatientProfileAdded,
//     selectedPatientProfileUpdated,
//     // Patient Genomes
//     patientGenomeAdded, 
//     patientGenomeUpdated,
//     selectedPatientGenomeAdded,
//     selectedPatientGenomeUpdated,
//     // Patient Gene Variants
//     patientGeneVariantAdded, 
//     patientGeneVariantUpdated,
//     selectedPatientGeneVariantAdded,
//     selectedPatientGeneVariantUpdated,
//  } = patientsSlice.actions;
// export const { 
//     // Patient Profiles
//     selectAllPatientProfiles, 
//     selectPatientProfilesById, 
//     selectSelectedPatientProfile,
//     // Patient Genomes
//     selectAllPatientGenomes, 
//     selectPatientGenomesById,
//     selectedPatientGenome,
//     // Patient Gene Variants
//     selectAllPatientGeneVariants, 
//     selectPatientGeneVariantsById,
//     selectedPatientGeneVariant,
// } = patientsSlice.selectors
// export default patientsSlice.reducer;  