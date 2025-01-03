import logger from 'redux-logger'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import dashboardReducer from './features/dashboard/dashboardSlice'
import geneDefinitionReducer from './features/geneDefinition/geneDefinitionSlice'
import patientProfileReducer from './features/patient/patientSlice'
import todosReducer from './features/todos/todoSlice'
import { createWrapper } from 'next-redux-wrapper'
// import createSagaMiddleware from 'redux-saga'
// import rootSaga from './features/todos/sagas'
import rsidReducer from './features/research/researchSlice'
// import { config } from 'utils/config'

// const saga = createSagaMiddleware()

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  geneDefinition: geneDefinitionReducer,
  patient: patientProfileReducer,
  todos: todosReducer,
  rsid: rsidReducer,
  // [rsidSlice.reducerPath]: rsidSlice.reducer,
  // user
  // userProfile
})

export const makeStore = () => {
  // export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(logger).concat(clinvarApiSlice.middleware),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(snpResearchApi.middleware),
    // devTools: config.isDevEnv,
  })
  // setupListeners(store.dispatch);
  return store
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const reduxWrapper = createWrapper(makeStore)
// export const reduxWrapper = createWrapper(makeStore, { debug: config.isDevEnv })

// // TEST
// import patientsReducer, { setSelectedPatientProfile, initialState } from './patientsSlice';

// test('should handle setSelectedPatientProfile', () => {
//     const newState = patientsReducer(
//         initialState,
//         setSelectedPatientProfile({ patientId: '123', patientName: 'Test Patient', datetimestamp: Date.now() })
//     );
//     expect(newState.selectedPatientProfile).toEqual({
//         patientId: '123',
//         patientName: 'Test Patient',
//         datetimestamp: expect.any(Number),
//     });
// });
