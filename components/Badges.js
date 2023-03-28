import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



export default function Badges(props) {
  console.log("Badgesprops", props)


  let asiaCounter = props.index.asia;
  let imageAsia = "";
  let titleAsia = "";
  switch (true) {
    case asiaCounter >= 42:
      imageAsia = "/AsiaGold.png";
      titleAsia = "Explorator";
      break;
    case asiaCounter >= 20 && asiaCounter < 40:
      imageAsia = "/AsiaSilver.png";
      titleAsia = "Connoisseur";
      break;
    case asiaCounter >= 10 && asiaCounter < 20:
      imageAsia = "/AsiaBronze.png";
      titleAsia = "Traveler";
      break;
    case asiaCounter < 10:
      imageAsia = "/Asia.png";
      titleAsia = "Rookie";
      break;
  }

  let africaCounter = props.index.africa;
  let imageAfrica = "";
  let titleAfrica = "";
  switch (true) {
    case africaCounter >= 45:
      imageAfrica = "/AfricaGold.png";
      titleAfrica = "Explorator";
      break;
    case africaCounter >= 20 && africaCounter < 45:
      imageAfrica = "/AfricaSilver.png";
      titleAfrica = "Connoisseur";
      break;
    case africaCounter >= 10 && africaCounter < 20:
      imageAfrica = "/AfricaBronze.png";
      titleAfrica = "Traveler";
      break;
    case africaCounter < 10:
      imageAfrica = "/Africa.png";
      titleAfrica = "Rookie";
      break;
  }

  let europeCounter = props.index.europe;
  let imageEurope = "";
  let titleEurope = "";
  switch (true) {
    case europeCounter >= 40:
      imageEurope = "/EuropeGold.png";
      titleEurope = "Explorator";
      break;
    case europeCounter >= 20 && europeCounter < 40:
      imageEurope = "/EuropeSilver.png";
      titleEurope = "Connoisseur";
      break;
    case europeCounter >= 10 && europeCounter < 20:
      imageEurope = "/EuropeBronze.png";
      titleEurope = "Traveler";
      break;
    case europeCounter < 10:
      imageEurope = "/Europe.png";
      titleEurope = "Rookie";
      break;
  }

  let oceaniaCounter = props.index.oceania;
  let imageOceania = "";
  let titleOceania = "";
  switch (true) {
    case oceaniaCounter >= 20:
      imageOceania = "/OceaniaGold.png";
      titleOceania = "Explorator"
      break;
    case oceaniaCounter >= 10 && oceaniaCounter < 20:
      imageOceania = "/OceaniaSilver.png";
      titleOceania = "Connoisseur"
      break;
    case oceaniaCounter >= 5 && oceaniaCounter < 10:
      imageOceania = "/OceaniaBronze.png";
      titleOceania = "Traveler"
      break;
    case oceaniaCounter < 5:
      imageOceania = "/Oceania.png";
      titleOceania = "Rookie"
      break;
  }

  let NAmericaCounter = props.index.northAmerica;
  let imageNAmerica = "";
  let titleNAmerica = "";
  switch (true) {
    case NAmericaCounter >= 20:
      imageNAmerica = "/NAmericaGold.png";
      titleNAmerica = "Explorator"
      break;
    case NAmericaCounter >= 10 && NAmericaCounter < 20:
      imageNAmerica = "/NAmericaSilver.png";
      titleNAmerica = "Connoisseur"
      break;
    case NAmericaCounter >= 5 && NAmericaCounter < 10:
      imageNAmerica = "/NAmericaBronze.png";
      titleNAmerica = "Traveler"
      break;
    case NAmericaCounter < 5:
      imageNAmerica = "/NAmerica.png";
      titleNAmerica = "Rookie"
      break;
  }
  console.log(NAmericaCounter, imageNAmerica)

  let SAmericaCounter = props.index.southAmerica;
  let imageSAmerica = "";
  let titleSAmerica = "";
  switch (true) {
    case SAmericaCounter >= 20:
      imageSAmerica = "/SAmericaGold.png";
      titleSAmerica = "Explorator"
      break;
    case SAmericaCounter >= 10 && SAmericaCounter < 20:
      imageSAmerica = "/SAmericaSilver.png";
      titleSAmerica = "Connoisseur"
      break;
    case SAmericaCounter >= 5 && SAmericaCounter < 10:
      imageSAmerica = "/SAmericaBronze.png";
      titleSAmerica = "Traveler"
      break;
    case SAmericaCounter < 5:
      imageSAmerica = "/SAmerica.png";
      titleSAmerica = "Rookie"
      break;
  }

  let worldCounter = asiaCounter + africaCounter + europeCounter + oceaniaCounter + NAmericaCounter + SAmericaCounter;
  let imageWorld = "";
  let titleWorld = "";
  switch (true) {
    case SAmericaCounter >= 150:
      imageWorld = "/worldGold.png";
      titleWorld = "Explorator"
      break;
    case SAmericaCounter >= 50 && SAmericaCounter < 100:
      imageWorld = "/worldSilver.png";
      titleWorld = "Connoisseur"
      break;
    case SAmericaCounter >= 5 && SAmericaCounter < 50:
      imageWorld = "/worldBronze.png";
      titleWorld = "Traveler"
      break;
    case SAmericaCounter < 5:
      imageWorld = "/world.png";
      titleWorld = "Rookie"
      break;
  }

  let helperCounter = props.index.helperPoints;
  let imageHelper = "";
  let titleHelper = "";
  switch (true) {
    case SAmericaCounter >= 20000:
      imageHelper = "/helperGold.png";
      titleHelper = "Explorator"
      break;
    case SAmericaCounter >= 2000 && SAmericaCounter < 20000:
      imageHelper = "/helperSilver.png";
      titleHelper = "Connoisseur"
      break;
    case SAmericaCounter >= 200 && SAmericaCounter < 2000:
      imageHelper = "/helperBronze.png";
      titleHelper = "Traveler"
      break;
    case SAmericaCounter < 200:
      imageHelper = "/helper.png";
      titleHelper = "Rookie"
      break;
  }


  return (
    <>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={2}></Grid>
        <Grid container item xs={2}>
          <img src={imageHelper} className="medals"></img>
          <Box display="flex" width={500} height={30} alignItems="center" justifyContent="center" padding={1}>
            {titleHelper}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageWorld} className="medals"></img>
          <Box display="flex" width={500} height={30} alignItems="center" justifyContent="center" padding={1}>
            {titleWorld}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageAsia} className="medals"></img>
          <Box display="flex" width={500} height={30} alignItems="center" justifyContent="center" padding={1}>
            {titleAsia}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageAfrica} className="medals"></img>
          <Box display="flex" width={500} height={30} alignItems="center" justifyContent="center" padding={1}>
            {titleAfrica}
          </Box>
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>
      <br></br>

      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid container item xs={2}>
          <img src={imageEurope} className="medals"></img>
          <Box display="flex" width={500} height={30} alignItems="center" justifyContent="center" padding={1}>
            {titleEurope}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageOceania} className="medals"></img>
          <Box display="flex" width={500} height={30} alignItems="center" justifyContent="center" padding={1}>
            {titleOceania}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageNAmerica} className="medals"></img>
          <Box display="flex" width={500} height={30} alignItems="center" justifyContent="center" padding={1}>
            {titleNAmerica}
          </Box>
        </Grid>
        <Grid container item xs={2}>
          <img src={imageSAmerica} className="medals"></img>
          <Box display="flex" width={500} height={30} alignItems="center" justifyContent="center" padding={1}>
            {titleSAmerica}
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

    </>
  );

}