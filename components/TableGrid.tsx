'use client';
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { flushSync } from 'react-dom';
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";  

agGrid.ModuleRegistry.registerModules([agGrid.AllCommunityModule, agGrid.ValidationModule]);

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

interface TableGridProps {
    rowData: any;
    columnDefs: any;
    error?: any;
    onSelectedDataRowChange: (dataRow: string) => void;
}

const TableGrid: React.FC<TableGridProps> = ({ rowData, columnDefs, error, onSelectedDataRowChange }) => {
  const gridRef = useRef<AgGridReact<any>>(null);
  const [gridApi, setGridApi] = useState<agGrid.GridApi | null>(null);
  
  const defaultColDef: agGrid.ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  const onGridReady = (params: agGrid.GridReadyEvent) => {
    setGridApi(params.api);
    params.api.addGlobalListener((type: string, e: any) => {
      if (type === "rowClicked" || type === "rowSelected") {
        onSelectedDataRowChange(e.data);
      }
    }); 
  };  
  useEffect(() => {
    if (gridApi) {
      const allColumnIds: string[] = []; 
      gridApi.getColumns()!.forEach((column) => {
        allColumnIds.push(column.getId());
      });
      gridApi.autoSizeColumns(allColumnIds, false);
    }
  }, [gridApi]);
  
  // const onPaginationChanged = () => {
  //   // console.log("onPaginationChanged");
  // };

  const clearFilters = () => {
    if (gridApi) {
      gridApi.setFilterModel(null);
    }
  }; 
  
  const autoSizeStrategy = useMemo<
    | agGrid.SizeColumnsToFitGridStrategy
    | agGrid.SizeColumnsToFitProvidedWidthStrategy
    | agGrid.SizeColumnsToContentStrategy
  >(() => {
    return {
      type: "fitCellContents",
    };
  }, []);

  return (
    <div className="ag-theme-alpine grid-container">
      <div className="flex justify-between align-middle mb-4 text-lg text-[#4b5563]">
          <button
            className="rounded bg-gray-200 px-3 py-1 mt-3 text-xs"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
      </div>
      <AgGridReact
        className="ag-grid"
        ref={gridRef} 
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection={'single'}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={50}
        // onPaginationChanged={onPaginationChanged}
        autoSizeStrategy={autoSizeStrategy}
        enableCellTextSelection={true}
        ensureDomOrder={true}
      ></AgGridReact>
      <style jsx global>{`
        .grid-container {
          height: 65vh;
          width: 100%;
          padding: 0; 
        }
        .ag-grid .ag-cell {
          font-family:
            Menlo,
            Monaco,
            'Lucida Console',
            'Liberation Mono',
            'DejaVu Sans Mono',
            'Bitstream Vera Sans Mono',
            'Courier New',
            monospace;
          text-align: left;
        }
        .ag-grid .ag-cell {
          color: #4b5563;
          border-color: #e5e7eb;
          margin: 0 auto;
          padding: 0.5rem;
          font-size: 0.7rem;
          line-height: 1.0;
        }
        .ag-grid .ag-header-cell {
          background-color: #f9fafb;
          border-color: #e5e7eb;
          margin: 0 auto;
          padding: 0.7rem;
          font-weight: 600;
          font-size: 0.7rem;
          color: #374151;
        }
      `}</style>
    </div>
  );
};

export default TableGrid;