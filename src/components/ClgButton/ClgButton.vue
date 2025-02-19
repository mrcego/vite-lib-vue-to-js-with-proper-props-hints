<script setup lang="ts">
  import { ref } from 'vue';
  import useColorUtilities from '../../composables/useColorUtilities';
  import type { ButtonProps } from './types';

  const { color = 'bg-red-400' } = defineProps<ButtonProps>();
  const isHover = ref(false);

  const { stylesOnHover, getHoverBackgroundColor } = useColorUtilities();

  // Usar el valor por defecto si no se proporciona color
  getHoverBackgroundColor(color);
</script>

<template>
  <button
    class="rounded-md p-2 duration-300 text-white"
    :class="[color]"
    :style="isHover ? stylesOnHover : {}"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <slot>{{ text }}</slot>
  </button>
</template>
