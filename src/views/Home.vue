<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import QuestionCard from '../components/QuestionCard.vue';

const TOPICS = {
  ALL: 'Semua',
  FOOD: 'Makanan',
  ICON: 'Ikon',
  TOURISM: 'Wisata',
};
const store = useStore();
const state = reactive({
  selectedTopic: TOPICS.ALL,
});

if (!store.state.questions) {
  console.log('fetching...');
  store.dispatch('fetchQuestions')
    .then(() => console.log('fetched'))
    .catch((error) => console.log(`error fetching: ${error.message}`));
} else {
  console.log('fetched');
}

const questions = computed(() => {
  if (state.selectedTopic === TOPICS.ALL) {
    return store.getters.getAllQuestions;
  } else {
    return store.getters.getQuestionsByTopic(state.selectedTopic);
  }
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4">
    <h1 class="text-center text-4xl font-bold mb-4">Questions List</h1>
    <select class="bg-white bg-opacity-5 text-lg" name="topic-selector" id="topic-selector" v-model="state.selectedTopic">
      <option v-for="TOPIC in TOPICS" :key="'topic-'+TOPIC" :value="TOPIC">{{ TOPIC }}</option>
    </select>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <QuestionCard v-for="question in questions" :question="question" :hide-button="false" :key="question.id" @change-topic="() => state.selectedTopic = question.topic"/>
    </div>
  </div>
</template>
