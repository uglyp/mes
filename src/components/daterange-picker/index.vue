<template>
  <el-date-picker
    v-model="currentVal"
    type="daterange"
    align="right"
    unlink-panels
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="yyyy-MM-dd"
    :picker-options="pickerOptions"
  ></el-date-picker>
</template>

<script>
export default {
  name: 'daterange-picker',
  props: {
    pickerOptions: {
      type: Object,
      default() {
        return {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        };
      }
    },

    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentVal: this.value
    };
  },

  watch: {
    value: {
      handler(val, oldVal) {
        this.currentVal = val;
      },
      immediate: true
    },

    currentVal(val, oldVal) {
      this.$emit('input', val);
    }
  }
};
</script>

<style>
</style>
