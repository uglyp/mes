export default {
  data() {
    return {
      tableData: [],
      page: {
        currentPag: 1,
        pageSize: 20,
        recordsTotal: 0
      }
    };
  },

  methods: {
    pageChange(val) {
      this.getTableData({
        currentPag: val[0]
      });
    }
  }
};
