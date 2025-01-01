'use client'
import React, { useContext } from "react";  
import styles from '../styles/Layout.module.css';  

const Logo = (<>
    <h1 className={styles.title}>
        <a href="/" className="text-slate-950 dark:text-slate-100">
            Genome Browser 🔬🧬
        </a>
    </h1>
    <div className="text-xs text-slate-950 dark:text-slate-100">
        Engineered by
        <a href="https://github.com/MathematicusLucian" target="blank" className="ml-1 font-semibold text-slate-800 dark:text-slate-100">
            MathematicusLucian
        </a>
    </div>
</>);

export default Logo;