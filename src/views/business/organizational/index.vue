<template>
  <div class="layout">
    <section class="org-tree">
      <div class="search-btn-panel-icon">
        <span @click="handleTreeAdd" v-if="level !== 3">
          <i class="iconfont iconxinzeng"></i>
        </span>
        <span @click="handleTreeDelete">
          <i class="iconfont iconshanchu"></i>
        </span>
        <!-- <span>
          <i class="iconfont iconzhankai icon-sort"></i>
        </span>
        <span>
          <i class="iconfont iconheqi icon-sort"></i>
        </span>-->
      </div>
      <div class="tree-box">
        <el-tree
          node-key="orgid"
          highlight-current
          :data="treeData"
          :props="defaultProps"
          :default-expanded-keys="[1]"
          :default-checked-keys="defaultCheckedKeys"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
    </section>
    <section class="form-box">
      <span class="title">{{title}}信息{{type === 'view' ? '查看' : '编辑'}}</span>
      <div class="info-title">
        <el-divider>基本信息</el-divider>
      </div>
      <el-button
        type="primary"
        class="form-box-btn"
        @click="handleBtn"
      >{{type === 'view' ? '修改' : '保存'}}</el-button>
      <el-form :model="form" :rules="rules" ref="form" style="width: 90%">
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="工厂名称" prop="orgname" label-width="150px">
              <el-input v-model.trim="form.orgname" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="tel" label-width="150px">
              <el-input v-model.trim="form.tel" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="负责人" prop="contact" label-width="150px">
              <el-input v-model.trim="form.contact" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人电话" prop="contacttel" label-width="150px">
              <el-input
                v-model.trim="form.contacttel"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="管理人员1" prop="manager1" label-width="150px">
              <el-input
                v-model.trim="form.manager1"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理人员1电话" prop="manager1tel" label-width="150px">
              <el-input
                v-model.trim="form.manager1tel"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="管理人员2" prop="manager2" label-width="150px">
              <el-input
                v-model.trim="form.manager2"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理人员2电话" prop="manager2tel" label-width="150px">
              <el-input
                v-model.trim="form.manager2tel"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="上班时间" prop="onworktime" label-width="150px">
              <el-time-select
                :disabled="type === 'view'"
                v-model.trim="form.onworktime"
                :picker-options="{
                  start: '06:00',
                  step: '00:05',
                  end: '24:00'
                }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下班时间" prop="offworktime" label-width="150px">
              <el-time-select
                :disabled="type === 'view'"
                v-model.trim="form.offworktime"
                :picker-options="{
                  start: '06:00',
                  step: '00:05',
                  end: '24:00'
                }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="地址" prop="address" label-width="150px">
          <el-input :disabled="type === 'view'" placeholder="请在此输入" v-model.trim="form.address"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark" label-width="150px">
          <el-input
            type="textarea"
            :disabled="type === 'view'"
            placeholder="请在此输入"
            v-model.trim="form.remark"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item v-if="type === 'view'">
          <el-col :span="12">
            <el-form-item label="录入人" prop="inputempname" label-width="150px">
              <el-input
                v-model.trim="form.inputEmpName"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="录入时间" prop="inputDateTime" label-width="150px">
              <el-input
                v-model.trim="form.inputDateTime"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>

      <section class="info-user-title">
        <el-divider>人员信息</el-divider>
      </section>
      <div class="table-box">
        <flex-table :data="tableData" :colConfigs="colConfigs"></flex-table>
        <pagination @pageChange="pageChange" :page="page"></pagination>
      </div>
    </section>
  </div>
</template>

<script>
import auth from '@/service/auth'
import FlexTable from '@/components/flex-table'
import Pagination from '@/components/pagination'
import mixinTable from '@/mixins/table'

