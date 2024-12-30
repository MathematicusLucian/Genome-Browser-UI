export interface IDashboard {
    title: string;
    dashboardProps: DashboardProps;
    dashboardNavButtons: DashboardNavButtons;
    dashboardNavDropdowns: DashboardNavDropdowns;
    dashboardComponents: DashboardComponents;
}

export interface DashboardComponents {
    component: any; 
}

export interface DashboardNavButtons {
    buttonTitle: string;
    onClickMethod: any;
    condtionVariable: any;
}

export interface DashboardNavDropdowns  {
    dataAsList: any;
    selectedSelectItem: any;
    handleSelectedItemChange: any;
    selectDataKey: any;
    displayField: any;
    selectTitle: any;
    placeholder: any;
    updateStatus: any;
}

export interface DashboardProps {
    children: any,
    dashboardTitle: string;
    dashboardComponents: DashboardComponents[];
    error: any;
    dashboardNavButtons: DashboardNavButtons[];
    dashboardNavDropdowns: DashboardNavDropdowns[];
}
