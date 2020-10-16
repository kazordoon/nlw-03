import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from 'react-router-dom';

import '../assets/styles/pages/create-orphanage.css';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

export default function CreateOrphanage() {
  const history = useHistory();

  const [
    hasThePositionBeenDefined,
    setWhetherThePositionHasBeenDefined,
  ] = useState(false);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
    setWhetherThePositionHasBeenDefined(true);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;
    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', openingHours);
    data.append('open_on_weekends', String(openOnWeekends));

    images.forEach((image) => data.append('images', image));

    try {
      await api.post('/orphanages', data);

      alert('Orfanato cadastrado com sucesso.');
      history.push('/');
    } catch (err) {
      alert('Não foi possível cadastrar este orfanato.');
    }
  }

  function handleImageSelection(event: ChangeEvent<HTMLInputElement>) {
    let selectedImages: File[];
    let selectedPreviewImages: string[];

    const noImageWasSelected = !event.target.files;
    if (noImageWasSelected) {
      return;
    }

    const haveAlreadySelectedImages = images.length > 0;
    if (haveAlreadySelectedImages) {
      selectedImages = [...images, ...Array.from(event.target.files!)];
      setImages(selectedImages);
    } else {
      selectedImages = Array.from(event.target.files!);
      setImages(selectedImages);
    }

    selectedPreviewImages = selectedImages.map(URL.createObjectURL);
    setPreviewImages(selectedPreviewImages);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form
          className="create-orphanage-form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[position.latitude, position.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {hasThePositionBeenDefined && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((previewImage, index) => (
                  <img key={index} src={previewImage} alt={name} />
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input
                multiple
                type="file"
                id="image[]"
                onChange={(event) => handleImageSelection(event)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de abertura</label>
              <input
                id="opening_hours"
                value={openingHours}
                onChange={(event) => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={openOnWeekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!openOnWeekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
