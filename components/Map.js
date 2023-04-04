
import React, { useState } from 'react';
import Message from './Message';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import firebase from 'firebase/compat/app';
import countriesCoordinates from '../public/worldCoordinates.json';
import 'firebase/compat/firestore';
import { Container } from '@mui/material';
import styles from './Map.module.css';
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

const customIcon = new icon({
  iconUrl: '/bold cross.png',
  iconSize: [20, 20],
  iconAnchor: [10, 5],
  popupAnchor: [-3, -76],
});

const { MapContainer, TileLayer, Marker, Tooltip, GeoJSON } = ReactLeaflet;
//const { countries } = require('./Countries');
//console.log("countries",countries)

//Map

export default function Map(props) {

  console.log("props", props)
  const countries = countriesCoordinates;


  const [cityHighlight, setCityHighlight] = useState();
  const [comments, setComments] = useState([]);

  async function getCommentByCity(e) {
    let CityId = await getCityNameAndId(e);
    let Comment = await getComments(CityId);
  }

  async function getCityNameAndId(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    let data = await db.collection('places_went').get();
    let docs = data.docs;
    let id;
    let objectToSend = {};
    docs.forEach((ele) => {
      if (
        lat === ele.data().coordinates[1] &&
        lng === ele.data().coordinates[0]
      ) {
        id = ele.id;
        objectToSend = { city: ele.city, country: ele.country };
      }
    });
    return id;
  }

  async function getComments(id) {
    let comments = await db
      .collection('places_went')
      .doc(id)
      .collection('highlight')
      .get();
    let commentsdocs = comments.docs;
    if (commentsdocs.length > 0) {
      let highlights = commentsdocs.map((el) => [
        el.data().timestamp,
        el.data().display_name,
        el.data().highlight,
      ]);
      setCityHighlight(highlights[0]);
      setComments(highlights);
    } else {
      setCityHighlight('');
      setComments([]);
    }
  }


  let chemin;

  if (props.road === '/' || props.road === '/friend') {

    chemin = props.index;

  }

  if (props.road === '/profile' || props.road === '/Map') {
    chemin = props.index;
  }
  if (props.road === '/results') {
    let coordinates = [];
    props.index.map((el) => {
      let latitude = el.coordinates[1];
      let longitude = el.coordinates[0];
      let price = '$' + el.price;
      coordinates.push({ lat: latitude, lng: longitude, price: price });
    });
    chemin = coordinates;
  }

  const maxBounds = [
    [-90, -180], // Southwest coordinates
    [90, 180], // Northeast coordinates
  ];


  const style = (feature) => {
    return {
      fillColor: feature.properties.color,
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MapContainer
          style={{
            height: '80vh',
            width: '120vh',
            border: '4px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          center={[35.6762, 139.6503]}
          zoom={2}
          scrollWheelZoom={false}
          nowrap={true}
          maxBounds={maxBounds}

        >
          <TileLayer
            attribution=''
            url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
          />
          <GeoJSON key="my-geojson" data={countries} style={style} />
          {chemin.map(({ lat, lng, city, country }) => (
            <Marker
              key={lat + lng}
              position={[lat, lng]}
              icon={customIcon}
              eventHandlers={{ click: getCommentByCity }}
            >
              {<Tooltip className='tooltip'> {city} - {country} </Tooltip>}
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div>
        {comments.map((comment, index) => (
          <Message key={index} message={comment} />
        ))}
      </div>
    </>
  );
}
/*



*/
