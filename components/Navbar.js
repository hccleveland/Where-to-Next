import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import 'firebase/compat/firestore';
import Link from 'next/link';
import { AppContext } from './Layout';
import { Button } from '@mui/material';
import { ShoppingBagRounded } from '@mui/icons-material';
import { useRouter } from 'next/router';

// Firebase + Firestore Config
var config = {
  //apiKey: 
  //authDomain:
  //projectId:
  //storageBucket:
  //messagingSenderId:
  //appId:
};

firebase.initializeApp(config);
const db = firebase.firestore();
const auth = getAuth();

export default function Navbar() {
  const router = useRouter();
  const { Uid, Display_name } = React.useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [display_name, setDisplay_name] = Display_name;
  const [uid, setUid] = Uid;

  async function getUserDisplayName(uid) {
    
    let data = await db.collection('users').where('__name__', '==', uid).get();
    let docs = data.docs;
  
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
    router.push('/');
    
  }
  useEffect(()=>{
    auth.onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
        getUserDisplayName(user.uid);
      } else {
        setUid('');
      }
    })
  },[uid]);

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
           <Button variant="text" startIcon={<ShoppingBagRounded/>}onClick={login}>login</Button>
        </div>
        <Link href='/signup'>Sign-Up</Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link href='/profile'>{display_name}</Link>
        <Link href='/'>Index</Link>
        <Button variant="outlined" onClick={logout}>Logout</Button>
      </div>
    );
  }
}
