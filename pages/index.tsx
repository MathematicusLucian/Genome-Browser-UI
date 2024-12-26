import React from 'react'; 
import type {NextPage} from 'next'
import Layout from '../components/Layout';  
import AddPatientForm from "../components/AddPatientForm";
import PatientList from "../components/PatientList";
import dynamic from "next/dynamic"; 

const Home: NextPage = () => {
  return (
    <Layout>  
        <h2 className="table-header">Patient Database</h2>
        <AddPatientForm />
        <PatientList/>
    </Layout>
  );
};

export default Home;