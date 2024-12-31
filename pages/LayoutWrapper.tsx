'use client'
import React, { useState, useEffect, useMemo, useContext } from "react";
import type { AppProps } from 'next/app'
import { useRouter } from 'next/navigation';
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react"
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import Modal from '../components/Modal';
import Drawer from '../components/Drawer';
import { Separator } from "../components/ui/separator";
import { getUserInfo } from "../services/Auth";
import { Loader2 } from "lucide-react";
import { ModalContext, DrawerContext } from '../context';

const AppContentWrapper = ({ 
  session,
  children,
 }: any) => { 

  const { modalTitle, modalContent, modalVisible, updatModalTitle, updateModalContent, toggleModalVisible } = useContext(
    ModalContext
  );    
  const { drawerTitle, drawerContent, drawerVisible, updateDrawerTitle, updateDrawerContent, toggleDrawerVisible } = useContext(
      DrawerContext
  );   

  // const router = useRouter();
  const user: any = getUserInfo();
  // const { data: session } = useSession();

  // useEffect(() => {
    //   if (!user) {
    //     router.push("/login");
    //   } else {
    //     router.push(
    //       `/${user?.role === "SUPER_ADMIN" ? "super-admin" : user?.role.toLowerCase()}/dashboard`,
    //     );
    //   }
  // });

  const FooterContent = ({}) => (<>
    <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
        <a href="/" className="text-slate-950 dark:text-slate-100 text-xs">
            Genome Browser UI, and Genome Browser API 🔬🧬
        </a> 
    </div>
    <Separator orientation="vertical" className="mr-2 h-4" />
    <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left"> 
        <strong></strong> &copy; <a
            href="https://github.com/MathematicusLucian"
            target="\_blank"
            rel="noreferrer"
            className="font-medium no-underline underline-offset-4 text-xs"
        >
            Luke Jones (github.com/MathematicusLucian)
        </a> {new Date().getFullYear()} 
    </div>
  </>);

  return (
    <div className="flex flex-col h-screen p-0 m-0 top-0">

      <Modal isOpen={modalVisible} onClose={toggleModalVisible} title={modalTitle} content={modalContent} /> 
      <Drawer isOpen={drawerVisible} onClose={toggleDrawerVisible} title={drawerTitle} content={drawerContent} />

      <SessionProvider session={session}>  
        
        <header>
          <Header session={session} />
        </header>

        <main>
          {session ? (
              <>
                  {children}
              </>
          ) : (
              <div className="w-100 text-center border-b border-grey px-14 py-8 bg-slate-100 dark:bg-gray-950">
                  <h2 className="pb-5">Please login ...</h2>
                  <button onClick={() => signIn()}>Log in</button>
                  {/* <Loader2 size={32} className="animate-spin text-primary" /> */}
              </div>
          )} 
        </main>

        <footer>
          <Footer>
            <FooterContent />
          </Footer>
        </footer>

      </SessionProvider> 

      <style jsx>{`
        main {
          padding: 2rem;
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
}

export default AppContentWrapper;