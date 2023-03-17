import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { icon } from "leaflet";



const customIcon = new icon({
  iconUrl: "/landscape.png",
  iconSize: [32, 32],
  iconAnchor: [22, 38],
  popupAnchor: [-3, -76],
})



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
    console.log(response.data.features[0].geometry.coordinates);
  } catch (error) {
    console.error(error);
  }
};

getGeocode();


let coords = [{lat: 48.8566, lng: 2.3522},{lat: 35.6762, lng:139.6503},{lat: 14.5995, lng: 120.9842},{lat: 40.7128, lng: -74.0060},{lat: 39.9526, lng: -75.1652}]

//Map

const Map = () => {

  

  return (
    <MapContainer style= {{
      height: '75vh',
      width: '100vh',
    }}
    center={[35.6762, 139.6503]} zoom={7} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coords.map(({ lat, lng }) => (
          <Marker position={[lat, lng]} icon={customIcon}>
            <Popup>
              Hey
            </Popup>
          </Marker>
      ))}
    </MapContainer>
  );
}

export default Map