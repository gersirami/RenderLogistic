<template>
  <div class="fold" :style="{ marginTop, margin, padding }">
    <div class="fold-label" @click="toggle">
      <div class="fold-icon" :class="{ flip: !isOpen }">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
      <div class="fold-label-text">{{ label }}</div>
    </div>
    <div v-show="isOpen">
      <div class="fold-content" :style="{ padding: innerPadding }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    persistent: {
      type: Boolean,
      default: true,
    },
    innerPadding: {
      type: String,
      default: "",
    },
    prefsId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isOpen: null,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      this.$emit("click");
      this.$emit("clicked");
      if (this.prefsId) {
        this.setPrefsById(this.prefsId, this.isOpen);
      }
    },
  },
  watch: {
    open(val) {
      this.isOpen = val;
    },
    isOpen(val) {
      this.$emit(val ? "open" : "close");
    },
  },
  created() {
    if (this.prefsId.length) {
      // Implement logic to check local prefs here
      // (assuming setPrefsById and checkPrefsFor are defined elsewhere)
      let lastState = this.checkPrefsFor(this.prefsId);
      if (lastState === null) {
        this.isOpen = this.open;
      } else {
        this.isOpen = lastState.value;
        this.$emit("prefs", lastState);
      }
    } else {
      this.isOpen = this.open;
    }
  },
};
</script>

<style lang="scss">
@import "../variables.scss";
.fold {
  border-bottom: solid $dark 0.1px;
  width: 100%;
  cursor: default;
  padding-bottom: 0;
  margin-bottom: 0 !important;
  cursor: default;
  user-select: none;
  color: $light;
}

.fold-content>.fold {
  width: calc(100% - 10px);
  padding: 10px;
  
}

.fold-label {
  background-color: $black;
  display: flex;
  flex-wrap: none;
}
.fold-label:hover {
  background-color: $darkest;
}

.fold-label-text {
  user-select: none;
  text-align: left;
  font-size: 10px;
}

.fold-icon {
  float: right;
  margin-top: -2px;
  fill: $light;
  height: 18px;
  // transform-origin: 50% 50%;
  transition: all 0.15s cubic-bezier(0, 0, 0.2, 1);
}

.fold-icon.flip {
  transform: rotate(-90deg);
}

.fold-content {
  padding: 6px 0 6px 0;
}
</style>