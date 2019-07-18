import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Axios from 'axios'
import 'normalize.css'
import 'swiper/dist/css/swiper.css'
import './assets/iconfont/iconfont.css'
import './assets/style/global.styl'

Vue.use(VueAwesomeSwiper)

Vue.prototype.$http = Axios

Vue.config.productionTip = false

fastClick.attach(document.body)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
