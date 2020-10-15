import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import '../assets/styles/pages/orphanages-map.css';
import mapMarkerImg from '../assets/images/map-marker.svg';
import api from '../services/api';
import Orphanage from '../contracts/Orphanage';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api
      .get('/orphanages')
      .then((response) => {
        setOrphanages(response.data);
      })
      .catch(() => {
        alert('Não foi possível carregar os orfanatos no mapa.');
      });
  }, []);

  return (
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
        {orphanages.map(({ id, name, latitude, longitude }) => (
          <Marker key={id} position={[latitude, longitude]} icon={mapIcon}>
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {name}
              <Link to={`/orphanages/${id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <div>
        <Link to="/orphanages/create" className="create-orphanage">
          <FiPlus size={32} color="#fff" />
        </Link>
      </div>
    </div>
  );
}
