import React from "react";
import styles from '../styles/Layout.module.css';

const Footer = () => {
    return (
        <header>
            <h1 className={styles.title}>Genome Browser</h1>
            <p className={styles.subtitle}>
                (Engineer: <a href="https://github.com/MathematicusLucian" target="blank">
                    MathematicusLucian
                </a>)
            </p>
        </header>
    )
};

export default Footer;