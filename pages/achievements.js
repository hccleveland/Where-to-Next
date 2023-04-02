import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AppContext } from '../components/Layout';
import ProgressBar from "../components/ProgressBar";
import Grid from '@mui/material/Grid';

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

function Achievement() {
  const { Uid, Display_name } = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const [percent, setPercentage] = useState({});

  async function getPercentageToTransfert() {
    let counters = {};
    let data = await db
      .collection('users')
      .doc(uid)
      .get()
      .then((docRef) => {
        counters = {
          asia: docRef.data().asia,
          africa: docRef.data().africa,
          europe: docRef.data().europe,
          oceania: docRef.data().oceania,
          northAmerica: docRef.data().north_america,
          southAmerica: docRef.data().south_america,
          world: docRef.data().world,
          helperPoints: docRef.data().helper_points,
        };
      })
      .catch((error) => { });

    let asiaCounter = counters.asia;
    let asiaPercent = 0;
    switch (true) {
      case asiaCounter >= 20 && asiaCounter < 42:
        asiaPercent = ((asiaCounter - 20) / (42 - 20)) * 100;
        break;
      case asiaCounter >= 10 && asiaCounter < 20:
        asiaPercent = ((asiaCounter - 10) / (20 - 10)) * 100;
        break;
      case asiaCounter < 10:
        asiaPercent = (asiaCounter / (10)) * 100;
        break;
    }

    let africaCounter = counters.africa;
    let africaPercent = 0;
    switch (true) {
      case africaCounter >= 25 && africaCounter < 50:
        africaPercent = ((africaCounter - 25) / (50 - 25)) * 100;
        break;
      case africaCounter >= 10 && africaCounter < 25:
        africaPercent = ((africaCounter - 10) / (25 - 10)) * 100;
        break;
      case africaCounter < 10:
        africaPercent = (africaCounter / (10)) * 100;
        break;
    }

    let europeCounter = counters.europe;
    let europePercent = 0;
    switch (true) {
      case europeCounter >= 20 && europeCounter < 40:
        europePercent = ((europeCounter - 20) / (40 - 20)) * 100;
        break;
      case europeCounter >= 10 && europeCounter < 20:
        europePercent = ((europeCounter - 10) / (20 - 10)) * 100;
        break;
      case europeCounter < 10:
        europePercent = (europeCounter / (10)) * 100;
        break;
    }

    let oceaniaCounter = counters.oceania;
    let oceaniaPercent = 0;
    switch (true) {
      case oceaniaCounter >= 6 && oceaniaCounter < 12:
        oceaniaPercent = ((oceaniaCounter - 6) / (12 - 6)) * 100;
        break;
      case oceaniaCounter >= 3 && oceaniaCounter < 6:
        oceaniaPercent = ((oceaniaCounter - 3) / (6 - 3)) * 100;
        break;
      case oceaniaCounter < 3:
        oceaniaPercent = (oceaniaCounter / (3)) * 100;
        break;
    }

    let NAmericaCounter = counters.northAmerica;
    let NamericaPercent = 0;
    switch (true) {
      case NAmericaCounter >= 10 && NAmericaCounter < 20:
        NamericaPercent = ((NAmericaCounter - 10) / (20 - 10)) * 100;
        break;
      case NAmericaCounter >= 5 && NAmericaCounter < 10:
        NamericaPercent = ((NAmericaCounter - 5) / (10 - 5)) * 100;
        break;
      case NAmericaCounter < 5:
        NamericaPercent = (NAmericaCounter / (5)) * 100;
        break;
    }

    let SAmericaCounter = counters.southAmerica;
    let SamericaPercent = 0;
    switch (true) {
      case SAmericaCounter >= 6 && SAmericaCounter < 10:
        SamericaPercent = ((SAmericaCounter - 6) / (10 - 6)) * 100;
        break;
      case SAmericaCounter >= 3 && SAmericaCounter < 6:
        SamericaPercent = ((SAmericaCounter - 3) / (6 - 3)) * 100;
        break;
      case SAmericaCounter < 3:
        SamericaPercent = (SAmericaCounter / (3)) * 100;
        break;
    }

    let helperCounter = counters.helperPoints;
    let helperPercent = 0;
    switch (true) {
      case helperCounter >= 2000 && helperCounter < 20000:
        helperPercent = ((helperCounter - 2000) / (20000 - 2000)) * 100;
        break;
      case helperCounter >= 200 && helperCounter < 2000:
        helperPercent = ((helperCounter - 200) / (2000 - 200)) * 100;
        break;
      case helperCounter < 200:
        helperPercent = (helperCounter / (200)) * 100;
        break;
    }

    let worldCounter =
      asiaCounter +
      africaCounter +
      europeCounter +
      oceaniaCounter +
      NAmericaCounter +
      SAmericaCounter;
    let worldPercent = 0;
    switch (true) {
      case worldCounter >= 50 && worldCounter < 150:
        worldPercent = ((worldCounter - 50) / (150 - 50)) * 100;
        break;
      case worldCounter >= 5 && worldCounter < 50:
        worldPercent = ((worldCounter - 5) / (50 - 5)) * 100;
        break;
      case worldCounter < 5:
        worldPercent = (worldCounter / (5)) * 100;
        break;
    }



    let percent = [
      { bgcolor: "#357929", percent: Math.floor(helperPercent), point: counters.helperPoints, info: 'helper' },
      { bgcolor: "#A57929", percent: Math.floor(worldPercent), point: worldCounter, info: 'world' },
      { bgcolor: "#357929", percent: Math.floor(asiaPercent), point: counters.asia, info: 'asia' }, //Green Asia
      { bgcolor: "#CB7A43", percent: Math.floor(africaPercent), point: counters.africa, info: 'africa' }, //Orange Africa
      { bgcolor: "#5A6AB2", percent: Math.floor(europePercent), point: counters.europe, info: 'europe' }, //Blue Europe
      { bgcolor: "#c633c1", percent: Math.floor(oceaniaPercent), point: counters.oceania, info: 'oceania' }, //Purpule Oceania
      { bgcolor: "#BEA234", percent: Math.floor(NamericaPercent), point: counters.northAmerica, info: 'namerica' }, //Yellowish Nort-America
      { bgcolor: "#B2362D", percent: Math.floor(SamericaPercent), point: counters.southAmerica, info: 'samerica' }, //Red South America
    ];

    setPercentage({ percent });
  }

  useEffect(() => {
    if (uid) {
      getPercentageToTransfert(uid);
    }
  }, [uid]);


  return (
    <>
      <Grid container spacing={2} justify="center" alignItems="center" style={{ backgroundColor: "#708090" }}>
        <Grid item xs={1} >
        </Grid>
        <Grid item xs={10} >
          <div className="App">
            {percent.percent && percent.percent.length > 0 && (
              <div>
                {percent.percent.map((item, idx) => (
                  <ProgressBar
                    key={idx}
                    point={item.point}
                    bgcolor={item.bgcolor}
                    completed={item.percent}
                    info={item.info}
                  />
                ))}
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={1}>
        </Grid>
      </Grid>
    </>
  );
}

export default Achievement;

/*
  

*/