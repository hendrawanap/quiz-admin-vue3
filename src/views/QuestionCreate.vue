<script setup>
import { reactive } from 'vue';
import QuestionLayout from '../layouts/QuestionLayout.vue';

const state = reactive({
  question: {
    question: '',
    answer: '',
    choices: ['', '', '', ''],
    topic: '',
    file: null,
  },
});
const submit = () => console.log(state.question);
</script>

<template>
  <QuestionLayout :question="state.question" @submit-question="submit" :title="'Create Question'"/>
</template>
