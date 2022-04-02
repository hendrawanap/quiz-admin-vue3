<script setup>
import { reactive } from 'vue';

const state = reactive({
  errorOccured: false,
  successOccured: false,
  alertMessage: '',
});

const dismissAlert = () => {
  state.errorOccured = false;
  state.successOccured = false;
};
</script>

<template>
  <div>
    <header class="sticky top-0 z-10">
      <div
        v-show="state.errorOccured || state.successOccured"
        class="text-center w-full"
        :class="state.errorOccured ? 'bg-danger' : 'bg-success'"
      >
        {{ state.alertMessage || 'An error occured.'}}
        <span class="underline cursor-pointer" @click="dismissAlert">Dismiss</span>
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
    <main>
      <router-view
        @error="({ message = 'Error occured.' }) => {
          state.errorOccured = true;
          state.alertMessage = message;
        }"
        @success="({ message = 'Success.' }) => {
          state.successOccured = true;
          state.alertMessage = message;
        }"
        @dismiss="dismissAlert"
      />
    </main>
    <footer class="py-10 w-full bg-white bg-opacity-5 mt-5 text-center">
      <p class="text-white text-opacity-80">Built by Hendrawan Anantha</p>
      <p class="text-white text-opacity-50 text-sm">Updated on March 2022</p>
    </footer>
  </div>
</template>
