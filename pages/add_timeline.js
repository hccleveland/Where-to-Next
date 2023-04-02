import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import citiesJson from '../data/cities.json';
import AddTripCard from '@/components/AddTripCard';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { white } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import styles from './add_timeline.module.css';
import { TextField, Button } from '@material-ui/core';
import { style } from '@mui/system';

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

const createCountryAutoCompleteList = () => {
  const result = [];
  citiesJson.forEach((city) => {
    if (!result.includes(city.countryNameEnglish)) {
      result.push(city.countryNameEnglish);
    }
  });
  return result;
};

const createCityAutoCompleteList = () => {
  const result = [];
  citiesJson.forEach((city) => {
    if (!result.includes(city.cityName)) {
      result.push(city.cityName);
    }
  });
  return result;
};

export default function addTimeline() {
  const countryList = useState(() => createCountryAutoCompleteList());
  const cityList = useState(() => createCityAutoCompleteList());
  const [countryValue, setCountryValue] = useState('');
  const [showCountryList, setShowCountryList] = useState(false);
  const [cityValue, setCityValue] = useState('');
  const [showCityList, setShowCityList] = useState(false);
  const [oneWay, setOneWay] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchResult, setSearchResult] = useState({});
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [madeHighlights, setMadeHighlights] = useState(false);
  const countryAutoFillRef = useRef();
  const cityAutoFillRef = useRef();

  const countryAutoFill = countryList[0]
    .filter((country) =>
      country.toLowerCase().includes(countryValue.toLowerCase())
    )
    .slice(0, 5);
  const cityAutoFill = cityList[0]
    .filter((city) => city.toLowerCase().includes(cityValue.toLowerCase()))
    .slice(0, 5);

  const handleCountrySearchChange = (e) => {
    setCountryValue(e.target.value);
  };

  const handleCountryListClick = (country) => {
    setCountryValue(country);
    setShowCountryList(false);
  };

  useEffect(() => {
    const handleOutsideCountryClick = (e) => {
      if (
        countryAutoFillRef.current &&
        !countryAutoFillRef.current.contains(e.target)
      ) {
        setShowCountryList(false);
      }
    };
    document.addEventListener('click', handleOutsideCountryClick);
    return () => {
      document.removeEventListener('click', handleOutsideCountryClick);
    };
  }, []);

  const handleCitySearchChange = (e) => {
    setCityValue(e.target.value);
  };

  const handleCityListClick = (city) => {
    setCityValue(city);
    setShowCityList(false);
  };

  useEffect(() => {
    const handleOutsideCityClick = (e) => {
      if (
        cityAutoFillRef.current &&
        !cityAutoFillRef.current.contains(e.target)
      ) {
        setShowCityList(false);
      }
    };
    document.addEventListener('click', handleOutsideCityClick);
    return () => {
      document.removeEventListener('click', handleOutsideCityClick);
    };
  }, []);

  const formatDates = (date) => {
    let dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() + 1);
    return dateObj.toISOString().slice(0, 10);
  };

  const createSearchResults = async (e) => {
    e.preventDefault();
    for (const city of citiesJson) {
      if (
        city.countryNameEnglish === countryValue &&
        city.cityName === cityValue
      ) {
        if (city.cityImageUrl.includes('placeholder')) {
          city.ImageUrl = city.countryImageUrl;
          const time = {
            city: city.cityName,
            country: city.countryNameEnglish,
            image_url: city.ImageUrl,
            country_id: city.countryId,
            start_date: formatDates(startDate),
            end_date: formatDates(endDate),
          };
          setSearchResult(time);
          setShowSearchResult(true);
        } else {
          city.ImageUrl = city.cityImageUrl;
          const time = {
            city: city.cityName,
            country: city.countryNameEnglish,
            image_url: city.ImageUrl,
            country_id: city.countryId,
            start_date: formatDates(startDate),
            end_date: formatDates(endDate),
          };
          setSearchResult(time);
          setShowSearchResult(true);
        }
      }
      let data = await db
        .collection('places_went')
        .where('city', '==', cityValue)
        .where('country', '==', countryValue)
        .get();
      let docs = data.docs;
      setMadeHighlights(docs);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <div className={styles.left_container_inner}>
          <div className={styles.title}>Add Trip</div>
          <div className={styles.inputs}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 50 } }}
                  id='oneWay'
                  name='oneWay'
                  checked={oneWay}
                  onChange={() => setOneWay(!oneWay)}
                />
              }
              label='One Way'
              className='one-way-label'
              style={{ width: '100%' }}
            />
            <div className={styles.datepicker_container}>
              <DatePicker
                label='Start date'
                className={styles.datepicker}
                onChange={setStartDate}
                sx={{
                  svg: { white },
                  input: { white },
                  label: { white },
                }}
              />
              <DatePicker
                label='Return date'
                disabled={oneWay}
                className={styles.datepicker}
                onChange={setEndDate}
              />
            </div>
            <div className={styles.place_container}>
              <TextField
                id='standard-basic'
                variant='outlined'
                placeholder='Search Country'
                className={styles.country}
                ref={countryAutoFillRef}
                value={countryValue}
                onChange={handleCountrySearchChange}
                onFocus={() => setShowCountryList(true)}
                required
                InputProps={{
                  style: {
                    fontSize: '1.5rem',
                    width: '100%',
                    color: 'white',
                  },
                }}
              />
              {showCountryList && (
                <ul
                  style={{
                    position: 'absolute',
                    float: 'left',
                    marginTop: '5rem',
                    cursor: 'pointer',
                  }}
                >
                  {countryAutoFill.map((country) => (
                    <li
                      onClick={() => handleCountryListClick(country)}
                      key={country}
                    >
                      {country}
                    </li>
                  ))}
                </ul>
              )}
              <TextField
                id='standard-basic'
                variant='outlined'
                placeholder='Search City'
                className={styles.city}
                ref={cityAutoFillRef}
                value={cityValue}
                onChange={handleCitySearchChange}
                onFocus={() => setShowCityList(true)}
                required
                InputProps={{
                  style: {
                    fontSize: '1.5rem',
                    color: 'white',
                    width: '82%',
                    marginLeft: '3rem',
                  },
                }}
              />
              {showCityList && (
                <ul
                  style={{
                    position: 'absolute',
                    float: 'right',
                    marginTop: '5rem',
                    cursor: 'pointer',
                  }}
                >
                  {cityAutoFill.map((city) => (
                    <li onClick={() => handleCityListClick(city)} key={city}>
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.search_container}>
              <Button
                variant='contained'
                id='search-button'
                onClick={createSearchResults}
              >
                Find Trip Event
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right_container}>
        <Grid container spacing={2}>
          {showSearchResult && (
            <Grid item xs={6}>
              <AddTripCard key={searchResult} time={searchResult} />
            </Grid>
          )}
          <Grid item xs={6}>
            {madeHighlights.length > 0 &&
              madeHighlights.map((doc) => (
                <div>
                  <div>
                    {' '}
                    {doc.data().display_name} : {doc.data().highlight}
                  </div>
                  {/* <div key={doc.id}> {doc.display_name} : {doc.comment}</div> */}
                </div>
              ))}
          </Grid>
        </Grid>
      </div>

      <div style={{ display: 'none' }}>
        <h1>Add Trip to Timeline</h1>
        <div className='tripSearch'>
          <Grid container spacing={2}>
            {showSearchResult && (
              <Grid item xs={6}>
                <AddTripCard key={searchResult} time={searchResult} />
              </Grid>
            )}
            <Grid item xs={6}>
              {madeHighlights.length > 0 &&
                madeHighlights.map((doc) => (
                  <div>
                    <div>
                      {' '}
                      {doc.data().display_name} : {doc.data().highlight}
                    </div>
                    {/* <div key={doc.id}> {doc.display_name} : {doc.comment}</div> */}
                  </div>
                ))}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
