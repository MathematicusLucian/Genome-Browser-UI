'use client'
import React from "react"; 
import Navbar from "./Navbar"; 
import AuthAndThemeToggleButtons from "./AuthAndThemeToggleButtons"; 
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";
import NavbarPrivate from "./NavbarPrivate"; 

const Header = ({session}) => { 

    return (
        <Card className="g-card bg-slate-200 dark:bg-gray-900 w-full w-full flex xs:h-8 h-16 shrink-0 items-center top sticky rounded-2xl bm-0 px-6 xs:py-7 sm:py-8 lg:px-9 border-0 items-center justify-between gap-6">
            
            <div className="-ml-1 text-primary cursor-pointer">
                {Logo}
            </div> 

            <Separator orientation="vertical" className="mr-2 h-4" />
    
            {session ? (
                <NavbarPrivate>
                    <AuthAndThemeToggleButtons session={session} />
                </NavbarPrivate>
            ) : (
                <Navbar>
                    <AuthAndThemeToggleButtons session={session} />
                </Navbar> 
            )} 

        </Card>
    )
};

export default Header;