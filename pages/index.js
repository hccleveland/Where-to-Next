import React from 'react';
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
  const coordinateToPlace = [];
  let data = await db.collection('places_went').get();
  let docs = data.docs;
  docs.forEach((ele) => {
    console.log(ele.data().coordinates)
    const lat = ele.data()['coordinates'][0];
    const lng = ele.data()['coordinates'][1];
    const city = ele.data()['city'];
    console.log(ele.data()['city'])
    const counter = ele.data()['counter'];
    coordinateToPlace.push({ lat: lat, lng: lng , city: city, counter: counter});
    console.log(coordinateToPlace)
  });

  // let data2 = await db
  //   .collection('places_went')
  //   .where('city', '==', 'Paris')
  //   .where('country', '==', 'France')
  //   .get();
  // let docs2 = data2.docs;
  // console.log(docs2[0].data());
  // let hightlights = await db
  //   .collection('places_went')
  //   .doc(docs2[0].id)
  //   .collection('highlight')
  //   .get();
  // let hightlightdoc = hightlights.docs;
  // console.log(hightlightdoc[0].data());

  return { props: { data: coordinateToPlace } };
}

export default function Home({ data }) {
  const { Uid } =React.useContext(AppContext);
  const [uid,setUid]= Uid;
  const router = useRouter();
  useEffect(()=>{
    auth.onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid('');
      }
    })
  })

  // useEffect(() => {
  //   require('bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js');
  //   require('bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css')

  //   $('#calendar').datepicker({
  //     format: 'yyyy-mm-dd',
  //     // other options...
  //   });
  // },[])

  useEffect(() => {
    require('daterangepicker/daterangepicker.js');
    require('daterangepicker/daterangepicker.css');
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
        data-index="$(i)">
        $(name) $(IATA) - $(city) ,$(country)</div>`,
    };

    AirportInput('origin', options);

    const today = new Date();
    const minDate = today.toLocaleDateString('en-US');

    let startDate = document.querySelector('#startDate');
    let endDate = document.querySelector('#endDate');

    startDate.innerText = minDate;

    const calendar = $('#calendar').daterangepicker(
      {
        opens: 'left',
        minDate: minDate,
      },
      function (start, end, label) {
        console.log(
          'A new date selection was made: ' +
            start.format('YYYY-MM-DD') +
            ' to ' +
            end.format('YYYY-MM-DD')
        );
        startDate.innerText = start.format('YYYY-MM-DD');
        endDate.innerText = end.format('YYYY-MM-DD');
      }
    );
  }, []);

  const handleSearch = () => {
    let origin = document.querySelector('#origin').value;
    const domestic = document.querySelector('#domestic').checked;
    const oneway = document.querySelector('#oneWay').checked;
    const budget = document.querySelector('#budget').value;
    const startDate = document.querySelector('#startDate').innerText;
    const endDate = document.querySelector('#endDate').innerText;

    origin = origin.split(' ')[0];

    const data = {
      origin: origin,
      domestic: domestic,
      oneway: oneway,
      budget: budget,
      startDate: startDate,
      endDate: endDate,
    };

    router.push({
      pathname: '/results',
      query: { data: JSON.stringify(data) },
    });
  };

  return (
    <div>
      {/* <input type='text' id='origin' placeholder='NYC' /> */}
      <input type='text' id='origin' placeholder='From' />
      <input type='text' id='budget' placeholder='Budget' />
      <input type='checkbox' id='domestic' name='domestic' />
      <label htmlFor='domestic'>Domestic</label>
      <input type='text' id='calendar' />

      {/* <div className="input-group date" data-provide="datepicker">
        <input type="text" id='calendar' />
        <div className="input-group-addon">
          <span className="glyphicon glyphicon-th"></span>
        </div>
    </div> */}
      <input type='checkbox' id='oneWay' name='oneWay' />
      <label htmlFor='oneWay'>One Way</label>
      <br />
      <button
        type='button'
        className='btn btn-primary btn-lg'
        onClick={handleSearch}
      >
        Search
      </button>
      <div id='startDate' style={{ display: 'none' }}></div>
      <div id='endDate' style={{ display: 'none' }}></div>

      <DynamicMap index={data} road={"/"}></DynamicMap>
    </div>
  );
}
