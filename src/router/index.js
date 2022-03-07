import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import QuestionEdit from '../views/QuestionEdit.vue';
import Login from '../views/Login.vue';

export default (store) => {
  const routes = [
    { name: 'home', path: '/', component: Home },
    { name: 'questionEdit', path: '/edit', component: QuestionEdit },
    { name: 'login', path: '/login', component: Login },
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
