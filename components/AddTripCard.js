import React from 'react';
import axios from 'axios';
import { AppContext } from './Layout';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useRouter } from 'next/router';

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
    } catch (error) {
      console.error(error);
    }
  };

  const { Uid } = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const country = props.time.country;
  const country_id = props.time.country_id
  const city = props.time.city;
  const image_url = props.time.image_url;
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
        end_date: end_date
    }
    const placeDBObj = {
        country: country,
        country_id: country_id,
        city: city,
        coordinates: foundCoordinates,
        image_url: image_url,
        counter: 1
    }
    
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
    route.push('/profile');
}
  
  return (
    <div
      className={'timeline_card'}
    //   owner={uid}
    //   docid={doc_id}
    //   onClick={handleClick}
    >
      <img src={image_url} />
      <div className='timeline_dates'>
        {start_date} - {end_date}
      </div>
      <div className='timeline_location'>
        {city}, {country}
      </div>
      <button
        onClick={handleTimelineSubmission}
      >Add Trip to Timeline</button>
    </div>
  );
}
