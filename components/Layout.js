import Footer from './Footer';
import Navbar from './Navbar';
import { createContext, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
const AppContext = createContext();

const clientSideEmotionCache = createEmotionCache();

const Layout = ({ children}, props) => {
  const {emotionCache = clientSideEmotionCache} = props;
  const [email, setEmail] = useState('');
  const [airport, setAirport] = useState('');
  const [display_name, setDisplay_name] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [uid, setUid] = useState('');


  return (
    <CacheProvider value={emotionCache}>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppContext.Provider
      value={{
        Email: [email, setEmail],
        Airport: [airport, setAirport],
        Display_name: [display_name, setDisplay_name],
        First_name: [first_name, setFirst_name],
        Last_name: [last_name, setLast_name],
        Uid: [uid, setUid],
      }}>
      <Navbar />
      {children}
      <Footer />
    </AppContext.Provider>
    </ThemeProvider>
    </CacheProvider>
  );
};

export default Layout;
export { AppContext };
