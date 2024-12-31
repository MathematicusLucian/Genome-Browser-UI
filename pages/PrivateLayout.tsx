'use client'
import React, { useEffect } from "react"; 
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { addDemoDataIfDatabaseTablesEmpty } from "@/database/database";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react"

const PrivateLayout = ({ isSidebar, children }) => {      
  
  const Sidebar = dynamic(() => import("../components/Sidebar"), { ssr: false });

  const { data: session } = useSession();

  useEffect(() => {
    addDemoDataIfDatabaseTablesEmpty();
  }, []);

  return session ? (
    <div className="p-0 m-0 flex flex-col flex-1 flex-grow w-full">
      {isSidebar ? 
        (
          <Sidebar>
            Sidebar content
          </Sidebar>
        )
        : (<></>)
      }
      {children}
    </div>
  ):(
    <> 
      <h2 className="pb-5">Please login ...</h2>
      <Button className="close-button rounded px-3 py-1 bg-gray-900 dark:bg-white text-xs text-white dark:text-zinc-900" onClick={() => signIn()}>Log in</Button>
    </>
  )
};

export default PrivateLayout;