<template>
  <div>
    <div class="right-box-title">
      <i class="iconfont icondaibanshixiang"></i>
      <span
        class="line"
        :class="{'selected': index === active}"
        v-for="(item, index) in tabData"
        :key="index"
        @click="handleClick(index)"
      >{{item}}</span>
    </div>
    <ul class="right-box-items">
      <li class="right-box-item" v-for="item in taskData" :key="item.id">
        <div class="right-box-item-left">
          <span class="status">{{item.status}}</span>
          <span class="content">{{item.content}}</span>
        </div>

        <span class="time">{{item.time}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'task',
  data() {
    return {
      active: 0,
      tabData: ['待办事项','我发起的','已完成'],
      taskData: [
        {
          id: 1,
          status: "订单管理",
          content: "0655777号订单进行中",
          time: "2020/01/01 12:11:10"
        },
        {
          id: 2,
          status: "人员管理",
          content: "02车间丽莎请假申请待批准，请及时阅读… ",
          time: "2020/01/01 12:11:10"
        },
        {
          id: 3,
          status: "人员管理",
          content: "02车间丽莎请假申请待批准，请及时阅读… ",
          time: "2020/01/01 12:11:10"
        },
        {
          id: 4,
          status: "人员管理",
          content: "02车间丽莎请假申请待批准，请及时阅读… ",
          time: "2020/01/01 12:11:10"
        },
        {
          id: 5,
          status: "人员管理",
          content: "02车间丽莎请假申请待批准，请及时阅读… ",
          time: "2020/01/01 12:11:10"
        },
        {
          id: 6,
          status: "人员管理",
          content: "02车间丽莎请假申请待批准，请及时阅读… ",
          time: "2020/01/01 12:11:10"
        },
        {
          id: 7,
          status: "人员管理",
          content: "02车间丽莎请假申请待批准，请及时阅读… ",
          time: "2020/01/01 12:11:10"
        }
      ]
    };
  },

  methods: {
      handleClick(index) {
          this.active = index
      }
  }
};
</script>

<style lang="scss" scoped>
.right-box-title {
  display: flex;
  align-items: center;
  margin: 20px 0 10px 15px;
  i {
    margin-right: 10px;
  }
  span {
    margin-right: 16px;
    color: $color9;
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
      top: 2px;
      left: -8px;
      height: 18px;
      content: "";
      border-left: 1px solid $colorBorder;
    }
  }
  .line:nth-of-type(1) {
    &::before {
      border-left: 0;
    }
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