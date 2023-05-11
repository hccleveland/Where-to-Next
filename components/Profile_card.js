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
import { TextField } from '@material-ui/core';

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
    };
  }

  return (
    <>
      <Grid container className='card-container'>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={5} className='card-left-border'>
          <Paper
            elevation={3}
            className={'profile_card'}
            owner={uid}
            docid={props.profileCard.docid}
            onClick={handleClick}
          >
            <Typography variant='h6' component='h2'>
              <span
                className='timeline_location background'
                owner={uid}
                docid={props.profileCard.docid}
              >
                {card_city}, {card_country}
              </span>
            </Typography>
            <div className='img-hover-zoom background'>
              <img
                src={cardImage}
                className='timeline_img'
                style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
              />
            </div>
            <Box>
              <Typography variant='subtitle1' component='p'>
                <span
                  className='timeline_dates background'
                  owner={uid}
                  docid={props.profileCard.docid}
                >
                  {card_start_date} <br></br>
                  {card_end_date}
                </span>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={3}
          paddingTop={4}
          paddingLeft={1.5}
          paddingRight={1.5}
          className='background card-left-border'
        >
          <ImageList
            sx={{ width: '100%', height: '30rem' }}
            variant='quilted'
            cols={4}
            rowHeight={164}
          >
            {uploadedImages.map((item, index) => (
              <ImageListItem
                key={index}
                className='image-list-item'
                onClick={handleImageClick}
              >
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
        <Grid item xs={3} className='background card-right-border'>
          <div owner={uid} className='highlight-with-comments'>
            {highlight}
          </div>
          {madeComments.length > 0 &&
            madeComments.map((doc) => (
              <div className='comments'>
                <div key={doc.id}>
                  {' '}
                  {doc.data().display_name} : {doc.data().comment}
                </div>
                {/* <div key={doc.id}> {doc.display_name} : {doc.comment}</div> */}
              </div>
            ))}
          <TextField
            id='standard-basic'
            variant='outlined'
            placeholder='comment here'
            className='comment-input'
            onChange={handleComment}
            onKeyDown={handleComment}
            InputProps={{
              style: {
                marginLeft: '1rem',
                marginTop: '2rem',
                fontSize: '1.5rem',
                width: '25rem',
              },
            }}
          />
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Grid>
    </>
  );
}
