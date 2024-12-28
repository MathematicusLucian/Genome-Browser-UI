'use client'
import React, { useState, useEffect, useContext } from "react";
import { ModalContext, DrawerContext } from '../context';
import styles from '../styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer'; 
import Modal from './Modal';
import Drawer from './Drawer';
import { addDemoDataIfDatabaseTablesEmpty } from "@/database/db";

const RootLayout = ({ children }) => {      
  const { modalContent, modalVisible, updateModalContent, toggleModalVisible } = useContext(
    ModalContext
  );    
  const { drawerContent, drawerVisible, updateDrawerContent, toggleDrawerVisible } = useContext(
      DrawerContext
  );   

  useEffect(() => {
    addDemoDataIfDatabaseTablesEmpty();
  }, []);

  return (
    <div className="flex flex-col h-screen p-0 m-0 top-0">

      <div className="w-full text-center border-b border-grey p-4 sticky top-0">
        <Header />
      </div>

      <main className="flex flex-col flex-1 h-screen overflow-y-scroll bg-slate-100 dark:bg-zinc-950 text-zinc-950 dark:text-white pt-100 ">

        <Modal isOpen={modalVisible} onClose={toggleModalVisible} content={modalContent} /> 
        <Drawer isOpen={drawerVisible} onClose={toggleDrawerVisible} content={drawerContent} />

        <div className="p-0 m-0 flex flex-col flex-1 flex-grow w-full">
          {children}
        </div>

        <div className="w-full bg-zinc-200 dark:bg-zinc-950 text-center border-t border-grey p-4 sticky m-0 bottom-0 z-index-9999">
          <Footer />
        </div>

      </main>
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
};

export default RootLayout;