export interface IDashboard {
    title: string;
    dashboardProps: IDashboardProps;
    dashboardNavButtons: IDashboardNavButtons;
    dashboardNavDropdowns: IDashboardNavDropdowns;
    dashboardComponents: IDashboardComponents;
    grid: IGrid,
    error: any;
}

export interface IGrid {
    filters: any;
    colunDefs: any;
    rowData: any;
} 

export interface IDashboardComponents {
    component: any; 
}

export interface IDashboardNavButtons {
    buttonTitle: string;
    onClickMethod: any;
    condtionVariable: any;
}

export interface IDashboardNavDropdowns  {
    dataAsList: any;
    selectedSelectItem: any;
    handleSelectedItemChange: any;
    selectDataKey: any;
    displayField: any;
    selectTitle: any;
    placeholder: any;
    updateStatus: any;
}

export interface IDashboardProps {
    children: any,
    dashboardTitle: string;
    dashboardComponents: IDashboardComponents[];
    error: any;
    dashboardNavButtons: IDashboardNavButtons[];
    dashboardNavDropdowns: IDashboardNavDropdowns[];
}
