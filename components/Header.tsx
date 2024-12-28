import React, { useContext } from "react";
import styles from '../styles/Layout.module.css';
import Navbar from "./Navbar";

const Header = () => { 
    
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 top sticky"> 
            <Navbar />
            </header>
            {<p className={styles.description}>
                The <a href="https://github.com/MathematicusLucian/Genome-Browser-UI" target="blank">
                    Genome Browser UI
                </a> is a Next.js React-based (TypeScript) UI client application, which queries the <a href="https://github.com/MathematicusLucian/Genome-Browser-API" target="blank">
                    Genome Browser API
                </a> (FastAPI) server, to present genome (gene variant) data (patient data is combined with SNP pairs data to show health risks.) 
                SNP data is sourced from several sources, i.e. SNPedia, Ensembl, and GProfiler. 
                For security reasons, the user's patient data is not shared to the server, but remains on their machine (in the web browser IndexedDB.)
            </p>}
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