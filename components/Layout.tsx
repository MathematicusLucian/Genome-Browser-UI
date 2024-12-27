'use client'
import React, { useState, useEffect, useContext } from "react";
import { ModalContext, DrawerContext } from '../context';
import Head from 'next/head'; 
import styles from '../styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer'; 
import Modal from './Modal';
import Drawer from './Drawer';

const Layout = ({ children }) => {      
  const { modalContent, modalVisible, updateModalContent, toggleModalVisible } = useContext(
    ModalContext
  );    
  const { drawerContent, drawerVisible, updateDrawerContent, toggleDrawerVisible } = useContext(
      DrawerContext
  );   

  useEffect(() => {
    addDemoDataIfDatabaseEmpty();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Genome Browser</title>
        <meta name="description" content=""/>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>

        <Modal isOpen={modalVisible} onClose={toggleModalVisible} content={modalContent} /> 
        <Drawer isOpen={drawerVisible} onClose={toggleDrawerVisible} content={drawerContent} />

        <div className={styles.grid}>

          <Header />
          
          <div className={styles.childcontainer}> 
            {children}
          </div>

          <div className="footerwrapper">
            <Footer />
          </div>

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

export default Layout;