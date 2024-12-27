import React, { useState } from 'react'; 
 import type {NextPage} from 'next'
import Layout from '../../components/Layout';    
import Intro from '@/components/Intro';

const ProfilePagesHome: NextPage = () => {  
  return (
    <Layout>  
      <Intro />
   </Layout>
  );
};

export default ProfilePagesHome;