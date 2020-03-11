<template>
  <aside class="leftmenu" :class="{'leftmenu-collapse': collapsed}">
    <el-menu
      :default-active="active"
      text-color="#333"
      active-text-color="#005AA9"
      :router="true"
      :unique-opened="true"
      :collapse="collapsed"
    >
      <template v-for="menu in menuList">
        <el-menu-item
          :index="menu.url"
          :key="menu.url"
          v-if="!menu.subMenu || menu.subMenu.length === 0"
        >
          <i class="iconfont" :class="menu.icon"></i>
          <span slot="title" class="leftmenu-title">{{menu.name}}</span>
        </el-menu-item>
        <el-submenu
          :index="menu.url"
          :key="menu.url"
          v-if="menu.subMenu && menu.subMenu.length > 0"
        >
          <template slot="title">
            <i class="iconfont" :class="menu.icon"></i>
            <span slot="title" class="leftmenu-title">{{menu.name}}</span>
          </template>
          <el-menu-item
            v-for="smenu in menu.subMenu"
            :index="smenu.url"
            :key="smenu.url"
            style="padding-left:35px"
          >
            <i class="iconfont" :class="smenu.icon"></i>
            <span slot="title" class="leftmenu-title">{{smenu.name}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </aside>
</template>
<script>
import { mapState } from 'vuex';
import storage from '@/libs/storage';
import eventBus from '@/libs/event-bus';
import { eventConf } from '@/config';
import menuList from '@/config/menu';

export default {
  name: 'left-menu',

  data() {
    return {
      user: storage.get('user'),
      menuList,
      active: ''
    };
  },

  computed: {
    ...mapState({
      collapsed: state => state.app.collapsed
    })
  },

  methods: {
    listenEvent() {
      eventBus.$on(eventConf.ELOGIN, () => {
        this.user = storage.get('user');
      });

      eventBus.$on(eventConf.ELOGOUT, () => {
        this.user = null;
      });
    }
  },

  created() {
    this.listenEvent();

    setTimeout(() => {
      this.active = this.$route.path;
    }, 10);
  }
};
</script>

<style lang="scss" scoped>
.leftmenu-collapse {
  width: 64px;
}
.el-menu {
  border-right: 0;
  background-color: #fff;
}
.leftmenu-title {
  margin-left: 10px;
}
</style>

