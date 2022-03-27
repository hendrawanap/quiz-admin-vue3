<script setup>
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import QuestionLayout from '../layouts/QuestionLayout.vue';

const emits = defineEmits(['error', 'success']);
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

if (!store.state.questions.isFetchedAll) {
  store.dispatch('fetchQuestionById', { id: route.params.id })
    .then(setQuestion)
    .catch(setQuestion);
} else {
  setQuestion();
}

const submit = async () => {
  try {
    const {
      question, answer, choices, topic, file,
    } = state.question;

    const formData = new FormData();
    formData.append('json', JSON.stringify({
      question, answer, choices, topic,
    }));

    if (file) {
      formData.append('imgFile', file);
    }

    const { updateTime } = await store.dispatch('editQuestion', { formData, id: route.params.id });
    await store.dispatch('fetchQuestions');
    emits('success', { message: `Updated at: ${updateTime}` });
    router.push('/');
  } catch (error) {
    emits('error', { message: error.message });
  }
};
</script>

<template>
  <QuestionLayout :question="state.question" @submit-question="submit" :title="'Question Edit'"/>
</template>
