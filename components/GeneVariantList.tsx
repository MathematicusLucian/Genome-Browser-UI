'use client'
import React, { useState, useEffect, useMemo } from "react";
import type {FC} from 'react'; 
import { useLiveQuery } from 'dexie-react-hooks'; 
import { patientsIndexedDb } from '@/database/db'; 
import TableGrid from "@/components/TableGrid";
import { useRouter } from "next/router";

interface GeneVariantListProps {
  geneVariantList: any;
  columns: any;
  handleSelectedDataRowChange:() => void
}

const GeneVariantList: FC<GeneVariantListProps> = ({geneVariantList, columns, handleSelectedDataRowChange}) => {   

  const error = () => {};
  
  return (
    <>  
      {!geneVariantList ? (
          <div>Please provide a patient genome ID. If the table is empty, the profile may not exist.</div>
      ) : (
          <div>      
              <br />
              <h2 className="table-header">Gene Variants</h2>   
              <TableGrid rowData={geneVariantList} columnDefs={columns} error={error} onSelectedDataRowChange={handleSelectedDataRowChange} />
          </div>
      )} 
  
    </>
  );
};

export default GeneVariantList;