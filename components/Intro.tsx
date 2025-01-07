import React, { useState } from 'react'
import styles from '../styles/Layout.module.css'
import { Button } from './ui/button'

const Intro = () => {
  return (
    <>
      <h2 className="title mt-6 mb-3">Welcome . . .</h2>
      <p className={styles.description}>
        The{' '}
        <a href="https://github.com/MathematicusLucian/Genome=Search-UI" target="blank">
          GenomeSearch UI
        </a>{' '}
        is a Next.js React-based (TypeScript) UI client application, which queries the{' '}
        <a href="https://github.com/MathematicusLucian/Genome=Search-API" target="blank">
          GenomeSearch API
        </a>{' '}
        (FastAPI) server, to present genome (gene variant) data (patient data is combined with SNP
        pairs data to show health risks.) SNP data is sourced from several sources, i.e. SNPedia,
        Ensembl, and GProfiler. For security reasons, the user's patient data is not shared to the
        server, but remains on their machine (in the web browser IndexedDB.)
      </p>
      <Button className="w-full text-sm w-50 mt-7 flex-1 rounded px-3 py-1 mt-3 text-xs border-zinc-950 dark:border-zinc-200 bg-slate-100 dark:bg-gray-950 text-zinc-950 dark:text-white">
        Get Started
      </Button>
      <div className="flex flex-col md:flex-row xs:flex-col gap-10 p-10">
        <div className="flex-1 ">
          <img src={'../assets/full_report.png'} />
        </div>
        <div className="flex-1">
          <p className="sub-title">Overview</p>
          <p>
            The GenomeSearch scans/analyses DNA files from popular family tree providers (23andMe,
            Ancestry.com, etc.), comparing the genome of the user with published literature on
            health risks/conditions that their{' '}
            <a href="https://en.wikipedia.org/wiki/Human_genetic_variation" target="_blank">
              gene variants
            </a>{' '}
            are correlated to. SNP data is sourced from several sources, i.e. SNPedia, Ensembl, and
            GProfiler.
          </p>
          <p>
            For security reasons, the user's patient data is not shared to the server, but remains
            on their machine (**Dexie.js** to interface with **IndexedDB** database storage in the
            web browser.)
          </p>
          <p>
            - This repo is the **React**-based (TypeScript) UI client application (with **NextJs**),
            and which queries the GenomeSearch API.
          </p>
          <p>
            - The API/Orchestrator for this project is here:{' '}
            <a href="https://github.com/MathematicusLucian/Genome=Search-API">GenomeSearch API</a>.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row xs:flex-col gap-10 p-10">
        <div className="flex-1">
          <p className="sub-title">Objectives</p>
          <p>
            DNA files from popular family tree providers (23andMe, Ancestry.com, etc.) are long text
            files that lack meaning (unless someone had memorised SNP ids, and the associated
            published literature.)
          </p>
          <p>
            1. A dashboard UI (grids/tables, charts, etc.) to browse DNA files. Present the
            major/minor alleles of gene variants, their associated gene, chromosome position, etc..
          </p>
          <p>
            2. Compare the DNA file to published literature, i.e. generate a report of the potential
            health conditions/risks associated with the gene varients that the patient's genome
            features.
          </p>
        </div>
        <div className="flex-1">
          <img src={'../assets/dev_tools_indexeddb.png'} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row xs:flex-col gap-10 p-10">
        <div className="flex-1">
          <p className="sub-title">Please visit a page below:</p>
          <ul>
            <li>
              <a href="/patient/list/">List of Patient Profiles</a>
            </li>
            <li>
              <a href="/patient/genome/">Patient's Genome</a>
            </li>
            <li>
              <a href="/patient/report/">Report on Patient's Gene Variants</a>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        p,
        div,
        li,
        input,
        label,
        select,
        button {
          font-size: 0.9em;
        }
        .title {
          font-size: 1.1em;
          padding: 0.4em 0 0.8em 0;
        }
        .sub-title {
          font-size: 1em;
          font-weight: 600;
        }
        p {
          padding: 0.7em;
        }
        ul {
          padding-top: 0.4rem;
        }
        li {
          padding: 0.5em 0.5em 0 0.5em;
        }
      `}</style>
    </>
  )
}

export default Intro
