'use client'
import { useEffect, useMemo, useState } from "react"; 
import type { AppProps } from 'next/app'
import Head from 'next/head'; 
import AppContentWrapper from './LayoutWrapper';
import { ThemeProvider } from "../providers/ThemeProvider";
import StoreProvider from "../providers/StoreProvider";
import { DrawerContext, ModalContext } from '../context'; 
import '../styles/global.css'

function App({ 
  Component, 
  pageProps: { session, ...pageProps },
 }: AppProps) { 

  const [drawerTitle, setDrawerTitle] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [style, setStyle] = useState("light");

  function updateDrawerTitle(value) { 
    setDrawerTitle(value);
  }
  function updateDrawerContent(value) { 
    setDrawerContent(value);
  }
  function toggleDrawerVisible() {
    setDrawerVisible(!drawerVisible);
  }
   function updateModalTitle(value) {
    setModalTitle(value);
  }
  function updateModalContent(value) { 
    setModalContent(value);
  }
  function toggleModalVisible() {
    setModalVisible(!modalVisible);
  }
  function toggleTheme() {
    setStyle(style => (style === "light" ? "dark" : "light"));
    // also, update ag-grid styles
  }

  const themeContextValue = useMemo(() => ({
    style,
    toggleTheme,
  }), [style]);

  const drawerContextValue = useMemo(() => ({
    drawerTitle,
    drawerContent,
    drawerVisible,
    updateDrawerTitle,
    updateDrawerContent,
    toggleDrawerVisible,
  }), [drawerContent, drawerVisible]);

  const modalContextValue = useMemo(() => ({
    modalTitle,
    modalContent,
    modalVisible,
    updateModalTitle,
    updateModalContent,
    toggleModalVisible,
  }), [modalContent, modalVisible]);

  return (
    <>
      {/* <html lang="en" suppressHydrationWarning> */}
      {/* <body className={"antialiased"}></body> */}
      <Head>
        <title>Genome Browser</title>
        <meta name="description" content=""/>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

        {/* <GlobalProvider> */}
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModalContext.Provider value={modalContextValue}>
              <DrawerContext.Provider value={drawerContextValue}> 
                <AppContentWrapper session={session}>
                  <Component {...pageProps} /> 
                </AppContentWrapper>
              </DrawerContext.Provider>
            </ModalContext.Provider>

          </ThemeProvider>
        </StoreProvider>
        {/* </GlobalProvider> */}

      {/* </body> */}
      {/* </html> */}
    </>
  );
}

export default App;