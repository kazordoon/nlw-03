<template>
  <div id="page-orphanage">
    <sidebar />
    <main>
      <div class="orphanage-details">
        <img
          v-show="orphanage.images[activeImageIndex]"
          :src="imageUrlIfItExists"
          :alt="orphanage.name"
        />

        <div class="images">
          <button
            v-for="(image, index) in orphanage.images"
            :key="index"
            @click="() => setActiveImageIndex(index)"
            :class="index === activeImageIndex ? 'active' : ''"
          >
            <img :src="image.path" :alt="orphanage.name" />
          </button>
        </div>

        <div class="orphanage-details-content">
          <h1>{{ orphanage.name }}</h1>
          <p>{{ orphanage.about }}</p>
          <div class="map-container">
            <l-map
              :center="[orphanage.latitude, orphanage.longitude]"
              :zoom="16"
              :options="{
                dragging: false,
                touchZoom: false,
                zoomControl: false,
                scrollWheelZoom: false,
                doubleClickZoom: false
              }"
            >
              <l-tile-layer :url="url" :attribution="attribution" />
              <l-marker :icon="mapIcon" :lat-lng="[orphanage.latitude, orphanage.longitude]" />
            </l-map>

            <footer>
              <a
                target="_blank"
                rel="noopener noreferrer"
                :href="
                  `https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`
                "
              >
                Ver rotas no Google Maps
              </a>
            </footer>
          </div>

          <hr />

          <h2>Instruções para visita</h2>
          <p>{{ orphanage.instructions }}</p>

          <div class="open-details">
            <div class="hour">
              <clock-icon size="32" color="#15B6D6" />
              {{ orphanage.opening_hours }}
            </div>
            <div v-if="orphanage.open_on_weekends" class="open-on-weekends">
              <info-icon size="32" color="#39CC83" />
              Atendemos <br />
              fim de semana
            </div>
            <div v-else class="open-on-weekends dont-open">
              <info-icon size="32" color="#ff669d" />
              Não atendemos <br />
              fim de semana
            </div>
          </div>

          <button type="button" class="contact-button">
            <phone-icon size="20" color="#FFF" />
            Entrar em contato
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { InfoIcon, ClockIcon, PhoneIcon } from 'vue-feather-icons';
import { LMap, LMarker, LTileLayer } from 'vue2-leaflet';
import { icon } from 'leaflet';
import Sidebar from '../components/Sidebar.vue';
import OrphanageContract from '../contracts/Orphanage';

@Component({
  components: {
    Sidebar,
    InfoIcon,
    ClockIcon,
    LMap,
    LMarker,
    LTileLayer,
    PhoneIcon,
  },
})
export default class Orphanage extends Vue {
  orphanage: OrphanageContract = {
    id: 0,
    name: '',
    latitude: 0,
    longitude: 0,
    about: '',
    instructions: '',
    openingHours: '',
    openOnWeekends: false,
    images: [],
  };

  activeImageIndex = 0;

  url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

  mapIcon = icon({
    iconUrl: '/map-marker.svg',
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });

  setActiveImageIndex(index: number) {
    this.activeImageIndex = index;
  }

  async mounted() {
    await this.$store.dispatch('fetchOrphanages');
    const id = Number(this.$route.params.id);

    const foundOrphanage = this.orphanages.find(
      (orphanage: OrphanageContract) => orphanage.id === id,
    );
    if (!foundOrphanage) {
      alert('Este orfanato não existe.');
      return this.$router.go(-1);
    }

    this.orphanage = foundOrphanage;
    console.log(foundOrphanage);
    return null;
  }

  get orphanages() {
    return this.$store.getters.orphanages;
  }

  get imageUrlIfItExists() {
    const orphanage = this.orphanage as OrphanageContract;
    return orphanage.images[this.activeImageIndex]
      ? orphanage.images[this.activeImageIndex].path
      : '';
  }
}
</script>

<style>
#page-orphanage {
  display: flex;
  min-height: 100vh;
}

#page-orphanage main {
  flex: 1;
}

.orphanage-details {
  width: 700px;
  margin: 64px auto;

  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;

  overflow: hidden;
}

.orphanage-details > img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.orphanage-details .images {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 16px;

  margin: 16px 40px 0;
}

.orphanage-details .images button {
  border: 0;
  height: 88px;
  background: none;
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  outline: none;

  opacity: 0.6;
}

.orphanage-details .images button.active {
  opacity: 1;
}

.orphanage-details .images button img {
  width: 100%;
  height: 88px;
  object-fit: cover;
}

.orphanage-details .orphanage-details-content {
  padding: 80px;
}

.orphanage-details .orphanage-details-content h1 {
  color: #4d6f80;
  font-size: 54px;
  line-height: 54px;
  margin-bottom: 8px;
}

.orphanage-details .orphanage-details-content p {
  line-height: 28px;
  color: #5c8599;
  margin-top: 24px;
}

.orphanage-details .orphanage-details-content .map-container {
  margin-top: 64px;
  background: #e6f7fb;
  border: 1px solid #b3dae2;
  border-radius: 20px;
}

.orphanage-details .orphanage-details-content .map-container .leaflet-container {
  width: 100%;
  height: 280px;
}

.orphanage-details .orphanage-details-content .map-container footer {
  padding: 20px 0;
  text-align: center;
}

.orphanage-details .orphanage-details-content .map-container footer a {
  line-height: 24px;
  color: #0089a5;
  text-decoration: none;
}

.orphanage-details .orphanage-details-content .map-container .leaflet-container {
  border-bottom: 1px solid #dde3f0;
  border-radius: 20px;
}

.orphanage-details .orphanage-details-content hr {
  width: 100%;
  height: 1px;
  border: 0;
  background: #d3e2e6;
  margin: 64px 0;
}

.orphanage-details .orphanage-details-content h2 {
  font-size: 36px;
  line-height: 46px;
  color: #4d6f80;
}

.orphanage-details .orphanage-details-content .open-details {
  margin-top: 24px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
}

.orphanage-details .orphanage-details-content .open-details div {
  padding: 32px 24px;
  border-radius: 20px;
  line-height: 28px;
}

.orphanage-details .orphanage-details-content .open-details div svg {
  display: block;
  margin-bottom: 20px;
}

.orphanage-details .orphanage-details-content .open-details div.hour {
  background: linear-gradient(149.97deg, #e6f7fb 8.13%, #ffffff 92.67%);
  border: 1px solid #b3dae2;
  color: #5c8599;
}

.orphanage-details .orphanage-details-content .open-details div.open-on-weekends {
  background: linear-gradient(154.16deg, #edfff6 7.85%, #ffffff 91.03%);
  border: 1px solid #a1e9c5;
  color: #37c77f;
}

.orphanage-details .orphanage-details-content .open-details div.dont-open {
  background: linear-gradient(154.16deg, #fdf0f5 7.85%, #ffffff 91.03%);
  border: 1px solid #ffbcd4;
  color: #ff669d;
}

.orphanage-details .orphanage-details-content button.contact-button {
  margin-top: 64px;

  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #3cdc8c;
  border-radius: 20px;
  color: #ffffff;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;
}

.orphanage-details .orphanage-details-content button.contact-button svg {
  margin-right: 16px;
}

.orphanage-details .orphanage-details-content button.contact-button:hover {
  background: #36cf82;
}
</style>
