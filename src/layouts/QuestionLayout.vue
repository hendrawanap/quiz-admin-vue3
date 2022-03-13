<script setup>
import { onUpdated, ref } from 'vue';

const props = defineProps(['question', 'title']);
const emits = defineEmits(['submit-question']);
const TOPICS = ['Makanan', 'Ikon', 'Wisata'];
const img = ref(props.question.img);
const onImgChange = (e) => {
  props.question.file = e.target.files[0];
  img.value = URL.createObjectURL(props.question.file);
};

onUpdated(() => {
  img.value = img.value || props.question.img;
});
</script>

<template>
<div class="max-w-xl mx-auto px-4">
    <h1 class="mb-3">{{ title }}</h1>
    <form
      @submit.prevent="$emit('submit-question')"
      enctype="multipart/form-data"
      class="flex flex-col"
    >
        <label for="question" class="font-medium mb-1">Question</label>
        <textarea
          class="bg-white bg-opacity-5 rounded mb-3 py-3 px-4 block"
          id="question"
          v-model="question.question"
          required />
        <label for="answer" class="font-medium mb-1">Answer</label>
        <input
          type="text"
          class="bg-white bg-opacity-5 rounded mb-3 py-3 px-4 block"
          id="answer"
          v-model="question.answer"
          @change="() => question.choices[0] = question.answer"
          required />
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="choice-1" class="font-medium mb-1">Choice 1</label>
            <input
              type="text"
              class="bg-white bg-opacity-5 rounded mb-3 py-3 px-4 block w-full"
              id="choice-1"
              v-model="question.answer"
              disabled
              required
            />
          </div>
          <div>
            <label for="choice-2" class="font-medium mb-1">Choice 2</label>
            <input
              type="text"
              class="bg-white bg-opacity-5 rounded mb-3 py-3 px-4 block w-full"
              id="choice-2"
              v-model="question.choices[1]"
              required
            />
          </div>
          <div>
            <label for="choice-3" class="font-medium mb-1">Choice 3</label>
            <input
              type="text"
              class="bg-white bg-opacity-5 rounded mb-3 py-3 px-4 block w-full"
              id="choice-3"
              v-model="question.choices[2]"
              required
            />
          </div>
          <div>
            <label for="choice-4" class="font-medium mb-1">Choice 4</label>
            <input
              type="text"
              class="bg-white bg-opacity-5 rounded mb-3 py-3 px-4 block w-full"
              id="choice-4"
              v-model="question.choices[3]"
              required
            />
          </div>
        </div>
        <label for="topic" class="font-medium mb-1">Topic</label>
        <select
          class="bg-white bg-opacity-5 rounded mb-3 py-3 px-4 block form-select"
          v-model="question.topic"
          required
        >
          <option value disabled selected hidden>Select topic...</option>
          <option
            v-for="(topic, index) in TOPICS"
            :value="topic"
            :key="'topic-' + index"
          >
            {{ topic }}
          </option>
        </select>
        <label for="image" class="font-medium mb-1">Image</label>
        <div class="bg-white bg-opacity-5 rounded-lg mb-3 border border-white border-opacity-5">
          <img
            :src="
              img
                ? img
                : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
            "
            alt="img"
            class="object-cover w-full rounded-t-lg"
          />
          <input
            type="file"
            class="block py-3 px-2"
            id="image"
            @change="onImgChange"
          />
        </div>
      <button type="submit" class="btn bg-primary btn-lg self-end" id="submit-btn">Submit</button>
    </form>
  </div>
</template>
