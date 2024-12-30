import { configureStore } from '@reduxjs/toolkit'
import chromosomeReducer from './features/chromosome/chromosomeSlice'
import patientProfileReducer from './features/patientProfile/patientProfileSlice'
import patientGenomeReducer from './features/patientGenome/patientGenomeSlice'
import patientGeneVariantReducer from './features/patientGeneVariant/patientGeneVariantSlice'

// Root Store

export const makeStore = () => {
  return configureStore({
    reducer: {
        chromosomes: chromosomeReducer,
        patient: patientProfileReducer,
        patientGenome: patientGenomeReducer,
        patientGeneVariant: patientGeneVariantReducer
     } 
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']