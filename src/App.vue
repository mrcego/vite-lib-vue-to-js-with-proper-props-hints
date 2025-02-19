<script setup lang="ts">
  import ClgButton from './components/ClgButton';
  import ClgField from './components/ClgField';
  import ClgAvatar from './components/ClgAvatar';
  import ClgSelect from './components/ClgSelect';

  import ClgvButton from './../public/js/ClgButton/ClgButton.js';
  import ClgvField from './../public/js/ClgField/ClgField.js';
  import ClgvAvatar from './../public/js/ClgAvatar/ClgAvatar.js';
  import ClgvSelect from './../public/js/ClgSelect/ClgSelect.js';
  import { ref } from 'vue';

  const text = ref('');
  const item = ref();
  const button = ref('Component');
  const items = ref([
    { id: 1, label: 'Test 1', value: 1 },
    { id: 2, label: 'Test 2', value: 2 }
  ]);
</script>

<template>
  <div class="flex min-h-screen items-center justify-center gap-3 p-2">
    <div
      class="flex flex-col border border-red-400 w-1/2 py-2 items-center justify-center gap-3"
    >
      <span class="font-bold text-green-700">Componentes .vue</span>

      <ClgButton>Button</ClgButton>
      <ClgField></ClgField>
      <ClgAvatar></ClgAvatar>
      <ClgSelect :items="items"></ClgSelect>
    </div>

    <div
      class="flex flex-col w-1/2 items-center justify-center gap-3 py-2 border border-red-400"
    >
      <span class="font-bold text-yellow-500">Componentes .js</span>

      <ClgvButton>Button</ClgvButton>
      <ClgvField></ClgvField>
      <ClgvAvatar></ClgvAvatar>
      <ClgvSelect :items="items"></ClgvSelect>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
