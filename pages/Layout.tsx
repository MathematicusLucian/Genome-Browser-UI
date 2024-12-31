'use client'
import React, { useState, useEffect, useContext } from "react"; 
import { addDemoDataIfDatabaseTablesEmpty } from "@/database/database";

const RootLayout = ({ children }) => {      

  useEffect(() => {
    addDemoDataIfDatabaseTablesEmpty();
  }, []);

  return (
      <div className="p-0 m-0 flex flex-col flex-1 flex-grow w-full">
        {children}
    </div>
  );
};

export default RootLayout;