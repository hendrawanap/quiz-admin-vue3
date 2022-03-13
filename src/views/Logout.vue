<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const emit = defineEmits(['error']);
(async () => {
  try {
    await store.dispatch('logout');
    router.push('/login');
  } catch (error) {
    emit('error', { message: error.messsage });
  }
})();
</script>

<template>
  <div>Logging Out...</div>
</template>
