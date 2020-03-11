
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'app',
  data() {
    return {};
  },

  methods: {},

  created() {}
};
</script>
<style lang="scss">
@import './assets/scss/partials/reset';
@import './assets/scss/partials/global';
html,
body {
  height: 100%;
  overflow: hidden;
  min-width: 1000px;
  overflow-x: auto;
}

#app {
  height: 100%;
  font-size: 14px;
  overflow: hidden;
}

.el-dialog {
  min-width: 600px;
}

.el-dialog--small {
  width: 720px;
}

.comp-loading {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
