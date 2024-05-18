<script setup lang="ts">
// import { ref } from "vue";
import { useSettings } from '../stores/settings';

const settings = useSettings();
console.log(settings.pathCode);
const refresh = () => location.reload();
</script>

<template>
  <!-- 
    Notice how easy it is to directly set state props, or even reset to original
    state via settings.$reset(). This is already fully persistent whereas it'd take
    far more code to do similar things in Vuex
   -->

  <button @click="settings.count++">
    {{ `Count via direct assignment: ${settings.count}` }}
  </button>
  <button @click="settings.$reset">
    Reset store
  </button>
  <button @click="refresh">
    Reload page
  </button>
</template>