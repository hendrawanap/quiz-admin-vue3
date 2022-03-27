<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import QuestionLayout from '../layouts/QuestionLayout.vue';

const emits = defineEmits(['error', 'success']);
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
const store = useStore();
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

    const { message } = await store.dispatch('createQuestion', { formData });
    await store.dispatch('fetchQuestions');
    emits('success', { message });
    router.push('/');
  } catch (error) {
    emits('error', { message: error.message });
  }
};
</script>

<template>
  <QuestionLayout :question="state.question" @submit-question="submit" :title="'Create Question'"/>
</template>
