<template>
  <section class="navbar">
    <div class="navbar-left">
      <div class="navbar-title" :class="{'navbar-title-collapse': collapsed}">
        <div class="navbar-logo"></div>
      </div>
      <div class="navbar-toggle">
        <i
          class="navbar-toggle-icon iconfont"
          :title="collapsed ? '展开侧边栏' : '收起侧边栏'"
          :class="`icon-${collapsed ? 'unfold' : 'fold'}`"
          @click="toggleMenu()"
        ></i>
      </div>
    </div>

    <div class="navbar-right">
      <ul class="navbar-right-menu">
        <li class="menu-selected" v-for="item in menuData" :key="item.menuid" @click="handlePage(item.pageurl)">
          <i class="iconfont" :class="item.iconurl"></i>
          {{item.menuname}}
        </li>
      </ul>

      <div class="navbar-user" @mouseenter="handleMouseOver">
        <ul>
          <li>{{user.comName}}</li>
          <li class="navbar-exit">{{user.empname}}</li>
        </ul>
        <i class="iconfont iconxiasanjiao"></i>

        <div class="navbar-user-layer" @mouseleave="handleMouseOut" v-if="showLayer">
          <ul>
            <li>
              姓名
              <span>{{user.empname}}</span>
            </li>
            <li>
              工号
              <span>{{user.empno}}</span>
            </li>
            <li>
              部门
              <span>{{user.empname}}</span>
            </li>
            <li class="update-pwd">
              <el-button type="primary" @click="handleUpdPwd">修改密码</el-button>
            </li>
            <li>
              <i class="iconfont iconwangzhan"></i>官方网站
            </li>
            <li>
              <i class="iconfont iconkefu"></i>联系客服
            </li>
            <li class="layer-item" @click="handleLoginOut">
              <i class="iconfont icontuichudenglu"></i>退出登录
            </li>
          </ul>
        </div>
      </div>

      <div class="pwd-box">
        <el-dialog title="修改密码" width="400px" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
            <el-form-item label="原密码" prop="oldPwd">
              <el-input
                v-model="form.oldPwd"
                type="password"
                minlength="6"
                autocomplete="off"
                placeholder="请在此输入"
              >
                <i slot="suffix" class="iconfont icontubiaosvg-"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-input
                v-model="form.newPwd"
                type="password"
                minlength="6"
                autocomplete="off"
                placeholder="请在此输入"
              >
                <i slot="suffix" class="iconfont icontubiaosvg-"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="重复新密码" prop="newPwdRepeat">
              <el-input
                v-model="form.newPwdRepeat"
                type="password"
                minlength="6"
                autocomplete="off"
                placeholder="请在此输入"
              >
                <i slot="suffix" class="iconfont icontubiaosvg-"></i>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import * as types from '@/store/mutation-types'
import storage from '@/libs/storage'
import auth from '@/service/auth'
import eventBus from '@/libs/event-bus'
import { eventConf } from '@/config'
import md5 from 'js-md5'

