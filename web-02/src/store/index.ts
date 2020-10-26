import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orphanages: [],
  },
  mutations: {
    SET_ORPHANAGES(state, orphanages) {
      state.orphanages = orphanages;
    },
  },
  actions: {
    async fetchOrphanages(context) {
      const response = await api.get('/orphanages');
      const orphanages = response.data;
      context.commit('SET_ORPHANAGES', orphanages);
    },
  },
  getters: {
    orphanages(state) {
      return state.orphanages;
    },
  },
});
