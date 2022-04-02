/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';
import initAuth from '../auth';
import questionsModule from './questions';

export default async () => {
  const { signInWithEmail, logout, getCurrentUserIdToken } = await initAuth();

  const store = createStore({
    modules: {
      questions: questionsModule({ getCurrentUserIdToken }),
    },
    state: {
      isLoggedIn: false,
    },
    getters: {},
    mutations: {
      setIsLoggedIn: (state, { isLoggedIn }) => {
        state.isLoggedIn = isLoggedIn;
      },
    },
    actions: {
      checkIsLoggedIn: async ({ commit }) => {
        try {
          await getCurrentUserIdToken();
          commit('setIsLoggedIn', { isLoggedIn: true });
        } catch (error) {
          commit('setIsLoggedIn', { isLoggedIn: false });
        }
      },
      signInWithEmail: async ({ commit }, { email, password }) => {
        await signInWithEmail(email, password);
        commit('setIsLoggedIn', { isLoggedIn: true });
      },
      logout: async ({ commit }) => {
        await logout();
        commit('setIsLoggedIn', { isLoggedIn: false });
      },
    },
  });

  return store;
};
