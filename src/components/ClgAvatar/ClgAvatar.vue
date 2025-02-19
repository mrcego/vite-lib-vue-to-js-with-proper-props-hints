<script setup lang="ts">
  import { ref } from 'vue';
  import useColorUtilities from '../../composables/useColorUtilities';
  import type { AvatarProps } from './types';

  const { color = 'bg-blue-300' } = defineProps<AvatarProps>();
  const isHover = ref(false);

  const { stylesOnHover, getHoverBackgroundColor } = useColorUtilities();

  getHoverBackgroundColor(color);
</script>

<template>
  <div
    class="flex rounded-full size-12 text-white items-center justify-center duration-300 cursor-default"
    :style="isHover ? stylesOnHover : {}"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    :class="[color]"
  >
    {{ initials }}
  </div>
</template>

<style lang="scss" scoped></style>
