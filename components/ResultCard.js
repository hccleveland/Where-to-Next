import React, { useState } from 'react';
import { AppContext } from './Layout';
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

export default function ResultCard(props) {
  const { Uid } = React.useContext(AppContext);
  const [uid, setUid] = Uid;

  let countryNameEnglish = props.city['countryNameEnglish'];
  let countryId = props.city['countryId'];
  let countryImageUrl = props.city['countryImageUrl'];
  let name = props.city['name'];
  let imageUrl = props.city['imageUrl'];
  let price = props.city['price'];
  let startDate = props.city['startDate'];
  let endDate = props.city['endDate'];
  let coordinates = props.city['coordinates'];

  const handleImageClick = async () => {
    await db
      .collection('users')
      .doc(uid)
      .collection('places_visited')
      .add({
        country: countryNameEnglish,
        country_id: countryId,
        city: name,
        coordinates: coordinates,
        image_url: imageUrl,
        start_date: convertDate(startDate),
        end_date: convertDate(endDate),
      });

    //increment counter OR all entire city
    let data = await db
      .collection('places_went')
      .where('country', '==', countryNameEnglish)
      .where('city', '==', name)
      .limit(1)
      .get();

    if (data.docs[0]) {
      await db
        .collection('places_went')
        .doc(data.docs[0].ref.id)
        .update({ counter: firebase.firestore.FieldValue.increment(1) });
    } else {
      await db.collection('places_went').add({
        city: name,
        country: countryNameEnglish,
        coordinates: coordinates,
        counter: 1,
      });
    }
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

  return (
    <div className='result-card'>
      <img
        className='result-card-image'
        src={imageUrl}
        onClick={handleImageClick}
      ></img>
      <div className='result-card-desc'>
        {name}, {countryNameEnglish}
        <br></br>
        {startDate} {endDate && '-' + endDate}
        <br></br>${Math.floor(price)}
      </div>
    </div>

    // <div className='result-card'>
    //   <img
    //     className='result-card-image'
    //     onClick={handleImageClick}
    //     src={
    //       'https://content.skyscnr.com/53628704cd04914234be0037f639b2f7/GettyImages-476817068.jpg?crop=400px:400px&quality=75'
    //     }
    //   ></img>
    //   <div className='result-card-desc'>
    //     city, country
    //     <br></br>
    //     Mon, Jan 01 - Sun, Jan 07
    //     <br></br>
    //     $100
    //   </div>
    // </div>
  );
}
