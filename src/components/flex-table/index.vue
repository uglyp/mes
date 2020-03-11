<template>
  <el-table :data="data" v-bind="tableConfig" @selection-change="handleSelectionChange">
    <template v-for="(colConfig, key) in currentColConfigs">
      <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
      <component
        v-else-if="colConfig.component"
        :is="colConfig.component"
        :col-config="colConfig"
        :key="key"
      ></component>
      <el-table-column v-bind="colConfig" :key="key" v-else></el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: 'flex-table',
  props: {
    data: {
      type: Array,
      required: true
    },
    tableConfig: {
      type: Object,
      default() {
        return {
          border: true,
          size: 'medium'
        }
      }
    },
    colConfigs: {
      type: Array,
      required: true
    },
  },

  computed: {
    currentColConfigs() {
      const { colConfigs } = this
      const defualtColConfig = {
        showOverflowTooltip: true,
        align: 'center',
        formatter(row, column, cellValue) {
          // return typeof cellValue === 'undefined' ? '--' : cellValue
          return cellValue || '--'
        }
      }

      return colConfigs.map(item => {
        return Object.assign({}, defualtColConfig, item)
      })
    }
  },

  methods: {
    handleSelectionChange(val) {
      this.$emit('selectChange', val)
    }
  }
}
</script>

<style>
  .el-table th.gutter{
      display: table-cell!important;
  }
</style>
