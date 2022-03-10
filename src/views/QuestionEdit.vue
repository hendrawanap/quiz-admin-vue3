<script setup>
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import QuestionLayout from '../layouts/QuestionLayout.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const state = reactive({
  question: {
    question: '',
    answer: '',
    choices: ['', '', '', ''],
    topic: '',
    file: null,
  },
});

const storedQuestion = computed(() => store.getters.getQuestionById(route.params.id));
const setQuestion = () => {
  if (storedQuestion.value) {
    state.question = { ...state.question, ...storedQuestion.value };
  } else {
    router.push({ name: '404' });
  }
};

if (!store.state.isFetchedAll) {
  store.dispatch('fetchQuestionById', { id: route.params.id })
    .then(setQuestion)
    .catch(setQuestion);
} else {
  setQuestion();
}

const submit = () => console.log(state.question);
</script>

<template>
  <QuestionLayout :question="state.question" @submit-question="submit" :title="'Question Edit'"/>
</template>
