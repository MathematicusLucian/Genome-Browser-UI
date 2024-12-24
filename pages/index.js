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

          <p className={styles.subtitle}>
            (Engineer: <a href="https://github.com/MathematicusLucian" target="blank">
              MathematicusLucian
            </a>)
          </p >

          <p className={styles.description}>
            The <a href="https://github.com/MathematicusLucian/Genome-Browser-UI" target="blank">Genome Browser UI</a> is a Next.js React-based (TypeScript) UI client application, which queries the <a href="https://github.com/MathematicusLucian/Genome-Browser-API" target="blank">Genome Browser API</a> (FastAPI) server, to present genome (gene variant) data (patient data is combined with SNP pairs data to show health risks.) SNP data is sourced from several sources, i.e. SNPedia, Ensembl, and GProfiler. For security reasons, the user's patient data is not shared to the server, but remains on their machine (in the web browser IndexedDB.)
          </p>

          <div className={styles.childcontainer}>
            <PatientData />
          </div>

        </div>
      </main>

      <footer>
        <strong>Genome Browser UI, and |Genome Browser API</strong>, &copy; Luke Jones {new Date().getFullYear()}
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
          font-size: 0.6rem;
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