<template>
  <Codemirror
    :v-model:value="code"
    :options="cmOptions"
    :border="false"
    placeholder="//Write your code here"
    @change="change"
  />
</template>

<script>
import Codemirror from "codemirror-editor-vue3";

// placeholder
import "codemirror/addon/display/placeholder.js";

// language
import "codemirror/mode/javascript/javascript.js";
// placeholder
import "codemirror/addon/display/placeholder.js";
// theme
import "codemirror/theme/material.css";

import { ref } from "vue";
export default {
  components: { Codemirror },
  setup() {
    const code = ref(`
var i = 0;
for (; i < 9; i++) {
  console.log(i);
  // more statements
}`);

    return {
      code,
      cmOptions: {
        mode: "text/javascript", // Language mode
        theme: "material", // Theme
      },
    };
  },
};
</script>

<style>
template {
  border-radius: 30px;
}
template >* {
  border-radius: 30px;
}
</style>