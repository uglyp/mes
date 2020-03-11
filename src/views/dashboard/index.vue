<template>
  <div class="layout">
    <section class="left-box">
      <div class="left-box-top">
        <div class="quick-menu">
          <span class="quick-menu-title">
            <i class="iconfont icongongwenbao-copy quick-menu-title-icon"></i>我的业务
          </span>
          <ul class="quick-menu-body">
            <li v-for="item in menuData" :key="item.menuid" @click="handlePage(item.pageurl)">
              <span class="quick-menu-body-item" :style="item.class">
                <i class="iconfont" :class="item.iconurl"></i>
              </span>
              <p class="quick-menu-body-label">{{item.menuname}}</p>
            </li>
          </ul>
        </div>
        <div class="quick-statistics">虚位以待...</div>
      </div>
      <div class="left-box-top chart-box">
        <div class="chart-pie" ref="chartPie"></div>
        <div class="chart-line" ref="chartLine"></div>
      </div>
    </section>
    <section class="right-box">
      <div class="right-box-top">
        <my-task></my-task>
      </div>
      <div class="right-box-top">
        <my-notice></my-notice>
      </div>
    </section>
  </div>
</template>

<script>
import auth from "@/service/auth";
import { mapState } from "vuex";
import echartsPie from "@/config/echarts/echarts-pie";
import echartsLine from "@/config/echarts/echarts-line";
import MyTask from "./task";
import MyNotice from "./notice";
// import storage from '@/libs/storage'

