<template>
  <div class="app-wrapper">
    <div class="app-nav">
      <nav-bar></nav-bar>
    </div>
    <div class="app-page">
      <left-menu v-if="showLeftMenu"></left-menu>
      <div class="app-page-main">
        <quick-menu v-if="showQuickMenu"></quick-menu>
        <router-view class="app-page-content"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/nav-bar';
import LeftMenu from '@/components/left-menu';
import QuickMenu from '@/components/quick-menu';

export default {
  name: 'app',
  data() {
    return {};
  },

  computed: {
    showLeftMenu() {
      const {
        $route: { name }
      } = this;
      return name && name !== 'home';
    },

    showQuickMenu() {
      const {
        $route: { name }
      } = this;

      return name && (name !== 'login' && name !== 'home');
    }
  },

  components: {
    NavBar,
    LeftMenu,
    QuickMenu
  }
};
</script>
<style lang="scss">
.app-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.app-nav {
  flex-shrink: 0;
}

.app-page {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.leftmenu {
  width: 200px;
  height: 100%;
  background-color: #fff;
  overflow: auto;
  flex-shrink: 0;
  box-shadow:0px 3px 13px 0px rgba(0,90,167,0.09);
}

.app-page-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 10px;
  overflow: auto;
  background-color: $colorBg;
}
.app-page-content {
  flex: 1;
  margin: 15px 30px 0;
}
</style>
