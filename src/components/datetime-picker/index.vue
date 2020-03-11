<template>
  <el-date-picker v-model="pickerTimeValue" type="datetime" :placeholder="placeholder">
  </el-date-picker>
</template>
<script>

// import formatDate from '@/filters/format-date';

export default {
  name: 'datetime-picker',

  props: {
    value: '',
    placeholder: {
      default: '选择日期时间'
    }
  },

  // data() {
  //   return {
  //     pickerTimeValue: this.value
  //   };
  // },

  computed: {
    pickerTimeValue: {
      get() { return this.value; },
      set(vl) { this.$emit('input', vl || ''); }
    },
  },

  created() {
  }

};
</script>
<style lang="scss" scoped>

</style>

