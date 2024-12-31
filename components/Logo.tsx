'use client'
import React, { useContext } from "react";  
import styles from '../styles/Layout.module.css';  

const Logo = (<>
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
</>);

export default Logo;