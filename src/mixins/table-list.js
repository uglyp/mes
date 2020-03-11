export default {
  data() {
    return {
      tableData: [],
      page: {
        currentPag: 1,
        pageSize: 20,
        recordsTotal: 0
      },

      searchParams: {}
    };
  },

  methods: {
    pageChange(val) {
      this.getTableData({
        currentPag: val[0]
      });
    },

    showEditModal(id = '') {
      this.$refs.editModal.show(id);
    },

    search() {
      this.searchParams = Object.assign({}, this.searchQuery);

      this.getTableData({
        currentPag: 1
      });
    },

    getSearchParams() {
      return this.searchParams;
    },

    getTableData(params = {}) {
      const { api, resultKey = 'resultList' } = this.tableConfig;
      const filterParams = this.getSearchParams();
      params = Object.assign(
        filterParams,
        {
          currentPag: this.page.currentPag,
          pageSize: this.page.pageSize
        },
        params
      );
      api(params).then(response => {
        const { status, data } = response;
        if (status === '1') {
          this.tableData = data[resultKey];
          this.page = data.page;
        }
      });
    },

    reload() {
      this.getTableData();
    }
  },

  created() {
    this.search();
  }
};
