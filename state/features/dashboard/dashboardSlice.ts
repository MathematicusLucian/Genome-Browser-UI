import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { initialState } from './state';
import { IDashboard, IGrid } from '../../../models/dashboard';

// DASHBOARD

const fetchDashboardFromState = (state) => {
    return state;
}

const fetchDashboardFromStateById = (state, DashboardId: string) => {
    return state.find(Dashboard => Dashboard.id === DashboardId)
}

const addDashboardToState = (state, action: PayloadAction<IDashboard>) => {
    state.push(action.payload)
};

const updateDashboardInState = (state, action: PayloadAction<IDashboard>) => {
    state.push(action.payload)
};

// Error

const fetchDashboardErrorFromState = (state) => {
    return state;
}

const fetchDashboardErrorFromStateById = (state, ErrorMsgId: string) => {
    return state.find(ErrorMsg => ErrorMsg.id === ErrorMsgId)
}

const addDashboardErrorToState = (state, action: PayloadAction<IDashboard>) => {
    state.push(action.payload)
};

const updateDashboardErrorInState = (state, action: PayloadAction<IDashboard>) => {
    state.push(action.payload)
};

// GRID

// Column Defs

const fetchColDefsFromState = (state) => {
    return state;
}

const fetchColDefsFromStateById = (state, ColDefsId: string) => {
    return state.find(ColDefs => ColDefs.id === ColDefsId)
}

const addColDefsToState = (state, action: PayloadAction<any>) => {
    state.push(action.payload)
};

const updateColDefsInState = (state, action: PayloadAction<any>) => {
    state.push(action.payload)
};


// Row Data

const fetchRowDataFromState = (state) => {
    return state;
}

const fetchRowDataFromStateById = (state, RowDataId: string) => {
    return state.find(RowData => RowData.id === RowDataId)
}

const addRowDataToState = (state, action: PayloadAction<any>) => {
    state.push(action.payload)
};

const updateRowDataInState = (state, action: PayloadAction<any>) => {
    state.push(action.payload)
};

const dashboardlice = createSlice({
    name: 'dashboard',
    initialState: initialState,  
    reducers: {
        dashboardAdded: addDashboardToState,
        dashboardUpdated: updateDashboardInState,
        dashboardErrorAdded: addDashboardErrorToState,
        dashboardErrorUpdated: updateDashboardErrorInState,
        colDefsAdded: addColDefsToState,
        colDefsUpdated: updateColDefsInState,
        rowDataAdded: addRowDataToState,
        rowDataUpdated: updateRowDataInState,
    }, 
    selectors: {
        // Selectors are given just the `Dashboardtate` as a parameter, not the entire `RootState`
        selectDashboard: fetchDashboardFromState,
        selectDashboardById: fetchDashboardFromStateById,
        selectAllDashboardErrors: fetchDashboardErrorFromState,
        selectDashboardErrorsById: fetchDashboardErrorFromStateById,
        selectAllColDefs: fetchColDefsFromState,
        selectColDefsById: fetchColDefsFromStateById,
        selectAllRowData: fetchRowDataFromState,
        selectRowDataById: fetchRowDataFromStateById,
    }
})

export const { 
    dashboardAdded, dashboardUpdated,
    dashboardErrorAdded, dashboardErrorUpdated,
    colDefsAdded, colDefsUpdated,
    rowDataAdded, rowDataUpdated,
} = dashboardlice.actions;
export const { 
    selectDashboard, selectDashboardById,
    selectAllDashboardErrors, selectDashboardErrorsById,
    selectAllColDefs, selectColDefsById,
    selectAllRowData, selectRowDataById,
} = dashboardlice.selectors;
export default dashboardlice.reducer;