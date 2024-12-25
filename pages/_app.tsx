import '../styles/Layout.module.css'
import '../styles/global.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from "react"; 
import { ThemeContext, DrawerContext } from '../context'; 

function App({ Component, pageProps }: AppProps) { 

  const [content, setContent] = useState(null);
  const [style, setStyle] = useState("light");
  const [visible, setVisible] = useState(false);

  function updateContent(value) { 
    setContent(value);
  }
  function toggleStyle() {
    setStyle(style => (style === "light" ? "dark" : "light"));
  }
  function toggleVisible() {
    console.log(visible)
    setVisible(!visible);
    console.log(visible)
  }

  return (
      <ThemeContext.Provider
        value={{ style, toggleStyle }}
      >
        <DrawerContext.Provider
          value={{ content, visible, updateContent, toggleVisible }}
        >
          <Component {...pageProps} />
        </DrawerContext.Provider> 
      </ThemeContext.Provider> 
  );
}

export default App;