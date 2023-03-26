import React from 'react';
import ResultCard from '../components/ResultCard';
import axios from 'axios';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import DynamicMap from '@/components/DynamicMap';
const iatadata = require('airport-iata-codes');
import citiesJSON from '../data/cities.json';

const MAX_RESULTS = 1;

export async function getServerSideProps({ query }) {
  const countries = [];
  let cities = [];

  const queryData = JSON.parse(query.data);
  const domestic = queryData.domestic;

  const iataorigin = iatadata(queryData.origin);
  const country_id = iataorigin[0].country_id;

  if (queryData.oneWay);
  queryData.endDate = null;

  if (domestic) {
    cities = await getDomesticFlights(queryData, country_id);
    return { props: { cities } };
  }

  const countriesOptions = {
    method: 'GET',
    url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlightEverywhere',
    params: {
      origin: queryData.origin,
      anytime: 'false',
      oneWay: queryData.oneWay,
      travelDate: queryData.startDate,
      returnDate: queryData.endDate,
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

  if (!countriesArray) return { props: { cities: [] } };

  let maxNumberOfCountries = countriesArray.length - 1;
  let budget = queryData.budget || 2000;
  //pick 5 random countries - max tries 20x
  for (let i = 0; i < 20; i++) {
    if (countries.length >= MAX_RESULTS) break;
    populateSearchResults(
      countries,
      countriesArray,
      maxNumberOfCountries,
      budget
    );
  }

  for (let countryObj of countries) {
    const citiesOptions = {
      method: 'GET',
      url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlightEverywhereDetails',
      params: {
        origin: queryData.origin,
        CountryId: countryObj.countryId,
        anytime: 'false',
        oneWay: queryData.oneWay,
        travelDate: queryData.startDate,
        returnDate: queryData.endDate,
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
    let city = {};
    if (resCities.data.data) {
      let data;
      while (!data) {
        data =
          resCities.data.data[getRandomInt(resCities.data.data.length - 1)];
        if (data['price'] > budget) data = null;
      }
      // let data = resCities.data.data[0];
      const coordinates = await getGeocode(
        data['title'],
        countryObj.countryNameEnglish
      );
      city['countryNameEnglish'] = countryObj.countryNameEnglish;
      city['countryId'] = countryObj.countryId;
      city['countryImageUrl'] = countryObj.countryImageUrl;
      city['imageUrl'] = data['imageUrl'];
      city['price'] = data['price'];
      city['name'] = data['title'];
      city['startDate'] = queryData.startDate;
      if (!queryData.oneWay) city['endDate'] = queryData.endDate;
      city['coordinates'] = coordinates;
      //do not add duplicates
      let citiesPtr = 0;
      for (citiesPtr = 0; citiesPtr < cities.length; ++citiesPtr) {
        if (cities[citiesPtr]['name'] === city['name']) break;
      }
      if (citiesPtr >= cities.length) cities.push(city);
    }
  }

  return { props: { cities } };
}

const populateSearchResults = (
  countries,
  countriesArray,
  maxNumberOfCountries,
  budget
) => {
  for (let i = 0; i < MAX_RESULTS; i++) {
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
    if (price <= budget) {
      countries.push(result);
    }
  }
};

const getDomesticFlights = async (queryData, country_id) => {
  let domesticCountry;
  for (let country of citiesJSON) {
    for (let key in country) {
      if (key === 'countryId' && country[key] === country_id) {
        domesticCountry = country;
      }
    }
  }

  const citiesOptions = {
    method: 'GET',
    url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlightEverywhereDetails',
    params: {
      origin: queryData.origin,
      CountryId: country_id,
      anytime: 'false',
      oneWay: queryData.oneWay,
      travelDate: queryData.startDate,
      returnDate: queryData.endDate,
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
  let cities = [];
  if (resCities.data.data) {
    for (let i = 0; i < MAX_RESULTS && i < resCities.data.data.length; i++) {
      let data = resCities.data.data[i];
      const coordinates = await getGeocode(
        data['title'],
        domesticCountry.countryNameEnglish
      );
      let city = {};
      city['countryNameEnglish'] = domesticCountry.countryNameEnglish;
      city['countryId'] = domesticCountry.countryId;
      city['countryImageUrl'] = domesticCountry.countryImageUrl;
      city['imageUrl'] = data['imageUrl'];
      city['price'] = data['price'];
      city['name'] = data['title'];
      city['startDate'] = queryData.startDate;
      if (!queryData.oneWay) city['endDate'] = queryData.endDate;
      city['coordinates'] = coordinates;
      if (city['price'] < queryData.budget) cities.push(city);
    }
  }
  return cities;
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const getGeocode = async (city, country) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${city}+${country}&format=geojson`
    );
    return response.data.features[0].geometry.coordinates;
  } catch (error) {
    console.error(error);
  }
};

export default function Result({ cities }) {
  const router = useRouter();

  if (!cities)
    return <div>No matches found! Recheck your search criteria.</div>;

  return (
    <div>
      {cities.map((city) => (
        <ResultCard key={city} city={city} />
      ))}

      <DynamicMap index={cities} road={'/results'}></DynamicMap>

      {/* <ResultCard />
      <ResultCard />
      <ResultCard />
      <ResultCard />
      <ResultCard /> */}
    </div>
  );
}
