<script setup lang="ts">
  import { ref } from 'vue';

  import ClgButton from './components/ClgButton';
  import ClgField from './components/ClgField';
  import ClgAvatar from './components/ClgAvatar';
  import ClgSelect from './components/ClgSelect';

  import {
    ClgButton as ClgvButton,
    ClgField as ClgvField,
    ClgAvatar as ClgvAvatar,
    ClgSelect as ClgvSelect
  } from './../public/js';

  import type { SelectProps } from './../public/js/ClgSelect';

  const text = ref('');
  const item = ref();
  const button = ref('Component');
  const items = ref<SelectProps['items']>([
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

      <ClgButton rounded="rounded-md" color="bg-blue-700"
        >Botón de prueba</ClgButton
      >
      <ClgField
        placeholder="Escribe algo aquí de Vue"
        v-model="text"
      ></ClgField>
      <ClgAvatar initials="AC"></ClgAvatar>
      <ClgSelect v-model="item" :items="items"></ClgSelect>
    </div>

    <div
      class="flex flex-col w-1/2 items-center justify-center gap-3 py-2 border border-red-400"
    >
      <span class="font-bold text-yellow-500">Componentes .js</span>

      <ClgvButton text="Yeah!" color="bg-green-700" />
      <ClgvField
        v-model="text"
        placeholder="Escribe algo aquí de JS"
      ></ClgvField>
      <ClgvAvatar color="bg-green-700" initials="AR"></ClgvAvatar>
      <ClgvSelect v-model="item" :items="items"></ClgvSelect>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
