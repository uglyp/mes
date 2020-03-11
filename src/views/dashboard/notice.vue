<template>
  <div>
    <div class="right-box-title">
      <div>
        <i class="iconfont icongonggao"></i>
        <span>企业公告</span>
      </div>
      <span class="more">查看更多→</span>
    </div>
    <ul class="right-box-items">
      <li class="right-box-item" v-for="item in noticeData" :key="item.messId">
        <div class="right-box-item-left">
          <span class="status">{{keymap.noticeType[item.type]}}</span>
          <span class="content">{{item.title}}</span>
        </div>

        <span class="time">{{item.inputDateTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import keymap from "@/config/key-map";

export default {
  name: "notice",
  data() {
    return {
      keymap,
      active: 0,
      tabData: ["待办事项", "我发起的", "已完成"],
      noticeData: []
    };
  },

  methods: {
    // 获取公告
    getNotice() {
      const params = {
        currentPag: 1,
        pageSize: 7
      };
      this.$api.home.getNotice(params).then(res => {
        this.noticeData = res.items;
      });
    }
  },

  created() {
    this.getNotice();
  }
};
</script>

<style lang="scss" scoped>
.right-box-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px 15px;
  i {
    margin-right: 10px;
  }
  span {
    margin-right: 16px;
    font-size: 18px;
    cursor: pointer;
  }
  span.selected {
    color: $primary;
  }
  .line {
    position: relative;
    &::before {
      position: absolute;
      left: -8px;
      height: 18px;
      content: "";
      border: 1px solid $colorBorder;
    }
  }
  .more {
    font-size: 14px;
    color: $color9;
  }
}
.right-box-items {
  padding: 0 15px;
}
.right-box-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  padding-left: 5px;
  font-size: 14px;
  &::before {
    position: absolute;
    content: "·";
    left: -10px;
    color: $primary;
    font-size: 40px;
  }
  .status {
    flex-shrink: 0;
    padding: 3px 5px;
    margin-right: 12px;
    color: $primary;
    background-color: rgba(#005aa9, 0.08);
  }
  .content {
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .time {
    flex-shrink: 0;
    color: $color9;
    font-size: 12px;
  }
}
.right-box-item-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>