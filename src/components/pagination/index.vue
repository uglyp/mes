<template>
  <section class="pagination" v-show="page.recordsTotal">
    <el-pagination @current-change="handleCurrentChange" :current-page="page.currentPage" :page-size="page.pageSize" layout="total, prev, pager, next, jumper" :total="page.recordsTotal">
    </el-pagination>
  </section>
</template>
<script>

export default {

  name: 'pagination',

  props: {
    page: {
      type: Object,
      default() {
        return {
          pageSize: 15,
          currentPag: 1,
          recordsTotal: 0
        };
      }
    }
  },

  data() {
    return {

    };
  },

  methods: {
    handleCurrentChange(...args) {
      this.$emit('pageChange', args);
    }
  }
};

</script>
<style lang="scss" scoped>
.pagination {
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
}
</style>

