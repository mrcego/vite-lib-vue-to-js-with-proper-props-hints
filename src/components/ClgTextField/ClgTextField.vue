<script setup lang="ts">
  import type { TextFieldProps } from './types';

  const { value = '' } = defineProps<TextFieldProps>();
</script>

<template>
  <input
    type="text"
    :value="value"
    class="outline-1 outline-blue-400 focus:outline-2 rounded-sm p-1 duration-75"
  />
</template>

<style lang="scss" scoped></style>
