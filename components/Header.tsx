'use client'
import React, { useContext } from "react"; 
import Navbar from "./Navbar"; 
import AuthAndThemeToggleButtons from "./AuthAndThemeToggleButtons"; 
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";
import NavbarPrivate from "./NavbarPrivate";
import styles from '../styles/Layout.module.css';  

const Header = ({session}) => { 

    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 top sticky"> 
                <Card className="container rounded-2xl bg-card bg-slate-200 dark:bg-gray-900 py-3 px-4 border-0 flex items-center justify-between gap-6 mt-5">
                    
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
            <style jsx>{`
                h1 {
                    font-size: 1.4em;
                    font-weight: 900; 
                    white-space: nowrap;
                }
                div {
                    margin-left: 15px;
                    font-size: 0.9em; 
                } 
                p {
                    max-width: 80%;
                    padding: 2em;
                    font-size: 0.8em;
                }
            `}</style>
        </>
    )
};

export default Header;