<template>
  <div id="page-map">
    <aside>
      <header>
        <img src="map-marker.svg" alt="Map marker" />

        <h2>Escolha um orfanato no mapa</h2>
        <p>Muitas crianças estão esperando a sua visita :)</p>
      </header>

      <footer>
        <strong>Salvador</strong>
        <span>Bahia</span>
      </footer>
    </aside>
    <l-map :zoom="15" :center="center">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker
        v-for="orphanage in orphanages"
        :key="orphanage.id"
        :icon="mapIcon"
        :lat-lng="[orphanage.latitude, orphanage.longitude]"
      >
        <l-popup
          class="map-popup"
          :options="{
            closeButton: false,
            minWidth: 240,
            maxWidth: 240,
          }"
        >
          {{ orphanage.name }}
          <router-link :to="'/orphanages/' + orphanage.id">
            <arrow-right-icon size="20" color="#fff" />
          </router-link>
        </l-popup>
      </l-marker>
    </l-map>
    <div>
      <router-link to="/orphanages/create" class="create-orphanage">
        <plus-icon size="32" color="#fff" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { latLng, icon } from 'leaflet';
import {
  LMap, LTileLayer, LMarker, LPopup, LTooltip,
} from 'vue2-leaflet';
import Sidebar from '@/components/Sidebar.vue';
import { PlusIcon, ArrowRightIcon } from 'vue-feather-icons';

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    Sidebar,
    PlusIcon,
    ArrowRightIcon,
  },
})
export default class OrphanagesMap extends Vue {
  center = latLng(-12.9799063, -38.5115833);

  url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  attribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

  mapIcon = icon({
    iconUrl: '/map-marker.svg',
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });

  mounted() {
    this.$store.dispatch('fetchOrphanages');
  }

  get orphanages() {
    return this.$store.getters.orphanages;
  }
}
</script>

<style>
#page-map {
  width: 100vw;
  height: 100vh;

  position: relative;

  display: flex;
}

#page-map aside {
  width: 440px;

  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);

  padding: 80px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#page-map aside h2 {
  font-size: 40px;
  font-weight: 800;

  line-height: 42px;

  margin-top: 64px;
}

#page-map aside p {
  line-height: 28px;
  margin-top: 24px;
}

#page-map aside footer {
  display: flex;
  flex-direction: column;

  line-height: 24px;
}

#page-map aside footer strong {
  font-weight: 800;
}

#page-map .leaflet-container {
  z-index: 5;
}

#page-map .create-orphanage {
  position: absolute;
  right: 40px;
  bottom: 40px;

  width: 64px;
  height: 64px;

  z-index: 10;

  background-color: #15c3d6;

  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;
}

#page-map .create-orphanage:hover {
  background-color: #17d6eb;
}

#page-map .leaflet-popup-content-wrapper {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: none;
}

#page-map .leaflet-popup-content {
  margin: 8px 12px;
}

#page-map .map-popup {
  color: #0089a5;

  font-size: 20px;
  font-weight: bold;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

#page-map .map-popup a {
  width: 40px;
  height: 40px;

  background-color: #15c3d6;

  box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);
  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
}

#page-map .leaflet-popup-tip-container {
  display: none;
}
</style>
