import React, {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {AppContext} from './components/Layout';
import dynamic from 'next/dynamic';
import Timeline_card from './components/Timeline_card';

const DynamicMap = dynamic(() => import('./components/Highlight_map'), {
  ssr: false,
});

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

export default function profile() {
  const {Uid, Display_name} = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const [display_name, setDisplay_name] = Display_name;
  const [timeline, setTimeline] = useState([]);

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
      event['name_place'] = doc.data().name_place;
      event['start_date'] = doc.data().start_date;
      event['end_date'] = doc.data().end_date;
      events.push(event);
      setTimeline(events);
    }
    return {props: {events}};
  }

  useEffect(() => {
    if (uid) {
      getUserPlacesVisited(uid);
    }
  });

  return (
    <div>
      <h1>{display_name}</h1>
      {/* <DynamicMap></DynamicMap> */}
      {timeline.map((event) => (
        <Timeline_card key={event} event={event} />
      ))}
    </div>
  );
}
