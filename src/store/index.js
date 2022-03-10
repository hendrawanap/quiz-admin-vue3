/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createStore } from 'vuex';

const apiAddress = import.meta.env.VITE_API_ADDRESS;

const store = createStore({
  state: {
    isLoggedIn: true,
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
    login: (state) => {
      state.isLoggedIn = true;
    },
    setQuestions: (state, { questions }) => {
      state.questions = questions;
    },
    setFetchedAll: (state) => {
      state.isFetchedAll = true;
    },
  },
  actions: {
    fetchQuestions: async ({ commit }) => {
      const { data } = await axios.get(`${apiAddress}/questions`);
      commit('setQuestions', { questions: data });
      commit('setFetchedAll');
    },
    fetchQuestionById: async ({ commit }, { id }) => {
      const { data } = await axios.get(`${apiAddress}/questions/${id}`);
      commit('setQuestions', { questions: [data] });
    },
  },
});

export default store;
