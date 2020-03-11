import Vue from 'vue';
import event from '@/config/event';

const v = new Vue();

const bus = {
  event,

  $on(...args) {
    v.$on(...args);
  },

  $off(...args) {
    v.$off(...args);
  },

  $emit(...args) {
    v.$emit(...args);
  },

  $once(...args) {
    v.$once(...args);
  },

  install(Vue) {
    Vue.prototype.$bus = bus;
  }
};

export default bus;
