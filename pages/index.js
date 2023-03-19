import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const DynamicMap = dynamic(() => import('./components/Highlight_map'), {
  ssr: false,
});

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

export async function getServerSideProps() {
  const coordinateToPlace = [];
  let data = await db.collection('places_went').get();
  let docs = data.docs;
  docs.forEach((ele) => {
    const lat = ele.data()['coordinate']['_lat'];
    const lng = ele.data()['coordinate']['_long'];

    coordinateToPlace.push({ lat: lat, lng: lng });
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
  const router = useRouter();

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
    const $ = require('jquery/dist/jquery.js');

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
    const origin = document.querySelector('#origin').value;
    const domestic = document.querySelector('#domestic').checked;
    const oneway = document.querySelector('#oneWay').checked;
    const budget = document.querySelector('#budget').value;
    const startDate = document.querySelector('#startDate').innerText;
    const endDate = document.querySelector('#endDate').innerText;

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
      <input type='text' id='origin' placeholder='NYC' />
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

      <DynamicMap index={data}></DynamicMap>
    </div>
  );
}
