<script setup lang="ts">
// import { ref } from "vue";
import { useSettings } from '../stores/settings';

const today = new Date();
const week = ['JAN','FEB','MAR','APR','MAY','JUNE','JUL','AUG','SEP','OCT','NOV','DEC'];
const year = today.getFullYear().toString();
const month = today.getMonth().toLocaleString("en-US",{minimumIntegerDigits:2})+'_'+week[today.getMonth()];
const monthString = week[today.getMonth()];
const day = today.getDate().toLocaleString("en-US",{minimumIntegerDigits:2});
const fileName = day+'_'+monthString+'_'+year;

const path = [year,month,day,fileName];

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