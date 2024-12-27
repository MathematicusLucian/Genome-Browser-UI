import React, { useContext } from "react";
import styles from '../styles/Layout.module.css';
import ModeToggle from './ModeToggle';

const Header = () => { 
    
    return (
        <header>
            <div className="header-row bg-zinc-950 dark:bg-zinc-200 text-slate-100 dark:text-zinc-950">
                <h1 className={styles.title}>Genome Browser 🔬🧬</h1>
                <div className={styles.subtitle}>
                    (<strong>Engineer:</strong> 
                    <a href="https://github.com/MathematicusLucian" target="blank">
                        MathematicusLucian
                    </a>)
                </div>
                <div className={styles.subtitle}> 
                     <ModeToggle children={undefined} />
                </div>
            </div>
            <p className={styles.description}>
            The <a href="https://github.com/MathematicusLucian/Genome-Browser-UI" target="blank">Genome Browser UI</a> is a Next.js React-based (TypeScript) UI client application, which queries the <a href="https://github.com/MathematicusLucian/Genome-Browser-API" target="blank">Genome Browser API</a> (FastAPI) server, to present genome (gene variant) data (patient data is combined with SNP pairs data to show health risks.) SNP data is sourced from several sources, i.e. SNPedia, Ensembl, and GProfiler. For security reasons, the user's patient data is not shared to the server, but remains on their machine (in the web browser IndexedDB.)
            </p> 
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
                    font-size: 1em;
                    font-weight: 900; 
                    white-space: nowrap;
                }
                div {
                    margin-left: 15px;
                    font-size: 0.9em; 
                }
                .theme-toggle-button {
                    padding: 0.1em;
                    margin: 0 15px;
                    white-space: nowrap;
                } 
            `}</style>
        </header>
    )
};

export default Header;