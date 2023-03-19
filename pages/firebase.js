
const firebase = require("firebase/app");
require("firebase/firestore");

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCChl_1U6qI2je2kdt4FVTvboLFcIecjgE",
    authDomain: "where-to-next-7bc5f.firebaseapp.com",
    projectId: "where-to-next-7bc5f",
    storageBucket: "where-to-next-7bc5f.appspot.com",
    messagingSenderId: "873346829271",
    appId: "1:873346829271:web:0f34484e5b41e6e35ed992"
    };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

module.exports = { firebase, db };