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
  //////////////////////////////////////////////////////////////////////////////////////
  // Update the continent counter on the DB
  //////////////////////////////////////////////////////////////////////////////////////
  const asianCountry = [
    'Afghanistan',
    'Armenia',
    'Azerbaijan',
    'Bahrain',
    'Bangladesh',
    'Bhutan',
    'Brunei',
    'Cambodia',
    'China',
    'Cyprus',
    'East Timor',
    'Georgia',
    'Hong Kong',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Israel',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Lebanon',
    'Macao',
    'Malaysia',
    'Maldives',
    'Mongolia',
    'Myanmar',
    'Nepal',
    'North Korea',
    'Oman',
    'Pakistan',
    'Palestine',
    'Philippines',
    'Qatar',
    'Saudi Arabia',
    'Singapore',
    'South Korea',
    'Sri Lanka',
    'Syria',
    'Tajikistan',
    'Thailand',
    'Turkey',
    'Turkmenistan',
    'United Arab Emirates',
    'Uzbekistan',
    'Vietnam',
    'Yemen',
  ];

  const europeanCountry = [
    'Albania',
    'Andorra',
    'Austria',
    'Belarus',
    'Belgium',
    'Bosnia and Herzegovina',
    'Bulgaria',
    'Croatia',
    'Czech Republic',
    'Denmark',
    'England',
    'Estonia',
    'Faroe Islands',
    'Finland',
    'France',
    'Germany',
    'Gibraltar',
    'Greece',
    'Holy See (Vatican City State)',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Latvia',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'North Macedonia',
    'Malta',
    'Moldova',
    'Monaco',
    'Montenegro',
    'Netherlands',
    'Northern Ireland',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Russian Federation',
    'San Marino',
    'Scotland',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Svalbard and Jan Mayen',
    'Sweden',
    'Switzerland',
    'Ukraine',
    'United Kingdom',
    'Wales',
  ];

  const africanCountry = [
    'Algeria',
    'Angola',
    'Benin',
    'Botswana',
    'British Indian Ocean Territory',
    'Burkina Faso',
    'Burundi',
    'Cameroon',
    'Cape Verde',
    'Central African Republic',
    'Chad',
    'Comoros',
    'Congo',
    'Djibouti',
    'Egypt',
    'Equatorial Guinea',
    'Eritrea',
    'Ethiopia',
    'Gabon',
    'Gambia',
    'Ghana',
    'Guinea',
    'Guinea-Bissau',
    'Ivory Coast',
    'Kenya',
    'Lesotho',
    'Liberia',
    'Libyan Arab Jamahiriya',
    'Madagascar',
    'Malawi',
    'Mali',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Niger',
    'Nigeria',
    'Reunion',
    'Rwanda',
    'Saint Helena',
    'Sao Tome and Principe',
    'Senegal',
    'Seychelles',
    'Sierra Leone',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Sudan',
    'Swaziland',
    'Tanzania',
    'The Democratic Republic of Congo',
    'Togo',
    'Tunisia',
    'Uganda',
    'Western Sahara',
    'Zambia',
    'Zimbabwe',
  ];

  const oceanianCountry = [
    'American Samoa',
    'Australia',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Cook Islands',
    'Fiji Islands',
    'French Polynesia',
    'Guam',
    'Kiribati',
    'Marshall Islands',
    'Micronesia, Federated States of',
    'Nauru',
    'New Caledonia',
    'New Zealand',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands',
    'Palau',
    'Papua New Guinea',
    'Pitcairn',
    'Samoa',
    'Solomon Islands',
    'Tokelau',
    'Tonga',
    'Tuvalu',
    'United States Minor Outlying Islands',
    'Vanuatu',
    'Wallis and Futuna',
  ];

  const southAmericanCountry = [
    'Argentina',
    'Bolivia',
    'Brazil',
    'Chile',
    'Colombia',
    'Ecuador',
    'Falkland Islands',
    'French Guiana',
    'Guyana',
    'Paraguay',
    'Peru',
    'Suriname',
    'Uruguay',
    'Venezuela',
  ];

  const northAmericanCountry = [
    'Anguilla',
    'Antigua and Barbuda',
    'Aruba',
    'Bahamas',
    'Barbados',
    'Belize',
    'Bermuda',
    'Canada',
    'Cayman Islands',
    'Costa Rica',
    'Cuba',
    'Dominica',
    'Dominican Republic',
    'El Salvador',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guatemala',
    'Haiti',
    'Honduras',
    'Jamaica',
    'Martinique',
    'Mexico',
    'Montserrat',
    'Netherlands Antilles',
    'Nicaragua',
    'Panama',
    'Puerto Rico',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Trinidad and Tobago',
    'Turks and Caicos Islands',
    'United States',
    'Virgin Islands, British',
    'Virgin Islands, U.S.',
  ];

  async function getContinentCounter() {
    let visitedCountries = [];
    let asianCounter = 0;
    let africaCounter = 0;
    let europeCounter = 0;
    let oceaniaCounter = 0;
    let northAmericaCounter = 0;
    let southAmericaCounter = 0;

    let asia;
    let africa;
    let europe;
    let oceania;
    let northAmerica;
    let southAmerica;

    let data = await db
      .collection('users')
      .doc(uid)
      .collection('places_visited')
      .get();
    let docs = data.docs;
    docs.forEach((el) => visitedCountries.push(el.data().country));

    for (let i = 0; i < visitedCountries.length; i++) {
      if (asianCountry.includes(visitedCountries[i])) {
        asianCounter += 1;
      }
      if (africanCountry.includes(visitedCountries[i])) {
        africaCounter += 1;
      }
      if (europeanCountry.includes(visitedCountries[i])) {
        europeCounter += 1;
      }
      if (oceanianCountry.includes(visitedCountries[i])) {
        oceaniaCounter += 1;
      }
      if (northAmericanCountry.includes(visitedCountries[i])) {
        northAmericaCounter += 1;
      }
      if (southAmericanCountry.includes(visitedCountries[i])) {
        southAmericaCounter += 1;
      }
    }

    async function getCounterFromDB() {
      let data = await db
        .collection('users')
        .doc(uid)
        .get()
        .then((docRef) => {
          asia = docRef.data().asia;
          africa = docRef.data().africa;
          europe = docRef.data().europe;
          oceania = docRef.data().oceania;
          northAmerica = docRef.data().north_america;
          southAmerica = docRef.data().south_america;
        })
        .catch((error) => {});

      if (asianCounter != asia) {
        db.collection('users').doc(uid).update({
          asia: asianCounter,
        });
      }
      if (africaCounter != africa) {
        db.collection('users').doc(uid).update({
          africa: africaCounter,
        });
      }
      if (europeCounter != europe) {
        db.collection('users').doc(uid).update({
          europe: europeCounter,
        });
      }
      if (oceaniaCounter != oceania) {
        db.collection('users').doc(uid).update({
          oceania: oceaniaCounter,
        });
      }
      if (northAmericaCounter != northAmerica) {
        db.collection('users').doc(uid).update({
          north_america: northAmericaCounter,
        });
      }
      if (southAmericaCounter != southAmerica) {
        db.collection('users').doc(uid).update({
          south_america: southAmericaCounter,
        });
      }
    }
    //getCounterFromDB()
  }
  //getContinentCounter(uid)
  //////////////////////////////////////////////////////////////////////////////////////////

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
    <>
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
      <br></br>
      <Link href='/add_timeline'>Add a Trip to Your Timeline</Link>
      <br></br>
      <Link href='explore'>Start a Random Adventure</Link>
    </>
  );
}