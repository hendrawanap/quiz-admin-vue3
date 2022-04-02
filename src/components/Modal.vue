<script setup>
import { onUpdated } from 'vue';

const props = defineProps(['isOpen']);

onUpdated(() => {
  if (props.isOpen) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div v-show="props.isOpen" class="fixed inset-0 z-40 overflow-y-scroll">
        <div
          class="fixed inset-0 bg-black bg-opacity-80"
          @click="$emit('toggleModal')"
        >
        </div>
        <div
          class="absolute z-50 top-10 left-1/2 -translate-x-1/2 container px-4">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