export default {
  name: "index",
  components: {
    MyTask,
    MyNotice
  },

  data() {
    return {
      quickMenu: [
        {
          menuname: "基础设置",
          iconurl: "iconjichushezhi",
          class:
            "background:linear-gradient(38deg,rgba(117,118,250,1),rgba(86,87,235,1))"
        },
        {
          menuname: "款式档案",
          iconurl: "iconkuanshitu",
          class:
            "background:linear-gradient(38deg,rgba(41,221,178,1),rgba(42,206,207,1))"
        },
        {
          menuname: "订单管理",
          iconurl: "icondingdanguanliweixuanzhong",
          class:
            "background:linear-gradient(38deg,rgba(241,136,117,1),rgba(251,123,120,1))"
        },
        {
          menuname: "计划管理",
          iconurl: "iconlishibiaodan",
          class:
            "background:linear-gradient(38deg,rgba(246,108,18,1),rgba(246,157,39,1))"
        },
        {
          menuname: "生产管理",
          iconurl: "iconfengrenji",
          class:
            "background:linear-gradient(38deg,rgba(252,85,40,1),rgba(255,126,91,1))"
        },
        {
          menuname: "报表中心",
          iconurl: "iconbaobiaozhongxin",
          class:
            "background:linear-gradient(38deg,rgba(175,105,252,1),rgba(156,65,255,1))"
        },
        {
          menuname: "订单管理",
          iconurl: "icondingdanguanliweixuanzhong",
          class:
            "background:linear-gradient(38deg,rgba(241,136,117,1),rgba(251,123,120,1))"
        },
        {
          menuname: "系统权限",
          iconurl: "iconquanxianshezhi",
          class:
            "background:linear-gradient(38deg,rgba(16,131,224,1),rgba(98,192,234,1))"
        }
        // {
        //   menuname: "基础设置",
        //   iconurl: "iconjichushezhi",
        //   class:
        //     "background:linear-gradient(38deg,rgba(117,118,250,1),rgba(86,87,235,1))"
        // },
        // {
        //   menuname: "款式档案",
        //   iconurl: "iconkuanshitu",
        //   class:
        //     "background:linear-gradient(38deg,rgba(41,221,178,1),rgba(42,206,207,1))"
        // }
      ]
    };
  },

  computed: {
    ...mapState({
      menuData(state) {
        const data = state.app.menuData["menuTwo"];
        const bgColor = [
          "background:linear-gradient(38deg,rgba(117,118,250,1),rgba(86,87,235,1))",
          "background:linear-gradient(38deg,rgba(41,221,178,1),rgba(42,206,207,1))",
          "background:linear-gradient(38deg,rgba(241,136,117,1),rgba(251,123,120,1))",
          "background:linear-gradient(38deg,rgba(246,108,18,1),rgba(246,157,39,1))",
          "background:linear-gradient(38deg,rgba(252,85,40,1),rgba(255,126,91,1))",
          "background:linear-gradient(38deg,rgba(175,105,252,1),rgba(156,65,255,1))",
          "background:linear-gradient(38deg,rgba(241,136,117,1),rgba(251,123,120,1))",
          "background:linear-gradient(38deg,rgba(16,131,224,1),rgba(98,192,234,1))",
          "background:linear-gradient(38deg,rgba(241,136,117,1),rgba(251,123,120,1))",
          "background:linear-gradient(38deg,rgba(117,118,250,1),rgba(86,87,235,1))",
          "background:linear-gradient(38deg,rgba(41,221,178,1),rgba(42,206,207,1))",
        ];
        // let arr = []
        data.map((item, index) => {
          item.class = bgColor[index]
        });
        return data;
      }
    }),
    showUser() {
      const { $route } = this;

      return $route.name && $route.name !== "login";
    }
  },

  methods: {
    //TODO:获取饼状图
    getEchartPie() {
      const myChart = this.$echarts.init(this.$refs.chartPie);
      let options = Object.assign({}, echartsPie);

      options.legend.data = ["A工厂", "B工厂", "C工厂", "D工厂"];
      options.series[0].data = [
        { value: 335, name: "A工厂" },
        { value: 310, name: "B工厂" },
        { value: 234, name: "C工厂" },
        { value: 135, name: "D工厂" }
      ];
      myChart.setOption({ ...echartsPie, ...options });
    },

    // 获取折线图
    getEchartLine() {
      const myChart = this.$echarts.init(this.$refs.chartLine);
      let options = Object.assign({}, echartsLine);

      options.legend.data = ["A工厂", "B工厂", "C工厂", "D工厂"];
      options.series = [
        {
          name: "A工厂",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "B工厂",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "C工厂",
          type: "line",
          stack: "总量",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "D工厂",
          type: "line",
          stack: "总量",
          data: [320, 332, 301, 334, 390, 330, 120]
        }
      ];
      myChart.setOption({ ...echartsLine, ...options });
    },

    handlePage(url) {
      this.$router.push(url)
    }
  },

  mounted() {
    this.getEchartPie();
    this.getEchartLine();
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  margin: 10px;
}
.left-box {
  width: 70%;
  margin-right: 10px;
}
.left-box-top {
  display: flex;
  justify-content: space-between;
  height: 455px;
}
.quick-menu {
  width: 760px;
  height: 455px;
  margin-right: 10px;
  border: 1px solid $colorBorder;
  border-radius: 3px;
  font-size: 18px;
}
.quick-menu-title {
  display: flex;
  align-items: center;
  padding: 15px 0 0 20px;
  margin-bottom: 30px;
  font-weight: 600;
}
.quick-menu-title-icon {
  margin-right: 7px;
  font-size: 24px;
  font-weight: 400;
}
.quick-menu-body {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 0 0 25px;
  li {
    margin: 0 16px 22px;
    cursor: pointer;
  }
  i {
    font-size: 44px;
  }
  i.iconlishibiaodan,
  i.iconquanxianshezhi {
    margin-left: 8px;
  }
  i.iconquanxianshezhi,
  i.iconfengrenji {
    font-size: 44px;
  }
}
.quick-menu-body-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 110px;
  color: $colorF;
  border-radius: 8px;
}
.quick-menu-body-label {
  margin-top: 15px;
  font-size: 16px;
  color: $color6;
  text-align: center;
}
.quick-statistics {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 455px;
  border: 1px solid $colorBorder;
  border-radius: 3px;
}
.chart-box {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  border: 1px solid $colorBorder;
  border-radius: 3px;
}
.chart-pie {
  width: 50%;
  height: 400px;
  padding: 0 20px;
  margin-top: 40px;
  margin-bottom: 20px;
}

.chart-line {
  @extend .chart-pie;
  padding-left: 0;
}
.right-box {
  flex: 1;
}
.right-box-top {
  height: 455px;
  margin-bottom: 10px;
  border: 1px solid $colorBorder;
  border-radius: 3px;
}
</style>

