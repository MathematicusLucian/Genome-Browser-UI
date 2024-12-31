import React, { useState } from 'react'; 
 import type {NextPage} from 'next'
import PrivateLayout from '../PrivateLayout';    
import Intro from '@/components/Intro';

const ProfilePagesHome: NextPage = () => {  
  return (
    <PrivateLayout isSidebar={false}>  
      <Intro />
   </PrivateLayout>
  );
};

export default ProfilePagesHome;