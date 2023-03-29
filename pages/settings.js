import React, { useState, useEffect } from 'react';
import { AppContext } from '../components/Layout';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

var config = {
  apiKey: 'AIzaSyCChl_1U6qI2je2kdt4FVTvboLFcIecjgE',
  authDomain: 'where-to-next-7bc5f.firebaseapp.com',
  projectId: 'where-to-next-7bc5f',
  storageBucket: 'where-to-next-7bc5f.appspot.com',
  messagingSenderId: '873346829271',
  appId: '1:873346829271:web:0f34484e5b41e6e35ed992',
};

firebase.initializeApp(config);
const db = firebase.firestore();

export default function settings() {
  const { Uid } =
    React.useContext(AppContext);
  const [displayFirstName, setDisplayFirstName] = useState('');
  const [displayLastName, setDisplayLastName] = useState('');
  const [displayDisplayName, setDisplayDisplayName] = useState('');
  const [displayAirport, setDisplayAirport] = useState('');
  // const [password, setPassword] = useState('');
  const [first_name, setFirst_name] = useState(displayFirstName);
  const [last_name, setLast_name] = useState(displayLastName)
  const [display_name, setDisplay_name] = useState(displayDisplayName);
  const [airport, setAirport] = useState(displayAirport);
  const [uid, setUid] = Uid;
  
  async function setSettingsDisplay() {
    let data = await db.collection('users').where('__name__', '==', uid).get();
    let settingsData = data.docs[0].data();
    
    setDisplayFirstName(settingsData.first_name);
    setDisplayLastName(settingsData.last_name);
    setDisplayDisplayName(settingsData.display_name);
    setDisplayAirport(settingsData.airport);
  }

  useEffect(() => {
    if(uid) {
      setSettingsDisplay();
    }
  }, [uid])

  async function updateSettings() {
    const updateDBObj = {};
    if (first_name ===  '') {
      updateDBObj['first_name'] = displayFirstName;
    } else {
      updateDBObj['first_name'] = first_name;
    }
    if (last_name ===  '') {
      updateDBObj['last_name'] = displayLastName;
    } else {
      updateDBObj['last_name'] = last_name;
    }
    if (display_name ===  '') {
      updateDBObj['display_name'] = displayDisplayName;
    } else {
      updateDBObj['display_name'] = display_name;
    }
    if (airport ===  '') {
      updateDBObj['airport'] = displayAirport;
    } else {
      updateDBObj['airport'] = airport;
    }
    
    await db
    .collection('users')
    .doc(uid)
    .update(updateDBObj);
  }

  return (
    <div>
      <br></br>
      {/* <input
        name='password'
        className='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
      /> */}
      <br></br>
      {displayFirstName}
      <br></br>
      <input
        name='first_name'
        className='first_name'
        placeholder='Update First Name'
        onChange={(e) => setFirst_name(e.target.value)}
      />
      <br></br>
      {displayLastName}
      <br></br>
      <input
        name='last_name'
        className='last_name'
        placeholder='Update Last Name'
        onChange={(e) => setLast_name(e.target.value)}
      />
      <br></br>
      {displayDisplayName}
      <br></br>
      <input
        name='display_name'
        className='display_name'
        placeholder='Update Display Name'
        onChange={(e) => setDisplay_name(e.target.value)}
      />
      <br></br>
      {displayAirport}
      <br></br>
      <input
        name='airport'
        className='airport'
        placeholder='Update Home Airport'
        onChange={(e) => setAirport(e.target.value)}
      />
      <br></br>
      <button type='button' className='btn btn-dark' onClick={updateSettings}>
        Update Settings
      </button>
    </div>
  )
}
