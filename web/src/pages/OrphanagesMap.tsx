import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mapMarkerImg from '../assets/images/map-marker.svg';
import '../assets/styles/pages/orphanages-map.css';

const OrphanagesMap: React.FC = () => (
  <div id="page-map">
    <aside>
      <header>
        <img src={mapMarkerImg} alt="Map marker" />

        <h2>Escolha um orfanato no mapa</h2>
        <p>Muitas crianças estão esperando a sua visita :)</p>
      </header>

      <footer>
        <strong>Salvador</strong>
        <span>Bahia</span>
      </footer>
    </aside>

    <Map
      center={[-12.9799063, -38.5115833]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </Map>

    <div>
      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  </div>
);

export default OrphanagesMap;
