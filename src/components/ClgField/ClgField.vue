<script setup lang="ts">
  import type { FieldProps } from './types';

  let {
    type = 'text',
    modelValue = '',
    placeholder = ''
  } = defineProps<FieldProps>();

  // const modelValue = defineModel({ default: '' });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();
</script>

<template>
  <input
    :value="modelValue"
    :placeholder="placeholder"
    @input="
      (event) =>
        emit('update:modelValue', (event.target as HTMLInputElement).value)
    "
    :type="type"
    class="outline-1 outline-blue-400 focus:outline-2 rounded-sm p-1 duration-75"
  />
</template>

<style lang="scss" scoped></style>
