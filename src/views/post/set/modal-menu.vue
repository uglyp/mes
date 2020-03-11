<template>
  <div class="layout">
    <section class="form-box">
      <el-form :model="form" ref="form">
        <el-form-item>
          <div v-for="(item, index) in menuList" :key="item.orgid" class="form-item">
            <div class="form-item-first">
              <el-checkbox
                v-model="item.check"
                @change="handleParentChange(index)"
              >{{item.orgname}}</el-checkbox>
            </div>

            <el-checkbox
              v-model="sub.check"
              :key="sub.orgid"
              v-for="sub in item.child"
              @change="handleChildChange(index)"
            >{{sub.orgname}}</el-checkbox>
          </div>
        </el-form-item>
        <el-form-item label-width="150px" class="form-box-btn">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button type="danger" @click="resetForm()">重置</el-button>
          <el-button type="danger" @click="handleBack()">返回</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import auth from '@/service/auth'

export default {
  name: 'modal-menu',
  data() {
    return {
      postid: this.$route.query.id,
      menuList: [],
      form: {}
    }
  },

  methods: {
    // 查询详情
    getMenu() {
      const { postid } = this
      this.$api.position.selectOrg({ pid: postid }).then(res => {
        this.menuList = res
        // let subMenuList = []
        // let menuList = []
        // menuList = res.filter(item => item.parentorgid === '-1')
        // menuList.map((item, index) => {
        //   res.map(sub => {
        //     if (item.orgid === sub.parentorgid) {
        //       if (menuList[index] && menuList[index].child) {
        //         menuList[index].child.push(sub)
        //       } else {
        //         menuList[index].child = []
        //       }
        //     }
        //   })
        // })

        // this.menuList = menuList
      })
    },

    // 点击一级目录
    handleParentChange(index) {
      const { menuList } = this

      if (menuList[index].child) {
        menuList[index].child.map(item => {
          if (menuList[index].check) {
            item.check = true
          } else {
            item.check = false
          }
        })
      }
    },

    // 点击二级目录
    handleChildChange(index) {
      console.log('index', index)
      const { menuList } = this
      const checkList = menuList[index].child.filter(item => item.check)
      if (checkList.length) {
        this.menuList[index].check = true
      } else {
        this.menuList[index].check = false
      }
    },

    handleSubmit() {
      const { menuList, postid } = this
      let orgid = []
      console.log('menuList', menuList)
      menuList.map(item => {
        if (item.check) {
          let child = []
          if (item.child) {
            item.child.map(sub => {
              if (sub.check) {
                child.push(sub.orgid)
              }
            })
          }
          orgid.push(item.orgid, ...child)
        }
      })

      if (!orgid.length) {
        this.$message.warning('请选择岗位组织')
        return
      }

      const params = {
        orgIds: orgid.toString(),
        postid
      }
      this.$api.position.updatePositionPrg(params).then(() => {
        this.$message.success('设置岗位组织成功')
        this.$router.go(-1)
      })
    },

    // 重置
    resetForm() {
      const { menuList } = this
      menuList.map(item => {
        item.check = false
        if (item.child) {
          item.child.map(sub => {
            sub.check = false
          })
        }
      })
    },

    // 返回
    handleBack() {
      this.$router.go(-1)
    }
  },

  created() {
    this.getMenu()
  }
}
</script>

<style lang='scss' scoped>
.layout {
  padding: 25px 0 20px 0;
  border: 1px solid $colorBorder;
  background-color: #fff;
}
.title {
  position: relative;
  padding-left: 40px;
  color: $color6;
  font-size: 20px;
  &::before {
    position: absolute;
    left: 30px;
    top: 2px;
    content: '';
    height: 20px;
    border-left: 4px solid $primary;
  }
}
.form-box {
  padding: 40px 100px;
}
.form-box-btn {
  margin-top: 80px;
}
.form-item {
  display: flex;
}
.form-item-first {
  width: 150px;
  .el-checkbox,
  .el-checkbox__label {
    font-size: 20px;
  }
}
.mr20 {
  margin-right: 30px;
}
</style>
