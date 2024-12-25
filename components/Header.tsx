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
                <h1 className={styles.title}>Genome Browser</h1>
                <p className={styles.subtitle}>
                    (<strong>Engineer:</strong> 
                    <a href="https://github.com/MathematicusLucian" target="blank">
                        MathematicusLucian
                    </a>)
                </p>
                <button
                    className="theme-toggle-button rounded bg-gray-200 px-3 py-1 mt-3 text-xs"
                    onClick={toggleTheme}
                >
                {style} <em>(theme)</em> 
                </button>
                <style jsx>{`
                    .header-row {
                        background-color:rgb(240, 237, 237);
                        width: 100%;
                        padding: 0 10em;
                        margin-bottom: 0.8em;
                        flex: 1;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    } 
                    p {
                        margin-left: 15px;
                    }
                    .theme-toggle-button {
                        padding: 0em;
                        margin-left: 15px;
                        margin-bottom: 15px;
                        white-space: nowrap;
                    } 
                `}</style>
            </div>
        </header>
    )
};

export default Header;