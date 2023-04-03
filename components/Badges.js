import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function Badges(props) {

  let asiaCounter = props.index.asia;
  let imageAsia = '';
  let titleAsia = '';
  switch (true) {
    case asiaCounter >= 42:
      imageAsia = '/asia3.png';
      titleAsia = 'Explorator';
      break;
    case asiaCounter >= 20 && asiaCounter < 42:
      imageAsia = '/asia2.png';
      titleAsia = 'Connoisseur';
      break;
    case asiaCounter >= 10 && asiaCounter < 20:
      imageAsia = '/asia1.png';
      titleAsia = 'Traveler';
      break;
    case asiaCounter < 10:
      imageAsia = '/asia0.png';
      titleAsia = 'Rookie';
      break;
  }

  let africaCounter = props.index.africa;
  let imageAfrica = '';
  let titleAfrica = '';
  switch (true) {
    case africaCounter >= 50:
      imageAfrica = '/africa3.png';
      titleAfrica = 'Explorator';
      break;
    case africaCounter >= 25 && africaCounter < 50:
      imageAfrica = '/africa2.png';
      titleAfrica = 'Connoisseur';
      break;
    case africaCounter >= 10 && africaCounter < 25:
      imageAfrica = '/africa1.png';
      titleAfrica = 'Traveler';
      break;
    case africaCounter < 10:
      imageAfrica = '/africa0.png';
      titleAfrica = 'Rookie';
      break;
  }

  let europeCounter = props.index.europe;
  let imageEurope = '';
  let titleEurope = '';
  switch (true) {
    case europeCounter >= 40:
      imageEurope = '/europe3.png';
      titleEurope = 'Explorator';
      break;
    case europeCounter >= 20 && europeCounter < 40:
      imageEurope = '/europe2.png';
      titleEurope = 'Connoisseur';
      break;
    case europeCounter >= 10 && europeCounter < 20:
      imageEurope = '/europe1.png';
      titleEurope = 'Traveler';
      break;
    case europeCounter < 10:
      imageEurope = '/europe0.png';
      titleEurope = 'Rookie';
      break;
  }

  let oceaniaCounter = props.index.oceania;
  let imageOceania = '';
  let titleOceania = '';
  switch (true) {
    case oceaniaCounter >= 12:
      imageOceania = '/oceania3.png';
      titleOceania = 'Explorator';
      break;
    case oceaniaCounter >= 6 && oceaniaCounter < 12:
      imageOceania = '/oceania2.png';
      titleOceania = 'Connoisseur';
      break;
    case oceaniaCounter >= 3 && oceaniaCounter < 6:
      imageOceania = '/oceania1.png';
      titleOceania = 'Traveler';
      break;
    case oceaniaCounter < 3:
      imageOceania = '/oceania0.png';
      titleOceania = 'Rookie';
      break;
  }

  let NAmericaCounter = props.index.northAmerica;
  let imageNAmerica = '';
  let titleNAmerica = '';
  switch (true) {
    case NAmericaCounter >= 20:
      imageNAmerica = '/namerica3.png';
      titleNAmerica = 'Explorator';
      break;
    case NAmericaCounter >= 10 && NAmericaCounter < 20:
      imageNAmerica = '/namerica2.png';
      titleNAmerica = 'Connoisseur';
      break;
    case NAmericaCounter >= 5 && NAmericaCounter < 10:
      imageNAmerica = '/namerica1.png';
      titleNAmerica = 'Traveler';
      break;
    case NAmericaCounter < 5:
      imageNAmerica = '/namerica0.png';
      titleNAmerica = 'Rookie';
      break;
  }
 

  let SAmericaCounter = props.index.southAmerica;
  let imageSAmerica = '';
  let titleSAmerica = '';
  switch (true) {
    case SAmericaCounter >= 10:
      imageSAmerica = '/samerica3.png';
      titleSAmerica = 'Explorator';
      break;
    case SAmericaCounter >= 6 && SAmericaCounter < 10:
      imageSAmerica = '/samerica2.png';
      titleSAmerica = 'Connoisseur';
      break;
    case SAmericaCounter >= 3 && SAmericaCounter < 6:
      imageSAmerica = '/samerica1.png';
      titleSAmerica = 'Traveler';
      break;
    case SAmericaCounter < 3:
      imageSAmerica = '/samerica0.png';
      titleSAmerica = 'Rookie';
      break;
  }

  let worldCounter =
    asiaCounter +
    africaCounter +
    europeCounter +
    oceaniaCounter +
    NAmericaCounter +
    SAmericaCounter;
  let imageWorld = '';
  let titleWorld = '';
  switch (true) {
    case worldCounter >= 150:
      imageWorld = '/world3.png';
      titleWorld = 'Explorator';
      break;
    case worldCounter >= 50 && worldCounter < 100:
      imageWorld = '/world2.png';
      titleWorld = 'Connoisseur';
      break;
    case worldCounter >= 5 && worldCounter < 50:
      imageWorld = '/world1.png';
      titleWorld = 'Traveler';
      break;
    case worldCounter < 5:
      imageWorld = '/world0.png';
      titleWorld = 'Rookie';
      break;
  }

  let helperCounter = props.index.helperPoints;
  let imageHelper = '';
  let titleHelper = '';
  switch (true) {
    case helperCounter >= 20000:
      imageHelper = '/helper3.png';
      titleHelper = 'Explorator';
      break;
    case helperCounter >= 2000 && helperCounter < 20000:
      imageHelper = '/helper2.png';
      titleHelper = 'Connoisseur';
      break;
    case helperCounter >= 200 && helperCounter < 2000:
      imageHelper = '/helper1.png';
      titleHelper = 'Traveler';
      break;
    case helperCounter < 200:
      imageHelper = '/helper0.png';
      titleHelper = 'Rookie';
      break;
  }

  return (
    <>
      <Grid container spacing={2} justify='center' alignItems='center'>
        <Grid item xs={2}></Grid>
        <Grid container item xs={2}>
          <img src={imageHelper} className='medals'></img>
          <Box
            display='flex'
            width={500}
            height={30}
            alignItems='center'
            justifyContent='center'
            padding={1}
          >
            {titleHelper}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageWorld} className='medals'></img>
          <Box
            display='flex'
            width={500}
            height={30}
            alignItems='center'
            justifyContent='center'
            padding={1}
          >
            {titleWorld}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageAsia} className='medals'></img>
          <Box
            display='flex'
            width={500}
            height={30}
            alignItems='center'
            justifyContent='center'
            padding={1}
          >
            {titleAsia}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageAfrica} className='medals'></img>
          <Box
            display='flex'
            width={500}
            height={30}
            alignItems='center'
            justifyContent='center'
            padding={1}
          >
            {titleAfrica}
          </Box>
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>
      <br></br>

      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid container item xs={2}>
          <img src={imageEurope} className='medals'></img>
          <Box
            display='flex'
            width={500}
            height={30}
            alignItems='center'
            justifyContent='center'
            padding={1}
          >
            {titleEurope}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageOceania} className='medals'></img>
          <Box
            display='flex'
            width={500}
            height={30}
            alignItems='center'
            justifyContent='center'
            padding={1}
          >
            {titleOceania}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageNAmerica} className='medals'></img>
          <Box
            display='flex'
            width={500}
            height={30}
            alignItems='center'
            justifyContent='center'
            padding={1}
          >
            {titleNAmerica}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageSAmerica} className='medals'></img>
          <Box
            display='flex'
            width={500}
            height={30}
            alignItems='center'
            justifyContent='center'
            padding={1}
          >
            {titleSAmerica}
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}
