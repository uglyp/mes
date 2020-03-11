<template>
  <div class="banner">
    <el-card class="search-card">
      <el-row type="flex" justify="space-between" align="middle">
        <span class="search-left">
          <el-button type="primary" @click="showModal('add')" size="small">新增</el-button>
        </span>
        <span class="search-right">
          <span class="search-input">
            <el-input v-model="search.productValue" placeholder="请输入产品名称" clearable size="small"></el-input>
          </span>
          <el-button type="primary" icon="el-icon-search" @click="searchBtn" size="small">搜索</el-button>
        </span>
      </el-row>
    </el-card>

    <el-card class="mt20">
      <FlexTable :data="tableData" :colConfigs="colConfigs">
        <el-table-column label="操作" width="160px" align="center" slot="action">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="showModal('edit', scope.row.id)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteItem(scope.row.id)"
              v-if="scope.row.deleteFlag === 0"
            >下架</el-button>
            <el-button size="small" type="primary" @click="putawayItem(scope.row.id)" v-else>上架</el-button>
          </template>
        </el-table-column>
      </FlexTable>
    </el-card>
    <Pagination @pageChange="pageChange" :page="page"></Pagination>
    <Modal ref="modal" @reload="reloadTable"></Modal>
  </div>
</template>
<script>
import Pagination from '@/components/pagination';
import { keyMap } from '@/config';
import mixin from '@/mixins/table';
import FlexTable from '@/components/flex-table';
import Modal from './modal';
import { mapState } from 'vuex';

export default {
  name: 'loan',
  components: {
    Pagination,
    Modal,
    FlexTable
  },
  mixins: [mixin],
  data() {
    return {
      search: {
        templateValue: '',
        typeValue: '',
        productValue: ''
        // productLabelId: ''
      },
      colConfigs: [
        {
          label: '编号',
          type: 'index'
        },
        {
          label: '商户名称',
          prop: 'businessName'
        },
        {
          label: '产品名称',
          prop: 'productName'
        },
        {
          label: '结算方式',
          prop: 'settleType'
        },
        {
          label: '合作单价',
          prop: 'price'
        },
        {
          label: '状态',
          prop: 'deleteFlag',
          formatter(row, column, cellValue) {
            return cellValue === 0 ? '上架中' : '已下架';
          }
        },
        {
          slot: 'action'
        }
      ],
      keyMap,
      templateOptions: [],
      categoryOptions: [],
      // labelOptions: [],
      categoryBatch: [],
      tableData: [],
      multipleSelection: [],
      searchParams: [],
      selected: [],
      categorySelect: false,
      categoryId: '',
      handleType: ''
    };
  },

  computed: {
    ...mapState({
      userStatus: state => state.user.status
    })
  },

  methods: {
    showModal(type, id) {
      this.$refs.modal.show(type, id);
    },
    deleteItem(id) {
      this.$confirm('是否要把该产品下架？', '确认下架？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.product.repealProduct({ productId: id }).then(res => {
          if (res.status === '1') {
            this.$message({
              type: 'success',
              message: '下架成功!'
            });
            this.getTableData();
          } else {
            this.$message({
              type: 'error',
              message: res.error
            });
          }
        });
      });
    },

    putawayItem(id) {
      this.$confirm('是否要把该产品上架？', '确认上架？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.checkUserStatus()) {
          this.$api.product.putawayProduct({ productId: id }).then(res => {
            if (res.status === '1') {
              this.$message({
                type: 'success',
                message: '上架成功!'
              });
              this.getTableData();
            } else {
              this.$message({
                type: 'error',
                message: res.error
              });
            }
          });
        }
      });
    },

    getParams() {
      const {
        templateValue,
        productValue,
        typeValue
        // productLabelId
      } = this.searchParams;
      const params = {
        templateId: templateValue,
        productName: productValue,
        type: typeValue
        // productLabelId
      };
      return params;
    },

    getTableData(params = {}) {
      const filterParams = this.getParams();
      params = Object.assign(
        filterParams,
        {
          currentPag: this.page.currentPag,
          pageSize: this.page.pageSize
        },
        params
      );
      this.$api.product.queryAllProduct(params).then(response => {
        const { status, data } = response;
        if (status === '1') {
          this.tableData = data.resultList;
          this.page = data.page;
        }
      });
    },

    changeUserStatus() {
      const { userStatus } = this;

      if (userStatus === 'new') {
        this.$store.dispatch('setUserStatus', 'newAdd');
      }
    },

    checkUserStatus() {
      const { userStatus } = this;

      if (userStatus === 'owe') {
        this.$message.error('当前商户余额不足，请联系商务充值！');

        return false;
      }

      return true;
    },

    reloadTable(type) {
      if (type === 'edit') {
        this.getTableData();
        this.changeUserStatus();
      } else {
        this.search = {
          templateValue: '',
          typeValue: '',
          productValue: ''
          // productLabelId: ''
        };
        this.searchParams = Object.assign({}, this.search);
        this.getTableData({
          currentPag: 1
        });
      }
    },

    searchBtn() {
      const params = {
        currentPag: 1
      };
      this.searchParams = Object.assign({}, this.search);
      this.getTableData(params);
    },
    handleSelectionChange(val) {
      this.selected = val;
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
<style lang="scss">
[data-page='loan'] {
  .input_sort input {
    text-align: center;
  }
}
</style>
<style lang="scss" scoped>
.banner {
  position: relative;
}

.search-input {
  display: inline-block;
  width: 200px;
  vertical-align: middle;
  margin-right: 10px;
}

.thumbnail {
  width: 100px;
  height: 66px;
  border: 1px solid #eee;
  margin: 5px 0;
}

.save_list_sort {
  position: absolute;
  bottom: -5px;
  left: 0;
}

.batch_option {
  position: fixed;
  bottom: 5px;
  left: 130px;
  z-index: 5;
}

.on_top {
  margin-left: 5px;
  border: 1px solid #f00;
  border-radius: 4px;
  color: #f00;
  padding: 1px 2px;
}

.eltag {
  margin-right: 5px;
}
</style>
