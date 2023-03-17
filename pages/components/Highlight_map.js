import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  return (
    <MapContainer
      style={{
        height: '50vh',
        width: '50vh',
      }}
      center={[35.6762, 139.6503]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[35.6762, 139.6503]}>
        <Popup>
          A popup. <br /> Do whatever you want with me.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
