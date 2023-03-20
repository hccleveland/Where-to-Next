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
import { AppContext } from './components/Layout';
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

export default function signup() {
  const { Email, Airport, Display_name, First_name, Last_name } =
    React.useContext(AppContext);
  const [email, setEmail] = Email;
  const [password, setPassword] = useState('');
  const [airport, setAirport] = Airport;
  const [display_name, setDisplay_name] = Display_name;
  const [first_name, setFirst_name] = First_name;
  const [last_name, setLast_name] = Last_name;
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
