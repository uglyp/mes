<template>
  <el-select
    v-model="currentVal"
    multiple
    filterable
    clearable
    collapse-tags
    class="select-all"
    :placeholder="placeholder"
    @change="handleChange"
  >
    <li
      data-v-eeac2c3a
      class="el-select-dropdown__item all-select"
      :class="{'selected': allChecked}"
      @click="handleAllChecked"
    >
      <span>全选</span>
    </li>
    <el-option
      v-for="item in options"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
    ></el-option>
  </el-select>
</template>

<script>
import storage from '@/libs/storage';

export default {
  name: 'select-all',
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      currentVal: [],
      allChecked: false
    };
  },

  computed: {
    allValue() {
      const { options, valueKey } = this;

      return options.map(item => item[valueKey]);
    }
  },

  watch: {
    value: {
      handler(val) {
        this.currentVal = val || [];
      },
      immediate: true
    },

    currentVal(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    handleAllChecked() {
      const { allValue } = this;
      this.allChecked = !this.allChecked;

      if (this.allChecked) {
        this.currentVal = [...allValue];
      } else {
        this.currentVal = [];
      }
    },
    handleChange(val) {
      const { allValue } = this;

      // 全选未选，但是其他全部选中
      if (!this.allChecked && val.length === allValue.length) {
        this.allChecked = true;
      }

      // 全选选了，但是取消其他选项
      if (this.allChecked && val.length < allValue.length) {
        this.allChecked = false;
      }
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/function';

.all-select {
  border-bottom: 1px solid #eee;
}

.all-select:hover {
  background-color: transparent !important;
}
</style>
