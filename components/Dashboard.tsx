'use client'
import React, { useState, useEffect, useContext, useMemo } from "react";  
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";
import DataGridFilter from "./DataGridFllter";
// import DashboardProps from "@/models/dashboard";

const Dashboard: React.FC<any> = ({ // DashboardProps
    children,
    dashboardTitle,
    dashboardComponents,
    error,
    dashboardNavButtons,
    dashboardNavDropdowns
}) => {  
    const [dataStatus, setDataSatus] = useState();

    return (
        <>
            <div className="text-xl">{dashboardTitle}</div>

            <div className="flex flex-row"> 
                {dashboardNavButtons.map((navButton) =>
                    navButton.condtionVariable && (<Button
                        className="flex-0.5 rounded px-3 py-1 mt-3 text-xs border-zinc-950 dark:border-zinc-200 bg-slate-100 dark:bg-gray-950 text-zinc-950 dark:text-white"
                        variant="outline"
                        onClick={navButton.onClickMethod}
                    >
                        {navButton.buttonTitle}
                    </Button> 
                ))}
            </div>
            
            <Separator className="my-2" /> 

            <div className="text-xs">{dataStatus}</div>

            <div className="flex flex-row">

                {/* {JSON.stringify(dashboardNavDropdowns[0])}  */}

                {dashboardNavDropdowns.map((navDropdowns: any) => 
                    (  
                    <div>
                        <DataGridFilter 
                            dataAsList={navDropdowns.dataAsList} 
                            error={error}
                            selectedSelectItem={navDropdowns.selectedSelectItem} 
                            handleSelectedItemChange={navDropdowns.handleSelectedItemChange} 
                            selectDataKey={navDropdowns.selectDataKey} 
                            displayField={navDropdowns.displayField} 
                            selectTitle={navDropdowns.selectTitle} 
                            placeholder={navDropdowns.placeholder}
                            updateStatus={navDropdowns.updateStatus} 
                        />
                        a
                    </div>
                ))}
            </div>

            <Separator className="my-4" /> 

            {dashboardComponents.map((dashboardComponent) => (
                <div>{dashboardComponent.component}</div>
            ))}
            
            {children}
                        
        </>
    );
};

export default Dashboard;