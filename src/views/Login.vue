<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const login = () => {
  store.commit('login');
  router.push('/');
};
</script>

<template>
  <div class="max-w-xl mx-auto py-12">
    <h1 class="text-5xl mb-5 text-bold text-center">Login</h1>
    <form class="flex flex-col" @submit.prevent="login">
      <label class="font-medium mb-1" for="input-email">Email address</label>
      <input
        class="bg-white bg-opacity-5 rounded mb-3 py-3 px-4"
        type="email"
        name="email"
        id="input-email"
      >
      <label class="font-medium mb-1" for="input-password">Password</label>
      <input
        class="bg-white bg-opacity-5 rounded mb-3 py-3 px-4"
        type="password"
        name="password"
        id="input-password"
      >
      <button class="btn bg-primary btn-lg mt-5 mb-5" type="submit">Login</button>
    </form>
  </div>
</template>
