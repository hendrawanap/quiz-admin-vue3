import { createApp } from 'vue';
import makeRouter from './router';
import store from './store';
import App from './App.vue';
import './index.css';

const app = createApp(App);
const router = makeRouter(store);
app.use(store);
app.use(router);
app.mount('#app');
