import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Axios from 'axios'
import store from './store'
import BetterScroll from './common/betterScroll'
import 'normalize.css'
import 'swiper/dist/css/swiper.css'
import './assets/fonts/iconfont.css'
import './assets/styles/global.styl'

Vue.use(VueAwesomeSwiper)
Vue.use(BetterScroll)

Vue.prototype.$http = Axios

Vue.config.productionTip = false

fastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
