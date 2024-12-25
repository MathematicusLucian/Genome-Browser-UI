import React, { useContext } from "react";
import styles from '../styles/Layout.module.css';
import { ThemeContext } from "@/context";

const Header = () => {
    const { style, toggleTheme } = useContext(
        ThemeContext
    );

    return (
        <header>
            <div className="header-row">
                <h1 className={styles.title}>Genome Browser 🔬🧬</h1>
                <div className={styles.subtitle}>
                    (<strong>Engineer:</strong> 
                    <a href="https://github.com/MathematicusLucian" target="blank">
                        MathematicusLucian
                    </a>)
                </div>
                <div className={styles.subtitle}>
                    <button
                        className="theme-toggle-button rounded bg-gray-200 px-3 py-1 mt-3 text-xs"
                        onClick={toggleTheme}
                    >
                        {style} <em>(theme)</em> 
                    </button>
                </div>
                <style jsx>{`
                    .header-row {
                        background-color:rgb(240, 237, 237);
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
            </div>
        </header>
    )
};

export default Header;