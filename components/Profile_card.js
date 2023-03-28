import React, { useEffect } from 'react';
import { AppContext } from './Layout';
import { useRouter } from 'next/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

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

export default function Profile_card(props) {
  const router = useRouter();
  const { Uid } = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const card_country = props.profileCard.country;
  const card_city = props.profileCard.city;
  const card_image_url = props.profileCard.image_url;
  const card_start_date = props.profileCard.start_date;
  const card_end_date = props.profileCard.end_date;
  const doc_id = props.profileCard.docid;
  const [highlight, setHighlight] = React.useState('');
  const friendId = props.friendId;

  async function getHigh() {
    let data = await db
      .collection('users')
      .doc(uid)
      .collection('places_visited')
      .where('city', '==', card_city)
      .where('country', '==', card_country)
      .get();
    let docs = data.docs;
    if (docs[0] && docs[0].data().Highlight) {
      setHighlight(docs[0].data().Highlight);
    }
  }

  useEffect(() => {
    getHigh();
  }, []);

  const handleClick = () => {
    router.push({
      pathname: '/timeline_actions',
      query: { data: JSON.stringify(props.profileCard) },
    });
  };

  return (
    <>
      <Grid item xs={6}>
        <Paper
          elevation={3}
          className={'profile_card'}
          owner={uid}
          docid={props.profileCard.docid}
          onClick={handleClick}
        >
          <img src={card_image_url} className='timeline_img' />
          <Box padding={1}>
            <Typography variant='h6' component='h2'>
              <div
                className='timeline_location'
                owner={uid}
                docid={props.profileCard.docid}
              >
                {card_city}, {card_country}
              </div>
            </Typography>
            <Typography variant='subtitle1' component='p'>
              <div
                className='timeline_dates'
                owner={uid}
                docid={props.profileCard.docid}
              >
                Visited : {card_start_date} {card_end_date}
              </div>
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <div owner={uid}>{highlight}</div>
        <input placeholder='commment here'></input>
      </Grid>
    </>
  );
}
