import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '../components/Layout';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

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
import { start } from '@popperjs/core';
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
  const coordinateToPlace = [];
  let data = await db.collection('places_went').get();
  let docs = data.docs;
  docs.forEach((ele) => {

    if(ele.data()['coordinates']){
      const lat = ele.data()['coordinates'][1];
      const lng = ele.data()['coordinates'][0];
      const city = ele.data()['city'];
      const counter = ele.data()['counter'];
      coordinateToPlace.push({
        lat: lat,
        lng: lng,
        city: city,
        counter: counter,
      });
    }
    
  });

  return { props: { data: coordinateToPlace } };
}

export default function Home({ data }) {
  const { Uid } = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const router = useRouter();
  const [oneWay, setOneWay] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid('');
      }
    });
  });

  useEffect(() => {
    require('airport-autocomplete-js/dist/index.browser.min.js');
    const $ = require('jquery/dist/jquery.js');

    const options = {
      fuse_options: {
        shouldSort: true,
        threshold: 0.4,
        maxPatternLength: 32,
        keys: [
          {
            name: 'IATA',
            weight: 0.25,
          },
          {
            name: 'name',
            weight: 0.25,
          },
          {
            name: 'city',
            weight: 0.5,
          },
        ],
      },

      formatting: `<div class="$(unique-result)"
        single-result"
        data-index="$(i)">
        $(name) $(IATA) - $(city) ,$(country)</div>`,
    };

    AirportInput('origin', options);
  }, []);

  const formatDate = (date) => {
    let aDate = new Date(date);
    aDate.setDate(aDate.getDate() + 1);
    return aDate.toISOString().slice(0, 10);
  };

  const handleSearch = () => {
    let origin = document.querySelector('#origin').value;
    const domestic = document.querySelector('#domestic').checked;
    const oneway = document.querySelector('#oneWay').checked;
    const budget = document.querySelector('#budget').value;

    origin = origin.split(' ')[0];

    const data = {
      origin: origin,
      domestic: domestic,
      oneWay: oneWay,
      budget: budget,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };

    router.push({
      pathname: '/results',
      query: { data: JSON.stringify(data) },
    });
  };

  return (
    <div>
      <input type='text' id='origin' placeholder='From' />
      <input type='text' id='budget' placeholder='Budget' />
      <input type='checkbox' id='domestic' name='domestic' />
      <label htmlFor='domestic'>Domestic</label>
      <DatePicker onChange={setStartDate} />
      {!oneWay && <DatePicker onChange={setEndDate} />}
      <input
        type='checkbox'
        id='oneWay'
        name='oneWay'
        checked={oneWay}
        onChange={() => setOneWay(!oneWay)}
      />
      <label htmlFor='oneWay'>One Way</label>
      <br />
      <button
        type='button'
        className='btn btn-primary btn-lg'
        onClick={handleSearch}
      >
        Search
      </button>

      <DynamicMap index={data} road={'/'}></DynamicMap>
    </div>
  );
}
