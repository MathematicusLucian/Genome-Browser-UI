import React from 'react'; 
import type {NextPage} from 'next'
import PublicLayout from './PublicLayout';    
import Intro from '@/components/Intro';

const Home: NextPage = () => {  
  
  return (
    <PublicLayout isSidebar={false}>  
        <Intro /> 
   </PublicLayout>
  );
};

export default Home;