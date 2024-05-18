<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  subscribeBackgroundColor,
} from "../lib/utils/bolt";
import "../index.scss";

import { useSettings } from "../stores/settings";
const backgroundColor = ref("#282c34");

// Our very simple hook into making our store fully persistent
const settings = useSettings();
settings.init();

onMounted(() => {
  if (window.cep)
    subscribeBackgroundColor((c: string) => (backgroundColor.value = c));
});

</script>

<template>
  <div class="app">
    <div class="nav-bar">
      <button class="router-link-button">
        <router-link class="routerLink" :to="{ name: 'render' }">
          Render
        </router-link>
      </button>
      <button class="router-link-button">
        <router-link class="routerLink" :to="{ name: 'logistic' }">
          Logistic
        </router-link>
      </button>
    </div>
    <div class="page-content">
      <RouterView />
    </div>
  </div>
</template>

<style>

.page-content {
  display: flex;
  height: 100vh;
  flex-direction: column;
  margin: 6px;
}

/* .page-content>*:nth-child(-n+3) {
  margin: 3px auto;s
} */

</style>