import React, {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {AppContext} from '../../components/Layout';
import Timeline_card from '../../components/Timeline_card';
import DynamicMap from '@/components/DynamicMap';
import NoSSR from 'react-no-ssr';
import { getCookieParser } from 'next/dist/server/api-utils';
import Layout from "../../components/Layout";

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

  async function getCooridnates() {
    const coordinateToPlace = [];
    let data = await db
      .collection("users")
      .doc(friendId)  
      .collection('places_visited').get();
    let docs = data.docs;
    docs.forEach((ele) => {
      const lat = ele.data()['coordinates'][1];
      const lng = ele.data()['coordinates'][0];
  
      coordinateToPlace.push({ lat: Number(lat), lng: Number(lng) });
    });
    console.log(coordinateToPlace);
    await setCoord({coordinateToPlace});
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
      event["docid"] = doc.id;
      events.push(event);
      setTimeline(events);
    }

  }

  useEffect(() => {
    if (friendId) {
      getUserPlacesVisited();
    }
  }, []);


  return (
    <Layout>
      <p>This is the page of {friendId}!</p>
      {coord && <DynamicMap index={coord.coordinateToPlace} road={"/friend"} ></DynamicMap>}
      {timeline.map((time) => (
        <Timeline_card key={time} time={time} />
      ))}
    </Layout>
  );
}