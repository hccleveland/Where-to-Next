import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Timeline_card from '../../components/Timeline_card';
import Badges from '../../components/Badges';
import DynamicMap from '@/components/DynamicMap';
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

export async function getServerSideProps(context) {
  const { friend } = context.query;

  return {
    props: {
      friendId: friend,
    },
  };
}

export default function Friend({ friendId }) {
  const [coord, setCoord] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [counters, setCounters] = useState({});

  async function getCooridnates() {
    const coordinateToPlace = [];
    let data = await db
      .collection('users')
      .doc(friendId)
      .collection('places_visited')
      .get();
    let docs = data.docs;
    docs.forEach((ele) => {
      const lat = ele.data()['coordinates'][1];
      const lng = ele.data()['coordinates'][0];

      coordinateToPlace.push({
        lat: Number(lat),
        lng: Number(lng),
        city: ele.data()['city'],
        country: ele.data()['country'],
      });
    });
    await setCoord({ coordinateToPlace });
  }

  useEffect(() => {
    async function getcoord() {
      if (friendId) {
        getCooridnates();
      }
    }
    getcoord();
  }, []);

  async function getUserPlacesVisited(uid) {
    const events = [];
    let data = await db
      .collection('users')
      .doc(friendId)
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

  useEffect(() => {
    if (friendId) {
      getUserPlacesVisited();
    }
  }, []);

  async function getCounterToTransfert() {
    let counters = {};
    let data = await db
      .collection('users')
      .doc(friendId)
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
    if (friendId) {
      getCounterToTransfert(friendId);
    }
  }, [friendId]);

  console.log(friendId);
  return (
    <div className='friends-page'>
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          {coord && (
            <DynamicMap
              index={coord.coordinateToPlace}
              road={'/friend'}
            ></DynamicMap>
          )}
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Badges index={counters}></Badges>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        {timeline.map((time, index) => (
          <Timeline_card key={index} time={time} friendId={friendId} />
        ))}
      </Grid>
    </div>
  );
}
