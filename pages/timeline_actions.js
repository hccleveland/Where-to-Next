import React, { useState, useEffect, useContext } from 'react';
import aws from './api/uploadS3';
import { AppContext } from '../components/Layout';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import UploadedImage from '../components/UploadedImage';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import { Button, TextField, Box } from '@mui/material';

// Firebase + Firestore Config
var config = {
  //apiKey: 
  //authDomain:
  //projectId:
  //storageBucket:
  //messagingSenderId:
  //appId:
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
    setMessage('Uploading...');

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
    <div className='timeline-actions-container'>
      <Box id='highlight-container'>
        <TextField
          id='timeline-actions-highlight'
          variant='standard'
          onChange={handleHighlightChange}
          onKeyDown={handleHighlightChange}
          defaultValue={highlight}
          placeholder='Input your highlight'
        />
      </Box>
      <Grid item xs={12}>
        <ImageList
          sx={{ width: 1000, height: 1000 }}
          variant='quilted'
          cols={4}
          rowHeight={200}
        >
          {queryData.picArray &&
            queryData.picArray.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  // AWS S3 Bucket Sourcing
                  //src={`  AWS URL  /${item}?w=164&h=164&fit=crop&auto=format`}
                  //data-fsrc={` AWS URL /${item}`}
                  alt={item.title}
                  loading='lazy'
                />
              </ImageListItem>
            ))}
        </ImageList>
      </Grid>
      <p style={{ color: 'red' }}>{error}</p>
      <Button
        variant='contained'
        color='warning'
        id='upload-file-button'
        size='lg'
        component='label'
      >
        Upload File
        <input type='file' hidden onChange={(e) => storeFile(e)} />
      </Button>
    </div>
  );
}
