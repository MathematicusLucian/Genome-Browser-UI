'use client'
import React, { useState, useEffect, useMemo } from "react";
import type {FC} from 'react';  
import TableGrid from "@/components/TableGrid";
import { IPatientGenomeVariant } from "@/models/db";

interface GeneVariantListProps {
  geneVariantList: any;
  columns: any;
  handleSelectedDataRowChange:() => void
}

const GeneVariantList: FC<GeneVariantListProps> = ({geneVariantList, columns, handleSelectedDataRowChange}) => {   
  const [selectedPatientGeneVariant, setSelectedPatientGeneVariant] = useState<IPatientGenomeVariant | null>(null); 
  const [selectedPatientGeneVariantId, setSelectedPatientGeneVariantId] = useState<string| null>(null); 
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