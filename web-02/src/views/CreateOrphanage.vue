<template>
  <div id="page-create-orphanage">
    <Sidebar />
    <main>
      <form
        class="create-orphanage-form"
        @submit.prevent="handleSubmit"
      >
        <fieldset>
          <legend>Dados</legend>
          <l-map
            :center="position"
            :zoom="15"
            @click="handleMapClick"
          >
            <l-tile-layer :url="url" />
              <l-marker
                v-if="hasThePositionBeenDefined"
                :options="{
                  interactive: false,
                }"
                :icon="mapIcon"
                :lat-lng="position"
              />
          </l-map>

          <div class="input-block">
            <label for="name">Nome</label>
            <input
              id="name"
              v-model="name"
              maxLength="100"
            />
          </div>

          <div class="input-block">
            <label for="about">
              Sobre <span>Máximo de 300 caracteres</span>
            </label>
            <textarea
              id="name"
              maxLength="300"
              v-model="about"
            />
          </div>

          <div class="input-block">
            <label for="images">Fotos</label>

            <div class="images-container">
                <img
                  v-for="(previewImage, index) in previewImages"
                  :key="index"
                  :src="previewImage.content"
                  :alt="name"
                  @click="() =>
                    handleImageSelectionRemove(previewImage.imageName)
                  "
                />

              <label for="image[]" class="new-image">
                <plus-icon size="24" color="#15b6d6" />
              </label>
            </div>

            <input
              multiple
              type="file"
              id="image[]"
              @change="handleImageSelection"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Visitação</legend>

          <div class="input-block">
            <label for="instructions">Instruções</label>
            <textarea
              id="instructions"
              maxLength="500"
              v-model="instructions"
            />
          </div>

          <div class="input-block">
            <label for="opening_hours">Horário de abertura</label>
            <input
              id="opening_hours"
              v-model="openingHours"
              maxLength="80"
            />
          </div>

          <div class="input-block">
            <label for="open_on_weekends">Atende fim de semana</label>

            <div class="button-select">
              <button
                type="button"
                :class="openOnWeekends ? 'active' : ''"
                @click="() => setOpenOnWeekends(true)"
              >
                Sim
              </button>
              <button
                type="button"
                :class="!openOnWeekends ? 'active' : ''"
                @click="() => setOpenOnWeekends(false)"
              >
                Não
              </button>
            </div>
          </div>
        </fieldset>

        <button class="confirm-button" type="submit">
          Confirmar
        </button>
      </form>
    </main>
 </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { PlusIcon } from 'vue-feather-icons';
import { LMap, LMarker, LTileLayer } from 'vue2-leaflet';
import { icon, LeafletMouseEvent, latLng } from 'leaflet';
import Sidebar from '../components/Sidebar.vue';
import PreviewImage from '../contracts/PreviewImage';
import OrphanageValidator from '../validators/OrphanageValidator';
import api from '../services/api';

@Component({
  components: {
    PlusIcon,
    LMap,
    LMarker,
    LTileLayer,
    Sidebar,
  },
})
export default class CreateOrphanage extends Vue {
  url = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';

  mapIcon = icon({
    iconUrl: '/map-marker.svg',
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });

  position = latLng(0, 0);

  name = '';

  about = '';

  instructions = '';

  openingHours = '';

  openOnWeekends = false;

  images: File[] = [];

  previewImages: PreviewImage[] = [];

  hasThePositionBeenDefined = false;

  mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      this.position = latLng(latitude, longitude);
    });
  }

  setOpenOnWeekends(openOnWeekends: boolean) {
    this.openOnWeekends = openOnWeekends;
  }

  makePreviewImages(targetImages: File[]) {
    return targetImages.map((image) => ({
      imageName: image.name,
      content: URL.createObjectURL(image),
    }));
  }

  handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    this.position = latLng(lat, lng);
    this.hasThePositionBeenDefined = true;
  }

  async handleSubmit() {
    const orphanage = {
      name: this.name,
      latitude: this.position.lat,
      longitude: this.position.lng,
      about: this.about,
      instructions: this.instructions,
      openingHours: this.openingHours,
      openOnWeekends: this.openOnWeekends,
      images: this.images,
    };

    const validationErrors = OrphanageValidator.validate(orphanage);
    const hasValidationErrors = validationErrors.length > 0;
    if (hasValidationErrors) {
      return alert(validationErrors.join('\n'));
    }

    const data = new FormData();

    data.append('name', this.name);
    data.append('latitude', String(this.position.lat));
    data.append('longitude', String(this.position.lng));
    data.append('about', this.about);
    data.append('instructions', this.instructions);
    data.append('opening_hours', this.openingHours);
    data.append('open_on_weekends', String(this.openOnWeekends));

    this.images.forEach((image) => data.append('images', image));

    try {
      await api.post('/orphanages', data);

      alert('Orfanato cadastrado com sucesso.');
      this.$router.push('/');
    } catch (err) {
      alert('Não foi possível cadastrar este orfanato.');
    }

    return null;
  }

  handleImageSelection(event: Event) {
    const target = event.target as HTMLInputElement;
    const receivedImages = target.files as FileList;
    let selectedImages: File[];

    const noImageWasSelected = !receivedImages;
    if (noImageWasSelected) {
      return;
    }

    const haveAlreadySelectedImages = this.images.length > 0;
    if (haveAlreadySelectedImages) {
      selectedImages = [...this.images, ...Array.from(receivedImages)];
    } else {
      selectedImages = Array.from(receivedImages);
    }

    this.images = selectedImages;

    const selectedPreviewImages = this.makePreviewImages(selectedImages);
    this.previewImages = selectedPreviewImages;
  }

  handleImageSelectionRemove(imageName: string) {
    const updatedImages = this.images.filter((image: File) => image.name !== imageName);
    this.images = updatedImages;

    const updatedPreviewImages = this.makePreviewImages(updatedImages);
    this.previewImages = updatedPreviewImages;
  }
}
</script>

