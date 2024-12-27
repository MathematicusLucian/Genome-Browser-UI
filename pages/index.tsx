import React, { useState } from 'react'; 
 import type {NextPage} from 'next'
import Layout from '../components/Layout';    

const Home: NextPage = () => {  
  return (
    <Layout>  
      <h2 className="title">Welcome . . .</h2>
      <p className='sub-title'>Please visit a page below:</p>
      <hr />
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
      <style jsx>{`
        p, div, li, input, label, select, button {
          font-size: 0.9em;
        }
        .title {
          font-size: 1.1em;
          padding: 0.4em 0 0.8em 0;
        }
        .sub-title {
          font-weight: 600;
        } 
        ul {
          padding-top: 0.4rem;
        }
        li { 
          padding: 0.5em 0.5em 0 0.5em;
        }
      `}</style>
   </Layout>
  );
};

export default Home;