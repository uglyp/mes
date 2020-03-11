import storage from '@/libs/storage';
import * as types from '../mutation-types';
import api from '@/api';

// initial state
const state = {
  collapsed: storage.get('menuCollapsed') || false,
  menuData: storage.get('menu') || {}
};

const mutations = {
  [types.TOGGLE_MENU](state) {
    state.collapsed = !state.collapsed;

    storage.set('menuCollapsed', state.collapsed);
  },
  [types.GET_MENU](state, data) {
    state.menuData = data;
    storage.set('menu', data)
  }
};

const actions = {
  async getMenu({ state, commit }, params) {
    const res = await api.home.getMenu(params)
    commit(types.GET_MENU, { ...res })
  }
};

export default {
  state,
  mutations,
  actions
};
