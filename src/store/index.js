import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import list from "./modules/list";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    list
  }
});
