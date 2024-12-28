'use client';
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { flushSync } from 'react-dom';
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";  
import { colorSchemeDark, themeQuartz } from 'ag-grid-community';
import { useContainerWidth } from "../utils/useContainerWidth";
import { useWindowSize } from "../utils/useWindowSize";
import { Button } from "./ui/button";

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
  const debounce = 0;
  const [windowWidth] = useWindowSize(debounce);
  const {width: containerWidth, ref} = useContainerWidth(debounce);

  // console.log("columnDefs", columnDefs);
  // console.log("rowData", rowData);
  
  const agGridTheme = themeQuartz 
    .withParams(
        {
            backgroundColor: '#201008',
            foregroundColor: '#FFFFFFCC',
            browserColorScheme: 'dark',
        },
        'dark-red'
    ); 

  const defaultColDef: agGrid.ColDef = {
    flex: 1,
    minWidth: 50, 
    resizable: true, // Enable resizing
    wrapText: true, // Wrap Text
    wrapHeaderText: true,
    autoHeight: true, // Adjust Cell Height to Fit Wrapped Text
    autoHeaderHeight: true,
  };

  const onGridReady = (params: agGrid.GridReadyEvent) => {
    setGridApi(params.api);
    params.api.addGlobalListener((type: string, e: any) => {
      if (type === "rowClicked" || type === "rowSelected") {
        onSelectedDataRowChange(e.data);
      }
    });  
  };    
  
  const onPaginationChanged = () => {
    // console.log("onPaginationChanged");
  };

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

  const mode=true;

  useEffect(() => {
    if (gridApi) {
      // gridApi.sizeColumnsToFit();
      let columnIds = [];
      gridApi.getColumns().forEach(column => {
        columnIds.push(column.getColDef());
      });
      gridApi.autoSizeColumns(columnIds);
    }
  }, [windowWidth, containerWidth, gridApi]);

  return (
    <div className="grid-container" data-ag-theme-mode="mode">
      <div className="flex justify-between align-middle m-1 mt-3 text-xs text-[#4b5563]">
          <Button
            className="rounded px-3 py-1 text-xs border-zinc-950 dark:border-zinc-200"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
      </div>
      <AgGridReact
        className={"ag-grid text-zinc-700 dark:text-white ag-theme-alpine dark:ag-theme-alpine-dark"} 
        ref={gridRef} 
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection={'single'}
        defaultColDef={defaultColDef} 
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={50}
        onPaginationChanged={onPaginationChanged}
        autoSizeStrategy={autoSizeStrategy}
        enableCellTextSelection={true}
        ensureDomOrder={true}
        theme={agGridTheme}
      ></AgGridReact>
      <style jsx global>{`
      //  .ag-body, .ag-layout-normal, .ag-chart, .ag-dnd-ghost, .ag-popup, .ag-root-wrapper, .ag-body-viewport, &.ag-layout-normal, .ag-layout-normal, .ag-ltr {
      //     background-color: transparent !important;
      //   }
        .grid-container {
          height: 55vh;
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
          background-color: transparent !important;
          // color: #4b5563;
          border-color: #e5e7eb;
          margin: 0 auto;
          padding: 0.5rem;
          font-size: 0.7rem;
          line-height: 1.0;
        }
        .ag-grid .ag-header-cell {
          // background-color: #f9fafb;
          background-color: transparent !important;
          border-color: #e5e7eb;
          margin: 0 auto;
          padding: 0.7rem;
          font-weight: 600;
          font-size: 0.7rem;
          // color: #374151;
        }
      `}</style>
    </div>
  );
};

export default TableGrid;