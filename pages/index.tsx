import React, { useState, useEffect } from 'react'; 
import type {NextPage} from 'next'
import Layout from './Layout';    
import Intro from '@/components/Intro';

const Home: NextPage = () => {  
  
  return (
    <Layout>  
        <Intro /> 
   </Layout>
  );
};

export default Home;