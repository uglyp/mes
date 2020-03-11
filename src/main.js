import Vue from 'vue';
import ElementUI from 'element-ui';
import './assets/scss/partials/element-variables.scss'
import bus from '@/service/bus';
import App from './app';
import router from './routes';
import store from './store';
import Api from './api';
import filters from './filters';
import echarts from 'echarts';
import flexible from '@/libs/flexible'

// 引入 Element
Vue.use(ElementUI);

// 全局挂载 filter
Object.keys(filters).forEach((key, index) => {
  Vue.filter(key, filters[key]);
});

// 挂载 Api, 在组件内可直接 this.$api 访问
Vue.use(Api);

// 挂载Event-Bus, 在组件内可直接 this.$bus 访问
Vue.use(bus);
Vue.prototype.$flexible = flexible
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