export default {
  name: 'nav-bar',

  props: {
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    const validatePass = (rule, value, callback) => {
      if (this.form.checkPass !== '') {
        this.$refs.form.validateField('newPwdRepeat')
      }
      callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: storage.get('user'),
      showLayer: false,
      dialogFormVisible: false,
      form: {
        oldPwd: '',
        newPwd: '',
        newPwdRepeat: ''
      },
      formLabelWidth: '120px',
      rules: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少6位', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少6位', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        newPwdRepeat: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少6位', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    ...mapState({
      collapsed: state => state.app.collapsed,
      menuData: state => state.app.menuData['menuOne']
    })
  },

  methods: {

    handlePage(url) {
      this.$router.push(url)
    },

    // 修改密码
    handleUpdPwd() {
      this.dialogFormVisible = true
    },

    // 弹出右侧弹窗
    handleMouseOver() {
      this.showLayer = true
    },

    // 隐藏右侧弹窗
    handleMouseOut() {
      this.showLayer = false
    },

    handleLoginOut() {
      this.$confirm('确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        auth.logout()
      })
    },

    // 修改密码
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { newPwd, oldPwd } = this.form
          const params = {
            newPwd: md5(newPwd).toUpperCase(),
            oldPwd: md5(oldPwd).toUpperCase(),
            id: this.user.empid
          }
          this.$api.user.updatePassword(params).then(() => {
            this.$message.success('密码修改成功！')
            this.dialogFormVisible = false
          })
        }
      })
    },

    listenEvent() {
      eventBus.$on(eventConf.ELOGIN, () => {
        this.user = storage.get('user')
      })

      eventBus.$on(eventConf.ELOGOUT, () => {
        this.user = null
      })
    },

    toggleMenu() {
      this.$store.commit(types.TOGGLE_MENU)
    }
  },

  created() {
    this.listenEvent()
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  height: 92px;
  color: #fff;
  background-color: $primary;
}

.navbar-left {
  flex-shrink: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  width: 290px;
}

.navbar-title {
  display: flex;
  align-items: center;
  font-size: 24px;
  justify-content: center;
}

.navbar-title.navbar-title-collapse {
  min-width: 0;
  width: 64px;
  margin-right: 0px;
  font-size: 16px;

  .navbar-logo {
    width: 158px;
    height: 42px;
    background: url(~@/assets/img/logo-collapse.png);
  }
}

.navbar-logo {
  margin-left: 12px;
  width: 160px;
  height: 42px;
  background: url('~@/assets/img/logo-collapse.png') no-repeat center center;
  background-size: contain;
}

.navbar-text {
  margin-left: 10px;
  padding: 0 10px;
}

.navbar-toggle {
  margin-right: 20px;
  cursor: pointer;

  .navbar-toggle-icon {
    font-size: 20px;
  }
}
.navbar-right {
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 92px;
}
.navbar-right-menu {
  display: flex;
  flex: 1;
  li {
    display: flex;
    align-items: center;
    padding: 0 30px;
    font-size: 20px;
    cursor: pointer;
  }
  i {
    margin-right: 6px;
    font-size: 35px;
  }
}

.menu-selected {
  // background-color: #004d90;
}

.navbar-user {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 48px;
  margin-right: 10px;
  font-size: 18px;
  text-align: right;
  li {
    flex: 1;
    flex-shrink: 0;
  }
  i {
    margin-left: 10px;
    font-size: 15px;
  }
}
.navbar-user-layer {
  position: absolute;
  top: 55px;
  right: 0;
  width: 190px;
  padding: 20px 0;
  font-size: 14px;
  border-radius: 4px;
  color: $color9;
  background-color: #fff;
  box-shadow: 0px 2px 16px 0px rgba(0, 90, 167, 0.16);
  line-height: 1.8;
  z-index: $zIndexHeader;
  li {
    padding: 0 50px;
    text-align: left;
  }
  span {
    margin-left: 10px;
    color: $color6;
  }
  i {
    margin: 0 10px 0 0;
  }
}

.navbar-exit {
  margin-top: 5px;
  cursor: pointer;
}
.update-pwd {
  position: relative;
  margin: 10px 0 20px;
  &::before {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -13px;
    content: '';
    border-bottom: 1px solid $colorBorder;
  }
}
.layer-item:hover {
  cursor: pointer;
  background-color: #cdd0d2;
}
.pwd-box {
  ::v-deep {
    .el-dialog__header {
      padding: 15px;
      color: #fff;
      background-color: $primary;
    }
    .el-dialog__title,
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .el-dialog__headerbtn {
      top: 18px;
    }
    .el-form-item__content {
      margin-right: 40px;
    }
    .el-form-item__label {
      color: $colorText;
      font-weight: 600;
    }
  }
}
</style>

