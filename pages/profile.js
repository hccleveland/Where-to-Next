import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AppContext } from '../components/Layout';
import Timeline_card from '../components/Timeline_card';
import DynamicMap from '@/components/DynamicMap';
import NoSSR from 'react-no-ssr';
import { getCookieParser } from 'next/dist/server/api-utils';
import { getAuth } from 'firebase/auth';

import Grid from '@mui/material/Grid';

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
  const [timeline, setTimeline] = useState([]);
  const [test, setTest] = useState(false);
  const [highlight, setHighlight] = useState('');
  const [datan, setDatan] = useState(false);

  async function getCooridnates() {
    const coordinateToPlace = [];
    let data = await db
      .collection('users')
      .doc(uid) //hardcoded because uid context
      .collection('places_visited')
      .get();
    let docs = data.docs;
    docs.forEach((ele) => {
      const lat = ele.data()['coordinates'][1];
      const lng = ele.data()['coordinates'][0];

      coordinateToPlace.push({ lat: Number(lat), lng: Number(lng) });
    });
    console.log(coordinateToPlace);
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
      setTimeline(events);
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
  }, [uid]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid('');
      }
    });
  }, [uid]);

  return (
    <NoSSR>
      <>
        {} <h1>{display_name}</h1>
        {datan && (
          <DynamicMap
            index={datan.coordinateToPlace}
            road={'/profile'}
          ></DynamicMap>
        )}
        <br></br>
        <Grid container spacing={2}>
          {timeline.map((time, index) => (
            <div onClick={showInput}>
              <Timeline_card
                key={index}
                time={time}
                test={test}
                highlight={setHighlight}
                send={sendTheHightlight}
              />
            </div>
          ))}
        </Grid>
      </>
    </NoSSR>
  );
}
