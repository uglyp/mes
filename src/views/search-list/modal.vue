<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :close-on-click-modal="false"
    size="small"
    @close="close"
    width="800px"
  >
    <el-form :model="form" :rules="rules" class="banner-form" ref="form" label-width="100px">
      <el-form-item label="所属商户">
        <el-input :value="user.businessName" auto-complete="off" placeholder="请输入" disabled></el-input>
      </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input v-model="form.productName" auto-complete="off" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item required label="上线时间" prop="productStartTime">
        <DatetimePicker v-model="form.productStartTime" placeholder="请选择"></DatetimePicker>
      </el-form-item>
      <el-form-item label="下线时间" prop="productEndTime">
        <DatetimePicker v-model="form.productEndTime" placeholder="请选择"></DatetimePicker>
        <span>（结束时间为空时代表一直生效）</span>
      </el-form-item>
      <el-form-item label="借款金额" required>
        <el-col :span="9">
          <el-form-item prop="loanAmountBegin">
            <el-input v-model.number="form.loanAmountBegin" auto-complete="off" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <span class="label-center">-</span>
        </el-col>
        <el-col :span="9">
          <el-form-item prop="loanAmountEnd">
            <el-input v-model.number="form.loanAmountEnd" auto-complete="off" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <span class="label-center">元</span>
        </el-col>
      </el-form-item>
      <el-form-item label="借款期限" required>
        <el-col :span="9">
          <el-form-item prop="loanTimesBegin">
            <el-input
              type="tel"
              v-model.number="form.loanTimesBegin"
              auto-complete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <span class="label-center">-</span>
        </el-col>
        <el-col :span="9">
          <el-form-item prop="loadTimesEnd">
            <el-input
              type="tel"
              v-model.number="form.loadTimesEnd"
              auto-complete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="loadTimesType">
            <el-select v-model="form.loadTimesType" placeholder="单位">
              <el-option
                v-for="(item, key) in keyMap.loadTimesType"
                :label="item"
                :value="item"
                :key="key"
              >{{item}}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="借款利率" required>
        <el-col :span="4">
          <el-form-item prop="loanRateUnit">
            <el-select v-model="form.loanRateUnit" placeholder="单位">
              <el-option
                v-for="(item, key) in keyMap.loanRateUnit"
                :label="item"
                :value="key"
                :key="key"
              >{{item}}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="loanRate">
            <el-input type="number" v-model="form.loanRate" auto-complete="off" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <span class="label-center">%</span>
        </el-col>
      </el-form-item>
      <el-form-item label="产品优势" prop="productDesc">
        <el-input v-model="form.productDesc" placeholder="15字以内" :maxlength="15"></el-input>
      </el-form-item>
      <el-form-item required label="通过率" prop="successRate">
        <el-col :span="6">
          <el-input type="tel" v-model="form.successRate" placeholder="1-99"></el-input>
        </el-col>
        <el-col :span="1">
          <span class="label-center">%</span>
        </el-col>
      </el-form-item>
      <el-form-item label="产品logo" prop="logo">
        <Upload v-model="form.logo" :fileSize="0.05"></Upload>
        <span class="modal-label">(建议上传jpg格式, 尺寸120*120 - 240*240, 最大50KB)</span>
      </el-form-item>
      <el-form-item label="系统商" prop="busSystem">
        <el-input v-model="form.busSystem" placeholder="输入产品系统服务商，如魔镜系统" :maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="对接人" prop="follower">
        <el-select v-model="form.follower" placeholder="请选择" multiple>
          <el-option
            v-for="(item, index) in accountList.userList"
            :label="item.nickname"
            :value="item.id"
            :key="index"
          >{{item.nickname}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作模式" prop="coopMode">
        <el-radio-group v-model="form.coopMode">
          <el-radio label="COMMON">普通 H5</el-radio>
          <el-radio label="H5">联登</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="结算方式" prop="settleType">
        <el-radio-group v-model="form.settleType">
          <el-radio label="UV">UV</el-radio>
          <el-radio label="CPA">CPA</el-radio>
          <el-radio label="CPS">CPS</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合作单价" prop="price">
        <el-col :span="12">
          <el-input
            v-model="form.price"
            maxlength="8"
            placeholder="请输入上线价格，价格越高，排序越靠前"
            :disabled="type === 'edit'"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <p class="modal-label" v-show="type === 'edit'">如需修改出价，请联系商务对接人</p>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0">
        <el-col :span="11">
          <el-form-item label="每日UV" prop="uvNum">
            <el-input v-model="form.uvNum" maxlength="8" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item prop="clickable" label="UV到量">
            <el-radio-group v-model="form.clickable">
              <el-radio :label="1">可点击</el-radio>
              <el-radio :label="0">不可点击</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="后台地址" prop="backendAddress">
        <el-input v-model="form.backendAddress" placeholder="请输入产品后台地址"></el-input>
      </el-form-item>
      <el-form-item label="后台账号" prop="backendAccount">
        <el-input v-model="form.backendAccount" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="后台密码" prop="backendPassword">
        <el-input v-model="form.backendPassword" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="产品链接" prop="productUrl">
        <el-input v-model="form.productUrl" placeholder="请输入产品链接地址"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">保存产品</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { keyMap } from '@/config';
import Upload from '@/components/upload';
import regExp from '@/config/regexp';
import DatetimePicker from '@/components/datetime-picker';
import { mapState } from 'vuex';
import auth from '@/service/auth';

export default {
  name: 'loan-modal',
  components: {
    Upload,
    DatetimePicker
  },
  data() {
    const checkLoanAmountBegin = (rule, value, callback) => {
      const loanAmountEnd = this.form.loanAmountEnd;

      if (value !== '' && loanAmountEnd !== '' && value > loanAmountEnd) {
        return callback(new Error('借款金额(起)应小于借款金额(止)'));
      }

      return callback();
    };

    const checkLoanAmountEnd = (rule, value, callback) => {
      const loanAmountBegin = this.form.loanAmountBegin;

      if (value !== '' && loanAmountBegin !== '' && value < loanAmountBegin) {
        return callback(new Error('借款金额(止)应大于借款金额(起)'));
      }

      return callback();
    };

    const checkloadTimesBegin = (rule, value, callback) => {
      const loadTimesEnd = this.form.loadTimesEnd;
      if (value !== '' && loadTimesEnd !== '' && value > loadTimesEnd) {
        return callback(new Error('借款期限(起)应小于借款期限(止)'));
      }

      return callback();
    };

    const checkloadTimesEnd = (rule, value, callback) => {
      const loanTimesBegin = this.form.loanTimesBegin;
      if (value !== '' && loanTimesBegin !== '' && value < loanTimesBegin) {
        return callback(new Error('借款期限(止)应大于借款期限(起)'));
      }

      return callback();
    };

    const checkLogo = (rule, value, callback) => {
      if (!(value && value.url)) {
        return callback(new Error('请上传图标'));
      }

      return callback();
    };

    const checkPositiveInteger = (rule, value, callback) => {
      if (!rule.pattern.test(value)) {
        return callback(new Error(rule.message));
      }

      return callback();
    };

    const checkSuccessRate = (rule, value, callback) => {
      if (!rule.pattern.test(value)) {
        callback(new Error('成功率为正整数'));
      }

      if (value > 99) {
        callback(new Error('成功率最高为99%'));
      }

      callback();
    };

    const checkEndTime = (rule, value, callback) => {
      if (
        this.form.productEndTime &&
        this.form.productStartTime > this.form.productEndTime
      ) {
        return callback(new Error(rule.message));
      }

      return callback();
    };

    const checkloadRate = (rule, value, callback) => {
      value = parseFloat(value);

      if (value < 0 || value > 100) {
        callback(new Error('借款利率应在0-9999之间'));
      }

      callback();
    };

    return {
      type: 'edit',
      visible: false,
      keyMap,
      isFollowerEdit: false,
      user: auth.getUser(),
      form: {
        busId: auth.getBusId(),
        productName: '',
        productStartTime: '',
        productEndTime: '',
        loanAmountBegin: '',
        loanAmountEnd: '',
        loanTimesBegin: '',
        loadTimesEnd: '',
        loadTimesType: '天',
        loanRateUnit: '日',
        loanRate: '',
        productDesc: '',
        successRate: '',
        productUrl: '',
        logo: {
          url: '',
          id: ''
        },
        busSystem: '',
        follower: '',
        coopMode: 'COMMON',
        settleType: 'UV',
        price: '',
        uvNum: '',
        clickable: '',
        backendAddress: '',
        backendAccount: '',
        backendPassword: '',
        productId: '',
        productDetailId: ''
      },
      modalType: '',
      rules: {
        busId: [{ required: true, message: '请选择所属商户' }],
        productName: [{ required: true, message: '请填写产品名称' }],
        productStartTime: [
          { required: true, message: '请选择上线时间' },
          {
            validator: checkEndTime,
            message: '产品上线时间应小于下线时间',
            trigger: 'blur'
          }
        ],
        productEndTime: [
          {
            validator: checkEndTime,
            message: '产品下线时间应大于上线时间',
            trigger: 'blur'
          }
        ],
        loanAmountBegin: [
          { required: true, message: '请填写借款金额(起)' },
          { type: 'number', message: '借款金额(起)应为数字' },
          {
            type: 'number',
            min: 1,
            max: 4294967294,
            message: '借款金额应在1-4294967294之间'
          },
          { validator: checkLoanAmountBegin, trigger: 'blur' }
        ],
        loanAmountEnd: [
          { required: true, message: '请填写借款金额(止)' },
          { type: 'number', message: '借款金额(止)应为数字' },
          {
            type: 'number',
            min: 1,
            max: 4294967294,
            message: '借款金额应在1-4294967294之间'
          },
          { validator: checkLoanAmountEnd, trigger: 'blur' }
        ],
        loanTimesBegin: [
          { required: true, message: '请填写借款期限(起)' },
          { type: 'integer', message: '借款期限(起)应为整数' },
          {
            type: 'integer',
            min: 1,
            max: 4294967294,
            message: '借款期限应在1-4294967294之间'
          },
          { validator: checkloadTimesBegin, trigger: 'blur' }
        ],
        loadTimesEnd: [
          { required: true, message: '请填写借款期限(止)' },
          { type: 'integer', message: '借款期限(止)应为整数' },
          {
            type: 'integer',
            min: 1,
            max: 4294967294,
            message: '借款期限应在1-4294967294之间'
          },
          { validator: checkloadTimesEnd, trigger: 'blur' }
        ],
        loadTimesType: [{ required: true, message: '请选择借款单位' }],
        loanRate: [
          { required: true, message: '请填写借款利率' },
          { validator: checkloadRate, trigger: 'blur' }
        ],
        loanRateUnit: [{ required: true, message: '请选择借款利率单位' }],
        productDesc: [
          { required: true, message: '请填写产品优势', trigger: 'blur' },
          {
            required: true,
            max: 15,
            message: '产品优势应该在15字以内',
            trigger: 'blur'
          }
        ],
        uvNum: [
          { required: true, message: '请填写每日UV' },
          {
            pattern: regExp.isInteger,
            message: '每日UV为正整数',
            validator: checkPositiveInteger,
            trigger: 'blur'
          }
        ],

        clickable: [{ required: true, message: '请选择UV到量' }],

        logo: [{ type: 'object', required: true, validator: checkLogo }],
        coopMode: [
          { required: true, trigger: 'change', message: '请选择合作模式' }
        ],
        settleType: [
          { required: true, trigger: 'change', message: '请选择结算方式' }
        ],
        price: [
          {
            required: true,
            message: '请输入合作单价'
          },
          {
            pattern: /^([1-9]\d*|[0]{1,1})$/,
            message: '合作单价必须为整数',
            trigger: 'blur'
          }
        ],
        successRate: [
          { required: true, message: '请填写通过率' },
          {
            pattern: regExp.isInteger,
            validator: checkSuccessRate,
            trigger: 'blur'
          }
        ],
        productUrl: [
          {
            required: true,
            message: '请输入产品链接地址'
          },
          {
            pattern: /^(http|ftp|https):\/\/(.)+/,
            message: '产品链接地址格式错误'
          }
        ],
        follower: [
          {
            required: true,
            message: '请选择对接人'
          }
        ]
      }
    };
  },

  computed: {
    title() {
      const { type } = this;
      return type === 'edit' ? '编辑产品' : '新增产品';
    },

    ...mapState({
      accountList: state => state.list.accountList,
      businessList: state => state.list.businessList
    })
  },

  methods: {
    show(type, id) {
      this.type = type;
      this.reset();

      if (type === 'edit') {
        this.form.productId = id;
        this.getProductDetail(id);
        this.getFollower(id);
      } else {
        this.modalType = 'add';
      }

      this.getBusinessList();
      this.getAccountList();
      this.visible = true;
    },

    close() {
      this.visible = false;
    },

    reset() {
      const { form } = this.$refs;
      this.form.productId = '';
      this.form.productDetailId = '';
      this.form.productUrlId = '';
      if (form) {
        form.resetFields();
      }
    },

    getAccountList() {
      this.$store
        .dispatch('getFullList', {
          params: {
            busId: this.form.busId
          },
          options: {
            api: this.$api.getUserList,
            listKey: 'accountList',
            resultKey: ''
          }
        })
        .then(() => {
          const { accountList } = this;

          // this.form.follower = accountList.map(item => item.id);
        });
    },

    getFollower(id) {
      this.$api.getProductAdmin({ productId: id }).then(res => {
        const { data } = res;

        if (data && data.productAdmins) {
          this.isFollowerEdit = true;
          this.form.follower = data.productAdmins.map(item => item.userId);
        }
      });
    },

    getBusinessList() {
      this.$store.dispatch('getFullList', {
        params: {},
        options: {
          api: this.$api.queryAllBuss,
          listKey: 'businessList',
          resultKey: ''
        }
      });
    },

    addFollower(id) {
      const {
        isFollowerEdit,
        accountList,
        form: { follower, productId, productName }
      } = this;

      const userList = follower.map(user => {
        const account = accountList.userList.filter(
          item => item.id === user
        )[0];

        return {
          nickname: account.nickname,
          userId: account.id
        };
      });

      const params = {
        userList,
        personInChargeUser: accountList.personInChargeUser || null,
        productId: productId || id,
        productName
      };

      return this.$api[`${isFollowerEdit ? 'update' : 'insert'}ProductAdmin`](
        params
      );
    },

    getProductDetail(id) {
      this.$api.product.productInfo({ productId: id }).then(response => {
        const { status, data } = response;
        if (status === '1') {
          const { logoUrl = '', logoId = '', productUrls } = data;

          Object.keys(this.form).forEach(key => {
            if (typeof data[key] !== 'undefined') {
              this.form[key] = data[key];
            }
          });
          this.form.logo = {
            url: logoUrl,
            id: logoId
          };

          this.form.productUrl =
            (productUrls[0] && productUrls[0].urlValue) || '';
          this.form.productUrlId = productUrls[0].id;
        }
      });
    },

    onSubmit() {
      const { type } = this;
      const params = Object.assign({}, this.form);
      const { logo, userType } = this.form;

      params.productName = params.productName.trim();
      delete params.logo;
      params.logoUrl = logo.url;
      params.logoId = logo.id;

      params.productUrls = [
        {
          id: params.productUrlId,
          urlName: params.productName,
          urlValue: params.productUrl
        }
      ];

      const msg = type === 'add' ? '新增成功!' : '编辑成功！';

      this.$api.product[`${type}Product`](params).then(response => {
        const { status, data } = response;
        if (status === '1') {
          this.addFollower(data && data.id).then(res => {
            const { status, data } = res;

            if (status === '1') {
              this.$message.success(msg);
              this.close();
              this.$emit('reload', type);
            }
          });
        }
      });
    },

    submit(type) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.onSubmit();
        }
        return false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-label {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  color: red;
  font-weight: 700;
}

.label-center {
  display: block;
  text-align: center;
}
</style>

