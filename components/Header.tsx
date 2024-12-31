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
        <header> 
            <Card className="w-full flex h-16 shrink-0 items-center top sticky container rounded-2xl bg-card bg-slate-200 dark:bg-gray-900 m-0 py-10 px-9 border-0 items-center justify-between gap-6">
                
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
        </header> 
    )
};

export default Header;