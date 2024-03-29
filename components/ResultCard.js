import React, { useEffect, useState } from 'react';
import { AppContext } from './Layout';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
const axios = require('axios');
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

// Firebase + Firestore Config
var config = {
  //apiKey: 
  //authDomain:
  //projectId:
  //storageBucket:
  //messagingSenderId:
  //appId:
};

firebase.initializeApp(config);
const db = firebase.firestore();

export default function ResultCard(props) {
  const { Uid } = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const [cheapestFlights, setCheapestFlights] = useState([]);
  const route = useRouter();
  const [madeHighlights, setMadeHighlights] = useState(false);
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

  async function getMadeHighlights() {
    let data = await db
      .collection('places_went')
      .where('city', '==', cityName)
      .where('country', '==', countryNameEnglish)
      .get();
    let docs = data.docs;
    setMadeHighlights(docs);
  }

  useEffect(() => {
    getMadeHighlights();
  }, []);

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
      
      // Skyscanner API Config
      headers: {
        //'X-RapidAPI-Key':
        //'X-RapidAPI-Host':
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

    if (cityAirports[0] && cityAirports[0]['iata_code'].length === 4)
      cityAirports.splice(1);

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
          
          // Skyscanner API Config
          headers: {
            //'X-RapidAPI-Key':
            //'X-RapidAPI-Host':
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
          
          // Skyscanner API Config
          headers: {
            //'X-RapidAPI-Key':
            //'X-RapidAPI-Host':
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

              setCheapestFlights([...cheapestFlights, bucket]);
              break;
            }
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  };
  const convertDate = (date) => {
    if (!date) return '';

    const dateArr = date.split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];

    const convertedD = new Date(year, parseInt(month) - 1, day).toDateString();
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
    await db
      .collection('users')
      .doc(uid)
      .collection('places_visited')
      .add({
        country: countryNameEnglish,
        country_id: countryId,
        city: cityName,
        coordinates: coordinates,
        image_url: imageUrl,
        start_date: convertDate(startDate),
        end_date: convertDate(endDate),
      });
    getContinentCounter();
    route.push('/profile');
  };

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
    let pointsdata = await db.collection('users').doc(uid).get();
    let pointsdoc = pointsdata.data().points;
    let thePoints = pointsdoc;

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

    async function updateCounterFromDB() {
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
        db.collection('users')
          .doc(uid)
          .update({
            asia: asianCounter,
            points: thePoints + 200,
          });
        Swal.fire({
          title: `<h5 style='color:#E3D5A5; font-size:1.6rem'> You've earned 200 points for adding your trip! </h5>`,
          imageUrl: '/asiaPopup0.png',
          background: '#3A4B4B',
          showConfirmButton: false,
        });
      }
      if (africaCounter != africa) {
        db.collection('users')
          .doc(uid)
          .update({
            africa: africaCounter,
            points: thePoints + 200,
          });
        Swal.fire({
          title: `<h5 style='color:#E3D5A5; font-size:1.6rem'> You've earned 200 points for adding your trip! </h5>`,
          imageUrl: '/africaPopup0.png',
          background: '#3A4B4B',
          showConfirmButton: false,
        });
      }
      if (europeCounter != europe) {
        db.collection('users')
          .doc(uid)
          .update({
            europe: europeCounter,
            points: thePoints + 200,
          });
        Swal.fire({
          title: `<h5 style='color:#E3D5A5; font-size:1.6rem'>  You've earned 200 points for adding your trip!  </h5>`,
          imageUrl: '/europePopup0.png',
          background: '#3A4B4B',
          showConfirmButton: false,
        });
      }
      if (oceaniaCounter != oceania) {
        db.collection('users')
          .doc(uid)
          .update({
            oceania: oceaniaCounter,
            points: thePoints + 200,
          });
        Swal.fire({
          title: `<h5 style='color:#E3D5A5; font-size:1.6rem'>  You've earned 200 points for adding your trip!  </h5>`,
          imageUrl: '/oceaniaPopup0.png',
          background: '#3A4B4B',
          showConfirmButton: false,
        });
      }
      if (northAmericaCounter != northAmerica) {
        db.collection('users')
          .doc(uid)
          .update({
            north_america: northAmericaCounter,
            points: thePoints + 200,
          });
        Swal.fire({
          title: `<h5 style='color:#E3D5A5; font-size:1.6rem'>  You've earned 200 points for adding your trip!  </h5>`,
          imageUrl: '/namericaPopup0.png',
          background: '#3A4B4B',
          showConfirmButton: false,
        });
      }
      if (southAmericaCounter != southAmerica) {
        db.collection('users')
          .doc(uid)
          .update({
            south_america: southAmericaCounter,
            points: thePoints + 200,
          });
        Swal.fire({
          title: `<h5 style='color:#E3D5A5; font-size:1.6rem'>  You've earned 200 points for adding your trip!  </h5>`,
          imageUrl: '/samericaPopup0.png',
          background: '#3A4B4B',
          showConfirmButton: false,
        });
      }
    }

    updateCounterFromDB();
  }

  ///////////////////////////////////////////////////////////////////////

  getCheapestFlights();

  return (
    <div className='result-card-container'>
      <Paper elevation={3}>
        <Typography variant='h6' component='h2'>
          <span className='timeline_location background'>
            {cityName}, {countryNameEnglish}
          </span>
        </Typography>
        <div className='img-hover-zoom background'>
          <img
            className='result-card-image'
            style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
            src={imageUrl.includes('blurry') ? countryImageUrl : imageUrl}
          ></img>
        </div>
        <Typography variant='subtitle1' component='p'>
          <span className='timeline_dates background'>
            {convertDate(startDate)} {!oneWay && ' - ' + convertDate(endDate)}
            <br></br>
            From ${Math.floor(price)}
          </span>
        </Typography>
        <Typography variant='subtitle1' component='p'>
          <span className='timeline_dates background'>
            {cheapestFlights.map((flight) => {
              return (
                <a
                  key={flight.items[0].deeplink}
                  onClick={addToPlacesVisited}
                  target='_blank'
                  rel='noopener noreferrer'
                  href={flight.items[0].deeplink.replace(
                    'www.skyscanner.net',
                    'www.skyscanner.com'
                  )}
                >
                  ✈️ {originIata} → {flight.destinationIata} - Link to
                  Skyscanner
                </a>
              );
            })}
          </span>
        </Typography>
      </Paper>
    </div>
  )};
