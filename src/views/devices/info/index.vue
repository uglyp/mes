<template>
  <div>
    <el-form :inline="true" :model="form" class="search-panel">
      <el-form-item label="设备名称">
        <el-input v-model.trim="form.name" placeholder="请在此输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜 索</el-button>
      </el-form-item>
    </el-form>
    <section class="search-btn-panel">
      <div>
        <el-button type="primary" @click="handleAdd">新 增</el-button>
        <el-button type="danger" @click="handleRemove">删 除</el-button>
      </div>
      <div class="search-btn-panel-icon">
        <span>
          <i class="iconfont iconshaixuan"></i>
        </span>
        <span>
          <i class="iconfont icondaoru"></i>
        </span>
        <span>
          <i class="iconfont icondaochu"></i>
        </span>
        <span>
          <i class="iconfont icondayin icon-print"></i>
        </span>
      </div>
    </section>

    <section class="table-box">
      <flex-table :data="tableData" :colConfigs="colConfigs" @selectChange="handleSelectionChange">
        <el-table-column label="操作" align="center" slot="action">
          <template slot-scope="scope">
            <span class="table-box-action">
              <i
                class="iconfont iconview mr15"
                title="查看"
                @click="handleAction('view', scope.row.macId)"
              ></i>
              <i
                class="iconfont iconziyuan"
                title="编辑"
                @click="handleAction('edit', scope.row.macId)"
              ></i>
            </span>
          </template>
        </el-table-column>
      </flex-table>
      <pagination @pageChange="pageChange" :page="page"></pagination>
    </section>
  </div>
</template>

<script>
import FlexTable from '@/components/flex-table'
import Pagination from '@/components/pagination'
import MyModal from './modal'
import mixinTable from '@/mixins/table'
import keymap from '@/config/key-map'

export default {
  name: 'list',
  mixins: [mixinTable],
  components: {
    FlexTable,
    Pagination,
    MyModal
  },
  data() {
    return {
      keymap,
      multipleSelection: [],
      form: {},
      colConfigs: [
        {
          type: 'selection'
        },
        {
          label: '设备名称',
          prop: 'macName'
        },
        {
          label: '设备编码',
          prop: 'macNo'
        },
        {
          label: '设备规格型号',
          prop: 'model'
        },
        {
          label: '单位',
          prop: 'unit'
        },
        {
          label: '使用地点',
          prop: 'usePlace'
        },
        {
          label: '注意事项',
          prop: 'notes'
        },
        {
          label: '所属工厂',
          prop: 'factoryName'
        },
        {
          label: '所属车间',
          prop: 'workShopName'
        },
        {
          label: '设备类型',
          prop: 'typeId',
          formatter(row, column, cellValue) {
            return cellValue ? keymap.deviceType[cellValue] : '--'
          }
        },
        {
          label: '购入时间',
          prop: 'buyDate'
        },
        {
          label: '启用时间',
          prop: 'startUseDate'
        },
        {
          label: '停用时间',
          prop: 'stopUseDate'
        },
        // {
        //   label: '报废时间',
        //   prop: 'scrapDate',
        //   formatter(row, column, cellValue) {
        //     return cellValue ? keymap.userStatus[cellValue] : '--'
        //   }
        // },
        {
          label: '备注信息',
          prop: 'remark'
        },
        {
          slot: 'action'
        }
      ]
    }
  },

  methods: {
    filterParams() {
      const params = Object.assign({}, this.form)
      return params
    },

    getTableData(params) {
      const filter = this.filterParams()
      const { currentPag, pageSize } = this.page
      const args = {
        ...filter,
        currentPag,
        pageSize,
        ...params
      }

      this.$api.sysMachine.getList(args).then(res => {
        const { items, pageSize, currentPag, totalNum } = res
        this.tableData = items
        this.page = {
          currentPag,
          pageSize,
          recordsTotal: totalNum
        }
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 搜索
    handleSearch() {
      this.getTableData({
        currentPag: 1
      })
    },

    // 新增
    handleAdd() {
      this.$router.push({
        path: '/devices/info/modal',
        query: {
          type: 'add'
        }
      })
    },

    // 查看&编辑
    handleAction(type, id) {
      this.$router.push({
        path: '/devices/info/modal',
        query: {
          type,
          id
        }
      })
    },

    // 删除
    handleRemove() {
      const { multipleSelection } = this
      if (!multipleSelection.length) {
        this.$message.error('请选择删除项')
        return
      }
      const macId = multipleSelection.map(item => item.macId)

      this.$confirm('确定要删除设备信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.sysMachine.delete({ macId }).then(() => {
            this.$message.success('删除设备信息成功')
            this.getTableData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },

  created() {
    this.getTableData()
  }
}
</script>

<style lang='scss' scoped>
.form-search {
  padding: 22px 20px 0;
  background-color: #fff;
  border: 1px solid $colorBorder;
}
.search-btn-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-btn-panel-icon {
  display: flex;
  color: $color6;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -1px;
    width: 40px;
    height: 40px;
    background: linear-gradient(
      0deg,
      rgba(240, 239, 239, 1),
      rgba(255, 255, 255, 1)
    );
    border: 1px solid $colorBorder;
    border-radius: 1px;
  }
  i {
    font-size: 20px;
  }
  .icon-print {
    font-size: 26px;
  }
}
.table-box-action {
  i {
    position: relative;
    font-size: 20px;
    cursor: pointer;
    &::after {
      position: absolute;
      right: -8px;
      top: 2px;
      content: '';
      height: 18px;
      border-right: 1px solid $colorBorder;
    }
  }
  i:last-child {
    &::after {
      border-right: 0;
    }
  }
}
</style>
