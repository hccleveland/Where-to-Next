
import React, {useState} from 'react';
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
var config = {
    apiKey: "AIzaSyCChl_1U6qI2je2kdt4FVTvboLFcIecjgE",
    authDomain: "where-to-next-7bc5f.firebaseapp.com",
    projectId: "where-to-next-7bc5f",
    storageBucket: "where-to-next-7bc5f.appspot.com",
    messagingSenderId: "873346829271",
    appId: "1:873346829271:web:0f34484e5b41e6e35ed992"
  };
  firebase.initializeApp(config);
  const auth=getAuth();

export default function login() {
const [email, setEmail]=useState('');
const [password, setPassword]=useState('');
function register(){
    signInWithEmailAndPassword(auth, email, password).then((user) => {
        // Signed in 
        console.log(user);

  })
  }

  return (
    <div>
    <input name='email' className='email' onChange={(e)=>setEmail(e.target.value)}/>
    <input type='password' name='password' className='password' onChange={(e)=>setPassword(e.target.value)}/>
    <button onClick={register}>login</button>
  </div>
  )
}
