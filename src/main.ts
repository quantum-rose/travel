import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'normalize.css/normalize.css';
import './assets/fonts/iconfont';
import './assets/fonts/iconfont.css';
import './assets/styles/global.scss';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
