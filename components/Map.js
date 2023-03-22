import axios from 'axios';
import React from 'react';
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

/* memo for the geocoding API
I am thinking about using https://nominatim.openstreetmap.org that is a free API
for the query we could use
https://nominatim.openstreetmap.org/search?q=`&{city}`+`&{country}`&format=geojson
the country is in case there is multiple occurence of the same city*/

const getGeocode = async () => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=paris+france&format=geojson`
    );
    //console.log(response.data.features[0].geometry.coordinates);
  } catch (error) {
    console.error(error);
  }
};

getGeocode();

// Hard coded example arrays

const example = [
  {
    city: 'Paris',
    country: 'France',
    display_name: 'Mireille',
    timestamp: '2022/02/03',
    comment:
      "Je vois pas en quoi c'est cense etre la plus belle ville du monde.",
  },
  {
    city: 'Paris',
    country: 'France',
    display_name: 'Pierre',
    timestamp: '2022/01/29',
    comment: "J'adore le fromage.",
  },
  {
    city: 'Tokyo',
    country: 'Japon',
    display_name: 'Mireille',
    timestamp: '2022/01/15',
    comment: '素晴らしかった',
  },
];

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
  docs.forEach((ele) => {
    if (lat === ele.data().coordinates[1] && lng === ele.data().coordinates[0]){
      id = ele.id;
    }
  })
  return id;
}

async function getComments (id) {
  let comments = await db
    .collection('places_went')
    .doc(id)
    .collection('highlight')
    .get()
  let commentsdocs = comments.docs;
//  commentsdocs.forEach(el => console.log(el.data().highlight))
}

//Map

export default function Map(index) {
  console.log(index.index)
  let chemin;
  console.log(index);
  if (index.road === '/') {
      chemin = index.index;
  }

  if (index.road === '/profile' || index.road === '/Map'){
      chemin = index.index;

  }
  if (index.road === '/results'){
    let coordinates = []
    index.index.map(el => {
      let latitude = el.coordinates[1];
      let longitude = el.coordinates[0];
      let price = "$" + el.price;
      coordinates.push({lat: latitude, lng: longitude, price: price})
    })
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
            width: '120vh',
          }}
          center={[35.6762, 139.6503]}
          zoom={2}
          scrollWheelZoom={false}
          nowrap={true}
          maxBounds={maxBounds}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {chemin.map(({ lat, lng , counter, price}) => (
            <Marker
            key={lat + lng}
              position={[lat, lng]}
              icon={customIcon}
              eventHandlers={{ click: getCommentByCity }}
            >
              if { counter || price }{
              <Popup> {counter} {price} </Popup>}
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div>
        {example
          .filter((example) => example.city === 'Paris')
          .map((example) => (
            <Message example={example} />
          ))}
      </div>
    </>
  );
}
// The .filter().map() is working accordingly but there is an warning in the console
// Each child in a list should have a unique "key" prop
