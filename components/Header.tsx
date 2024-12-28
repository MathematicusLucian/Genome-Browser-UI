import React, { useContext } from "react";
import styles from '../styles/Layout.module.css'; 
import Navbar from "./Navbar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Header = () => { 
    
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 top sticky"> 
                <Card className="container bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
                    
                    <div className="-ml-1 text-primary cursor-pointer">
                        <h1 className={styles.title}>
                            <a href="/" className="text-slate-950 dark:text-slate-100">
                                Genome Browser 🔬🧬
                            </a>
                        </h1>
                        <div className={styles.subtitle}>
                            (<strong>Engineered by:</strong>&nbsp;
                            <a href="https://github.com/MathematicusLucian" target="blank" className="dark:text-slate-100">
                                MathematicusLucian
                            </a>)
                        </div>
                    </div> 

                    <Separator orientation="vertical" className="mr-2 h-4" />
            
                    <Navbar />

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