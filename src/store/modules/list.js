import * as types from '../mutation-types';

//列表信息
const state = {
  accountList: [],
  businessList: []
};

const mutations = {
  [types.GET_FULL_LIST](state, { listKey, listData = [] }) {
    state[listKey] = listData;
  }
};

const actions = {
  getFullList({ state, commit }, { params, options, config = {} }) {
    const { api, resultKey = '', listKey } = options;

    return new Promise((resolve, reject) => {
      api(params, {
        showLoading: !state[listKey].length,
        ...config
      }).then(res => {
        const { data } = res;
        if (data) {
          const listData = resultKey ? data[resultKey] : data;

          commit(types.GET_FULL_LIST, {
            listKey,
            listData
          });

          resolve(listData);
        }
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
