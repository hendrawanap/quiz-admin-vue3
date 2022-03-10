<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isLoggedIn = computed(() => store.state.isLoggedIn);
const errorOccured = ref(false);
const errorMessage = ref(null);
</script>

<template>
  <div>
    <header class="sticky top-0 z-10">
      <div v-show="errorOccured" class="text-center w-full bg-danger">
        {{ errorMessage || 'An error occured.'}}
        <span class="underline cursor-pointer" @click="errorOccured = false">Dismiss</span>
      </div>
      <template v-if="$route.name !== 'login'">
        <nav
          class="border-b border-white border-opacity-5 py-3 px-4 xl:px-8
          flex justify-between bg-dark-bg items-center"
        >
          <router-link to="/"><img class="w-8" src="./assets/logo.png" alt="home"></router-link>
          <router-link to="/logout" class="font-bold">
            <button class="btn btn-base bg-danger">Logout</button>
          </router-link>
        </nav>
      </template>
      <template v-else>
        <h2>Quiz Admin</h2>
      </template>
    </header>
    <router-view
      @error=" ({ message }) => {
        errorOccured = true;
        errorMessage = message;
      }"
    />
  </div>
</template>
