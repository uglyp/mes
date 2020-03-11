<template>
  <div>
    <el-form :inline="true" :model="form" class="search-panel">
      <el-form-item label="姓名">
        <el-input v-model="form.empname" placeholder="请在此输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜 索</el-button>
      </el-form-item>
    </el-form>
    <section class="search-btn-panel">
      <div>
        <el-button type="primary" @click="handleAdd">新 增</el-button>
        <!-- <el-button type="danger" @click="handleRemove">删 除</el-button> -->
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
      <flex-table
        :data="tableData"
        :colConfigs="colConfigs"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="操作" align="center" slot="action">
          <template slot-scope="scope">
            <span class="table-box-action">
              <i
                class="iconfont iconview mr15"
                title="查看"
                @click="handleAction('view', scope.row.empid)"
              ></i>
              <i
                class="iconfont iconziyuan"
                title="编辑"
                @click="handleAction('edit', scope.row.empid)"
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
          label: '人员编号',
          prop: 'empid'
        },
        {
          label: '工号',
          prop: 'empno'
        },
        {
          label: '姓名',
          prop: 'empname'
        },
        {
          label: '性别',
          prop: 'sex',
          formatter(row, column, cellValue) {
            return cellValue === '1' ? '男' : '女'
          }
        },
        {
          label: '身份证号',
          prop: 'idcardno'
        },
        {
          label: '手机号',
          prop: 'tel'
        },
        {
          label: '岗位',
          prop: 'postionName'
        },
        {
          label: '入厂日期',
          prop: 'indate'
        },
        {
          label: '离厂日期',
          prop: 'outdate'
        },
        {
          label: '车间',
          prop: 'workShopname'
        },
        {
          label: '班组',
          prop: 'classname'
        },
        {
          label: '状态',
          prop: 'statusname'
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

      this.$api.sysEmployee.sysEmployeeFind(args).then(res => {
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
    handleSearch() {},

    // 新增
    handleAdd() {
      this.$router.push({
        path: '/person/archives/modal',
        query: {
          type: 'add'
        }
      })
    },

    // 查看&编辑
    handleAction(type, id) {
      this.$router.push({
        path: '/person/archives/modal',
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

      const empid = multipleSelection.map(item => item.empid)
      this.$confirm('确定要删除人员档案吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.sysEmployee.sysEmployeeDelete({ empid: id }).then(() => {
            this.$message.success('删除人员档案成功')
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
.icon-view {
  font-size: 17px;
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
</style>
