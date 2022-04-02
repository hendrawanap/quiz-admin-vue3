/* eslint-disable no-param-reassign */
import {
  GetAllQuestions,
  GetQuestionById,
  AddQuestion,
  UpdateQuestion,
  DeleteQuestion,
} from '../api/questions';

const store = ({ getCurrentUserIdToken }) => ({
  state: {
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
    setQuestions: (state, { questions }) => {
      state.questions = questions;
    },
    setFetchedAll: (state) => {
      state.isFetchedAll = true;
    },
  },
  actions: {
    fetchQuestions: async ({ commit }) => {
      const userToken = await getCurrentUserIdToken();
      const data = await GetAllQuestions({ token: userToken });
      commit('setQuestions', { questions: data });
      commit('setFetchedAll');
    },
    fetchQuestionById: async ({ commit }, { id }) => {
      const userToken = await getCurrentUserIdToken();
      const data = await GetQuestionById({ token: userToken, id });
      commit('setQuestions', { questions: [data] });
    },
    createQuestion: async ({ commit }, { formData }) => {
      const userToken = await getCurrentUserIdToken();
      const data = await AddQuestion({ token: userToken, formData });
      return data;
    },
    editQuestion: async ({ commit }, { formData, id }) => {
      const userToken = await getCurrentUserIdToken();
      const data = await UpdateQuestion({ token: userToken, formData, id });
      return data;
    },
    deleteQuestion: async ({ commit }, { id }) => {
      const userToken = await getCurrentUserIdToken();
      const data = await DeleteQuestion({ token: userToken, id });
      return data;
    },
  },
});

export default store;
