<template>
  <el-date-picker clearable v-model="pickerValue" type="daterange" align="right" :placeholder="placeholder" :picker-options="pickerOptions" @change="handelChange">
  </el-date-picker>
</template>
<script>

import formatDate from '@/filters/format-date';

export default {
  name: 'date-picker',

  props: {
    value: '',
    placeholder: {
      type: String,
      default: '请选择日期范围'
    }
  },

  data() {
    return {
      pickerValue: this.value || [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    };
  },

  methods: {
    handelChange() {
      this.$emit('input', {
        startDate: formatDate(this.pickerValue[0]),
        endDate: formatDate(this.pickerValue[1]),
      });
    }
  },

  created() {

  }

};
</script>
<style lang="scss" scoped>

</style>

