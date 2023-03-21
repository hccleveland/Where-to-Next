import React from 'react';
import ResultCard from '../components/ResultCard';
import axios from 'axios';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const MAX_RESULTS = 1;

export async function getServerSideProps({ query }) {
  const countries = [];
  const cities = [];

  const queryData = JSON.parse(query.data);

  const countriesOptions = {
    method: 'GET',
    url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlightEverywhere',
    params: {
      origin: queryData.origin,
      anytime: 'false',
      oneWay: queryData.oneway,
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
        oneWay: queryData.oneway,
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
      const data = resCities.data.data[0];
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
      city['endDate'] = queryData.endDate;
      city['coordinates'] = coordinates;
      cities.push(city);
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

      {/* <DynamicMap></DynamicMap> */}

      {/* <ResultCard />
      <ResultCard />
      <ResultCard />
      <ResultCard />
      <ResultCard /> */}
    </div>
  );
}