<style>
#page-create-orphanage {
  display: flex;
}

#page-create-orphanage aside {
  position: fixed;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(329.54deg, #15B6D6 0%, #15D6D6 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#page-create-orphanage aside img {
  width: 48px;
}

#page-create-orphanage aside footer a,
#page-create-orphanage aside footer button {
  width: 48px;
  height: 48px;

  border: 0;

  background: #12AFCB;
  border-radius: 16px;

  cursor: pointer;

  transition: background-color 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;
}

#page-create-orphanage aside footer a:hover,
#page-create-orphanage aside footer button:hover {
  background: #17D6EB;
}

#page-create-orphanage main {
  flex: 1;
}

form.create-orphanage-form {
  width: 700px;
  margin: 64px auto;

  background: #FFFFFF;
  border: 1px solid #D3E2E5;
  border-radius: 20px;

  padding: 64px 80px;

  overflow: hidden;
}

form.create-orphanage-form .leaflet-container {
  width: 100%;
  height: 280px;

  margin-bottom: 40px;
  border: 1px solid #D3E2E5;
  border-radius: 20px;
}

form.create-orphanage-form fieldset {
  border: 0;
}

form.create-orphanage-form fieldset + fieldset {
  margin-top: 80px;
}

form.create-orphanage-form fieldset legend {
  width: 100%;

  font-size: 32px;
  line-height: 34px;
  color: #5C8599;
  font-weight: 700;

  border-bottom: 1px solid #D3E2E5;
  margin-bottom: 40px;
  padding-bottom: 24px;
}

form.create-orphanage-form .input-block + .input-block {
  margin-top: 24px;
}

form.create-orphanage-form .input-block label {
  display: flex;
  color: #8FA7B3;
  margin-bottom: 8px;
  line-height: 24px;
}

form.create-orphanage-form .input-block label span {
  font-size: 14px;
  color: #8FA7B3;
  margin-left: 24px;
  line-height: 24px;
}

form.create-orphanage-form .input-block input,
form.create-orphanage-form .input-block textarea {
  width: 100%;
  background: #F5F8FA;
  border: 1px solid #D3E2E5;
  border-radius: 20px;
  outline: none;
  color: #5C8599;
}

form.create-orphanage-form .input-block input {
  height: 64px;
  padding: 0 16px;
}

form.create-orphanage-form .input-block textarea {
  min-height: 120px;
  max-height: 240px;
  resize: vertical;
  padding: 16px;
  line-height: 28px;
}

form.create-orphanage-form .input-block .images-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;
}

form.create-orphanage-form .input-block .images-container img {
  width: 100%;
  height: 96px;
  object-fit: cover;
  border-radius: 20px;

  cursor: pointer;
}

form.create-orphanage-form .input-block .new-image {
  height: 96px;
  background: #F5F8FA;
  border: 1px dashed #96D2F0;
  border-radius: 20px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

form.create-orphanage-form .input-block input[type=file] {
  display: none;
}

form.create-orphanage-form .input-block .button-select {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

form.create-orphanage-form .input-block .button-select button {
  height: 64px;
  background: #F5F8FA;
  border: 1px solid #D3E2E5;
  color: #5C8599;
  cursor: pointer;
}

form.create-orphanage-form .input-block .button-select button.active {
  background: #EDFFF6;
  border: 1px solid #A1E9C5;
  color: #37C77F;
}

form.create-orphanage-form .input-block .button-select button:first-child {
  border-radius: 20px 0px 0px 20px;
}

form.create-orphanage-form .input-block .button-select button:last-child {
  border-radius: 0 20px 20px 0;
  border-left: 0;
}

form.create-orphanage-form button.confirm-button {
  margin-top: 64px;

  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #3CDC8C;
  border-radius: 20px;
  color: #FFFFFF;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;
}

form.create-orphanage-form button.confirm-button svg {
  margin-right: 16px;
}

form.create-orphanage-form button.confirm-button:hover {
  background: #36CF82;
}
</style>
