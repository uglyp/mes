<template>
  <div class="login">
    <el-row class="login-top">
      <div class="login-logo">
        <img src="~@/assets/img/logo.png" alt />
      </div>
    </el-row>
    <img class="title" src="~@/assets/img/login-title.png" />
    <el-row class="login-middle" type="flex" align="middle" justify="center">
      <Brief></Brief>
      <LoginForm></LoginForm>
    </el-row>
    <el-row class="login-footer" type="flex">
      <p class="login-footer-copyright">Copyright  © 海尔数字科技（上海）, All Rights Reserved. </p>
    </el-row>
  </div>
</template>

<script>
import { appConf } from '@/config';
import storage from '@/libs/storage';
import auth from '@/service/auth';
import LoginForm from './form';
import Brief from './brief';

export default {
  name: 'login',
  components: {
    LoginForm,
    Brief
  },
  data() {
    return {};
  },

  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  overflow: auto;
  background: url(~@/assets/img/login-bg.gif) no-repeat center center;
  background-size: cover;
}

.login-top {
  padding: 50px 55px 70px;
}

.login-logo {
  width: 266px;
}
.title {
  width: 907px;
  margin: 0 auto;
}

.login-middle {
  margin-top: 130px;
}

.login-footer {
  flex-direction: column;
  align-items: center;

  &-copyright {
    font-size: 16px;
    opacity: 0.2;
    color: #fff;

    margin-top: 25px;
  }

  padding: 62px 0;
}
</style>
