import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import 'firebase/compat/firestore';
import Link from 'next/link';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [display_name, setDisplay_name] = useState('');

  async function getUserDisplayName(uid) {
    let data = await db.collection('users').where('__name__', '==', uid).get();
    let docs = data.docs;
    setDisplay_name(docs[0].get('display_name'));
  }

  function login() {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      getUserDisplayName(user.user.uid);
    });
  }

  function logout() {
    signOut(auth);
    setEmail('');
    setPassword('');
    setDisplay_name('');
  }

  if (!display_name) {
    return (
      <>
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
      </>
    );
  } else {
    return (
      <>
        <Link href='/profile'>{display_name}</Link>
        <Link href='/'>Index</Link>
        <button onClick={logout}>Logout</button>
      </>
    );
  }
}
