'use client'
import React, { useContext } from 'react'
import styles from '../styles/Layout.module.css'

const Logo = (
  <>
    <h1 className="xs:text-sm md:text-lg lg:text-2xl xs:font-bold font-bold text-slate-950 dark:text-slate-100">
      <a href="/" className="text-slate-950 dark:text-slate-100">
        GenomeSearch 🔬🧬
      </a>
    </h1>
    <div className="text-xs text-slate-950 dark:text-slate-100">
      <em>
        <span className="xs:hidden md:hidden lg:inline">Engineered by</span>
        <a
          href="https://github.com/MathematicusLucian"
          target="blank"
          className="ml-1 font-semibold text-slate-800 dark:text-slate-100"
        >
          MathematicusLucian
        </a>
      </em>
    </div>
  </>
)

export default Logo
