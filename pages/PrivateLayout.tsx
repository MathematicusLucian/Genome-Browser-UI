'use client'
import React, { useEffect } from "react"; 
import dynamic from "next/dynamic";
import { addDemoDataIfDatabaseTablesEmpty } from "@/database/database";

const PrivateLayout = ({ isSidebar, children }) => {      
  
  const Sidebar = dynamic(() => import("../components/Sidebar"), { ssr: false });

  useEffect(() => {
    addDemoDataIfDatabaseTablesEmpty();
  }, []);

  return (
      <div className="p-0 m-0 flex flex-col flex-1 flex-grow w-full">
        {isSidebar ? 
          (
            <Sidebar>
              Sidebar Content
            </Sidebar>
          )
          : (<></>)
        }
        {children}
    </div>
  );
};

export default PrivateLayout;