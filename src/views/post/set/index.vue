<template>
  <div>
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
                @click="handleAction('view', scope.row.postid)"
              ></i>
              <i
                class="iconfont iconziyuan mr15"
                title="编辑"
                @click="handleAction('edit', scope.row.postid)"
              ></i>
              <i
                class="iconfont iconzuzhijigou mr15"
                title="岗位组织"
                @click="handleAction('org', scope.row.postid)"
              ></i>
              <i
                class="iconfont iconjuesequanxian"
                title="岗位人员"
                @click="handleAction('user', scope.row)"
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
          label: '岗位编号',
          prop: 'postid'
        },
        {
          label: '岗位名称',
          prop: 'postname'
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '录入人',
          prop: 'inputempname'
        },
        {
          label: '录入时间',
          prop: 'inputdatetime'
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

      this.$api.position.select(args).then(res => {
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
        path: '/post/set/modal',
        query: {
          type: 'add'
        }
      })
    },

    // 查看&编辑
    handleAction(type, row) {
      // 岗位人员
      if (type === 'user') {
        this.$router.push({
          path: '/post/set/modal-user',
          query: {
            id: row.postid,
            name: row.postname
          }
        })

        return
      }
      // 组织人员
      if (type === 'org') {
        this.$router.push({
          path: '/post/set/modal-menu',
          query: {
            id: row
          }
        })

        return
      }
      this.$router.push({
        path: '/post/set/modal',
        query: {
          type,
          id: row
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

      this.$confirm('确定要删除角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const postid = multipleSelection.map(item => item.postid)
          this.$api.role.delete({ postids: postid.toString() }).then(() => {
            this.$message.success('删除角色成功')
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
