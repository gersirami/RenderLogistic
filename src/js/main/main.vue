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

function setActivePanel(panelName: string) {
  settings.app.activePanel = panelName;
}

onMounted(() => {
  if (window.cep)
    subscribeBackgroundColor((c: string) => (backgroundColor.value = c));
});

</script>

<template>
  <div class="app">
    <div class="nav-bar">
      <router-link class="routerLink" :class="{'routerLinkActive': (settings.app.activePanel == 'render')}" :to="{ name: 'render' }" @click.native="setActivePanel('render')">
        Render
      </router-link>
      <router-link class="routerLink" :class="{'routerLinkActive': (settings.app.activePanel == 'logistic')}" :to="{ name: 'logistic' }" @click.native="setActivePanel('logistic')">
        Logistic
      </router-link>
    </div>
    <div class="page-content">
      <RouterView />
    </div>
  </div>
</template>