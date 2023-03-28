import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useEffect } from 'react';

import Container from '@mui/material/Container';
import './styles.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname.startsWith('/friend/')) {
    const friend = router.pathname.replace('/friend/', '');
    return (
      <Layout>
        <Container>
          <Component {...pageProps} friend={friend} />
        </Container>
      </Layout>
    );
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Layout>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Layout>
    </LocalizationProvider>
  );
}
