<template>
  <div class="layout">
    <section class="form-box">
      <el-form :model="form" ref="form">
        <el-form-item>
          <div v-for="(item, index) in menuList" :key="item.menuid" class="form-item">
            <div class="form-item-first">
              <el-checkbox
                v-model="item.check"
                @change="handleParentChange(index)"
              >{{item.menuname}}</el-checkbox>
            </div>

            <el-checkbox
              v-model="sub.check"
              :key="sub.menuid"
              v-for="sub in item.children"
              @change="handleChildChange(index)"
            >{{sub.menuname}}</el-checkbox>
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
      roleid: this.$route.query.id,
      menuList: [],
      form: {}
    }
  },

  methods: {
    // 查询详情
    getMenu() {
      const { roleid } = this
      this.$api.role.selectMenu({ rid: roleid }).then(res => {
        let subMenuList = []
        let menuList = []
        menuList = res.filter(item => item.parentnodeid === '-1')
        menuList.map((item, index) => {
          res.map(sub => {
            if (item.menuid === sub.parentnodeid) {
              if (menuList[index] && menuList[index].children) {
                menuList[index].children.push(sub)
              } else {
                menuList[index].children = []
              }
            }
          })
        })

        this.menuList = menuList
      })
    },

    // 点击一级目录
    handleParentChange(index) {
      const { menuList } = this

      if (menuList[index].children) {
        menuList[index].children.map(item => {
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
      const checkList = menuList[index].children.filter(item => item.check)
      if (checkList.length) {
        this.menuList[index].check = true
      } else {
        this.menuList[index].check = false
      }
    },

    handleSubmit() {
      const { menuList, roleid } = this
      let menuid = []
      console.log('menuList', menuList)
      menuList.map(item => {
        if (item.check) {
          let child = []
          if (item.children) {
            item.children.map(sub => {
              if (sub.check) {
                child.push(sub.menuid)
              }
            })
          }
          menuid.push(item.menuid, ...child)
        }
      })

      if (!menuid.length) {
        this.$message.warning('请选择角色菜单')
        return
      }

      const params = {
        menuid: menuid.toString(),
        roleid
      }
      this.$api.role.insertRoleMenu(params).then(() => {
        this.$message.success('设置角色菜单成功')
        this.$router.go(-1)
      })
    },

    // 重置
    resetForm() {
      const { menuList } = this
      menuList.map(item => {
        item.check = false
        if (item.children) {
          item.children.map(sub => {
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
