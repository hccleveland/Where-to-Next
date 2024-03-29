import React from 'react';
import Ranking from '../components/Ranking';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '../components/Layout';
import dynamic from 'next/dynamic';

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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

export async function getServerSideProps() {
  let rankingAndCoord = [];
  let pointsArray = [];
  let display_nameArray = [];
  let idArray = [];
  let rankingName = [];
  let rankingId = [];
  let rankingPoint = [];
  let ranking = [];
  let data = await db.collection('users').get();
  let docs = data.docs;
  docs.forEach((ele) => {
    idArray.push(ele.id);
    display_nameArray.push(ele.data().display_name);
    pointsArray.push(ele.data().points);
  });

  for (let i = 0; i < 10; i++) {
    let highest = Math.max(...pointsArray);
    let indexOfHighest = pointsArray.indexOf(highest);
    rankingPoint.push(pointsArray.splice(indexOfHighest, 1));
    rankingName.push(display_nameArray.splice(indexOfHighest, 1));
    rankingId.push(idArray.splice(indexOfHighest, 1));
  }

  for (let i = 0; i < 10; i++) {
    let temporary_object = {
      name: rankingName[i],
      point: rankingPoint[i],
      id: rankingId[i],
    };
    ranking.push(temporary_object);
  }

  const coordinatesOfNumberOne = [];
  let resultCoordinates = await db
    .collection('users')
    .doc(rankingId[0][0])
    .collection('places_visited')
    .get();
  let documents = resultCoordinates.docs;
  documents.forEach((ele) => {
    const lat = ele.data()['coordinates'][1];
    const lng = ele.data()['coordinates'][0];

    coordinatesOfNumberOne.push({
      lat: Number(lat),
      lng: Number(lng),
      city: ele.data()['city'],
      country: ele.data()['country'],
    });
  });
  rankingAndCoord = [{ NumberOneCoord: coordinatesOfNumberOne, Rank: ranking }];

  return { props: { rankingCoord: rankingAndCoord } };
}

export default function Home({ rankingCoord }) {
  const { NumberOneCoord, Rank } = rankingCoord[0];

  return (
    <div className='index-container' style={{ backgroundColor: '#708090' }}>
      <br></br>
      <Container style={{ backgroundColor: '#708090' }}>
        <Grid container spacing={2}>
          <Grid item xs={3} style={{ backgroundColor: '#708090' }}>
            <Box padding={1}>
              <h2
                className='black-outline'
                style={{ textAlign: 'center', fontFamily: 'Ubuntu' }}
              >
                <span style={{ fontSize: '50px' }}>Ranking</span>
              </h2>
              {Rank.map((el, i) => (
                <Ranking index={el} key={i} myKey={i}></Ranking>
              ))}
            </Box>
          </Grid>
          <Grid item xs={9}>
            <div style={{ backgroundColor: '#708090', paddingBottom: '8rem' }}>
              <DynamicMap
                index={NumberOneCoord}
                road={'/'}
                style={{ innerHeight: '100%' }}
              ></DynamicMap>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
