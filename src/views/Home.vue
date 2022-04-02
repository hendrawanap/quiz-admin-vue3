<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import QuestionCard from '../components/QuestionCard.vue';
import QuestionCardSkeleton from '../components/skeletons/QuestionCard.vue';
import Modal from '../components/Modal.vue';

const TOPICS = {
  ALL: 'Semua',
  FOOD: 'Makanan',
  ICON: 'Ikon',
  TOURISM: 'Wisata',
};
const store = useStore();
const state = reactive({
  selectedTopic: TOPICS.ALL,
  isOpenTopic: false,
  isLoading: true,
});
const emit = defineEmits(['error', 'toggleModal', 'success']);

const fetchQuestions = async () => {
  state.isLoading = true;
  try {
    await store.dispatch('fetchQuestions');
    state.isLoading = false;
  } catch (error) {
    emit('error', { message: `Failed to fetch questions list (${error}).` });
    state.isLoading = false;
  }
};

if (!store.state.questions.isFetchedAll) {
  fetchQuestions();
} else {
  state.isLoading = false;
}

const questions = computed(() => {
  if (state.selectedTopic === TOPICS.ALL) {
    return store.getters.getAllQuestions;
  }
  return store.getters.getQuestionsByTopic(state.selectedTopic);
});

const buttonRef = ref(null);
const textRef = ref(null);
const iconRef = ref(null);
const closeTopic = (e) => {
  if (!(e.target === buttonRef.value || e.target === textRef.value || e.target === iconRef.value)) {
    state.isOpenTopic = false;
  }
};

const modalIsOpen = ref(false);

const toggleModal = () => {
  modalIsOpen.value = !modalIsOpen.value;
};

const selectedQuestion = ref(null);
const deleteQuestion = async (id) => {
  try {
    const result = await store.dispatch('deleteQuestion', { id });
    emit('success', { message: result });
    toggleModal();
    fetchQuestions();
  } catch (error) {
    emit('error', { message: `Failed to fetch questions list (${error}).` });
    toggleModal();
  }
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 mt-4" @click="closeTopic">
    <h1 class="text-2xl font-bold mb-4">Questions List</h1>
    <div class="flex justify-between">
      <div class="relative max-w-max" ref="topicSelector">
        <button
          :class="[state.isOpenTopic
            ? 'border border-white border-opacity-5 bg-slate-500'
            : 'bg-white border border-transparent']"
          class="bg-opacity-5 text-base mb-4 py-2 pl-4 pr-2 rounded flex items-center hover:border
        hover:border-white hover:border-opacity-5 hover:bg-slate-500 hover:bg-opacity-5"
          name="topic-selector"
          id="topic-selector"
          @click="() => state.isOpenTopic = !state.isOpenTopic"
          ref="buttonRef"
        >
          <span class="mr-4" ref="textRef">{{ state.selectedTopic }}</span>
          <span class="material-icons-outlined" ref="iconRef">expand_more</span>
        </button>
        <div v-show="state.isOpenTopic" class="bg-gray-bg absolute top-12 py-2 px-4 w-full rounded">
          <ul>
            <li
              class="cursor-pointer hover:text-primary"
              v-for="TOPIC in TOPICS"
              :key="'topic-'+TOPIC"
              :value="TOPIC"
              @click="() => state.selectedTopic = TOPIC"
            >
              {{ TOPIC }}
            </li>
          </ul>
        </div>
      </div>
      <router-link to="/create">
        <button class="btn btn-base bg-primary">Create Question</button>
      </router-link>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <QuestionCard
        v-for="question in questions"
        :question="question"
        :hide-button="false"
        :key="question.id"
        @change-topic="() => state.selectedTopic = question.topic"
        @delete="() => {
          selectedQuestion = question;
          toggleModal();
        }"
      />
      <QuestionCardSkeleton v-show="state.isLoading" v-for="i in 3" :key="'loading-'+i"/>
    </div>
    <Modal :is-open="modalIsOpen" @toggle-modal="toggleModal">
      <div v-if="selectedQuestion" class="bg-dark-bg rounded-md">
        <div class="border-b border-white border-opacity-5 p-5 mb-5">
          <h4 class="font-semibold text-lg">Delete this question?</h4>
        </div>
        <QuestionCard
          :question="selectedQuestion"
          :hide-button="true"
          class="max-w-xs mx-auto"
        />
        <div
          class="border-t border-white border-opacity-5 p-5 mt-5 flex justify-end"
        >
          <button
            class="btn btn-base bg-white bg-opacity-20 hover:bg-opacity-10"
            @click.stop="toggleModal"
          >
            Cancel
          </button>
          <button
            class="btn btn-base bg-danger ml-2"
            @click="() => deleteQuestion(selectedQuestion.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>
