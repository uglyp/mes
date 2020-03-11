
export default {
  data() {
    return {
      comOptions: [], // 结算方
      detailOptions: [], // 结算明细
      channelOptions: [], // 渠道号
      currentChannelList: [], // 当前选中渠道号
      currentDetailIdList: [], // 当前选中渠道明细号
      currentSettlementIdList: [] // 当前选中结算方
    };
  },

  watch: {
    'search.settlementIdList': {
      handler(val) {
        // 根据结算方获取渠道明细
        const { comOptions, $route: { name } } = this;
        const arr = this.getIdByLabel(val, comOptions);
        if (name !== 'account-manager') {
          this.search.detailIdList = [];
        }
        this.currentSettlementIdList = arr;
        this.getDetailName(arr);
      }
    },


    'search.detailIdList': {
      handler(val) {
        // 根据渠道明细获取渠道号
        const { detailOptions, $route: { name } } = this;
        const arr = this.getIdByLabel(val, detailOptions);
        this.search.channelCodes = [];
        const delParmas = {
          settlementIdList: this.currentSettlementIdList,
          detailIdList: arr
        };
        this.currentDetailIdList = arr;
        this.getChannelName(arr);
        if (name === 'settlement' && val.length) {
          this.findAllDeleteSettlementWithPage(delParmas);
        }
      }

    },

    'search.channelCodes': {
      handler(val) {
        this.currentChannelList = val;
      }
    }
  },

  methods: {

    /**
     * 根据名称遍历获取对应ID
     * @param current当前选项(array,string)
     */
    getIdByLabel(current, all = [], valueKey = 'id', labelKey = 'name') {
      const arr = [];
      if (typeof current === 'string') {
        all.forEach(item => {
          if (item[labelKey] === current) {
            arr.push(item[valueKey]);
          }
        });
      } else if (typeof current === 'number') {
        return [current];
      } else {
        current.forEach(item => {
          all.forEach(itemall => {
            if (item === itemall[labelKey]) {
              arr.push(itemall[valueKey]);
            }
          });
        });
      }

      return arr;
    },

    // 查询结算方
    findAllSettlement(parmas) {
      this.$api.distribution.findAllSettlement(parmas, { showLoading: false }).then(res => {
        const { status, data } = res;
        if (status === '1') {
          this.comOptions = data && data.resultList;
        }
      });
    },

    // 根据结算方获取渠道明细
    getDetailName(val) {
      const params = {
        settlement: val
      };
      this.$api.distribution.findAllDetailsBySettlement(params, { showLoading: false }).then(res => {
        const { status, data } = res;
        if (status === '1') {
          this.detailOptions = data && data.resultList;
        }
      });
    },

    // 根据渠道明细获取渠道号
    getChannelName(val) {
      const params = {
        details: val
      };
      this.$api.distribution.findAllChannelCodeByDetail(params, { showLoading: false }).then(res => {
        const { status, data } = res;
        if (status === '1') {
          this.channelOptions = data && data.resultList;
        }
      });
    }
  }
};
