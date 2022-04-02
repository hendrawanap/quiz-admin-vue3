<script setup>
const { question, hideButton } = defineProps({
  question: {
    id: String,
    answer: String,
    question: String,
    choices: Array,
    topic: String,
    img: String,
  },
  hideButton: Boolean,
});

const emit = defineEmits(['delete', 'changeTopic']);
const TOPICS = {
  FOOD: 'Makanan',
  ICON: 'Ikon',
  TOURISM: 'Wisata',
};

let topicColor;
switch (question.topic) {
  case TOPICS.FOOD:
    topicColor = 'primary';
    break;
  case TOPICS.ICON:
    topicColor = 'danger';
    break;
  case TOPICS.TOURISM:
    topicColor = 'success';
    break;
  default:
    topicColor = 'white';
}
const topicClass = [`text-${topicColor}`, `bg-${topicColor}`];
</script>

<template>
  <div
    class="border border-white border-opacity-5 rounded-lg bg-white bg-opacity-5 flex flex-col"
  >
    <img
      :src="
        question.img
          ? question.img
          : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
      "
      alt="img"
      class="object-cover h-48 w-full rounded-t-lg"
    />
    <div class="border-t border-white border-opacity-5 p-3 flex flex-col flex-1 justify-between">
      <div>
        <h5 class="text-lg font-semibold leading-snug">
          {{ question.question }}
        </h5>
        <h6
          v-for="(choice, index) in question.choices"
          :class="[
            choice == question.answer
              ? 'font-bold text-primary'
              : 'text-gray-500',
          ]"
          :key="'choice-' + index"
        >
          {{ choice }}
        </h6>
      </div>
      <div class="flex items-center justify-between mt-4" v-if="!hideButton">
        <div>
          <router-link :to="'/edit/' + question.id">
            <button class="btn btn-base bg-primary mr-1">
              Edit
            </button>
          </router-link>
          <button
            @click="$emit('delete')"
            class="btn btn-base bg-danger ml-1"
            type="button"
          >
            Hapus
          </button>
        </div>
        <div
          @click="$emit('changeTopic')"
          :class="topicClass"
          class="max-w-max text-sm rounded-full border border-white border-opacity-10 bg-opacity-5 px-2 py-1 cursor-pointer"
        >
          •
          <span>{{ question.topic }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
