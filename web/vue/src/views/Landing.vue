<template>
  <div id="page-landing">
    <div class="content-wrapper">
      <img src="../assets/logo.svg" alt="logo" />

      <main>
        <h1>Leve a felicidade para o mundo.</h1>
        <p>Visite orfanatos e mude o dia de muitas crianças.</p>
      </main>

      <div class="location">
        <strong>Salvador</strong>
        <span>Bahia</span>
      </div>

      <router-link to="/orphanages" class="enter-app">
        <arrow-right-icon size="1.5x" color="#000" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ArrowRightIcon } from 'vue-feather-icons';

@Component({
  name: 'Landing',
  components: {
    ArrowRightIcon,
  },
})
export default class Landing extends Vue {}
</script>

<style scoped>
#page-landing {
  width: 100vw;
  height: 100vh;

  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);

  display: flex;
  justify-content: center;
  align-items: center;
}

#page-landing .content-wrapper {
  position: relative;

  width: 100%;
  max-width: 1100px;
  height: 100%;
  max-height: 680px;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  background: url("../assets/landing.svg") no-repeat 80% center;
}

#page-landing .content-wrapper main {
  max-width: 350px;
}

#page-landing .content-wrapper main h1 {
  font-size: 76px;
  font-weight: 900;

  line-height: 70px;
}

#page-landing .content-wrapper main p {
  margin-top: 40px;
  font-size: 24px;
  line-height: 34px;
}

.content-wrapper .location {
  position: absolute;
  right: 0;
  top: 0;

  font-size: 24px;
  line-height: 34px;

  display: flex;
  flex-direction: column;

  text-align: right;
}

.content-wrapper .location strong {
  font-weight: 800;
}
.content-wrapper .enter-app {
  position: absolute;
  right: 0px;
  bottom: 8px;

  width: 64px;
  height: 64px;

  background-color: #ffd666;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s;
}

.content-wrapper .enter-app:hover {
  background-color: #96feff;
}
</style>
