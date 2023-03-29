import React, { useEffect, useState } from 'react';
import { AppContext } from './Layout';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
const axios = require('axios');

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

export default function ResultCard(props) {
  const { Uid } = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const [cheapestFlights, setCheapestFlights] = useState([]);

  let originIata = props.city['originIata'];
  let countryNameEnglish = props.city['countryNameEnglish'];
  let countryId = props.city['countryId'];
  let countryImageUrl = props.city['countryImageUrl'];
  let cityName = props.city['cityName'].replace(
    'crop=400px:400px&quality=75',
    'crop=1920px:1080px&quality=75'
  );
  let imageUrl = props.city['imageUrl'].replace(
    'crop=400px:400px&quality=75',
    'crop=1920px:1080px&quality=75'
  );
  let price = props.city['price'];
  let startDate = props.city['startDate'];
  let endDate = props.city['endDate'];
  let coordinates = props.city['coordinates'];
  let oneWay = props.city['oneWay'];

  const getCheapestFlights = async () => {
    if (cheapestFlights.length > 0) return;

    //get all airports to that city first
    //get cheapest flight to those airports

    const cityAirports = [];
    const cheapestFlightsAirportArr = [];
    const airportOptions = {
      method: 'GET',
      url: 'https://skyscanner44.p.rapidapi.com/autocomplete',
      params: { query: cityName },
      headers: {
        'X-RapidAPI-Key': 'e77ffff0afmshcda39cd1eba7b9cp119345jsna1e0f891f377',
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
      },
    };

    await axios
      .request(airportOptions)
      .then(function (response) {
        // 0: {iata_code: 'PTYA', name: 'Panama City', city: 'Panama City', country: 'Panama'}
        for (let airport of response.data) {
          cityAirports.push(airport);
        }
      })
      .catch(function (error) {
        console.error(error);
      });

    if (cityAirports[0]['iata_code'].length === 4) cityAirports.splice(1);

    //loop through airports and get the cheapest flights for those
    for (let airport of cityAirports) {
      let bestFlightsOptions;
      if (!oneWay) {
        bestFlightsOptions = {
          method: 'GET',
          url: 'https://skyscanner44.p.rapidapi.com/search',
          params: {
            adults: '1',
            origin: originIata.toLowerCase(),
            destination: airport['iata_code'].toLowerCase(),
            departureDate: startDate,
            returnDate: endDate,
            currency: 'USD',
          },
          headers: {
            'X-RapidAPI-Key':
              'e77ffff0afmshcda39cd1eba7b9cp119345jsna1e0f891f377',
            'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
          },
        };
      } else {
        bestFlightsOptions = {
          method: 'GET',
          url: 'https://skyscanner44.p.rapidapi.com/search',
          params: {
            adults: '1',
            origin: originIata.toLowerCase(),
            destination: airport['iata_code'].toLowerCase(),
            departureDate: startDate,
            currency: 'USD',
          },
          headers: {
            'X-RapidAPI-Key':
              'e77ffff0afmshcda39cd1eba7b9cp119345jsna1e0f891f377',
            'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
          },
        };
      }

      await axios
        .request(bestFlightsOptions)
        .then(function (response) {
          const bucketArr = response.data.itineraries.buckets;
          for (let bucket of bucketArr) {
            if ((bucket.id = 'Cheapest')) {
              bucket['destinationIata'] = airport['iata_code'];
              bucket['name'] = airport['name'];
              // cheapestFlightsAirportArr.push(bucket);
              setCheapestFlights([...cheapestFlights, bucket]);
              break;
            }
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    // if (uid) {
    //   await db.collection('users').doc(uid).collection('places_visited').add({
    //     country: countryNameEnglish,
    //     country_id: countryId,
    //     city: cityName,
    //     coordinates: coordinates,
    //     image_url: imageUrl,
    //     start_date: startDate,
    //     end_date: endDate,
    //   });

    //increment counter OR all entire city
    // let data = await db
    //   .collection('places_went')
    //   .where('country', '==', countryNameEnglish)
    //   .where('city', '==', cityName)
    //   .limit(1)
    //   .get();

    // if (data.docs[0]) {
    //   await db
    //     .collection('places_went')
    //     .doc(data.docs[0].ref.id)
    //     .update({ counter: firebase.firestore.FieldValue.increment(1) });
    // } else {
    //   await db.collection('places_went').add({
    //     country: countryNameEnglish,
    //     country_id: countryId,
    //     city: cityName,
    //     coordinates: coordinates,
    //     image_url: imageUrl,
    //     counter: 1,
    //   });
    // }
    // }
  };
  const convertDate = (date) => {
    if (!date) return '';

    const dateArr = date.split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];

    const convertedD = new Date(year, month, day).toDateString();
    const convertedDArr = convertedD.split(' ');

    return (
      convertedDArr[0] +
      ', ' +
      convertedDArr[1] +
      ' ' +
      convertedDArr[2] +
      ' ' +
      convertedDArr[3]
    );
  };

  const addToPlacesVisited = async () => {
    await db.collection('users').doc(uid).collection('places_visited').add({
      country: countryNameEnglish,
      country_id: countryId,
      city: cityName,
      coordinates: coordinates,
      image_url: imageUrl,
      start_date: startDate,
      end_date: endDate,
    });
  };

  getCheapestFlights();

  return (
    <div className='result-card'>
      <div className='img-hover-zoom'>
        <img
          className='result-card-image'
          src={imageUrl.includes('blurry') ? countryImageUrl : imageUrl}
        ></img>
      </div>
      <div className='result-card-desc'>
        {cityName}, {countryNameEnglish}
        <br></br>
        {convertDate(startDate)} {!oneWay && ' - ' + convertDate(endDate)}
        <br></br>From ${Math.floor(price)}
      </div>
      {cheapestFlights.map((flight) => {
        return (
          <a
            key={flight.items[0].deeplink}
            onClick={addToPlacesVisited}
            href={flight.items[0].deeplink.replace(
              'www.skyscanner.net',
              'www.skyscanner.com'
            )}
          >
            ✈️ {originIata} → {flight.destinationIata} - Link to Skyscanner
          </a>
        );
      })}
    </div>
  );
}
