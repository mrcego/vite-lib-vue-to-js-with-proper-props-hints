<script setup lang="ts">
  import type { SelectProps } from './types';

  const {
    placeholder = 'Seleccione...',
    items = [],
    modelValue = ''
  } = defineProps<SelectProps>();

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();
</script>

<template>
  <select
    class="outline-1 outline-blue-400 focus:outline-2 rounded-sm p-1 duration-75 w-1/2"
    type="select"
    :placeholder="placeholder"
    :value="modelValue"
    @change="
      (event) =>
        emit('update:modelValue', (event.target as HTMLInputElement).value)
    "
  >
    <option v-for="item of items" :value="item.value">{{ item.label }}</option>
  </select>
</template>
