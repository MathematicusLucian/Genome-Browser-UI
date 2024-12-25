'use client';
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";  
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

agGrid.ModuleRegistry.registerModules([agGrid.ClientSideRowModelModule]);

interface RowData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

interface MyComponentProps {
    rowData: any;
    columnDefs: any;
    error?: any;
}

const Grid: React.FC<MyComponentProps> = ({ rowData, columnDefs, error }) => {
  const [gridApi, setGridApi] = useState<agGrid.GridApi | null>(null);
  const [gridColumnApi, setGridColumnApi] = useState<agGrid.Column | null>(
    null
  );
  
  const defaultColDef: agGrid.ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  const onGridReady = (params: agGrid.GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onPaginationChanged = () => {
    console.log("onPaginationChanged");
  };

  const clearFilters = () => {
    if (gridApi) {
      gridApi.setFilterModel(null);
    }
  };

  return (
    <div className="ag-theme-alpine grid-container">
      <div className="flex justify-between align-middle mb-4 text-lg text-[#4b5563] ">
        <button
          className="rounded bg-gray-200 px-3 py-1"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
      <AgGridReact
        className="ag-grid"
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={50}
        onPaginationChanged={onPaginationChanged}
      ></AgGridReact>
      <style jsx global>{`
        .grid-container {
          height: 800px;
          width: 100%;
        }
        .ag-grid .ag-cell {
          padding: 0.5rem;
          font-size: 1.2rem;
          color: #4b5563;
          border-color: #e5e7eb;
          line-height: 1.5;
        }
        .ag-grid .ag-header-cell {
          font-weight: 600;
          font-size: 1.2rem;
          color: #374151;
          background-color: #f9fafb;
          border-color: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default Grid;