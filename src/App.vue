<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isLoggedIn = computed(() => store.state.isLoggedIn);
</script>

<template>
  <header v-if="$route.name !== 'login'">
    <nav>
      <router-link to="/">Home</router-link>
      <span>|</span>
      <router-link to="/edit">Edit</router-link>
    </nav>
  </header>
  <router-view></router-view>
</template>
