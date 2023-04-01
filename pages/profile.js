import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AppContext } from '../components/Layout';
import Timeline_card from '../components/Timeline_card';
import Badges from '../components/Badges';
import DynamicMap from '@/components/DynamicMap';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Profile_card from '@/components/Profile_card';

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

export default function profile() {
  const { Uid, Display_name } = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const [display_name, setDisplay_name] = Display_name;
  const [profileCards, setProfileCards] = useState([]);
  const [test, setTest] = useState(false);
  const [highlight, setHighlight] = useState('');
  const [datan, setDatan] = useState(false);
  const [counters, setCounters] = useState({});

  async function getCooridnates() {
    const coordinateToPlace = [];
    let data = await db
      .collection('users')
      .doc(uid)
      .collection('places_visited')
      .get();
    let docs = data.docs;
    docs.forEach((ele) => {
      const lat = ele.data()['coordinates'][1];
      const lng = ele.data()['coordinates'][0];

      coordinateToPlace.push({ lat: Number(lat), lng: Number(lng) });
    });

    await setDatan({ coordinateToPlace });
  }

  async function getUserPlacesVisited(uid) {
    const events = [];
    let data = await db
      .collection('users')
      .doc(uid)
      .collection('places_visited')
      .get();
    let docs = data.docs;

    for (const doc of docs) {
      const event = {};
      event['country'] = doc.data().country;
      event['city'] = doc.data().city;
      event['image_url'] = doc.data().image_url;
      event['start_date'] = doc.data().start_date;
      event['end_date'] = doc.data().end_date;
      event['coordinates'] = doc.data().coordinates;
      event['docid'] = doc.id;
      events.push(event);
      setProfileCards(events);
    }
  }

  function showInput(event) {
    setTest(true);
  }

  function sendTheHightlight(event) {
    if (event.key === 'Enter') {
      db.collection('users')
        .doc(event.target.getAttribute('owner'))
        .collection('places_visited')
        .doc(event.target.getAttribute('docid'))
        .update({ Highlight: highlight });
    }
  }

  useEffect(() => {
    if (uid) {
      getUserPlacesVisited(uid);
    }
  }, [uid]);

  useEffect(() => {
    async function getcoord() {
      if (uid) {
        getCooridnates(uid);
      }
    }
    getcoord();
  }, []);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid('');
      }
    });
  }, [uid]);

  async function getCounterToTransfert() {
    let counters = {};
    let data = await db
      .collection('users')
      .doc(uid)
      .get()
      .then((docRef) => {
        counters = {
          asia: docRef.data().asia,
          africa: docRef.data().africa,
          europe: docRef.data().europe,
          oceania: docRef.data().oceania,
          northAmerica: docRef.data().north_america,
          southAmerica: docRef.data().south_america,
          world: docRef.data().world,
          helperPoints: docRef.data().helper_points,
        };
      })
      .catch((error) => {});
    setCounters(counters);
  }

  useEffect(() => {
    if (uid) {
      getCounterToTransfert(uid);
    }
  }, [uid]);

  return (
    <div className='profile-page'>
      <h1>{display_name}'s Map</h1>
      {datan && (
        <DynamicMap
          index={datan.coordinateToPlace}
          road={'/profile'}
        ></DynamicMap>
      )}
      <br></br>
      <h2>{display_name}'s Timeline</h2>
      <br></br>
      <Grid container spacing={2}>
        <Badges index={counters}></Badges>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        {profileCards.map((pcard, index) => (
          <Profile_card
            key={index}
            profileCard={pcard}
            test={test}
            highlight={setHighlight}
            send={sendTheHightlight}
          />
        ))}
      </Grid>
    </div>
  );
}
