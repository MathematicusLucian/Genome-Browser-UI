import React, { useState, useEffect } from 'react'; 
import type {NextPage} from 'next'
import { useSession, signIn, signOut } from "next-auth/react"
import Layout from '../components/Layout';    
import Intro from '@/components/Intro';
import { getUserInfo } from "../services/Auth";
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";

const Home: NextPage = () => {  
  const router = useRouter();
  const user: any = getUserInfo();
  const { data: session } = useSession()

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push(
        `/${user?.role === "SUPER_ADMIN" ? "super-admin" : user?.role.toLowerCase()}/dashboard`,
      );
    }
  });
  
  return (
    <Layout>  
      {session ? (
        <>
          Signed in as {session.user.email}: 
          <button onClick={() => signOut()}>Log out</button>
          <Intro />
        </>
      ) : (
        <>
          Not signed in: 
          <button onClick={() => signIn()}>Log in</button>
          <Loader2 size={32} className="animate-spin text-primary" />
        </>
      )}
   </Layout>
  );
};

export default Home;