export default {
  name: 'modal',
  mixins: [mixinTable],
  components: {
    FlexTable,
    Pagination
  },

  data() {
    return {
      type: 'view',
      defaultCheckedKeys: [], // 树默认选中项
      defaultProps: {
        children: 'child',
        label: 'orgname'
      },
      level: 1, // 1：工厂，2：车间；3：班组
      currentOrgId: null, // 当前树结点ID
      parentorgid: null, // 父ID
      treeData: [],
      form: {},
      colConfigs: [
        {
          label: '人员编号',
          prop: 'empid',
          width: 70
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
          label: '岗位类型',
          prop: 'postionName'
        },
        {
          label: '状态',
          prop: 'statusname'
        },
        {
          slot: 'action'
        }
      ],

      rules: {
        orgname: [{ required: true, message: '请输入组织名称' }],
        contact: [{ required: true, message: '请输入负责人' }],
        contacttel: [{ required: true, message: '请输入负责人电话' }]
      }
    }
  },

  watch: {
    level: {
      handler(val) {
        if (val === 1) {
          this.title = '工厂'
        } else if (val === 2) {
          this.title = '车间'
        } else {
          this.title = '班组'
        }
      },

      immediate: true
    }
  },

  methods: {
    // 查询树
    getTreeData() {
      this.$api.sysOrganization.getList().then(res => {
        let arr = []
        if (res && res[0]) {
          arr = [
            {
              child: res,
              orgname: res[0].corpName,
              orgid: 0,
              level: 0
            }
          ]
          this.queryAllFactory(res[0].orgid)
          this.getDetail(res[0].orgid)
          this.defaultCheckedKeys = [res[0].orgid]
          this.level = res[0].level
          this.currentOrgId = res[0].orgid
          this.parentorgid = res[0].parentorgid
        }
        this.treeData = arr
      })
    },

    // 查询详情
    getDetail(id) {
      const { type } = this

      this.$api.sysOrganization.getDetail({ orgid: id }).then(res => {
        const user = auth.getUser()
        this.form = Object.assign({}, res, { inputEmpName: user.empname })
      })
    },

    // 查工厂列表
    queryAllFactory(factoryid) {
      const { currentPag, pageSize } = this.page
      const params = {
        currentPag,
        pageSize,
        factoryid
      }
      this.$api.sysEmployee.queryAllFactory(params).then(res => {
        const { items, pageSize, currentPag, totalNum } = res
        this.tableData = items
        this.page = {
          currentPag,
          pageSize,
          recordsTotal: totalNum
        }
      })
    },

    // 查询车间列表
    queryAllWorkShop(workShopid) {
      const { currentPag, pageSize } = this.page
      const params = {
        currentPag,
        pageSize,
        workShopid
      }
      this.$api.sysEmployee.queryAllFactory(params).then(res => {
        const { items, pageSize, currentPag, totalNum } = res
        this.tableData = items
        this.page = {
          currentPag,
          pageSize,
          recordsTotal: totalNum
        }
      })
    },

    // 查询班组列表
    queryAllClass(classid) {
      const { currentPag, pageSize } = this.page
      const params = {
        currentPag,
        pageSize,
        classid
      }
      this.$api.sysEmployee.queryAllFactory(params).then(res => {
        const { items, pageSize, currentPag, totalNum } = res
        this.tableData = items
        this.page = {
          currentPag,
          pageSize,
          recordsTotal: totalNum
        }
      })
    },

    // 添加树结点
    handleTreeAdd() {
      this.$router.push({
        path: '/business/organizational/modal',
        query: {
          level: this.level,
          parentorgid: this.orgid
        }
      })
    },

    // 删除树结点
    handleTreeDelete() {
      this.$api.sysOrganization
        .delete({ orgids: this.currentOrgId })
        .then(() => {
          this.$message.success('删除成功')
          this.getTreeData()
        })
    },

    // 点击树结点
    handleNodeClick(data) {
      console.log('treedata', data)
      const { level, orgid } = data
      this.level = level
      this.currentOrgId = orgid
      this.parentorgid = orgid
      if (level === 0) {
        this.parentorgid = 0
        return
      }
      if (level === 1) {
        // 工厂
        this.queryAllFactory(orgid)
      } else if (level === 2) {
        // 车间
        this.queryAllWorkShop(orgid)
      } else {
        // 班组
        this.queryAllClass(orgid)
      }

      this.getDetail(orgid)
    },

    handleBtn() {
      const { type } = this
      if (type === 'view') {
        this.type = 'edit'
      } else {
        this.$api.sysOrganization.update({ ...this.form }).then(() => {
          this.type = 'view'
          this.$message.success('修改成功')
        })
      }
    },

    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { type, corpId } = this
          const event = type === 'add' ? 'addSysCompany' : 'updateSysCompany'
          const params = { ...this.form }
          if (type === 'edit') {
            params.corpId = corpId
          }
          this.$api.business[event](params).then(() => {
            this.$message.success(
              `${type === 'add' ? '新增' : '编辑'}企业信息成功`
            )
            this.$router.go(-1)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },

  created() {
    this.getTreeData()
  }
}
</script>

<style lang='scss' scoped>
.layout {
  display: flex;
  padding: 0 0 20px 0;
}

.org-tree {
  flex-shrink: 0;
  position: relative;
  width: 285px;
  margin-right: 10px;
  border: 1px solid $colorBorder;
  background-color: #fff;
}
.search-btn-panel-icon {
  display: flex;
  justify-content: flex-end;
  padding: 20px 10px;
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
.tree-box {
  position: absolute;
  top: 75px;
  bottom: 10px;
  right: 10px;
  left: 10px;
  padding-top: 10px;
  background-color: $colorBg;

  .el-tree {
    background-color: $colorBg;
  }
  ::v-deep {
    .el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content {
      color: $primary;
    }
  }
}

.form-box {
  position: relative;
  flex: 1;
  padding: 20px 30px;
  border: 1px solid $colorBorder;
  background-color: #fff;
}
.title {
  position: relative;
  padding-left: 10px;
  color: $color6;
  font-size: 20px;
  &::before {
    position: absolute;
    left: 0;
    top: 2px;
    content: '';
    height: 20px;
    border-left: 4px solid $primary;
  }
}
.form-box-btn {
  position: absolute;
  right: 40px;
  top: 50px;
}
.info-title {
  width: 300px;
  margin: 50px auto 45px;
  text-align: center;
  .el-divider__text {
    color: $primary;
    font-size: 20px;
  }
}
.info-user-title {
  @extend .info-title;
  margin-top: 70px;
}
</style>
