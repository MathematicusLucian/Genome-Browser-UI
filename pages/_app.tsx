import '../styles/Layout.module.css'
import '../styles/global.css'
import type { AppProps } from 'next/app'
import { useEffect, useMemo, useState } from "react"; 
import { ThemeContext, DrawerContext } from '../context'; 

function App({ Component, pageProps }: AppProps) { 

  const [content, setContent] = useState(null);
  const [style, setStyle] = useState("light");
  const [visible, setVisible] = useState(false);

  function updateContent(value) { 
    setContent(value);
  }
  function toggleTheme() {
    setStyle(style => (style === "light" ? "dark" : "light"));
  }
  function toggleVisible() {
    setVisible(!visible);
  }

  const themeContextValue = useMemo(() => ({
    style,
    toggleTheme,
  }), [style]);

  const drawerContextValue = useMemo(() => ({
    content,
    visible,
    updateContent,
    toggleVisible,
  }), [content, visible]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <DrawerContext.Provider value={drawerContextValue}>
        <Component {...pageProps} />
      </DrawerContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;