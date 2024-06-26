<script setup lang="ts">
import { ref } from "vue";
import { useSettings } from '../stores/settings';
import { getOutputModules } from '../lib/utils/aeft';
import { evalTS, selectFolder } from '../lib/utils/bolt';
import { Icon } from '@iconify/vue';
import { os, path } from "..//lib/cep/node";
import Codemirror from '../components/Codemirror.vue';
import Fold from '../components/Fold.vue';

const settings = useSettings();
const refresh = () => location.reload();
function renderLogistic() {
  const outputModules = getOutputModules();
  return outputModules;
}

function getOS() {
  if (os.platform() == "win32") {
    return true;
  } else if (os.platform() == "darwin") {
    return false;
  } else {
    alert("Unsupported operating system!");
  }
}

function getSelectedLayers() {
  evalTS("getActiveOrSelectedCompItemIds").then((res) => {
    alert(JSON.stringify(res));
  });
}

function setPath(state?: any) {
  if (!state) {
    selectFolder("", "Please select a folder!", (myPath) => {
      settings.basePath = myPath;
      settings.windowsPath = path.normalize(myPath);
    })
  } else {
    if (getOS()) {
      settings.basePath = state.replace(/\\/g, '/');
      settings.windowsPath = state;
    } else {
      settings.basePath = state;
    }
  }
  alert("windows: " + settings.windowsPath + "\n base: " + settings.basePath);
}

settings.outputModules = renderLogistic();

function refreshOM() {
  settings.outputModules = renderLogistic();
}

</script>

<template>
  <div class="column">
    <Fold label="Base Path" :open="true">
      <div class="row">
        <input v-if="!getOS()" :value="settings.basePath" @input="(event) => setPath(event.target.value)">
        <input v-if="getOS()" :value="settings.windowsPath" @input="(event) => setPath(event.target.value)">
        <button class="icon-button" @click="setPath()">
          <Icon icon="solar:folder-path-connect-bold" height="fit" color="#37C481" />
        </button>
      </div>
    </Fold>
    <Fold label="Path Code" :open="true">
      <Codemirror v-model:value="settings.pathCode" max-height="200" height="200" />
    </Fold>
    <Fold label="Render Preset" :open="true">
      <div class="row">
        <select v-model="settings.selectedModule">
          <option disabled value="Please select one">Please select one</option>
          <option v-for="(module, index) in settings.outputModules" :key="index">{{ module }}</option>
        </select>
        <button class="icon-button" @click="refreshOM">
          <Icon icon="jam:refresh" height="fit" color="#37C481" :inline="true" />
        </button>
      </div>
    </Fold>

    <button @click="getSelectedLayers">
      Get Selected Layer or Property
    </button>
    <button @click="settings.$reset">
      <Icon icon="solar:danger-triangle-bold" verticalAlign="middle" width="15" color="#FF3556" :inline="true" />
      Reset configuration
    </button>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  margin: 0px 0px 1px 0px;
  font-size: 9.5px;
  color: gray;
}

.column {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}

.row {
  display: flex;
  flex-direction: row;
  column-gap: 5px;
}

select {
  box-sizing: border-box;
  float: left;
  width: 100%;
  padding: 5px;
  font-size: 0.7rem;
  height: 25px;
}

input {
  box-sizing: border-box;
  float: left;
  width: 100%;
  padding: 6px;
  font-size: 0.7rem;
  height: 25px;
}
</style>