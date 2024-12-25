import '../styles/Layout.module.css'
import '../styles/global.css'
import type { AppProps } from 'next/app'
import { useEffect, useMemo, useState } from "react"; 
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
    <ThemeContext.Provider value={themeContextValue}>
      <ModalContext.Provider value={modalContextValue}>
        <DrawerContext.Provider value={drawerContextValue}>
          <Component {...pageProps} />
        </DrawerContext.Provider>
      </ModalContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;