import axios from "axios";
import { createStore } from "vuex";

const apiAddress = import.meta.env.VITE_API_ADDRESS;

const store = createStore({
  state: {
    isLoggedIn: true,
    questions: null,
  },
  getters: {
    getAllQuestions: (state) => state.questions,
    getQuestionsByTopic: (state) => (topic) => state.questions.filter((question) => topic === question.topic),
  },
  mutations: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    setQuestions: (state, { questions }) => {
      state.questions = questions;
    },
  },
  actions: {
    fetchQuestions: async ({ commit }) => {
      try {
        const { data } = await axios.get(apiAddress + '/questions');
        commit('setQuestions', { questions: data });
      } catch (error) {
        console.log(error.message);
      }
    },
  },
});

export default store;
