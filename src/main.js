import { createApp } from 'vue';
import makeRouter from './router';
import makeStore from './store';
import App from './App.vue';
import './index.css';

const app = createApp(App);
makeStore().then((store) => {
  const router = makeRouter({ store });
  app.use(store);
  app.use(router);
  app.mount('#app');
});
