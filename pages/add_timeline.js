import React, { useState, useEffect, useRef } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
import citiesJson from '../data/cities.json';

// var config = {
//     apiKey: 'AIzaSyCChl_1U6qI2je2kdt4FVTvboLFcIecjgE',
//     authDomain: 'where-to-next-7bc5f.firebaseapp.com',
//     projectId: 'where-to-next-7bc5f',
//     storageBucket: 'where-to-next-7bc5f.appspot.com',
//     messagingSenderId: '873346829271',
//     appId: '1:873346829271:web:0f34484e5b41e6e35ed992',
//   };
  
// firebase.initializeApp(config);
// const db = firebase.firestore();

// export async function getServerSideProps() {
//     const countryList = {}
//     citiesJson.forEach((city) => {
//         if (!countryList[city.countryNameEnglish]) {
//             countryList[city.countryNameEnglish] = [city.cityName];
//         } else {
//             countryList[city.countryNameEnglish].push(city.cityName)
//         }
//     })
//     return { props: { countryList } };
// }

const createCountryAutoCompleteList = () => {
    const result = [];
    citiesJson.forEach((city) => {
        if (!result.includes(city.countryNameEnglish)) {
            result.push(city.countryNameEnglish);
        }
    })
    return result;
}

const createCityAutoCompleteList = () => {
    const result = [];
    citiesJson.forEach((city) => {
        if (!result.includes(city.cityName)) {
            result.push(city.cityName);
        }
    })
    return result;
}

export default function addTimeline() {
    const countryList = useState( () => createCountryAutoCompleteList() );
    const cityList = useState( () => createCityAutoCompleteList() );
    const [countryValue, setCountryValue] = useState('');
    const [showCountryList, setShowCountryList] = useState(false);
    const countryAutoFillRef = useRef();

    const countryAutoFill = countryList[0].filter( country => country.toLowerCase().includes(countryValue.toLowerCase()))

    const handleCountrySearchChange = e => {
        setCountryValue(e.target.value);
    }

    const handleCountryListClick = (country) => {
        setCountryValue(country);
        setShowCountryList(false);
    }

    useEffect(() => {
        const handleOutsideCountryClick = (e) => {
            if (countryAutoFillRef.current && !countryAutoFillRef.current.contains(e.target)) {
                setShowCountryList(false);
            }
        }
        document.addEventListener('click', handleOutsideCountryClick);
        return () => {
            document.removeEventListener('click', handleOutsideCountryClick);
        }
    }, [])

    return (
        <div>
            <h1>Add Trip to Timeline</h1>
            <div className='tripSearch'>
                <input
                    ref={countryAutoFillRef}
                    value={countryValue}
                    onChange={handleCountrySearchChange} 
                    placeholder='Search Country'
                    onFocus={() => setShowCountryList(true)}
                />
                {showCountryList && (
                    <ul className='countries'>
                        {countryAutoFill.map(country => (
                            <li onClick={() => handleCountryListClick(country)} key={country}>{country}</li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    )

}