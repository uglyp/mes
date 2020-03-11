<template>
  <div class="layout">
    <div class="main">
      <section class="left-box">
        <span class="header">全部人员</span>
        <div class="body">
          <div class="body-search">
            <el-input v-model.trim="empname" clearable class="mr20" placeholder="请在此输入姓名"></el-input>
            <el-button type="primary" @click="handleAllSearch">搜索</el-button>
          </div>
          <el-table
            :data="tableDataLeft"
            @selection-change="handleSelectionLeftChange"
            max-height="390"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="empno" label="人员编号"></el-table-column>
            <el-table-column prop="empname" label="人员名称"></el-table-column>
          </el-table>
        </div>
      </section>
      <section class="center-box">
        <el-button type="primary" @click="handleToRight">＞</el-button>
        <br />
        <el-button type="primary" @click="handleToLeft">＜</el-button>
      </section>
      <section class="right-box">
        <span class="header">{{postname}}</span>
        <div class="body">
          <div class="body-search">
            <el-input v-model.trim="selectName" clearable class="mr20" placeholder="请在此输入姓名"></el-input>
            <el-button type="primary">搜索</el-button>
          </div>
          <el-table
            :data="tableDataRight"
            style="width: 100%"
            @selection-change="handleSelectionRightChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="empno" label="人员编号"></el-table-column>
            <el-table-column prop="empname" label="人员名称"></el-table-column>
          </el-table>
        </div>
      </section>
    </div>

    <footer class="footer">
      <el-button type="primary" class="mr20" @click="handleSubmit">保存</el-button>
      <el-button type="danger" @click="handleBack">返回</el-button>
    </footer>
  </div>
</template>

<script>
import auth from '@/service/auth'

export default {
  name: 'modal-user',
  data() {
    return {
      postid: this.$route.query.id,
      postname: this.$route.query.name,
      empname: '',
      selectName: '',

      tableDataLeft: [],
      tableDataRight: [],
      multipleSelectionLeft: [],
      multipleSelectionRight: []
    }
  },

  watch: {
    empname: {
      handler(val) {
        this.getAllUser()
      }
    },

    selectName: {
      handler(val) {
        const data = [...this.tableDataRight]

        if (!val) {
          this.getSelectUser()
          return
        }
        this.tableDataRight = data.filter(item => item.empname === val)
      }
    }
  },

  methods: {
    getAllUser() {
      this.$api.sysEmployee
        .queryAllByEmpName({ pid: this.postid, empname: this.empname })
        .then(res => {
          this.tableDataLeft = res
        })
    },

    getSelectUser() {
      this.$api.position.selectEmp({ pid: this.postid }).then(res => {
        this.tableDataRight = res
      })
    },

    handleSelectionLeftChange(val) {
      this.multipleSelectionLeft = val
    },

    handleSelectionRightChange(val) {
      this.multipleSelectionRight = val
    },

    handleAllSearch() {
      this.getAllUser()
    },

    handleToLeft() {
      const { tableDataRight, multipleSelectionRight } = this
      let allData = [...tableDataRight]

      if (!multipleSelectionRight.length) {
        this.$message.warning('请选择人员')
        return
      }

      multipleSelectionRight.map(item => {
        allData.map((sub, index) => {
          if (item.empid === sub.empid) {
            this.tableDataLeft = [...this.tableDataLeft, ...allData.splice(index, 1)]
          }
        })
      })
      this.tableDataRight = allData
    },

    handleToRight() {
      const { tableDataLeft, multipleSelectionLeft } = this
      let allData = [...tableDataLeft]

      if (!multipleSelectionLeft.length) {
        this.$message.warning('请选择人员')
        return
      }

      multipleSelectionLeft.map(item => {
        allData.map((sub, index) => {
          if (item.empid === sub.empid) {
            this.tableDataRight = [...this.tableDataRight, ...allData.splice(index, 1)]
          }
        })
      })
      this.tableDataLeft = allData
    },

    handleSubmit() {
      const params = {
        postid: this.postid,
        empIds: String(this.tableDataRight.map(item => item.empid))
      }
      this.$api.position.updatePositionPeo(params).then(() => {
        this.$message.success('岗位人员配置成功')
        this.$router.go(-1)
      })
    },

    // 返回
    handleBack() {
      this.$router.go(-1)
    }
  },

  created() {
    this.getAllUser()
    this.getSelectUser()
  }
}
</script>

<style lang='scss' scoped>
.layout {
  padding: 40px;
  background-color: #fff;
}
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-box {
  width: 685px;
  height: 620px;
  overflow: hidden;
  border: 1px solid $colorBorder;
}
.header {
  display: block;
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
  background: linear-gradient(
    0deg,
    rgba(240, 239, 239, 1),
    rgba(255, 255, 255, 1)
  );
}
.body {
  margin: 40px 30px;
}
.body-search {
  display: flex;
  justify-content: space-between;
}
.mr20 {
  margin-right: 20px;
}
.center-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-button + .el-button {
  margin-left: 0;
}
.right-box {
  @extend .left-box;
}
.footer {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>
