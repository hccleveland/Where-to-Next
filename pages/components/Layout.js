import Footer from './Footer';
import Navbar from './Navbar';
import { createContext, useState } from 'react';

const AppContext = createContext();

const Layout = ({ children }) => {
  const [email, setEmail] = useState('');
  const [airport, setAirport] = useState('');
  const [display_name, setDisplay_name] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [uid, setUid] = useState('');


  return (
    <AppContext.Provider
      value={{
        Email: [email, setEmail],
        Airport: [airport, setAirport],
        Display_name: [display_name, setDisplay_name],
        First_name: [first_name, setFirst_name],
        Last_name: [last_name, setLast_name],
        Uid: [uid, setUid],
      }}
      <Navbar />
      {children}
      <Footer />
    </AppContext.Provider>
  );
};

export default Layout;
export { AppContext };
