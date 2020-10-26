import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import '../assets/styles/pages/orphanage.css';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import OrphanageContract from '../contracts/Orphanage';
import OrphanageParams from '../contracts/OrphanageParams';
import api from '../services/api';

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<OrphanageContract>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api
      .get<OrphanageContract>(`/orphanages/${params.id}`)
      .then((response) => {
        setOrphanage(response.data);
      })
      .catch(() => {
        alert('Não foi possível carregar os orfanatos no mapa.');
      });
  }, [params]);

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours: openingHours,
    open_on_weekends: openOnWeekends,
    images,
  } = orphanage;

  return (
    <div id="page-orphanage">
      <Sidebar />
      <main>
        <div className="orphanage-details">
          <img src={images[activeImageIndex].path} alt={name} />

          <div className="images">
            {images.map(({ id, path }, index) => (
              <button
                type="button"
                key={id}
                onClick={() => {
                  setActiveImageIndex(index);
                }}
                className={index === activeImageIndex ? 'active' : ''}
              >
                <img src={path} alt={name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{name}</h1>
            <p>{about}</p>

            <div className="map-container">
              <Map
                center={[latitude, longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[latitude, longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {openingHours}
              </div>
              {openOnWeekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#ff669d" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
