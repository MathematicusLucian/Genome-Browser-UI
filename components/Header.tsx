import React, { useContext } from "react";
import styles from '../styles/Layout.module.css';
import ModeToggle from './ModeToggle';
import { Separator } from "./ui/separator";

const Header = () => { 
    
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4"> 
                <div className="-ml-1">
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
                <ModeToggle children={undefined} />
            </header>
            {<p className={styles.description}>
                The <a href="https://github.com/MathematicusLucian/Genome-Browser-UI" target="blank">Genome Browser UI</a> is a Next.js React-based (TypeScript) UI client application, which queries the <a href="https://github.com/MathematicusLucian/Genome-Browser-API" target="blank">Genome Browser API</a> (FastAPI) server, to present genome (gene variant) data (patient data is combined with SNP pairs data to show health risks.) SNP data is sourced from several sources, i.e. SNPedia, Ensembl, and GProfiler. For security reasons, the user's patient data is not shared to the server, but remains on their machine (in the web browser IndexedDB.)
            </p>}
            <style jsx>{`
                .header-row {
                    width: 100%;
                    padding: 0.8em 2em 0.3em 2em;
                    margin-bottom: 0.8em;
                    flex: 1;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                } 
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
                    padding: 1em;
                    font-size: 0.8em;
                }
            `}</style>
        </>
    )
};

export default Header;