/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createStore } from 'vuex';
import initAuth from '../auth';

const apiAddress = import.meta.env.VITE_API_ADDRESS;
// const savedUserToken = window.localStorage.getItem('user_token') || null;
const { signInWithEmail, logout, getCurentUserIdToken } = await initAuth();

const store = createStore({
  state: {
    isLoggedIn: false,
    questions: null,
    isFetchedAll: false,
  },
  getters: {
    getAllQuestions: (state) => state.questions,
    getQuestionsByTopic: (state) => (topic) => (
      state.questions.filter((question) => topic === question.topic)
    ),
    getQuestionById: (state) => (id) => (
      id && state.questions ? state.questions.find((question) => id === question.id) : null
    ),
  },
  mutations: {
    setIsLoggedIn: (state, { isLoggedIn }) => {
      state.isLoggedIn = isLoggedIn;
    },
    setQuestions: (state, { questions }) => {
      state.questions = questions;
    },
    setFetchedAll: (state) => {
      state.isFetchedAll = true;
    },
    setUserToken: (state, { userToken }) => {
      state.userToken = userToken;
      window.localStorage.setItem('user_token', userToken);
    },
    deleteUserToken: (state) => {
      state.userToken = null;
      window.localStorage.removeItem('user_token');
    },
  },
  actions: {
    fetchQuestions: async ({ commit }) => {
      const userToken = await getCurentUserIdToken();
      const { data } = await axios.get(`${apiAddress}/questions?token=${userToken}`);
      commit('setQuestions', { questions: data });
      commit('setFetchedAll');
    },
    fetchQuestionById: async ({ commit }, { id }) => {
      const { data } = await axios.get(`${apiAddress}/questions/${id}`);
      commit('setQuestions', { questions: [data] });
    },
    checkIsLoggedIn: async ({ commit }) => {
      try {
        const userToken = await getCurentUserIdToken();
        commit('setIsLoggedIn', { isLoggedIn: true });
      } catch (error) {
        commit('setIsLoggedIn', { isLoggedIn: false });
      }
    },
    signInWithEmail: async ({ commit }, { email, password }) => {
      const userToken = await signInWithEmail(email, password);
      // commit('setUserToken', { userToken });
      commit('setIsLoggedIn', { isLoggedIn: true });
    },
    logout: async ({ commit }) => {
      await logout();
      // commit('deleteUserToken');
      commit('setIsLoggedIn', { isLoggedIn: false });
    },
  },
});

export default store;
