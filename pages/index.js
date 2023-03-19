import React from 'react';



const { firebase, db } = require('./firebase.js');

import { collection, getDocs } from "firebase/firestore"; 

async function get_places_went() {
  let data = await db.collection("places_went").get();
  let docs = data.docs;
  console.log(docs[0].data());
 }




export default function Home() {
  return <div>Home</div>;
}

// initialize firebase services




////////////////// This part should move to Map.js but there is a conflict
/////////The collection(db, 'X') or db.collection makes the map disapear 


// get collection data
/*
getDocs(colRef)
.then((result) => {
  let places = [];
  let coordinateToPlace = [];
  result.docs.forEach((doc) => {
  places.push({ ...doc.data(), id: doc.id })
})
console.log(places);
places.forEach(element => {
  const lat = element.coordinate._lat;
  const lng = element.coordinate._long;
  coordinateToPlace.push({lat, lng})
  console.log(coordinateToPlace)
})})
.catch(err => {
console.log(err.message)
})
*/