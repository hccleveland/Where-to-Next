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

export default function Timeline_card(props) {
  const router = useRouter();
  const { Uid,Display_name } = React.useContext(AppContext);
  const [display_name, setDisplay_name] = Display_name;
  const [uid, setUid] = Uid;
  const card_country = props.time.country;
  const card_city = props.time.city;
  const card_image_url = props.time.image_url.replace(
    'crop=400px:400px&quality=75',
    'crop=1920px:1080px&quality=75'
  );
  const card_start_date = props.time.start_date;
  const card_end_date = props.time.end_date;
  const doc_id = props.time.docid;
  const [highlight, setHighlight] = React.useState('');
  const friendId = props.friendId;
  const [madeComments, setMadeComments] = React.useState('');
  const [comment, setComment] = React.useState('');

  props.time['uid'] = uid;

  async function getHigh() {
    let data = await db
      .collection('users')
      .doc(friendId)
      .collection('places_visited')
      .where('city', '==', card_city)
      .where('country', '==', card_country)
      .get();
    let docs = data.docs;
    if (docs[0] && docs[0].data().Highlight) {
      setHighlight(docs[0].data().Highlight);
    }
  }
  async function get_made_comments() {
    let data = await db
      .collection('users')
      .doc(friendId)
      .collection('places_visited')
      .doc(doc_id)
      .collection('comments').orderBy('time_stamp')
      .get();
    let docs = data.docs;
    setMadeComments(docs);
  }
  async function handleComment(event) {
    setComment(event.target.value);
    if (event.key === 'Enter') {
      const docRef = await db
        .collection('users')
        .doc(friendId)
        .collection('places_visited')
        .doc(doc_id)
        .collection('comments')

      .add({ comment: comment, display_name: display_name, time_stamp: firebase.firestore.FieldValue.serverTimestamp() });
    }
  }

  useEffect(() => {
    getHigh();
    get_made_comments()
  }, []);

  const handleClick = () => {
    router.push({
      pathname: '/timeline_actions',
      query: { data: JSON.stringify(props.time) },
    });
  };

  return (
    <>
      <Grid item xs={6}>
        <Paper
          elevation={3}
          className={'timeline_card'}
          owner={props.friendId}
          docid={props.time.docid}
          onClick={handleClick}
        >
          <div className='img-hover-zoom'>
            <img src={card_image_url} className='timeline_img' />
          </div>
          <Box padding={1}>
            <Typography variant='h6' component='h2'>
              <div
                className='timeline_location'
                owner={props.friendId}
                docid={props.time.docid}
              >
                {card_city}, {card_country}
              </div>
            </Typography>
            <Typography variant='subtitle1' component='p'>
              <span
                className='timeline_dates'
                owner={props.friendId}
                docid={props.time.docid}
              >
                Visited : {card_start_date} {card_end_date}
              </span>
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
      <div owner={uid}>{highlight}</div>
        {madeComments.length > 0 && (
                  madeComments.map((doc) => (
                    <div>
                    <div key={doc.id}> {doc.data().display_name} : {doc.data().comment}</div>
                    </div>
                  ))
                )}
        <input onChange={handleComment} onKeyDown={handleComment} placeholder='commment here'></input>
      </Grid>
    </>
  );
}
