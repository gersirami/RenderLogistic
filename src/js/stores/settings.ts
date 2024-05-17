import { watch } from "vue";

import { defineStore } from "pinia";
const storage = window.localStorage;

// Easier to keep track of store namespace and auto-load via variable here:
const name = "RL_settings";
export const useSettings = defineStore(name, {
  state: () => ({
    count: 0,
    outputModules: [] as string[],
    selectedModule: "Please select one",
    basePath: "",
    windowsPath: "",
    pathCode: "const today = new Date();\nconst week = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];\nconst year = today.getFullYear().toString();\nconst month = today.getMonth().toLocaleString(\"en-US\",{minimumIntegerDigits:2})+'_'+week[today.getMonth()];\nconst monthString = week[today.getMonth()];\nconst day = today.getDate().toLocaleString(\"en-US\",{minimumIntegerDigits:2});\nconst fileName = day+'_'+monthString+'_'+year;\n\nconst path = [year,month,day,fileName];\n\nreturn path;",
  }),
  getters: {
    currentCount(state) {
      return state.count;
    },
    // outputModules(state) {
    //   return state.outputModules;
    // },
  },
  // Actions still exist, but there are no longer mutations.
  // We can directly assign values instead, see Home.vue
  actions: {
    // We can just watch this store to auto-save and load as persistent
    // This just needs to be run once, like in App/main.vue's setup or mounted lifecycle:
    init() {
      let temp = storage.getItem(name);
      if (temp) this.$state = JSON.parse(temp);
      watch(
        this.$state,
        (state) => localStorage.setItem(name, JSON.stringify(state)),
        { deep: true }
      );
    },
  },
});
