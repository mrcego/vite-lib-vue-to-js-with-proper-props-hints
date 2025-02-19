<script setup lang="ts">
  import ClgButton from './components/ClgButton';
  import ClgTextField from './components/ClgTextField';
  import ClgAvatar from './components/ClgAvatar';

  import ClgvButton from './../public/js/ClgButton/ClgButton.js';
  import ClgvTextField from './../public/js/ClgTextField/ClgTextField.js';
  import ClgvAvatar from './../public/js/ClgAvatar/ClgAvatar.js';
</script>

<template>
  <div class="flex min-h-screen items-center justify-center gap-3 p-2">
    <div
      class="flex flex-col border border-red-400 w-1/2 items-center justify-center gap-3"
    >
      <span class="font-bold text-green-700">Componentes .vue</span>

      <ClgButton color="bg-blue-300" text="Hola"></ClgButton>
      <ClgTextField></ClgTextField>
      <ClgAvatar initials="AC"></ClgAvatar>
    </div>

    <div
      class="flex flex-col w-1/2 items-center justify-center gap-3 border border-red-400"
    >
      <span class="font-bold text-yellow-500">Componentes .js</span>

      <ClgvButton text="Mundo"></ClgvButton>
      <ClgvTextField></ClgvTextField>
      <ClgvAvatar color="bg-green-300" initials="AC"></ClgvAvatar>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
