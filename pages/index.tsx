import React from 'react';
import Head from 'next/head'
import type {NextPage} from 'next'
import Layout from '../components/Layout'; 
import dynamic from "next/dynamic";
import styles from '../styles/Layout.module.css'
import { AddPatientForm } from '@/components/AddPatientForm';
import { PatientList } from '@/components/PatientList';

// const PatientsList = dynamic(() =>import("../components/PatientsList"), {ssr: false})

const Home: NextPage = () => {
  return (
    <Layout>
        <p>Welcome . . .</p>
        <div className={styles.container}>
            <Head>
                <title>Genome Browser</title>
                <meta name="description" content=""/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>

                <h1 className={styles.title}>
                    PatientDatabase
                </h1>
                
                <h2>Add Friend</h2>
                <AddPatientForm /> 
                {/* defaultAge={21}  */}

                {/* <h2>Friend List</h2>
                <FriendList minAge={18} maxAge={65} /> */}

                {/* <PatientsList/>
                <hr />
                <PatientsList/>   */}
            </main>
        </div>
    </Layout>
  );
};

export default Home;