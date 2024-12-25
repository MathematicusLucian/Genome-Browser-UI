import Head from 'next/head'; 
import styles from '../styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Genome Browser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.grid}>

          <Header />

          <p className={styles.description}>
            The <a href="https://github.com/MathematicusLucian/Genome-Browser-UI" target="blank">Genome Browser UI</a> is a Next.js React-based (TypeScript) UI client application, which queries the <a href="https://github.com/MathematicusLucian/Genome-Browser-API" target="blank">Genome Browser API</a> (FastAPI) server, to present genome (gene variant) data (patient data is combined with SNP pairs data to show health risks.) SNP data is sourced from several sources, i.e. SNPedia, Ensembl, and GProfiler. For security reasons, the user's patient data is not shared to the server, but remains on their machine (in the web browser IndexedDB.)
          </p>

          <div className={styles.childcontainer}>
            {children}
          </div>
        </div>

        <Footer />
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            'Lucida Console',
            'Liberation Mono',
            'DejaVu Sans Mono',
            'Bitstream Vera Sans Mono',
            'Courier New',
            monospace;
        }
      `}</style>
    </div>
  );
};

export default Layout;