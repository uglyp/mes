<template>
  <div>
    <el-form :inline="true" :model="form" class="search-panel">
      <el-form-item label="企业名称">
        <el-input v-model="form.corpName" placeholder="请在此输入"></el-input>
      </el-form-item>
      <el-form-item label="组织机构代码">
        <el-input v-model="form.orgCode" placeholder="请在此输入"></el-input>
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
      <flex-table :data="tableData" :colConfigs="colConfigs" @selectChange="callSelectChange">
        <el-table-column label="操作" align="center" slot="action">
          <template slot-scope="scope">
            <span class="table-box-action">
              <i
                class="iconfont iconview mr15"
                title="查看"
                @click="handleAction('view', scope.row.corpId)"
              ></i>
              <i
                class="iconfont iconziyuan"
                title="编辑"
                @click="handleAction('edit', scope.row.corpId)"
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
      multipleSelection: [],
      form: {},
      colConfigs: [
        {
          type: 'selection'
        },
        {
          label: '企业编号',
          prop: 'corpId'
        },
        {
          label: '企业名称',
          prop: 'corpName'
        },
        {
          label: '企业法人',
          prop: 'legalPerson'
        },
        {
          label: '组织机构代码',
          prop: 'orgCode'
        },
        {
          label: '联系人',
          prop: 'contact'
        },
        {
          label: '联系人电话',
          prop: 'contactTel'
        },
        {
          label: '财务人员',
          prop: 'finance'
        },
        {
          label: '财务联系人电话',
          prop: 'financeTel'
        },
        {
          label: '企业地址',
          prop: 'address'
        },
        // {
        //   label: '状态',
        //   prop: 'deleteFlag',
        //   formatter(row, column, cellValue) {
        //     return cellValue === 0 ? '上架中' : '已下架';
        //   }
        // },
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

      this.$api.business.getList(args).then(res => {
        const { items, pageSize, currentPag, totalNum } = res
        this.tableData = items
        this.page = {
          currentPag,
          pageSize,
          recordsTotal: totalNum
        }
      })
    },

    callSelectChange(val) {
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
        path: '/business/info/modal',
        query: {
          type: 'add'
        }
      })
    },

    // 查看&编辑
    handleAction(type, id) {
      this.$router.push({
        path: '/business/info/modal',
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

      this.$confirm('确定要删除企业吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const corpId = multipleSelection.map(item => item.corpId)
          this.$api.business
            .deleteSysCompany({ corpIds: corpId.toString() })
            .then(() => {
              this.$message.success('删除企业成功')
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
  // margin: 15px 20px;
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
