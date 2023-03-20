import 'bootstrap/dist/css/bootstrap.css';
import Layout from './components/Layout';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.js');
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
