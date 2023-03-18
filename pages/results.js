import React from 'react';
import ResultCard from './components/ResultCard';
import axios from 'axios';

const countries = [];
const cities = [];

export async function getServerSideProps() {
  const countriesOptions = {
    method: 'GET',
    url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlightEverywhere',
    params: {
      origin: 'JFK',
      anytime: 'false',
      oneWay: 'false',
      travelDate: '2023-03-21',
      returnDate: '2023-03-25',
      currency: 'USD',
      countryCode: 'US',
      market: 'en-US',
    },
    headers: {
      'X-RapidAPI-Key': 'e77ffff0afmshcda39cd1eba7b9cp119345jsna1e0f891f377',
      'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com',
    },
  };

  const resCountries = await axios.request(countriesOptions);
  const countriesArray = resCountries.data.data;
  let maxNumberOfCountries = countriesArray.length - 1;
  let budget = 2000;
  //pick 5 random countries - max tries 20x
  for (let i = 0; i < 20; i++) {
    if (countries.length >= 3) break;
    populateSearchResults(countriesArray, maxNumberOfCountries, budget);
  }

  for (let countryObj of countries) {
    const citiesOptions = {
      method: 'GET',
      url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlightEverywhereDetails',
      params: {
        origin: 'JFK',
        CountryId: countryObj.countryId,
        anytime: 'false',
        oneWay: 'false',
        travelDate: '2023-03-21',
        returnDate: '2023-03-25',
        currency: 'USD',
        countryCode: 'US',
        market: 'en-US',
      },
      headers: {
        'X-RapidAPI-Key': 'e77ffff0afmshcda39cd1eba7b9cp119345jsna1e0f891f377',
        'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com',
      },
    };

    const resCities = await axios.request(citiesOptions);
    const data = resCities.data.data[0];
    let city = {};
    city['countryNameEnglish'] = countryObj.countryNameEnglish;
    city['countryId'] = countryObj.countryId;
    city['countryImageUrl'] = countryObj.countryImageUrl;
    city['imageUrl'] = data['imageUrl'];
    city['price'] = data['price'];
    city['name'] = data['title'];
    cities.push(city);
  }

  return {
    props: {
      cities,
    },
  };
}

const populateSearchResults = (
  countriesArray,
  maxNumberOfCountries,
  budget
) => {
  for (let i = 0; i < 3; i++) {
    let n = getRandomInt(maxNumberOfCountries);
    let countryNameEnglish = countriesArray[n]['CountryNameEnglish'];
    let countryId = countriesArray[n]['CountryId'];
    let price = countriesArray[n]['Price'];
    let countryImageUrl = countriesArray[n]['ImageUrl'];
    let result = {
      countryNameEnglish: countryNameEnglish,
      countryId: countryId,
      price: price,
      countryImageUrl: countryImageUrl,
    };
    if (price <= budget) countries.push(result);
  }
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export default function Result({ cities }) {
  return (
    <div>
      {cities.map((city) => (
        <ResultCard city={city} />
      ))}
    </div>
  );
}
