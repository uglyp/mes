<template>
  <div class="layout">
    <span
      class="menu-default"
      :class="{'menu-current': item.name === $route.name}"
      v-for="(item, index) in menuData"
      :key="index"
    >
      <i class="iconfont iconxiangmu"></i>
      <router-link :to="item.path" class="menu-text">{{item.title}}</router-link>
      <i class="iconfont iconshuaxin icon-refresh" @click="handleRefresh"></i>
      <i class="iconfont iconerror icon-close" @click="handleClose(item, index)" v-if="item.name !== $route.name"></i>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuData: []
    }
  },

  watch: {
    $route: {
      handler(to, from) {
        const {
          path,
          name,
          meta: { title }
        } = to
        const { menuData } = this
        const nameData = menuData.map(item => item.name)
        if (nameData.includes(name)) {
            return
        }
        this.menuData.push({
          path,
          name,
          title
        })
      },

      immediate: true
    }
  },

  methods: {

    // 刷新
    handleRefresh() {
      this.$router.go(0)
    },

    // 关闭
    handleClose(item, index) {
      const {
        meta: { title }
      } = this.$route
      if (item.title === title) {
        return
      }

      this.menuData.splice(index, 1)
    }
  }
}
</script>

<style lang='scss' scoped>
.layout {
  display: flex;
  padding: 15px 10px 0 20px;
  line-height: 34px;
  font-size: 13px;
  color: $color6;
  background-color: #fff;
}
.menu-default {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.menu-current {
  border: 1px solid $colorBorder;
  border-bottom: 0;
  border-radius: 6px 6px 0 0;
}
.icon-refresh {
  margin-left: 5px;
  cursor: pointer;
}
.icon-close {
  cursor: pointer;
}
.menu-text {
  color: $color6;
}
</style>
