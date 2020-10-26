import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Landing',
    component: () => import(/* webpackChunkName: "landing" */ '../views/Landing.vue'),
  },
  {
    path: '/orphanages',
    name: 'OrphanagesMap',
    component: () => import(/* webpackChunkName: "orphanages-map" */ '../views/OrphanagesMap.vue'),
  },
  {
    path: '/orphanages/create',
    name: 'CreateOrphanage',
    component: () => import(/* webpackChunkName: "create-orphanage" */ '../views/CreateOrphanage.vue'),
  },
  {
    path: '/orphanages/:id',
    name: 'Orphanage',
    component: () => import(/* webpackChunkName: "orphanage" */ '../views/Orphanage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
