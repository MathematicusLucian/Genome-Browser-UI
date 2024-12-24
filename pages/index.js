import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PatientData from '../components/PatientData';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Genome Browser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <div className={styles.grid}>

          <h1 className={styles.title}>
            Genome Browser
          </h1>

          <p className={styles.description}>
            The Genome Browser UI is a Next.js React-based (TypeScript) UI client application, which queries the Genome Browser API (FastAPI) server, to present genome (gene variant) data (patient data is combined with SNP pairs data to show health risks.) SNP data is sourced from several sources, i.e. SNPedia, Ensembl, and GProfiler. For security reasons, the user's patient data is not shared to the server, but remains on their machine (in the web browser IndexedDB.)
          </p>

          {/* <PatientData /> */}

        </div>
      </main>

      <footer>
        &copy; Luke Jones {new Date().getFullYear()}
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}