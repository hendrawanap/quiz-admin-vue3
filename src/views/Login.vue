<script setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const emit = defineEmits(['error']);
const router = useRouter();
const route = useRoute();
const store = useStore();
const state = reactive({
  email: '',
  password: '',
  isLoading: false,
});

(async () => {
  await store.dispatch('checkIsLoggedIn');
  if (store.state.isLoggedIn) {
    router.push(route.query.redirect || '/');
  }
})();

const login = async () => {
  try {
    state.isLoading = true;
    await store.dispatch('signInWithEmail', { email: state.email, password: state.password });
    router.push(route.query.redirect || '/');
  } catch (error) {
    state.isLoading = false;
    emit('error', { message: error.message });
  }
};
</script>

<template>
  <div class="max-w-xl mx-auto py-12">
    <h1 class="text-5xl mb-5 text-bold text-center">Login</h1>
    <form class="flex flex-col" @submit.prevent="login">
      <label class="font-medium mb-1" for="input-email">Email address</label>
      <input
        v-model="state.email"
        class="bg-white bg-opacity-5 rounded mb-3 py-3 px-4"
        type="email"
        name="email"
        id="input-email"
      >
      <label class="font-medium mb-1" for="input-password">Password</label>
      <input
        v-model="state.password"
        class="bg-white bg-opacity-5 rounded mb-3 py-3 px-4"
        type="password"
        name="password"
        id="input-password"
      >
      <button
        class="btn bg-primary btn-lg mt-5 mb-5 disabled:bg-opacity-50"
        type="submit"
        :disabled="state.isLoading"
      >
        {{ state.isLoading ? 'Logging In...' : 'Login' }}
      </button>
    </form>
  </div>
</template>
