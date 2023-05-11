import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '../components/Layout';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './explore.module.css';
import { TextField, Button } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import { white } from '@mui/material/colors';

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import DynamicMap from '@/components/DynamicMap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { start } from '@popperjs/core';
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
const auth = getAuth();

export async function getServerSideProps() {
  const coordinateToPlace = [];
  let data = await db.collection('places_went').get();
  let docs = data.docs;
  docs.forEach((ele) => {
    if (ele.data()['coordinates']) {
      const lat = ele.data()['coordinates'][1];
      const lng = ele.data()['coordinates'][0];
      const city = ele.data()['city'];
      const counter = ele.data()['counter'];
      coordinateToPlace.push({
        lat: lat,
        lng: lng,
        city: city,
        counter: counter,
      });
    }
  });

  return { props: { data: coordinateToPlace } };
}

export default function Home({ data, data2 }) {
  const { Uid } = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const router = useRouter();
  const [oneWay, setOneWay] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [origin, setOrigin] = useState('');
  const [domestic, setDomestic] = useState(false);
  const [budget, setBudget] = useState('');

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid('');
      }
    });
  }, []);

  useEffect(() => {
    // require('airport-autocomplete-js/dist/index.browser.min.js');
    // const $ = require('jquery/dist/jquery.js');
    // const options = {
    //   fuse_options: {
    //     shouldSort: true,
    //     threshold: 0.4,
    //     maxPatternLength: 32,
    //     keys: [
    //       {
    //         name: 'IATA',
    //         weight: 0.25,
    //       },
    //       {
    //         name: 'name',
    //         weight: 0.25,
    //       },
    //       {
    //         name: 'city',
    //         weight: 0.5,
    //       },
    //     ],
    //   },
    //   formatting: `<div class="$(unique-result)"
    //     single-result"
    //     data-index="$(i)">
    //     $(name) $(IATA) - $(city) ,$(country)</div>`,
    // };
    // AirportInput('origin', options);
  }, []);

  const formatDate = (date) => {
    let aDate = new Date(date);
    aDate.setDate(aDate.getDate() + 1);
    return aDate.toISOString().slice(0, 10);
  };

  const handleSearch = () => {
    const data = {
      origin: origin,
      domestic: domestic,
      oneWay: oneWay,
      budget: budget,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };

    router.push({
      pathname: '/results',
      query: { data: JSON.stringify(data) },
    });
  };

  return (
    <div className={styles.outer_container}>
      <div className={styles.input_container}>
        <div className={styles.title} style={{ fontSize: '50px' }}>
          Find Trip
        </div>
        {/* <Grid container>
          <Grid item xs={5}> */}
        <div className={styles.input_center}>
          <div className={styles.left_input}>
            <TextField
              id='standard-basic'
              variant='outlined'
              placeholder='Flight Budget'
              required
              className={styles.budget}
              value={budget}
              onChange={handleBudgetChange}
              InputProps={{
                style: {
                  fontSize: '1rem',
                  color: 'white',
                },
              }}
            />
            <FormControlLabel
              className={styles.oneway}
              control={
                <Checkbox
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                  id='oneWay'
                  name='oneWay'
                  checked={oneWay}
                  onChange={() => setOneWay(!oneWay)}
                />
              }
              label='One Way'
            />
            {/* <input type='text' id='origin' placeholder='From' /> */}
            <TextField
              id='origin'
              variant='outlined'
              placeholder='Departing Airport'
              required
              onChange={handleOriginChange}
              className={styles.departing}
              InputProps={{
                style: {
                  fontSize: '1rem',
                  color: 'white',
                  marginTop: '2rem',
                },
              }}
            />
            <FormControlLabel
              className={styles.domestic}
              control={
                <Checkbox
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                  id='domestic'
                  name='domestic'
                  checked={domestic}
                  onChange={() => setDomestic(!domestic)}
                />
              }
              label='Domestic'
            />
          </div>
          {/* </Grid>
          <Grid item xs={5}> */}
          <div className={styles.right_input}>
            <DatePicker
              label='Start date'
              className={styles.start_date}
              onChange={setStartDate}
              sx={{
                fontSize: '1rem',
                width: '45%',
                input: { color: 'white' },
                label: { color: 'white' },
              }}
            />
            <DatePicker
              label='Return date'
              disabled={oneWay}
              className={styles.end_date}
              onChange={setEndDate}
              sx={{
                fontSize: '1rem',
                width: '45%',
                input: { color: 'white' },
                label: { color: 'white' },
              }}
            />
          </div>
        </div>

        {/* </Grid>
          <Grid item xs={2}> */}
        <div className={styles.button_input}>
          <Button
            variant='contained'
            id='search-button'
            onClick={handleSearch}
            style={{
              fontSize: '2rem',
              width: '15rem',
              height: '3rem',
            }}
          >
            Search
          </Button>
        </div>
        {/* </Grid>
        </Grid> */}
      </div>
      <div className={styles.map_container}>
        <DynamicMap index={data} road={'/'}></DynamicMap>
      </div>
    </div>
  );
}
