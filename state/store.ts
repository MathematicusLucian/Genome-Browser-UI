import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import type { PreloadedState } from '@reduxjs/toolkit'
import dashboardReducer from './features/dashboard/dashboardSlice'
import geneDefinitionReducer from './features/geneDefinition/geneDefinitionSlice'
import patientProfileReducer from './features/patient/patientSlice' 
import todosReducer from './features/todos/todoSlice' 
 import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
// import { config } from 'utils/config'
import rootSaga from './features/todos/sagas'
import { snpResearchApi } from './features/research/researchApi'

const saga = createSagaMiddleware()

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  geneDefinition: geneDefinitionReducer,
  patient: patientProfileReducer, 
  todos: todosReducer,
  // research: researchDataReducer,
  // user
  // userProfile
  [snpResearchApi.reducerPath]: snpResearchApi.reducer,
})

export const makeStore = () => {
// export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
    // middleware: [saga],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(snpResearchApi.middleware),
    // devTools: config.isDevEnv,
  })
}
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const reduxWrapper = createWrapper(makeStore)
// export const reduxWrapper = createWrapper(makeStore, { debug: config.isDevEnv })