'use client'
import React, { useState, useEffect, useMemo } from "react";
import type {FC} from 'react';  
import TableGrid from "@/components/TableGrid";
import { IFullReport } from "@/models/database";

interface ReportGridWrapperProps {
  riskReportRowsData: any;
  columns: any;
  handleSelectedDataRowChange:(e: any) => void
}

const ReportGridWrapper: FC<ReportGridWrapperProps> = ({
  riskReportRowsData, 
  columns,
  handleSelectedDataRowChange
}) => { 
  
  const error = () => {};
  
  return (
    <>  
      {!riskReportRowsData ? (
          <div>Please provide risk report data. The patient profile, or genome may not exist.</div>
      ) : (
          <div>      
              <br />
              <h2 className="table-header">Risk Report</h2>   
              <TableGrid rowData={riskReportRowsData} columnDefs={columns} error={error} onSelectedDataRowChange={handleSelectedDataRowChange} />
          </div>
      )} 
  
    </>
  );
};

export default ReportGridWrapper;