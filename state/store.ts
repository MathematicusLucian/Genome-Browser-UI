import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import type { PreloadedState } from '@reduxjs/toolkit'
import dashboardReducer from './features/dashboard/dashboardSlice'
import chromosomeReducer from './features/chromosome/chromosomeSlice'
import patientProfileReducer from './features/patientProfile/patientProfileSlice'
import patientGenomeReducer from './features/patientGenome/patientGenomeSlice'
import patientGeneVariantReducer from './features/patientGeneVariant/patientGeneVariantSlice'
import { snpResearchaApi } from '@/services/ResearchData'

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  chromosomes: chromosomeReducer,
  patient: patientProfileReducer,
  patientGenome: patientGenomeReducer,
  patientGeneVariant: patientGeneVariantReducer,
  // Add the generated reducer as a specific top-level slice
  [snpResearchaApi.reducerPath]: snpResearchaApi.reducer,
})

export const makeStore = () => {
// export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
      reducer: rootReducer,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(snpResearchaApi.middleware),
  })
}
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']