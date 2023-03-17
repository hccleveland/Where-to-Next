import React, { useState } from 'react';
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

export default function signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [airport, setAirport] = useState('');
  const [display_name, setDisplay_name] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const route = useRouter();

  async function register() {
    let data = await createUserWithEmailAndPassword(auth, email, password);
    console.log(data);
    db.collection('users').doc(data.user.uid).set({
      email: email,
      airport: airport,
      display_name: display_name,
      first_name: first_name,
      last_name: last_name,
    });
    //route.push("/login");
  }
  return (
    <div>
      <input
        name='email'
        className='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name='password'
        className='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        name='first_name'
        className='first_name'
        onChange={(e) => setFirst_name(e.target.value)}
      />
      <input
        name='last_name'
        className='last_name'
        onChange={(e) => setLast_name(e.target.value)}
      />
      <input
        name='display_name'
        className='display_name'
        onChange={(e) => setDisplay_name(e.target.value)}
      />
      <input
        name='airport'
        className='airport'
        onChange={(e) => setAirport(e.target.value)}
      />
      <button onClick={register}>register email</button>
    </div>
  );
}
