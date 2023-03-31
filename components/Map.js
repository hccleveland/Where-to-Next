import axios from 'axios';
import React, { useState } from 'react';
import Message from './Message';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
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
  iconUrl: '/landscape.png',
  iconSize: [32, 32],
  iconAnchor: [22, 38],
  popupAnchor: [-3, -76],
});

const { MapContainer, TileLayer, Marker, Popup } = ReactLeaflet;

//Map

export default function Map(props) {


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
  return (
    <>
      <div>
        <MapContainer
          style={{
            height: '75vh',
          }}
          center={[35.6762, 139.6503]}
          zoom={2}
          scrollWheelZoom={false}
          nowrap={true}
          maxBounds={maxBounds}
        >
          <TileLayer
            attribution=''
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {chemin.map(({ lat, lng, price }) => (
            <Marker
              key={lat + lng}
              position={[lat, lng]}
              icon={customIcon}
              eventHandlers={{ click: getCommentByCity }}
            >
              if {price}
              {<Popup> {price} </Popup>}
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
