import React, { useState, useEffect } from "react";
// import { AgGridReact } from 'ag-grid-react';
// import { AllCommunityModules, ModuleRegistry } from 'ag-grid-community'; 

// // Register all Community features
// ModuleRegistry.registerModules(AllCommunityModules);

const PatientData = ({ rowData, columnDefs, error }) => {

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <pre>{JSON.stringify(rowData)}</pre> 
        A
      {/* {error ? (
        <div>Error: {error}</div>
      ) : (
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      )} */}
    </div>
  );
};

export default PatientData;