'use client'
import '../styles/global.css'
import type { AppProps } from 'next/app'
import { useEffect, useMemo, useState } from "react"; 
import Head from 'next/head'; 
import { ThemeProvider } from "../providers/theme-provider";
import { ThemeContext, DrawerContext, ModalContext } from '../context'; 

function App({ Component, pageProps }: AppProps) { 

  const [drawerContent, setDrawerContent] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [style, setStyle] = useState("light");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function updateDrawerContent(value) { 
    setDrawerContent(value);
  }
  function updateModalContent(value) { 
    setModalContent(value);
  }
  function toggleTheme() {
    setStyle(style => (style === "light" ? "dark" : "light"));
  }
  function toggleDrawerVisible() {
    setDrawerVisible(!drawerVisible);
  }
  function toggleModalVisible() {
    setModalVisible(!modalVisible);
  }


  const themeContextValue = useMemo(() => ({
    style,
    toggleTheme,
  }), [style]);

  const drawerContextValue = useMemo(() => ({
    drawerContent,
    drawerVisible,
    updateDrawerContent,
    toggleDrawerVisible,
  }), [drawerContent, drawerVisible]);

  const modalContextValue = useMemo(() => ({
    modalContent,
    modalVisible,
    updateModalContent,
    toggleModalVisible,
  }), [modalContent, modalVisible]);

  return (
    <>
      {/* <html lang="en" suppressHydrationWarning> */}
      <Head>
        <title>Genome Browser</title>
        <meta name="description" content=""/>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <ThemeContext.Provider value={themeContextValue}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalContext.Provider value={modalContextValue}>
            <DrawerContext.Provider value={drawerContextValue}>
              <Component {...pageProps} />
            </DrawerContext.Provider>
          </ModalContext.Provider>

        </ThemeProvider>
      </ThemeContext.Provider>
      {/* </html> */}
    </>
  );
}

export default App;