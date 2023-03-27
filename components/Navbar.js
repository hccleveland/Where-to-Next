import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import 'firebase/compat/firestore';
import Link from 'next/link';
import { AppContext } from './Layout';

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
const auth = getAuth();

export default function Navbar() {
  const { Uid, Display_name } = React.useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [display_name, setDisplay_name] = Display_name;
  const [uid, setUid] = Uid;

  async function getUserDisplayName(uid) {
    // console.log(uid);
    let data = await db.collection('users').where('__name__', '==', uid).get();
    let docs = data.docs;
    // console.log(docs[0].data().display_name);
    setDisplay_name(docs[0].data().display_name);
    setUid(uid);
  }

  function login() {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      setUid(user.user.uid);
      getUserDisplayName(user.user.uid);
    });
  }

  function logout() {
    signOut(auth);
    setEmail('');
    setPassword('');
    setDisplay_name('');
    setUid('');
  }

  if (uid == '') {
    return (
      <div>
        <Link href='/'>Index</Link>
        <div>
          <input
            name='email'
            className='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            name='password'
            className='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </div>
        <Link href='/signup'>Sign-Up</Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link href='/profile'>{display_name}</Link>
        <Link href='/'>Index</Link>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
}
