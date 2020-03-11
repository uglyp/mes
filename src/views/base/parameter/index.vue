<template>
  <div class="layout">
    <section class="org-tree">
      <div class="tree-search">
        <el-input
          v-model.trim="filterText"
          clearable
          placeholder="输入关键字进行过滤"
          class="tree-search-text"
        ></el-input>
        <!-- <el-button type="primary" @click="handleSearch">搜索</el-button> -->
      </div>
      <div class="search-btn-panel-icon">
        <span @click="handleTreeAdd">
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
          ref="tree"
          node-key="paramid"
          highlight-current
          :data="treeData"
          :props="defaultProps"
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckedKeys"
          :filter-node-method="filterNode"
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
            <el-form-item label="企业编号" prop="CorpId" label-width="150px">
              <el-input v-model.trim="form.CorpId" disabled placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参数编号" prop="paramcode" label-width="150px">
              <el-input
                v-model.trim="form.paramcode"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="参数名称" prop="paramname" label-width="150px">
              <el-input
                v-model.trim="form.paramname"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名" prop="paramenname" label-width="150px">
              <el-input
                v-model.trim="form.paramenname"
                :disabled="type === 'view'"
                placeholder="请在此输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="状态" prop="status" label-width="150px">
              <el-select v-model="form.status" :disabled="type === 'view'" placeholder="请选择">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.typeid"
                  :label="item.typename"
                  :value="item.typeid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属分类类型" prop="typeid" label-width="150px">
              <el-input v-model.trim="form.typeid" :disabled="type === 'view'" placeholder="请在此输入"></el-input>
            </el-form-item>
          </el-col>
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
      </el-form>
    </section>
  </div>
</template>

<script>
import auth from '@/service/auth'
import keymap from '@/config/key-map'

export default {
  name: 'index',

  data() {
    return {
      keymap,
      type: '',
      title: '',
      defaultExpandedKeys: [], // 树默认展开项
      defaultCheckedKeys: [], // 树默认选中项
      defaultProps: {
        children: 'child',
        label: 'paramname'
      },
      currentTypeId: 0, // 当前树结点ID
      treeData: [],
      statusOptions: [], // 状态
      prodOptions: [], // 生产环节
      filterText: '',
      form: {},

      rules: {
        procName: [{ required: true, message: '请输入基础档案参数名称' }],
        machineTypeId: [{ required: true, message: '请选择设备类型' }]
      }
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  methods: {
    resetForm() {
      const form = this.$refs.form
      form && form.resetFields()
    },

    filterNode(value, data) {
      if (!value) return true
      return data.typename.indexOf(value) !== -1
    },

    // 查询树
    getTreeData() {
      this.$api.baseBussParamType.selectAllByParamCode().then(res => {
        const { currentTypeId } = this
        const { Process1 } = res
        this.treeData = Process1
        // 还没有数据时逻辑
        if (Process1 && !Process1.length) {
          this.type = 'add'
          return
        }
        if (Process1 && Process1[0]) {
          this.defaultExpandedKeys = [Process1[0].typeid]
          this.defaultCheckedKeys = [Process1[0].typeid]
          this.title = Process1[0].procName
          this.type = 'view'
          this.getDetail(Process1[0].typeid)
        }
      })
    },
    

    // 状态
    getStatus() {
      this.$api.baseBussParamType
        .queryByParentTypeid({ parentTypeId: 22 })
        .then(res => {
          this.statusOptions = res.items
        })
    },

    // 生产环节
    getProdType() {
      this.$api.baseBussParamType
        .queryByParentTypeid({ parentTypeId: 35 })
        .then(res => {
          this.prodOptions = res.items
        })
    },

    // 查询详情
    getDetail(id) {
      this.$api.baseBussParamType.queryById({ paramid: id }).then(res => {
        const user = auth.getUser()
        this.form = {
          ...res,
          process: Number(res.process),
          machineType: Number(res.machineType),
          inputEmpName: user.empname,
          CorpId: user.corpid
        }

        console.log('form', this.form)
      })
    },

    // 搜索
    // handleSearch() {
    //   this.getTreeData()
    // },

    // 添加树结点
    handleTreeAdd() {
      this.type = 'add'
      this.resetForm()
    },

    // 删除树结点
    handleTreeDelete() {
      this.$api.baseCraft.delete({ typeid: this.currentTypeId }).then(() => {
        this.$message.success('删除成功')
        this.getTreeData()
      })
    },

    // 点击树结点
    handleNodeClick(data) {
      const { procName, typeid } = data
      this.type = 'view'
      this.title = procName
      this.currentTypeId = typeid
      this.getDetail(typeid)
    },

    handleBtn() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { type } = this
          if (type === 'view') {
            this.type = 'edit'
            return
          }
          if (type === 'add') {
            this.form.parenttypeid = this.currentTypeId || 0
          }
          delete this.form.CorpId

          const event = type === 'add' ? 'add' : 'update'

          this.$api.baseBussParamType[event]({ ...this.form }).then(() => {
            this.type = 'view'
            this.getTreeData()
            this.defaultExpandedKeys = [this.currentTypeId]
            this.$message.success(
              `${type === 'add' ? '添加' : '修改'}基础档案参数成功`
            )
          })
        }
      })
    }
  },

  created() {
    this.getStatus()
    this.getProdType()
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
.tree-search {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid $colorBorder;
}
.tree-search-text {
  margin-right: 10px;
}
.search-btn-panel-icon {
  display: flex;
  justify-content: flex-end;
  padding: 15px 10px;
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
}
.icon-sort {
  font-size: 20px;
}
.tree-box {
  position: absolute;
  top: 135px;
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
