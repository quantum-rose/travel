import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('./pages/home/home.vue')
const City = () => import('./pages/city/city.vue')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/city',
    name: 'city',
    component: City
  }]
})
