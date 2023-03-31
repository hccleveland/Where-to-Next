import React, { useState, useEffect, useContext } from 'react';
import aws from './api/uploadS3';
import { AppContext } from '../components/Layout';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import UploadedImage from '../components/UploadedImage';

var fbConfig = {
  apiKey: 'AIzaSyCChl_1U6qI2je2kdt4FVTvboLFcIecjgE',
  authDomain: 'where-to-next-7bc5f.firebaseapp.com',
  projectId: 'where-to-next-7bc5f',
  storageBucket: 'where-to-next-7bc5f.appspot.com',
  messagingSenderId: '873346829271',
  appId: '1:873346829271:web:0f34484e5b41e6e35ed992',
};

firebase.initializeApp(fbConfig);
const db = firebase.firestore();

export async function getServerSideProps({ query }) {
  const queryData = JSON.parse(query.data);
  const uid = queryData.uid;
  const country = queryData.country;
  const city = queryData.city;
  const image_url = queryData.image_url;
  const start_date = queryData.start_date;
  const end_date = queryData.end_date;
  const coordinates = queryData.coordinates;
  const docid = queryData.docid;

  //get all previously uploaded images
  const docRef = await db
    .collection('users')
    .doc(uid)
    .collection('places_visited')
    .doc(docid);

  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const picArray = doc.data().pictures;
        if (doc.data().Highlight) queryData['highlight'] = doc.data().Highlight;
        if (picArray) queryData['picArray'] = picArray;
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });

  return { props: { queryData } };
}

export default function timeline_actions({ queryData }) {
  const { Email, Airport, Display_name, First_name, Last_name, Uid } =
    React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const docid = queryData.docid;
  const [file, setFile] = useState(null);
  const [error, setMessage] = useState(null);
  const [highlight, setHighlight] = useState(queryData.highlight);

  function storeFile(e) {
    setFile(e.target.files[0]);
  }

  const uploadFile = async () => {
    setMessage('uploading!');

    var returnData = await aws(file, uid, docid); //upload file

    setMessage(String(returnData));
    location.reload();

    setFile(null);
  };

  async function handleHighlightChange(event) {
    setHighlight(event.target.value);
    if (event.key === 'Enter') {
      const docRef = await db
        .collection('users')
        .doc(uid)
        .collection('places_visited')
        .doc(docid);

      docRef.update({ Highlight: highlight });
    }
  }
  useEffect(() => {
    if (file) uploadFile();
  }, [file]);

  return (
    <div>
      {queryData.picArray &&
        queryData.picArray.map((picture, index) => {
          return <UploadedImage key={index} imageUrl={picture}></UploadedImage>;
        })}
      <input
        type='text'
        onChange={handleHighlightChange}
        onKeyDown={handleHighlightChange}
        defaultValue={highlight}
      ></input>
      <p>Drag your image here or click in this area.</p>
      <p style={{ color: 'red' }}>{error}</p>
      <input type='file' onChange={(e) => storeFile(e)} />
    </div>
  );
}
