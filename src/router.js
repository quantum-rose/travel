import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import( /* webpackChunkName: "Home" */ './pages/home/home.vue')
const City = () => import( /* webpackChunkName: "City" */ './pages/city/city.vue')

Vue.use(VueRouter)

export default new VueRouter({
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
