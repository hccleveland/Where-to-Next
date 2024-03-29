import React from 'react';
import axios from 'axios';
import { AppContext } from './Layout';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField, Button } from '@material-ui/core';
import styles from './AddTripCard.module.css';
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

export default function AddTripCard(props) {
  const convertDate = (date) => {
    if (!date) return '';

    const convertedD = new Date(date).toDateString();
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

  const getGeocode = async (city, country) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${city}+${country}&format=geojson`
      );
      return response.data.features[0].geometry.coordinates;
    } catch (error) {}
  };

  const { Uid, Percent } = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const [percent, setPercentage] = Percent;
  const country = props.time.country;
  const country_id = props.time.country_id;
  const city = props.time.city;
  const image_url = props.time.image_url.replace(
    'crop=400px:400px&quality=75',
    'crop=1920px:1080px&quality=75'
  );

  const start_date = convertDate(props.time.start_date);
  const end_date = convertDate(props.time.end_date);
  const route = useRouter();

  const handleTimelineSubmission = async () => {
    const foundCoordinates = await getGeocode(city, country);
    const userDBObj = {
      country: country,
      country_id: country_id,
      city: city,
      coordinates: foundCoordinates,
      image_url: image_url,
      start_date: start_date,
      end_date: end_date,
    };
    const placeDBObj = {
      country: country,
      country_id: country_id,
      city: city,
      coordinates: foundCoordinates,
      image_url: image_url,
      counter: 1,
    };

    await db
      .collection('users')
      .doc(uid)
      .collection('places_visited')
      .add(userDBObj);

    let data = await db
      .collection('places_went')
      .where('country', '==', country)
      .where('city', '==', city)
      .limit(1)
      .get();

    if (data.docs[0]) {
      await db
        .collection('places_went')
        .doc(data.docs[0].ref.id)
        .update({ counter: firebase.firestore.FieldValue.increment(1) });
    } else {
      await db.collection('places_went').add(placeDBObj);
    }
    getContinentCounter();
    // route.push('/profile');
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
    'Russia',
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
    'Greenland',
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
          points = docRef.data().points;
        })
        .catch((error) => {});

      if (asianCounter != asia) {
        db.collection('users')
          .doc(uid)
          .update({
            asia: asianCounter,
            points: thePoints + 100,
          });
        Swal.fire({
          title: `<h5 style='color:#E3D5A5; font-size:1.6rem'> You've earned 200 points for adding your trip!  </h5>`,
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
            points: thePoints + 100,
          });
        Swal.fire({
          title: `<h5 style='color:#E3D5A5; font-size:1.6rem'>  You've earned 200 points for adding your trip!  </h5>`,
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
            points: thePoints + 100,
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
            points: thePoints + 100,
          });
        Swal.fire({
          title: `<h5 style='color:#E3D5A5; font-size:1.6rem'> You've earned 200 points for adding your trip! + </h5>`,
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
            points: thePoints + 100,
          });
        Swal.fire({
          title: `<h5 style='color:#E3D5A5; font-size:1.6rem'> You've earned 200 points for adding your trip!  </h5>`,
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
            points: thePoints + 100,
          });
        Swal.fire({
          title: `<h5 style='color:#E3D5A5; font-size:1.6rem'> You've earned 200 points for adding your trip!  </h5>`,
          imageUrl: '/samericaPopup0.png',
          background: '#3A4B4B',
          showConfirmButton: false,
        });
      }
    }
    updateCounterFromDB();
  }

  ///////////////////////////////////////////////////////////////////////

  return (
    <div className={styles.add_trip_card_container}>
      <Paper elevation={3}>
        <Typography variant='h6' component='h2'>
          <span className='timeline_location background'>
            {city}, {country}
          </span>
        </Typography>
        <div className='img-hover-zoom background'>
          <img src={image_url} className='timeline_img' />
        </div>
        <Typography variant='subtitle1' component='p'>
          <span className='timeline_dates background'>
            {start_date} <br></br>
            {end_date}
          </span>
        </Typography>
        <div className={styles.button_container}>
          <Button
            variant='contained'
            id='add-button'
            onClick={handleTimelineSubmission}
            style={{
              padding: '1rem',
              fontSize: '1.5rem',
              width: '15rem',
            }}
          >
            Add Trip to Timeline
          </Button>
        </div>
      </Paper>
    </div>
  );
}
