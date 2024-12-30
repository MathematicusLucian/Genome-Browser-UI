import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { initialState } from './state';
import { IDashboard } from '../../../models/dashboard';

const fetchDashboardFromState = (dashboardtate) => {
    console.log('dashboardtate', dashboardtate);
    return dashboardtate;
}

const fetchDashboardFromStateById = (dashboardtate, DashboardId: string) => {
    return dashboardtate.find(Dashboard => Dashboard.id === DashboardId)
}

const addDashboardToState = (state, action: PayloadAction<IDashboard>) => {
    state.push(action.payload)
};

const updateDashboardInState = (state, action: PayloadAction<IDashboard>) => {
    state.push(action.payload)
};

const dashboardlice = createSlice({
    name: 'dashboard',
    initialState: initialState,  
    reducers: {
        dashboardAdded: addDashboardToState,
        dashboardUpdated: updateDashboardInState,
    }, 
    selectors: {
        // Selectors are given just the `Dashboardtate` as a parameter, not the entire `RootState`
        selectAllDashboard: fetchDashboardFromState,
        selectDashboardById: fetchDashboardFromStateById
    }
})

export const { dashboardAdded, dashboardUpdated } = dashboardlice.actions;
export const { selectAllDashboard, selectDashboardById } = dashboardlice.selectors;
export default dashboardlice.reducer;