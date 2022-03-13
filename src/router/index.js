import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import QuestionEdit from '../views/QuestionEdit.vue';
import QuestionCreate from '../views/QuestionCreate.vue';
import Login from '../views/Login.vue';
import Page404 from '../views/Page404.vue';
import Logout from '../views/Logout.vue';

export default ({ store }) => {
  const routes = [
    { path: '/', redirect: '/home' },
    { path: '/logout', component: Logout },
    { name: 'home', path: '/home', component: Home },
    { name: 'questionEdit', path: '/edit/:id', component: QuestionEdit },
    { name: 'questionCreate', path: '/create', component: QuestionCreate },
    { name: 'login', path: '/login', component: Login },
    { name: '404', path: '/404', component: Page404 },
  ];

  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  router.beforeEach((to, from) => {
    if (!store.state.isLoggedIn && to.name !== 'login') {
      return { name: 'login' };
    }
  });

  return router;
};
