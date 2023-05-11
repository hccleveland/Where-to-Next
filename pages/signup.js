import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import 'firebase/compat/firestore';
import { AppContext } from '../components/Layout';
import Link from 'next/link';

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

export default function signup() {
  const { pathname } = useRouter();
  const { Email, Airport, Display_name, First_name, Last_name, Uid } =
    React.useContext(AppContext);
  const [email, setEmail] = Email;
  const [password, setPassword] = useState('');
  const [airport, setAirport] = Airport;
  const [display_name, setDisplay_name] = Display_name;
  const [first_name, setFirst_name] = First_name;
  const [last_name, setLast_name] = Last_name;
  const [uid, setUid] = Uid;
  const route = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid('');
      }
    });
  }, []);

  async function register() {
    let data = await createUserWithEmailAndPassword(auth, email, password);
    db.collection('users').doc(data.user.uid).set({
      email: email,
      airport: airport,
      display_name: display_name,
      first_name: first_name,
      last_name: last_name,
      points: 0,
      helper_points: 0,
      asia: 0,
      africa: 0,
      oceania: 0,
      europe: 0,
      north_america: 0,
      south_america: 0,
      world: 0,
    });
    await signInWithEmailAndPassword(auth, email, password);
    setUid(data.user.uid);
    route.push('/');
  }
  if (uid !== '') {
    route.push('/');
  }
  return (
    <div>
      {uid}
      <input
        name='email'
        className='email'
        placeholder='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name='password'
        className='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        name='first_name'
        className='first_name'
        placeholder='first_name'
        onChange={(e) => setFirst_name(e.target.value)}
      />
      <input
        name='last_name'
        className='last_name'
        placeholder='last_name'
        onChange={(e) => setLast_name(e.target.value)}
      />
      <input
        name='display_name'
        className='display_name'
        placeholder='display_name'
        onChange={(e) => setDisplay_name(e.target.value)}
      />
      <input
        name='airport'
        className='airport'
        placeholder='airport'
        onChange={(e) => setAirport(e.target.value)}
      />
      <button type='button' className='btn btn-dark' onClick={register}>
        Register Email
      </button>
    </div>
  );
}
