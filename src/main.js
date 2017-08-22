// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import app from './App';
import VueRouter from 'vue-router';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import VueResource from 'vue-resource';
import './common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);

var routes = [
  {path: '/', component: goods},
  {path: '/goods', component: goods},
  {path: '/seller', component: seller}
];

const router = new VueRouter({
  linkActiveClass: 'avtive',
  routes
});

let App = Vue.extend(app);

/* eslint-disable no-new */
new App({
  router,
  'el': '#app'
});
