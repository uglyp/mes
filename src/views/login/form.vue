<template>
  <div class="login-card">
    <h2 class="login-header">欢迎登录</h2>
    <el-form ref="form" :model="form" @submit.native="submit">
      <el-form-item>
        <el-autocomplete
          class="input-company"
          v-model="form.company"
          :fetch-suggestions="querySearch"
          placeholder="请输入企业名称"
          :trigger-on-focus="false"
        >
          <i slot="prefix" class="iconfont icongonggao icon-login"></i>
        </el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.EmpEnName" type="text" placeholder="请输入用户名">
          <i slot="prefix" class="iconfont iconren icon-login"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" :type="passwordType" min="6" placeholder="请输入密码">
          <i slot="prefix" class="iconfont icontubiaosvg- icon-login"></i>

          <div slot="suffix">
            <img
              class="icon-password-action"
              src="~@/assets/img/icon-password-hide.png"
              alt
              v-show="passwordType === 'password'"
              @click="passwordType = 'text'"
            />
            <img
              class="icon-password-action"
              src="~@/assets/img/icon-password-show.png"
              alt
              v-show="passwordType === 'text'"
              @click="passwordType = 'password'"
            />
          </div>
        </el-input>
      </el-form-item>

      <div class="error-box">
        <div class="error-box-bg" v-if="errorMsg">
          <i class="iconfont iconcuo error"></i>
          <span>{{errorMsg}}</span>
        </div>
      </div>
      <span class="forget-pwd">忘记密码？</span>
      <el-button class="login-btn" type="primary" native-type="submit">登录</el-button>
    </el-form>
    <div class="tip-box">
      <span>温馨提示：</span>请保管好自己的账号密码，不要轻易 泄露给他人，以防机密外泄！
    </div>
  </div>
</template>

<script>
import { appConf } from '@/config'
import storage from '@/libs/storage'
import auth from '@/service/auth'
import md5 from 'js-md5'

export default {
  name: 'login',
  data() {
    return {
      form: {
        company: '',
        EmpEnName: '',
        password: ''
      },
      errorMsg: '',
      companys: [],
      passwordType: 'password'
    }
  },

  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.companys
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant &&
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
            0
        )
      }
    },

    // 获取公司列表
    getCompanyData() {
      this.$api.login.getCom().then(res => {
        res.map(item => {
          if (item.corpName) {
            this.companys.push({
              value: item.corpName,
              CorpId: item.corpId
            })
          }
        })
      })
    },

    // 表单校验
    validateForm() {
      const {
        form: { company, EmpEnName, password },
        validateField
      } = this
      return (
        validateField('company') &&
        validateField('EmpEnName') &&
        validateField('password')
      )
    },

    validateField(field) {
      const { form } = this
      let msg = ''
      if (field === 'company' && form['company'] === '') {
        msg = '请输入企业名称'
      }

      if (field === 'EmpEnName' && form['EmpEnName'] === '') {
        msg = '请输入用户名'
      }

      if (field === 'password' && form['password'] === '') {
        msg = '请输入密码'
      }

      if (field === 'password' && form['password'].length < 6) {
        msg = '密码长度至少6位！'
      }

      if (msg) {
        this.errorMsg = msg
        return false
      }
      return true
    },

    submit(e) {
      e.preventDefault()
      if (this.validateForm()) {
        this.onSubmit()
      }
    },

    onSubmit() {
      const { company, EmpEnName, password } = this.form
      const params = {
        CorpId: this.companys.filter(item => item.value === company)[0].CorpId,
        password: md5(password).toUpperCase(),
        EmpEnName
      }

      auth.login(params).then(res => {
        if (res) {
          this.errorMsg = '用户名或密码不正确'
          return
        }
        this.$message.success('登录成功！')
        this.redirectTo()
      })
    },

    redirectTo() {
      const redirectUrl = this.$route.query.redirectUrl

      this.$router.push('/')
    }

    // loggedIn() {
    //   auth.loggedIn().then(() => {
    //     this.redirectTo();
    //   });
    // }
  },
  created() {
    // this.loggedIn();
    this.getCompanyData()
  }
}
</script>


<style lang="scss" scoped>
.login-card {
  background: #e7eaef;
  box-shadow: 0px 7px 25px 2px rgba(9, 41, 101, 0.52);
  border-radius: 4px;
  width: 412px;

  padding: 0 40px 33px;
  font-size: 16px;
  z-index: 100;

  ::v-deep {
    .el-form-item {
      margin-bottom: 13px;
    }

    .el-form-item:last-child {
      margin-bottom: 0;
      margin-top: 66px;
    }

    .el-form-item__content {
      line-height: 52px;
    }

    .el-input__inner {
      height: 52px;
      font-size: 16px;
    }

    .el-input--prefix .el-input__inner {
      padding-left: 52px;
    }

    .el-input--suffix .el-input__inner {
      padding-right: 52px;
    }
  }
}

.input-company {
  width: 100%;
}
.login-btn {
  width: 100%;
}

.login-header {
  font-size: 30px;
  padding: 37px 0 25px;
  text-align: center;
  color: $primary;
}

.icon-login {
  width: 22px;
  height: 22px;
  margin: 0 10px;
}

.icon-password-action {
  width: 30px;
  height: 30px;
  margin-right: 17px;
}
.error-box {
  position: absolute;
  top: 295px;
  .error {
    margin-right: 12px;
    font-size: 18px;
  }
}
.error-box-bg {
  display: flex;
  align-items: center;
  width: 330px;
  height: 30px;
  padding: 0 24px;
  color: $red;
  background-color: rgba($red, 0.3);
}
.forget-pwd {
  display: flex;
  justify-content: flex-end;
  margin: 56px 0 12px;
  color: #526474;
}
.tip-box {
  margin-top: 24px;
  line-height: 1.5;
  span {
    color: $red;
  }
}
</style>
