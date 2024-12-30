'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../state/store'
import { Patient, initialState } from '../state/features/patients/state' // initializeState 

export default function StoreProvider ({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        storeRef.current = makeStore()
        // storeRef.current.dispatch(initialState)
    //   storeRef.current.dispatch(initializeState(patients))
    }
  
    return <Provider store={storeRef.current}>{children}</Provider>
}