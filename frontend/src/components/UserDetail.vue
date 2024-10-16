<template>
    <VDatePicker is-dark="system" v-model.range="range" mode="dateTime" class="dark-theme"/>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const range = ref({
    start: new Date(2024, 0, 6),
    end: new Date(2024, 0, 10),
  });
  </script>
  
<style>

.dark-theme {
    background-color: #121212;
    color: #ffffff; /* Ajuste as cores conforme necessário */
}
</style>