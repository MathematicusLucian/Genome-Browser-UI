import React from 'react'; 
import type {NextPage} from 'next'
import Layout from './PrivateLayout';    
import Intro from '@/components/Intro';

const Home: NextPage = () => {  
  
  return (
    <Layout isSidebar={false}>  
        <Intro /> 
   </Layout>
  );
};

export default Home;