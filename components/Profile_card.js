import React, { useEffect } from 'react';
import { AppContext } from './Layout';
import { useRouter } from 'next/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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
  const { Uid, Display_name } = React.useContext(AppContext);
  const [display_name, setDisplay_name] = Display_name;
  const [uid, setUid] = Uid;
  const card_country = props.profileCard.country;
  const card_city = props.profileCard.city;
  const card_image_url = props.profileCard.image_url.replace(
    'crop=400px:400px&quality=75',
    'crop=1920px:1080px&quality=75'
  );
  const card_start_date = props.profileCard.start_date;
  const card_end_date = props.profileCard.end_date;
  const doc_id = props.profileCard.docid;
  const [highlight, setHighlight] = React.useState('');
  const friendId = props.friendId;
  const [comment, setComment] = React.useState('');
  const [madeComments, setMadeComments] = React.useState([]);
  const [uploadedImages, setUploadedImages] = React.useState([]);
  const [cardImage, setCardImage] = React.useState(card_image_url);
  props.profileCard['uid'] = uid;

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
  async function get_made_comments() {
    let data = await db
      .collection('users')
      .doc(uid)
      .collection('places_visited')
      .doc(doc_id)
      .collection('comments')
      .orderBy('time_stamp')
      .get();
    let docs = data.docs;
    setMadeComments(docs);
    //   let docs = data.docs;
    //   for (const doc of docs) {
    //   setMadeComments([...madeComments, doc.data()]);
    // }
  }

  async function getUploadedImages() {
    //get all previously uploaded images
    const docRef = await db
      .collection('users')
      .doc(uid)
      .collection('places_visited')
      .doc(doc_id);

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const picArray = doc.data().pictures;
          if (picArray) setUploadedImages(picArray);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  const handleClick = () => {
    router.push({
      pathname: '/timeline_actions',
      query: { data: JSON.stringify(props.profileCard) },
    });
  };

  const handleImageClick = (event) => {
    setCardImage(event.target.dataset.fsrc);
  };

  useEffect(() => {
    getHigh();
    get_made_comments();
    getUploadedImages();
  }, []);

  async function handleComment(event) {
    setComment(event.target.value);
    if (event.key === 'Enter') {
      const docRef = await db
        .collection('users')
        .doc(uid)
        .collection('places_visited')
        .doc(doc_id)
        .collection('comments')
        .add({
          comment: comment,
          display_name: display_name,
          time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      //setMadeComments([...madeComments, { comment: comment, display_name: display_name, time_stamp: firebase.firestore.FieldValue.serverTimestamp() }]);
    }
  }

  return (
    <>
      <Grid item xs={0.5}></Grid>
      <Grid item xs={5}>
        <Paper
          elevation={3}
          className={'profile_card'}
          owner={uid}
          docid={props.profileCard.docid}
          onClick={handleClick}
        >
          <div className='img-hover-zoom'>
            <img src={cardImage} className='timeline_img' />
          </div>
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
      <Grid item xs={3}>
        <ImageList
          sx={{ width: 500, height: 550 }}
          variant='quilted'
          cols={4}
          rowHeight={164}
        >
          {uploadedImages.map((item, index) => (
            <ImageListItem key={index} onClick={handleImageClick}>
              <img
                src={`https://wheretonexts3bucket.s3.ap-northeast-1.amazonaws.com/${item}?w=164&h=164&fit=crop&auto=format`}
                data-fsrc={`https://wheretonexts3bucket.s3.ap-northeast-1.amazonaws.com/${item}`}
                alt={item.title}
                loading='lazy'
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
      <Grid item xs={3}>
        <div owner={uid}>{highlight}</div>
        {madeComments.length > 0 &&
          madeComments.map((doc) => (
            <div>
              <div key={doc.id}>
                {' '}
                {doc.data().display_name} : {doc.data().comment}
              </div>
              {/* <div key={doc.id}> {doc.display_name} : {doc.comment}</div> */}
            </div>
          ))}
        <input
          onChange={handleComment}
          onKeyDown={handleComment}
          placeholder='commment here'
        ></input>
      </Grid>
      <Grid item xs={0.5}></Grid>
    </>
  );
}
