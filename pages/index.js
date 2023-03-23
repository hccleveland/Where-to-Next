import React from 'react';
import Ranking from '../components/Ranking'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '../components/Layout';
import dynamic from 'next/dynamic';

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import DynamicMap from '@/components/DynamicMap';
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
const auth = getAuth();

export async function getServerSideProps() {
    let rankingAndCoord = [];
    let pointsArray = [];
    let display_nameArray = [];
    let idArray = [];
    let rankingName =[];
    let rankingId =[];
    let rankingPoint= [];
    let data = await db.collection('users').get();
    let docs = data.docs;
    docs.forEach((ele) => {
        idArray.push(ele.id);
        display_nameArray.push(ele.data().display_name);
        pointsArray.push(ele.data().points)
    })

    for (let i = 0; i < 10; i++) {
        let highest = Math.max(...pointsArray);
        console.log(highest);
        let indexOfHighest = pointsArray.indexOf(highest);
        rankingPoint.push(pointsArray.splice(indexOfHighest,1));
        rankingName.push(display_nameArray.splice(indexOfHighest,1));
        rankingId.push(idArray.splice(indexOfHighest,1));
    }
    console.log(rankingPoint, rankingName, rankingId);

    console.log(2)
    

        const coordinatesOfNumberOne = [];
        let resultCoordinates = await db
        .collection("users")
        .doc(rankingId[0][0]) 
        .collection('places_visited').get();
        let documents = resultCoordinates.docs;
        documents.forEach((ele) => {
        const lat = ele.data()['coordinates'][1];
        const lng = ele.data()['coordinates'][0];
        
        coordinatesOfNumberOne.push({ lat: Number(lat), lng: Number(lng) });
        });
        rankingAndCoord = [[coordinatesOfNumberOne],[rankingName],[rankingPoint]];

            //await setDatan({coordinateToPlace});
    

    console.log("rankcoor",rankingAndCoord);

    



    return { props: { rankingCoord: rankingAndCoord } };
}



export default function Home({ rankingCoord }) {



    return (
    <>
    <DynamicMap index={rankingCoord} road={"/"}></DynamicMap>
    <br></br>
    <h2>Ranking</h2>
    <Ranking index={rankingCoord}></Ranking>

    </>

    );
}